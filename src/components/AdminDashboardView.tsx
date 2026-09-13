import { useState, useEffect, FormEvent } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Check, 
  X, 
  KeyRound, 
  Trophy, 
  AlertCircle, 
  Lock, 
  UserX, 
  UserCheck, 
  Search, 
  UserPlus, 
  Crown, 
  Copy, 
  UserMinus 
} from 'lucide-react';
import { 
  ADMIN_EMAIL, 
  getStoredUsers, 
  getStoredRequests, 
  getAdminEmails, 
  isUserAdmin, 
  approveVerificationWithTrophies, 
  rejectVerificationRequest, 
  toggleUserBan, 
  promoteUserToAdmin, 
  demoteUserFromAdmin, 
  DATA_SYNC_EVENT 
} from '../lib/adminStore';
import { AppUserAccount, VerificationRequest, TrophyStats } from '../types';

interface AdminDashboardProps {
  currentUserEmail?: string | null;
}

export function AdminDashboardView({ currentUserEmail }: AdminDashboardProps) {
  const [users, setUsers] = useState<AppUserAccount[]>([]);
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [adminEmails, setAdminEmails] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'requests' | 'users' | 'admins'>('requests');

  // Verification approval modal state
  const [approvingRequest, setApprovingRequest] = useState<VerificationRequest | null>(null);
  const [inputSecret, setInputSecret] = useState('');
  const [trophyInputs, setTrophyInputs] = useState<TrophyStats>({
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
    level: 1
  });
  const [approvalError, setApprovalError] = useState<string | null>(null);

  // Management states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserToPromote, setSelectedUserToPromote] = useState('');
  const [actionNotice, setActionNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copiedSecretId, setCopiedSecretId] = useState<string | null>(null);

  const hasAdminAccess = isUserAdmin(currentUserEmail);

  const loadData = () => {
    setUsers(getStoredUsers());
    setRequests(getStoredRequests());
    setAdminEmails(getAdminEmails());
  };

  useEffect(() => {
    loadData();

    const handleSync = () => {
      loadData();
    };

    window.addEventListener(DATA_SYNC_EVENT, handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener(DATA_SYNC_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const triggerNotice = (type: 'success' | 'error', message: string) => {
    setActionNotice({ type, message });
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleCopySecret = (secret: string, id: string) => {
    navigator.clipboard.writeText(secret);
    setCopiedSecretId(id);
    setTimeout(() => setCopiedSecretId(null), 2000);
  };

  // 1. Verification Approval Workflow
  const openApprovalModal = (req: VerificationRequest) => {
    setApprovingRequest(req);
    setInputSecret('');
    setTrophyInputs({
      platinum: req.trophyStats?.platinum || 0,
      gold: req.trophyStats?.gold || 0,
      silver: req.trophyStats?.silver || 0,
      bronze: req.trophyStats?.bronze || 0,
      level: req.trophyStats?.level || 1
    });
    setApprovalError(null);
  };

  const handleConfirmApproval = () => {
    if (!approvingRequest) return;
    if (!inputSecret.trim()) {
      setApprovalError('يجب إدخال كلمة السر التي أرسلها اللاعب عبر رسائل السوني.');
      return;
    }

    const res = approveVerificationWithTrophies(
      approvingRequest.id,
      inputSecret.trim(),
      trophyInputs,
      currentUserEmail || ADMIN_EMAIL
    );

    if (res.success) {
      loadData();
      setApprovingRequest(null);
      triggerNotice('success', res.message);
    } else {
      setApprovalError(res.message);
    }
  };

  const handleReject = (req: VerificationRequest) => {
    const reason = prompt('سبب رفض طلب التوثيق (اختياري):', 'كلمة السر غير متطابقة أو لم يتم إرسال الرسالة في السوني');
    if (reason === null) return;
    const success = rejectVerificationRequest(req.id, reason);
    if (success) {
      loadData();
      triggerNotice('success', `تم رفض طلب التوثيق للحساب ${req.psnId}`);
    }
  };

  // 2. Ban Toggle
  const handleToggleBan = (user: AppUserAccount) => {
    if (user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      alert('لا يمكن حظر حساب مدير النظام الرئيسي.');
      return;
    }
    const res = toggleUserBan(user.uid);
    if (res.success) {
      loadData();
      triggerNotice('success', res.message);
    }
  };

  // 3. Promote User to Admin by selecting from existing users
  const handlePromoteSelectedUser = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedUserToPromote) return;

    const res = promoteUserToAdmin(selectedUserToPromote);
    if (res.success) {
      setSelectedUserToPromote('');
      loadData();
      triggerNotice('success', res.message);
    } else {
      triggerNotice('error', res.message);
    }
  };

  // 4. Demote Admin
  const handleDemoteAdmin = (email: string) => {
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      triggerNotice('error', 'لا يمكن إزالة المدير الرئيسي.');
      return;
    }
    const res = demoteUserFromAdmin(email);
    if (res.success) {
      loadData();
      triggerNotice('success', res.message);
    } else {
      triggerNotice('error', res.message);
    }
  };

  if (!hasAdminAccess) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-app)] text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--chip-bg)] border border-[var(--border-app)] flex items-center justify-center text-[var(--text-main)]">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--text-main)]">منطقة محمية - للمدراء فقط</h2>
        <p className="text-xs text-[var(--text-muted)] font-mono">
          حسابك الحالي: {currentUserEmail || 'غير مسجل الدخول'}
        </p>
      </div>
    );
  }

  // Filtered requests & users
  const pendingRequests = requests.filter(r => r.status === 'pending');
  const pastRequests = requests.filter(r => r.status !== 'pending');

  const filteredUsers = users.filter(u => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      u.email?.toLowerCase().includes(q) ||
      u.displayName?.toLowerCase().includes(q) ||
      u.psnId?.toLowerCase().includes(q) ||
      u.verificationSecret?.toLowerCase().includes(q)
    );
  });

  // Non-admin users list for selection dropdown
  const nonAdminUsers = users.filter(u => u.email && !adminEmails.includes(u.email.toLowerCase()));

  return (
    <div className="space-y-5 pb-20 max-w-6xl mx-auto">
      
      {/* Notice banner */}
      {actionNotice && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border ${
          actionNotice.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 dark:text-emerald-300' 
            : 'bg-rose-500/10 border-rose-500/30 text-rose-500 dark:text-rose-300'
        }`}>
          {actionNotice.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{actionNotice.message}</span>
        </div>
      )}

      {/* Pure 3-Tab Grid Layout - Icons Only as requested */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
        <button
          onClick={() => setActiveTab('requests')}
          title="طلبات التوثيق"
          aria-label="طلبات التوثيق"
          className={`py-3.5 px-4 rounded-2xl transition-all flex items-center justify-center cursor-pointer relative ${
            activeTab === 'requests'
              ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-lg'
              : 'bg-[var(--chip-bg)] text-[var(--text-sub)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)] border border-[var(--border-app)]'
          }`}
        >
          <ShieldCheck className="w-6 h-6" />
          {pendingRequests.length > 0 && (
            <span className={`absolute top-2 right-4 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
              activeTab === 'requests' ? 'bg-[var(--btn-primary-text)] text-[var(--btn-primary-bg)]' : 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
            }`}>
              {pendingRequests.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('users')}
          title="المستخدمين"
          aria-label="المستخدمين"
          className={`py-3.5 px-4 rounded-2xl transition-all flex items-center justify-center cursor-pointer relative ${
            activeTab === 'users'
              ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-lg'
              : 'bg-[var(--chip-bg)] text-[var(--text-sub)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)] border border-[var(--border-app)]'
          }`}
        >
          <Users className="w-6 h-6" />
          {users.length > 0 && (
            <span className={`absolute top-2 right-4 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
              activeTab === 'users' ? 'bg-[var(--btn-primary-text)] text-[var(--btn-primary-bg)]' : 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
            }`}>
              {users.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('admins')}
          title="المدراء"
          aria-label="المدراء"
          className={`py-3.5 px-4 rounded-2xl transition-all flex items-center justify-center cursor-pointer relative ${
            activeTab === 'admins'
              ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-lg'
              : 'bg-[var(--chip-bg)] text-[var(--text-sub)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)] border border-[var(--border-app)]'
          }`}
        >
          <Crown className="w-6 h-6" />
          {adminEmails.length > 0 && (
            <span className={`absolute top-2 right-4 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
              activeTab === 'admins' ? 'bg-[var(--btn-primary-text)] text-[var(--btn-primary-bg)]' : 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
            }`}>
              {adminEmails.length}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: Verification Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          
          {/* Pending Section */}
          <div className="space-y-4">
            {pendingRequests.length === 0 ? (
              <div className="p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-app)] text-center space-y-2 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-[var(--text-muted)] mx-auto" />
                <h3 className="text-sm font-bold text-[var(--text-main)]">لا توجد طلبات توثيق معلقة</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingRequests.map(req => (
                  <div 
                    key={req.id} 
                    className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-app)] space-y-4 shadow-xl hover:border-[var(--border-hover)] transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-base font-black text-[var(--text-main)]">{req.psnId}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--chip-bg)] text-[var(--text-sub)] border border-[var(--border-app)]">
                            معلق
                          </span>
                        </div>
                        <div className="text-xs text-[var(--text-muted)] font-mono">{req.userEmail}</div>
                        <div className="text-[11px] text-[var(--text-sub)]">الاسم: {req.displayName}</div>
                      </div>

                      {/* Secret Code Reference with Small Copy Button */}
                      <div className="text-left bg-[var(--input-bg)] p-2.5 rounded-xl border border-[var(--border-app)] flex flex-col items-end">
                        <div className="text-[10px] text-[var(--text-muted)] font-bold flex items-center gap-1">
                          <KeyRound className="w-3 h-3 text-[var(--text-main)]" />
                          <span>الرمز:</span>
                        </div>
                        <div className="flex items-center gap-1.5 pt-0.5">
                          <span className="text-sm font-mono font-black text-emerald-500 tracking-wider">
                            {req.verificationSecret}
                          </span>
                          <button
                            onClick={() => handleCopySecret(req.verificationSecret, req.id)}
                            className="p-1 rounded-md bg-[var(--chip-bg)] hover:bg-[var(--bg-card-hover)] text-[var(--text-main)] border border-[var(--border-app)] transition-all cursor-pointer"
                            title="نسخ كلمة السر"
                          >
                            {copiedSecretId === req.id ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-[var(--text-muted)] bg-[var(--chip-bg)] p-2.5 rounded-xl border border-[var(--border-app)] flex items-center justify-between">
                      <span>تاريخ الطلب:</span>
                      <span className="font-mono text-[var(--text-sub)]">{new Date(req.requestedAt).toLocaleString('ar-SA')}</span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => openApprovalModal(req)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>التحقق واعتماد التروفيات</span>
                      </button>
                      <button
                        onClick={() => handleReject(req)}
                        className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 dark:text-rose-300 border border-rose-500/20 transition-all cursor-pointer"
                        title="رفض الطلب"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past / Reviewed Requests */}
          {pastRequests.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-[var(--border-app)]">
              <h2 className="text-sm font-bold text-[var(--text-muted)]">سجل الطلبات السابقة ({pastRequests.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {pastRequests.map(req => (
                  <div key={req.id} className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-app)] space-y-2 text-xs shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[var(--text-main)]">{req.psnId}</span>
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                        req.status === 'approved' 
                          ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20' 
                          : 'bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20'
                      }`}>
                        {req.status === 'approved' ? 'معتمد' : 'مرفوض'}
                      </span>
                    </div>
                    <div className="text-[var(--text-muted)] truncate">{req.userEmail}</div>
                    {req.trophyStats && (
                      <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-sub)] bg-[var(--chip-bg)] p-1.5 rounded-lg border border-[var(--border-app)]">
                        <span>🏆 {req.trophyStats.platinum}P</span>
                        <span>🥇 {req.trophyStats.gold}G</span>
                        <span>🥈 {req.trophyStats.silver}S</span>
                        <span>🥉 {req.trophyStats.bronze}B</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: All Users Table */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-app)] shadow-sm">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث بالايميل أو الاسم أو معرف السوني..."
                className="w-full pl-3 pr-9 py-2 bg-[var(--input-bg)] border border-[var(--border-app)] rounded-xl text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--border-hover)]"
              />
            </div>
            <div className="text-xs text-[var(--text-muted)]">
              المستخدمين: <strong className="text-[var(--text-main)]">{filteredUsers.length}</strong>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-app)] rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-app)] bg-[var(--chip-bg)] text-[var(--text-sub)] font-bold">
                    <th className="p-4">المستخدم</th>
                    <th className="p-4">معرّف السوني</th>
                    <th className="p-4">كلمة السر</th>
                    <th className="p-4">التروفيات</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-app)]">
                  {filteredUsers.map(u => {
                    const isSuper = u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
                    const isAdm = u.role === 'admin' || isSuper;

                    return (
                      <tr key={u.uid || u.email} className={`hover:bg-[var(--bg-card-hover)] transition-colors ${u.isBanned ? 'opacity-50 bg-rose-500/5' : ''}`}>
                        <td className="p-4 space-y-0.5">
                          <div className="font-bold text-[var(--text-main)] flex items-center gap-1.5">
                            <span>{u.displayName || 'لاعب'}</span>
                            {isAdm && <Crown className="w-3.5 h-3.5 text-yellow-500" title="مدير" />}
                          </div>
                          <div className="font-mono text-[var(--text-muted)] text-[11px]">{u.email}</div>
                        </td>

                        <td className="p-4">
                          {u.psnId ? (
                            <span className="font-mono font-bold text-[var(--text-main)] bg-[var(--chip-bg)] px-2 py-1 rounded-lg border border-[var(--border-app)]">
                              {u.psnId}
                            </span>
                          ) : (
                            <span className="text-[var(--text-muted)]">لم يحدد</span>
                          )}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                              {u.verificationSecret || 'KC-••••'}
                            </span>
                            {u.verificationSecret && (
                              <button
                                onClick={() => handleCopySecret(u.verificationSecret!, u.uid || u.email)}
                                className="p-1 rounded-md bg-[var(--chip-bg)] hover:bg-[var(--bg-card-hover)] text-[var(--text-main)] border border-[var(--border-app)] transition-all cursor-pointer"
                                title="نسخ كلمة السر"
                              >
                                {copiedSecretId === (u.uid || u.email) ? (
                                  <Check className="w-3 h-3 text-emerald-500" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            )}
                          </div>
                        </td>

                        <td className="p-4">
                          {u.trophyStats ? (
                            <div className="font-mono text-[11px] text-[var(--text-sub)] flex items-center gap-1.5">
                              <span title="بلاتينيوم" className="text-[var(--text-main)] font-bold">{u.trophyStats.platinum}P</span>
                              <span title="ذهبي" className="text-amber-500">{u.trophyStats.gold}G</span>
                              <span title="فضي" className="text-slate-500 dark:text-slate-300">{u.trophyStats.silver}S</span>
                              <span title="برونزي" className="text-orange-600">{u.trophyStats.bronze}B</span>
                            </div>
                          ) : (
                            <span className="text-[var(--text-muted)]">0</span>
                          )}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-1.5">
                            {u.isVerified ? (
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 font-bold border border-emerald-500/20">
                                موثق
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-md bg-[var(--chip-bg)] text-[var(--text-muted)]">
                                غير موثق
                              </span>
                            )}
                            {u.isBanned && (
                              <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-500 dark:text-rose-400 font-bold border border-rose-500/20">
                                محظور
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {!isAdm ? (
                              <button
                                onClick={() => {
                                  const res = promoteUserToAdmin(u.email);
                                  if (res.success) {
                                    loadData();
                                    triggerNotice('success', res.message);
                                  }
                                }}
                                className="p-2 rounded-xl bg-[var(--chip-bg)] hover:bg-[var(--bg-card-hover)] text-[var(--text-sub)] hover:text-[var(--text-main)] border border-[var(--border-app)] transition-all cursor-pointer"
                                title="تعيين كمدير"
                              >
                                <Crown className="w-4 h-4" />
                              </button>
                            ) : !isSuper ? (
                              <button
                                onClick={() => handleDemoteAdmin(u.email)}
                                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 dark:text-rose-300 border border-rose-500/20 transition-all cursor-pointer"
                                title="إزالة من الإدارة"
                              >
                                <UserMinus className="w-4 h-4" />
                              </button>
                            ) : null}

                            {!isSuper && (
                              <button
                                onClick={() => handleToggleBan(u)}
                                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                                  u.isBanned
                                    ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border-emerald-500/20'
                                    : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border-rose-500/20'
                                }`}
                                title={u.isBanned ? 'فك الحظر' : 'حظر اللاعب'}
                              >
                                {u.isBanned ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Admin Management with Selection Dropdown & Removal */}
      {activeTab === 'admins' && (
        <div className="space-y-6">
          
          {/* Add Admin by Selection of Registered Users */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-app)] rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-[var(--text-main)] flex items-center gap-2">
              <Crown className="w-4 h-4 text-yellow-500" />
              <span>إضافة مدير باختيار أحد المستخدمين</span>
            </h2>

            <form onSubmit={handlePromoteSelectedUser} className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedUserToPromote}
                onChange={(e) => setSelectedUserToPromote(e.target.value)}
                className="flex-1 px-4 py-3 bg-[var(--input-bg)] border border-[var(--border-app)] rounded-2xl text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--border-hover)] cursor-pointer"
              >
                <option value="" className="bg-[var(--bg-card)] text-[var(--text-muted)]">
                  -- اختر مستخدم من المسجلين لترقيته إلى مدير --
                </option>
                {nonAdminUsers.map(u => (
                  <option key={u.uid || u.email} value={u.email} className="bg-[var(--bg-card)] text-[var(--text-main)]">
                    {u.displayName} ({u.email}) {u.psnId ? `- PSN: ${u.psnId}` : ''}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                disabled={!selectedUserToPromote}
                className="py-3 px-6 rounded-2xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <UserPlus className="w-4 h-4" />
                <span>إضافة كمدير</span>
              </button>
            </form>
          </div>

          {/* List of Current Admins with Removal */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-app)] rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-[var(--text-main)]">المدراء الحاليين ({adminEmails.length})</h2>
            <div className="divide-y divide-[var(--border-app)]">
              {adminEmails.map(email => {
                const isSuper = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
                const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

                return (
                  <div key={email} className="py-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[var(--chip-bg)] border border-[var(--border-app)] flex items-center justify-center text-xs font-bold text-[var(--text-main)] font-mono">
                        {email[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1.5">
                          <span>{matchedUser?.displayName || 'مدير'}</span>
                          {isSuper && (
                            <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border border-yellow-400/20 font-bold">
                              المدير الرئيسي
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-[var(--text-muted)]">{email}</div>
                      </div>
                    </div>

                    {!isSuper ? (
                      <button
                        onClick={() => handleDemoteAdmin(email)}
                        className="py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 dark:text-rose-300 border border-rose-500/20 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                        title="إزالة من الإدارة"
                      >
                        <UserMinus className="w-3.5 h-3.5" />
                        <span>إزالة من الإدارة</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-[var(--text-muted)] font-bold px-3 py-1">ثابت</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* APPROVAL MODAL WITH 4 TROPHY INPUTS (WITHOUT HELP CODE AS REQUESTED) */}
      {approvingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setApprovingRequest(null)}
          />

          <div className="relative bg-[var(--bg-card)] border border-[var(--border-app)] rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 z-10 shadow-2xl overflow-hidden">
            
            <div className="flex items-center justify-between border-b border-[var(--border-app)] pb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-[var(--text-main)] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[var(--text-main)]" />
                  <span>اعتماد توثيق الحساب</span>
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  الحساب: <strong className="font-mono text-[var(--text-main)]">{approvingRequest.psnId}</strong> ({approvingRequest.userEmail})
                </p>
              </div>
              <button
                onClick={() => setApprovingRequest(null)}
                className="p-2 rounded-xl bg-[var(--chip-bg)] hover:bg-[var(--bg-card-hover)] text-[var(--text-sub)] hover:text-[var(--text-main)] transition-colors cursor-pointer border border-[var(--border-app)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {approvalError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{approvalError}</span>
              </div>
            )}

            <div className="space-y-4">
              
              {/* Secret Code Verification Input ONLY - NO EXPECTED HELPER CODE SHOWN */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[var(--text-main)] flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-500" />
                  <span>أدخل كلمة السر المستلمة في رسالة السوني:</span>
                </label>
                <input
                  type="text"
                  value={inputSecret}
                  onChange={(e) => setInputSecret(e.target.value.toUpperCase())}
                  placeholder="مثال: KC-8492"
                  className="w-full px-4 py-3.5 bg-[var(--input-bg)] border border-[var(--border-app)] rounded-2xl text-base font-mono font-bold text-emerald-500 placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 text-center tracking-widest uppercase shadow-inner"
                />
              </div>

              {/* 4 Trophy Fields + Level */}
              <div className="pt-3 border-t border-[var(--border-app)] space-y-3">
                <label className="block text-xs font-bold text-[var(--text-main)] flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span>تحديد إحصائيات تروفيات الحساب:</span>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Platinum */}
                  <div className="p-3 rounded-2xl bg-[var(--chip-bg)] border border-[var(--border-app)] space-y-1">
                    <span className="text-[11px] font-bold text-[var(--text-main)] flex items-center gap-1">
                      <span>🏆 البلاتينيوم</span>
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={trophyInputs.platinum}
                      onChange={(e) => setTrophyInputs({ ...trophyInputs, platinum: parseInt(e.target.value) || 0 })}
                      className="w-full bg-[var(--input-bg)] border border-[var(--border-app)] rounded-xl px-3 py-2 font-mono text-sm font-bold text-[var(--text-main)] focus:outline-none focus:border-[var(--border-hover)]"
                    />
                  </div>

                  {/* Gold */}
                  <div className="p-3 rounded-2xl bg-[var(--chip-bg)] border border-[var(--border-app)] space-y-1">
                    <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1">
                      <span>🥇 الذهبي</span>
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={trophyInputs.gold}
                      onChange={(e) => setTrophyInputs({ ...trophyInputs, gold: parseInt(e.target.value) || 0 })}
                      className="w-full bg-[var(--input-bg)] border border-[var(--border-app)] rounded-xl px-3 py-2 font-mono text-sm font-bold text-[var(--text-main)] focus:outline-none focus:border-[var(--border-hover)]"
                    />
                  </div>

                  {/* Silver */}
                  <div className="p-3 rounded-2xl bg-[var(--chip-bg)] border border-[var(--border-app)] space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-300 flex items-center gap-1">
                      <span>🥈 الفضي</span>
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={trophyInputs.silver}
                      onChange={(e) => setTrophyInputs({ ...trophyInputs, silver: parseInt(e.target.value) || 0 })}
                      className="w-full bg-[var(--input-bg)] border border-[var(--border-app)] rounded-xl px-3 py-2 font-mono text-sm font-bold text-[var(--text-main)] focus:outline-none focus:border-[var(--border-hover)]"
                    />
                  </div>

                  {/* Bronze */}
                  <div className="p-3 rounded-2xl bg-[var(--chip-bg)] border border-[var(--border-app)] space-y-1">
                    <span className="text-[11px] font-bold text-orange-600 flex items-center gap-1">
                      <span>🥉 البرونزي</span>
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={trophyInputs.bronze}
                      onChange={(e) => setTrophyInputs({ ...trophyInputs, bronze: parseInt(e.target.value) || 0 })}
                      className="w-full bg-[var(--input-bg)] border border-[var(--border-app)] rounded-xl px-3 py-2 font-mono text-sm font-bold text-[var(--text-main)] focus:outline-none focus:border-[var(--border-hover)]"
                    />
                  </div>

                </div>

                {/* Level */}
                <div className="p-3 rounded-2xl bg-[var(--chip-bg)] border border-[var(--border-app)] flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-main)]">مستوى الحساب (Level):</span>
                  <input
                    type="number"
                    min="1"
                    value={trophyInputs.level || 1}
                    onChange={(e) => setTrophyInputs({ ...trophyInputs, level: parseInt(e.target.value) || 1 })}
                    className="w-24 bg-[var(--input-bg)] border border-[var(--border-app)] rounded-xl px-3 py-2 font-mono text-sm font-bold text-[var(--text-main)] text-center focus:outline-none focus:border-[var(--border-hover)]"
                  />
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleConfirmApproval}
                className="flex-1 py-3 px-5 rounded-2xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>تأكيد المطابقة والتوثيق</span>
              </button>
              <button
                onClick={() => setApprovingRequest(null)}
                className="py-3 px-5 rounded-2xl bg-[var(--chip-bg)] hover:bg-[var(--bg-card-hover)] text-[var(--text-main)] font-bold text-xs transition-all cursor-pointer border border-[var(--border-app)]"
              >
                إلغاء
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
