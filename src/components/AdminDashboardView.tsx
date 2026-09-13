import { useState, useEffect, type FormEvent } from 'react';
import { 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  Lock, 
  KeyRound, 
  Check, 
  X, 
  UserCheck, 
  Clock, 
  Mail, 
  Gamepad2, 
  Plus, 
  Trash2, 
  Trophy,
  AlertCircle,
  Eye,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { 
  ADMIN_EMAIL, 
  getStoredUsers, 
  getStoredRequests, 
  toggleUserBan, 
  approveVerificationWithTrophies, 
  rejectVerificationRequest,
  getAdminEmails,
  addAdminEmail,
  removeAdminEmail,
  isUserAdmin,
  DATA_SYNC_EVENT
} from '../lib/adminStore';
import { AppUserAccount, VerificationRequest } from '../types';

interface AdminDashboardViewProps {
  currentUserEmail?: string | null;
}

export function AdminDashboardView({ currentUserEmail }: AdminDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'requests' | 'users' | 'admins'>('requests');
  
  const [users, setUsers] = useState<AppUserAccount[]>([]);
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [adminEmails, setAdminEmails] = useState<string[]>([]);
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [actionNotice, setActionNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Selected User Modal for detailed view
  const [selectedUser, setSelectedUser] = useState<AppUserAccount | null>(null);

  // Approval Modal State (Verification Request Modal)
  const [approvingRequest, setApprovingRequest] = useState<VerificationRequest | null>(null);
  const [inputSecret, setInputSecret] = useState('');
  const [trophyInputs, setTrophyInputs] = useState({
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
    level: 1
  });
  const [approvalError, setApprovalError] = useState<string | null>(null);

  // New Admin Email Form
  const [newAdminEmail, setNewAdminEmail] = useState('');

  // Super Admin Check
  const isSuperAdmin = currentUserEmail?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  const hasAdminAccess = isUserAdmin(currentUserEmail);

  const loadData = () => {
    setUsers(getStoredUsers());
    setRequests(getStoredRequests());
    setAdminEmails(getAdminEmails());
  };

  // Real-time synchronization listeners (Instant broadcast + cross-tab + interval fallback)
  useEffect(() => {
    loadData();

    const handleSync = () => {
      loadData();
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key?.startsWith('kachi_')) {
        loadData();
      }
    };

    window.addEventListener(DATA_SYNC_EVENT, handleSync);
    window.addEventListener('storage', handleStorage);
    
    // High-frequency polling (every 1 second) to guarantee 0-delay updates
    const timer = setInterval(loadData, 1000);

    return () => {
      window.removeEventListener(DATA_SYNC_EVENT, handleSync);
      window.removeEventListener('storage', handleStorage);
      clearInterval(timer);
    };
  }, []);

  const triggerNotice = (type: 'success' | 'error', message: string) => {
    setActionNotice({ type, message });
    setTimeout(() => setActionNotice(null), 4000);
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

  // 3. Admin Management
  const handleAddAdmin = (e: FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim()) return;

    const res = addAdminEmail(newAdminEmail.trim());
    if (res.success) {
      setNewAdminEmail('');
      loadData();
      triggerNotice('success', res.message);
    } else {
      triggerNotice('error', res.message);
    }
  };

  const handleRemoveAdmin = (email: string) => {
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      alert('لا يمكن حذف المدير الرئيسي.');
      return;
    }
    if (confirm(`هل أنت متأكد من إزالة صلاحيات الإدارة عن (${email})؟`)) {
      const res = removeAdminEmail(email);
      if (res.success) {
        loadData();
        triggerNotice('success', res.message);
      }
    }
  };

  if (!hasAdminAccess) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 rounded-3xl bg-[#12141c] border border-white/10 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-white">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">منطقة محمية - للمدراء فقط</h2>
        <p className="text-sm text-gray-400">
          هذه الصفحة مخصصة لمدراء منصة كاتشي لمراجعة طلبات التوثيق وإدارة اللاعبين.
        </p>
        <p className="text-xs text-gray-500 font-mono">
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

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#12141c] border border-white/15 p-6 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
              لوحة الإدارة والتحكم
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              تحديث فوري مباشر
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            إدارة المنصة والمستخدمين
          </h1>
          <p className="text-xs text-gray-400">
            مرحباً {currentUserEmail} - يمكنك اعتماد التوثيقات بكلمة السر وإدارة المستخدمين فوراً
          </p>
        </div>

        {/* Global Stats */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-initial px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-[11px] text-gray-400 font-bold">طلبات بالانتظار</div>
            <div className="text-xl font-black text-white font-mono">{pendingRequests.length}</div>
          </div>
          <div className="flex-1 md:flex-initial px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-[11px] text-gray-400 font-bold">إجمالي المسجلين</div>
            <div className="text-xl font-black text-white font-mono">{users.length}</div>
          </div>
        </div>
      </div>

      {/* Notice banner */}
      {actionNotice && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border ${
          actionNotice.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
        }`}>
          {actionNotice.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{actionNotice.message}</span>
        </div>
      )}

      {/* Tab Controls */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
            activeTab === 'requests'
              ? 'bg-white text-black shadow-lg'
              : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>طلبات التوثيق ({pendingRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
            activeTab === 'users'
              ? 'bg-white text-black shadow-lg'
              : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>قاعدة بيانات المستخدمين ({users.length})</span>
        </button>

        {isSuperAdmin && (
          <button
            onClick={() => setActiveTab('admins')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
              activeTab === 'admins'
                ? 'bg-white text-black shadow-lg'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>طاقم الإدارة ({adminEmails.length})</span>
          </button>
        )}
      </div>

      {/* TAB 1: VERIFICATION REQUESTS */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-white" />
              <span>الطلبات المعلقة قيد المراجعة</span>
            </h2>
            <span className="text-xs text-gray-400 font-mono">
              {pendingRequests.length} طلب ينتظر الإجراء
            </span>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#12141c] border border-white/10 space-y-2">
              <ShieldCheck className="w-12 h-12 text-emerald-400/60 mx-auto" />
              <div className="text-white font-bold text-base">لا توجد طلبات توثيق معلقة حالياً</div>
              <p className="text-xs text-gray-400">أي طلب توثيق يقدمه لاعب في السوني سيظهر هنا فوراً في نفس اللحظة.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pendingRequests.map(req => (
                <div 
                  key={req.id} 
                  className="bg-[#12141c] border border-white/15 hover:border-white/30 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl transition-all"
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-lg font-black text-white font-mono bg-white/10 px-3 py-1 rounded-xl border border-white/20">
                        {req.psnId}
                      </span>
                      <span className="text-xs text-gray-300 font-bold">
                        {req.displayName}
                      </span>
                      <span className="text-[11px] text-gray-400 font-mono">
                        ({req.userEmail})
                      </span>
                    </div>

                    <div className="text-xs text-gray-400 leading-relaxed flex items-center gap-2 flex-wrap">
                      <span className="text-white font-bold">تاريخ الطلب:</span>
                      <span className="font-mono text-gray-300">{new Date(req.requestedAt).toLocaleString('ar-SA')}</span>
                    </div>

                    {/* Secret Password hint for Super Admin */}
                    {isSuperAdmin && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/10 border border-white/20 text-xs font-mono text-white">
                        <KeyRound className="w-3.5 h-3.5 text-white" />
                        <span>كلمة السر المتوقعة في رسالة السوني:</span>
                        <strong className="text-white font-black text-sm bg-black/40 px-2 py-0.5 rounded border border-white/20">
                          {req.verificationSecret}
                        </strong>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                      onClick={() => openApprovalModal(req)}
                      className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Check className="w-4 h-4" />
                      <span>اعتماد وإدخال التروفيات</span>
                    </button>

                    <button
                      onClick={() => handleReject(req)}
                      className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      title="رفض الطلب"
                    >
                      <X className="w-4 h-4" />
                      <span>رفض</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past/Reviewed Requests Section */}
          {pastRequests.length > 0 && (
            <div className="pt-8 space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                الطلبات التي تمت معالجتها سابقاً ({pastRequests.length})
              </h3>
              <div className="bg-[#12141c] border border-white/10 rounded-3xl divide-y divide-white/5 overflow-hidden">
                {pastRequests.slice(0, 10).map(req => (
                  <div key={req.id} className="p-4 flex items-center justify-between text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white">{req.psnId}</span>
                        <span className="text-gray-400">({req.userEmail})</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          req.status === 'approved' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {req.status === 'approved' ? 'تم التوثيق' : 'مرفوض'}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {req.notes || 'لا توجد ملاحظات'}
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-gray-500 font-mono">
                      {req.reviewedAt ? new Date(req.reviewedAt).toLocaleDateString('ar-SA') : '-'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: USERS DATABASE */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#12141c] border border-white/10 p-4 rounded-3xl">
            <div className="relative w-full sm:w-80">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث بالاسم، الإيميل، معرف السوني..."
                className="w-full bg-[#161922] border border-white/10 rounded-xl pr-10 pl-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/30 font-sans"
              />
            </div>

            <div className="text-xs text-gray-400">
              إجمالي المستخدمين: <strong className="text-white font-mono">{filteredUsers.length}</strong>
            </div>
          </div>

          <div className="bg-[#12141c] border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#161922] border-b border-white/10 text-gray-400 font-bold">
                  <tr>
                    <th className="p-4">اللاعب</th>
                    <th className="p-4">معرف السوني (PSN)</th>
                    <th className="p-4">حالة التوثيق</th>
                    <th className="p-4">التروفيات (P/G/S/B)</th>
                    <th className="p-4">كلمة السر</th>
                    <th className="p-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.map(user => {
                    const stats = user.trophyStats;
                    const isUserMainAdmin = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

                    return (
                      <tr key={user.uid} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <div className="space-y-0.5">
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span>{user.displayName}</span>
                              {user.role === 'admin' && (
                                <span className="text-[10px] bg-white text-black font-bold px-1.5 py-0.2 rounded">مدير</span>
                              )}
                            </div>
                            <div className="text-[11px] text-gray-400 font-mono">{user.email}</div>
                          </div>
                        </td>

                        <td className="p-4 font-mono font-bold text-white">
                          {user.psnId || <span className="text-gray-500 font-sans text-[11px]">لم يربط بعد</span>}
                        </td>

                        <td className="p-4">
                          {user.isVerified ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[11px]">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>موثق بالسوني</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10 text-[11px]">
                              <span>غير موثق</span>
                            </span>
                          )}
                        </td>

                        <td className="p-4 font-mono">
                          {stats ? (
                            <div className="flex items-center gap-1.5 text-[11px]">
                              <span className="text-white font-bold">💎{stats.platinum}</span>
                              <span className="text-amber-300">🥇{stats.gold}</span>
                              <span className="text-slate-300">🥈{stats.silver}</span>
                              <span className="text-orange-300">🥉{stats.bronze}</span>
                              <span className="text-gray-400 mr-1">Lv.{stats.level}</span>
                            </div>
                          ) : (
                            <span className="text-gray-500 text-[11px]">-</span>
                          )}
                        </td>

                        <td className="p-4 font-mono text-white">
                          {isSuperAdmin ? (
                            <span className="bg-white/10 px-2 py-1 rounded border border-white/20 text-white font-bold">
                              {user.verificationSecret || '-'}
                            </span>
                          ) : (
                            <span className="text-gray-500 text-[11px]">محمي للمدير العام</span>
                          )}
                        </td>

                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                              title="عرض التفاصيل الكاملة"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {!isUserMainAdmin && (
                              <button
                                onClick={() => handleToggleBan(user)}
                                className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-colors cursor-pointer ${
                                  user.isBanned
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
                                }`}
                              >
                                {user.isBanned ? 'فك الحظر' : 'حظر'}
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

      {/* TAB 3: ADMINS MANAGEMENT (Super Admin Only) */}
      {activeTab === 'admins' && isSuperAdmin && (
        <div className="space-y-6 max-w-3xl">
          <div className="bg-[#12141c] border border-white/15 p-6 rounded-3xl space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-white" />
              <span>إضافة مدير جديد للنظام</span>
            </h2>
            <p className="text-xs text-gray-400">
              يمكن للمدير مراجعة طلبات توثيق السوني وإدخال التروفيات للاعبين. المدير العام الرئيسي فقط هو ({ADMIN_EMAIL}).
            </p>

            <form onSubmit={handleAddAdmin} className="flex gap-3">
              <input
                type="email"
                required
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="flex-1 bg-[#161922] border border-white/10 focus:border-white/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none font-mono"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة كمدير</span>
              </button>
            </form>
          </div>

          <div className="bg-[#12141c] border border-white/15 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-white/10 font-bold text-xs text-gray-400">
              قائمة المدراء المصرح لهم حالياً
            </div>
            <div className="divide-y divide-white/5">
              {adminEmails.map(email => {
                const isRoot = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

                return (
                  <div key={email} className="p-4 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="font-mono text-white font-bold">{email}</span>
                      {isRoot && (
                        <span className="px-2 py-0.5 rounded-full bg-white text-black font-bold text-[10px]">
                          المدير الرئيسي للمنصة
                        </span>
                      )}
                    </div>

                    {!isRoot && (
                      <button
                        onClick={() => handleRemoveAdmin(email)}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                        title="إزالة صلاحية الإدارة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: APPROVE VERIFICATION & INPUT TROPHIES */}
      {approvingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#12141c] border border-white/20 rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  مراجعة واعتماد طلب توثيق
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  الحساب: {approvingRequest.psnId}
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  {approvingRequest.userEmail} - {approvingRequest.displayName}
                </p>
              </div>
              <button 
                onClick={() => setApprovingRequest(null)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error in modal */}
            {approvalError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{approvalError}</span>
              </div>
            )}

            {/* Step 1: Verify Password from PSN message */}
            <div className="space-y-2 bg-[#161922] p-4 rounded-2xl border border-white/10">
              <label className="block text-xs font-bold text-white flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-white" />
                <span>1. إدخال كلمة السر التي وصلتك من اللاعب في السوني:</span>
              </label>
              <input
                type="text"
                value={inputSecret}
                onChange={(e) => setInputSecret(e.target.value)}
                placeholder="مثال: KC-8492"
                className="w-full bg-[#12141c] border border-white/20 focus:border-white rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-gray-600 focus:outline-none"
              />
              <p className="text-[11px] text-gray-400">
                يقوم النظام بالتحقق الآلي من تطابق كلمة السر هذه مع الكود السري الذي تم إنشاؤه لهذا الحساب.
              </p>
            </div>

            {/* Step 2: Trophy Stats Input (4 fields + Level) */}
            <div className="space-y-3 bg-[#161922] p-4 rounded-2xl border border-white/10">
              <label className="block text-xs font-bold text-white flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-white" />
                <span>2. إدخال إحصائيات التروفي في حسابه بالسوني:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Platinum */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-white">بلاتينيوم 💎</span>
                  <input
                    type="number"
                    min="0"
                    value={trophyInputs.platinum}
                    onChange={(e) => setTrophyInputs({ ...trophyInputs, platinum: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#12141c] border border-white/20 rounded-xl p-2 text-xs text-white font-mono text-center focus:outline-none"
                  />
                </div>

                {/* Gold */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-amber-300">ذهبي 🥇</span>
                  <input
                    type="number"
                    min="0"
                    value={trophyInputs.gold}
                    onChange={(e) => setTrophyInputs({ ...trophyInputs, gold: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#12141c] border border-amber-500/30 rounded-xl p-2 text-xs text-amber-200 font-mono text-center focus:outline-none"
                  />
                </div>

                {/* Silver */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-300">فضي 🥈</span>
                  <input
                    type="number"
                    min="0"
                    value={trophyInputs.silver}
                    onChange={(e) => setTrophyInputs({ ...trophyInputs, silver: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#12141c] border border-slate-300/30 rounded-xl p-2 text-xs text-slate-100 font-mono text-center focus:outline-none"
                  />
                </div>

                {/* Bronze */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-orange-300">برونزي 🥉</span>
                  <input
                    type="number"
                    min="0"
                    value={trophyInputs.bronze}
                    onChange={(e) => setTrophyInputs({ ...trophyInputs, bronze: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#12141c] border border-orange-700/30 rounded-xl p-2 text-xs text-orange-200 font-mono text-center focus:outline-none"
                  />
                </div>
              </div>

              {/* Level Input */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-gray-300">مستوى الحساب في السوني (Level):</span>
                <input
                  type="number"
                  min="1"
                  max="999"
                  value={trophyInputs.level}
                  onChange={(e) => setTrophyInputs({ ...trophyInputs, level: parseInt(e.target.value) || 1 })}
                  className="w-24 bg-[#12141c] border border-white/20 rounded-xl py-1.5 px-3 text-xs text-white font-mono text-center focus:outline-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setApprovingRequest(null)}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>

              <button
                type="button"
                onClick={handleConfirmApproval}
                className="px-6 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Check className="w-4 h-4" />
                <span>تأكيد التوثيق ونشر الحساب بالمتصدرين</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: USER DETAILS */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#12141c] border border-white/20 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-black text-white">{selectedUser.displayName}</h3>
                <p className="text-xs text-gray-400 font-mono">{selectedUser.email}</p>
              </div>
              <button onClick={() => setSelectedUser(null)} className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-gray-400">معرف السوني:</span>
                <span className="font-mono font-bold text-white">{selectedUser.psnId || 'غير متوفر'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-gray-400">حالة التوثيق:</span>
                <span className="font-bold text-white">{selectedUser.isVerified ? 'موثق رسمياً' : 'غير موثق'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-gray-400">تاريخ التسجيل:</span>
                <span className="font-mono text-gray-300">{new Date(selectedUser.createdAt).toLocaleDateString('ar-SA')}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-gray-400">آخر تسجيل دخول:</span>
                <span className="font-mono text-gray-300">{new Date(selectedUser.lastLoginAt).toLocaleString('ar-SA')}</span>
              </div>
              {isSuperAdmin && (
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">كلمة السر السرية:</span>
                  <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">{selectedUser.verificationSecret}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="w-full py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-gray-200"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
