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
  Sparkles
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
  isUserAdmin
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

  // Super Admin Check (only the owner mfb.15.f@gmail.com can see generated password and manage admins)
  const isSuperAdmin = currentUserEmail?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  const hasAdminAccess = isUserAdmin(currentUserEmail);

  const loadData = () => {
    setUsers(getStoredUsers());
    setRequests(getStoredRequests());
    setAdminEmails(getAdminEmails());
  };

  useEffect(() => {
    loadData();
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
    const result = toggleUserBan(user.uid);
    if (result.success) {
      loadData();
      if (selectedUser?.uid === user.uid) {
        setSelectedUser(prev => prev ? { ...prev, isBanned: result.isBanned } : null);
      }
      triggerNotice('success', result.isBanned ? `تم حظر ${user.displayName || user.email}` : `تم فك حظر ${user.displayName || user.email}`);
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
    if (!confirm(`هل أنت متأكد من إزالة صلاحية الإدارة عن ${email}؟`)) return;
    const res = removeAdminEmail(email);
    if (res.success) {
      loadData();
      triggerNotice('success', res.message);
    } else {
      triggerNotice('error', res.message);
    }
  };

  if (!hasAdminAccess) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-[#12141c] border border-white/10 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">منطقة الإدارة</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            هذه المنطقة مقتصرة على مديري المنصة المعتمدين.
          </p>
        </div>
      </div>
    );
  }

  // Filtered Users List
  const filteredUsers = users.filter(u => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      u.email.toLowerCase().includes(q) ||
      (u.psnId && u.psnId.toLowerCase().includes(q)) ||
      u.displayName.toLowerCase().includes(q)
    );
  });

  const pendingRequests = requests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-8 pb-20">
      
      {/* Toast Notice */}
      {actionNotice && (
        <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-2 max-w-xl mx-auto shadow-xl transition-all ${
          actionNotice.type === 'success' 
            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' 
            : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
        }`}>
          {actionNotice.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{actionNotice.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white border border-white/15 text-xs font-bold font-mono mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>لوحة تحكم إدارة كاتشي KACHI</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white">لوحة الإدارة</h1>
          <p className="text-xs text-gray-400 mt-1">
            إدارة طلبات التوثيق بالسوني، استعراض المستخدمين، وإدارة فريق العمل.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-[#12141c] p-1.5 rounded-2xl border border-white/10 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'requests' 
                ? 'bg-white text-black shadow-md' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>طلبات التوثيق</span>
            {pendingRequests.length > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                activeTab === 'requests' ? 'bg-black text-white' : 'bg-emerald-500 text-black'
              }`}>
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'users' 
                ? 'bg-white text-black shadow-md' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>المستخدمين ({users.length})</span>
          </button>

          {isSuperAdmin && (
            <button
              onClick={() => setActiveTab('admins')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'admins' 
                  ? 'bg-white text-black shadow-md' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>الإدارة ({adminEmails.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* SECTION 1: طلبات التوثيق (VERIFICATION REQUESTS) */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          <div className="bg-[#12141c] border border-white/15 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-white" />
                <span>طلبات التوثيق المعلقة والمراجعة</span>
              </h2>
              <span className="text-xs text-gray-400 font-mono">
                {requests.length} طلبات إجمالاً
              </span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              يقوم اللاعب بإضافة حساب السوني <strong className="text-white font-mono">HamoDyMFB</strong> وإرسال كلمة السر العشوائية. 
              عند تأكيد الطلب، يجب إدخال كلمة السر التي أرسلها اللاعب عبر السوني مع إرفاق خانات التروفيات الأربع.
              {isSuperAdmin && (
                <span className="block mt-1 text-emerald-400 font-bold">
                  (بصفتك مدير النظام الرئيسي، يمكنك الاطلاع على كلمات السر التوليدية للتأكد).
                </span>
              )}
            </p>

            {requests.length > 0 ? (
              <div className="divide-y divide-white/5">
                {requests.map(req => {
                  const isPending = req.status === 'pending';
                  return (
                    <div key={req.id} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base font-black text-white font-mono">
                            {req.psnId}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            req.status === 'approved' 
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                              : req.status === 'rejected'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {req.status === 'approved' ? 'موثق ومعتمد' : req.status === 'rejected' ? 'مرفوض' : 'قيد الانتظار'}
                          </span>
                        </div>

                        <div className="text-xs text-gray-400 flex items-center gap-3 flex-wrap">
                          <span>الاسم: <strong className="text-gray-200">{req.displayName}</strong></span>
                          <span>البريد: <strong className="text-gray-200">{req.userEmail}</strong></span>
                          <span>الوقت: <strong className="text-gray-200">{new Date(req.requestedAt).toLocaleDateString('ar-SA')}</strong></span>
                        </div>

                        {/* Super Admin view of secret */}
                        {isSuperAdmin && (
                          <div className="text-xs text-emerald-300 font-mono bg-emerald-950/30 border border-emerald-500/20 px-2 py-1 rounded inline-block">
                            كلمة السر المولدة للمستخدم: <strong>{req.verificationSecret}</strong>
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {isPending ? (
                          <>
                            <button
                              onClick={() => openApprovalModal(req)}
                              className="px-4 py-2 rounded-xl bg-white text-black hover:bg-gray-200 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                            >
                              <Check className="w-4 h-4 text-black" />
                              <span>تأكيد وقبول التوثيق</span>
                            </button>
                            <button
                              onClick={() => handleReject(req)}
                              className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 font-bold text-xs transition-colors cursor-pointer"
                            >
                              رفض
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => openApprovalModal(req)}
                            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-bold transition-colors cursor-pointer"
                          >
                            تعديل التروفيات
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-gray-400">
                لا توجد طلبات توثيق مسجلة حالياً.
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 2: المستخدمين (USERS LIST & SEARCH) */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="bg-[#12141c] border border-white/15 rounded-3xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-white" />
                  <span>دليل المستخدمين المسجلين في المنصة</span>
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  اضغط على أي مستخدم للاطلاع على بياناته وتفاصيل حسابه.
                </p>
              </div>

              {/* Search by PSN ID or Email */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="بحث بمعرف السوني أو الإيميل..."
                  className="w-full bg-[#161922] border border-white/15 focus:border-white/40 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all font-mono"
                />
              </div>
            </div>

            {/* Users List */}
            <div className="divide-y divide-white/5">
              {filteredUsers.map((user) => {
                const hasRequested = requests.some(r => r.userEmail.toLowerCase() === user.email.toLowerCase());

                return (
                  <div
                    key={user.uid}
                    onClick={() => setSelectedUser(user)}
                    className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/[0.02] p-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center font-bold text-white flex-shrink-0">
                        {user.displayName?.[0] || 'U'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-white">
                            {user.displayName}
                          </span>
                          {user.psnId && (
                            <span className="text-xs font-mono text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                              PSN: {user.psnId}
                            </span>
                          )}
                          {user.isVerified && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              موثق
                            </span>
                          )}
                          {user.role === 'admin' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-black">
                              إدارة
                            </span>
                          )}
                          {user.isBanned && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              محظور
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 font-mono">
                          {user.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{hasRequested ? 'أرسل طلب توثيق' : 'لم يطلب توثيق'}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(user);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors cursor-pointer"
                      >
                        عرض التفاصيل
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: الإدارة (ADMIN MANAGEMENT) */}
      {activeTab === 'admins' && isSuperAdmin && (
        <div className="space-y-6">
          <div className="bg-[#12141c] border border-white/15 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-white" />
                <span>إدارة فريق الإدارة وصلاحيات المنصة</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                يمكنك إضافة بريد إلكتروني لترقيته إلى مدير. يشترط أن يكون صاحب البريد قد سجل دخوله للمنصة مسبقاً.
              </p>
            </div>

            {/* Add Admin Form */}
            <form onSubmit={handleAddAdmin} className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <input
                type="email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="أدخل البريد الإلكتروني للمدير الجديد..."
                className="flex-1 bg-[#161922] border border-white/15 focus:border-white/40 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-all font-mono"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-white text-black hover:bg-gray-200 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة كمدير</span>
              </button>
            </form>

            {/* Admin list */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                المديرون الحاليون ({adminEmails.length})
              </h3>
              <div className="divide-y divide-white/5 border border-white/10 rounded-2xl overflow-hidden bg-[#161922]">
                {adminEmails.map((email) => {
                  const isMainAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
                  return (
                    <div key={email} className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-white">{email}</span>
                        {isMainAdmin && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-black">
                            مدير النظام الرئيسي (Owner)
                          </span>
                        )}
                      </div>
                      {!isMainAdmin && (
                        <button
                          onClick={() => handleRemoveAdmin(email)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                          title="إزالة الإدارة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>إزالة</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 1: USER DETAILS MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedUser(null)} />
          <div className="relative bg-[#12141c] border border-white/20 rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 z-10 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-white">
                  {selectedUser.displayName?.[0] || 'U'}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedUser.displayName}</h3>
                  <p className="text-xs text-gray-400 font-mono">{selectedUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-[#161922] border border-white/10">
                <span className="text-gray-400">اسم حساب السوني (PSN ID):</span>
                <strong className="text-white font-mono">{selectedUser.psnId || 'لم يُربط بعد'}</strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-[#161922] border border-white/10">
                <span className="text-gray-400">تاريخ التسجيل:</span>
                <strong className="text-white">
                  {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString('ar-SA') : 'غير متوفر'}
                </strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-[#161922] border border-white/10">
                <span className="text-gray-400">آخر تسجيل دخول:</span>
                <strong className="text-white">
                  {selectedUser.lastLoginAt ? new Date(selectedUser.lastLoginAt).toLocaleString('ar-SA') : 'غير متوفر'}
                </strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-[#161922] border border-white/10">
                <span className="text-gray-400">هل أرسل طلب توثيق؟:</span>
                <strong className="text-white">
                  {requests.some(r => r.userEmail.toLowerCase() === selectedUser.email.toLowerCase()) ? 'نعم، مسجل في الطلبات' : 'لا'}
                </strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-[#161922] border border-white/10">
                <span className="text-gray-400">حالة التوثيق:</span>
                <strong className={selectedUser.isVerified ? 'text-emerald-400' : 'text-amber-400'}>
                  {selectedUser.isVerified ? 'حساب موثق رسمي' : 'غير موثق'}
                </strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-[#161922] border border-white/10">
                <span className="text-gray-400">الرتبة في المنصة:</span>
                <strong className="text-white">{selectedUser.role === 'admin' ? 'مدير' : 'لاعب'}</strong>
              </div>

              {/* Secret code visible to super admin */}
              {isSuperAdmin && (
                <div className="flex justify-between p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 font-mono">
                  <span>كلمة السر المولدة:</span>
                  <strong>{selectedUser.verificationSecret || 'غير منشأة'}</strong>
                </div>
              )}
            </div>

            {/* Actions: Ban / Unban */}
            <div className="pt-3 border-t border-white/10 flex justify-between gap-3">
              <button
                onClick={() => handleToggleBan(selectedUser)}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                  selectedUser.isBanned 
                    ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30' 
                    : 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                }`}
              >
                {selectedUser.isBanned ? 'فك حظر اللاعب' : 'حظر اللاعب'}
              </button>
              <button
                onClick={() => setSelectedUser(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: APPROVE VERIFICATION & ENTER 4 TROPHY COUNTS */}
      {approvingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setApprovingRequest(null)} />
          <div className="relative bg-[#12141c] border border-white/20 rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 z-10 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-black text-white">تأكيد توثيق حساب السوني</h3>
                <p className="text-xs text-gray-400 font-mono">PSN: {approvingRequest.psnId}</p>
              </div>
              <button
                onClick={() => setApprovingRequest(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {approvalError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{approvalError}</span>
              </div>
            )}

            {/* Secret confirmation input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300">
                كلمة السر المرسلة من اللاعب في السوني:
              </label>
              <div className="relative">
                <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={inputSecret}
                  onChange={(e) => setInputSecret(e.target.value)}
                  placeholder="مثال: KC-4921"
                  className="w-full bg-[#161922] border border-white/20 focus:border-white/40 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white font-mono placeholder-gray-500 focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-gray-400">
                تحقق من رسائل حساب السوني الخاص بك وتأكد من مطابقة الرمز الذي أرسله اللاعب.
              </p>
            </div>

            {/* 4 Trophy Fields + Level */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-white" />
                <span>إرفاق عدد التروفيات الرسمية الصحيحة الموجودة بالحساب:</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Platinum */}
                <div className="p-3 rounded-xl bg-[#161922] border border-white/10 space-y-1">
                  <label className="text-[11px] font-bold text-gray-300 block">
                    عدد البلاتينيوم:
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={trophyInputs.platinum}
                    onChange={(e) => setTrophyInputs(prev => ({ ...prev, platinum: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-1.5 text-sm text-white font-mono focus:outline-none"
                  />
                </div>

                {/* Gold */}
                <div className="p-3 rounded-xl bg-[#161922] border border-amber-500/20 space-y-1">
                  <label className="text-[11px] font-bold text-amber-300 block">
                    عدد الذهب:
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={trophyInputs.gold}
                    onChange={(e) => setTrophyInputs(prev => ({ ...prev, gold: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-1.5 text-sm text-amber-200 font-mono focus:outline-none"
                  />
                </div>

                {/* Silver */}
                <div className="p-3 rounded-xl bg-[#161922] border border-slate-400/20 space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 block">
                    عدد الفضة:
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={trophyInputs.silver}
                    onChange={(e) => setTrophyInputs(prev => ({ ...prev, silver: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-1.5 text-sm text-slate-100 font-mono focus:outline-none"
                  />
                </div>

                {/* Bronze */}
                <div className="p-3 rounded-xl bg-[#161922] border border-orange-700/20 space-y-1">
                  <label className="text-[11px] font-bold text-orange-300 block">
                    عدد البرونز:
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={trophyInputs.bronze}
                    onChange={(e) => setTrophyInputs(prev => ({ ...prev, bronze: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-1.5 text-sm text-orange-200 font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Level */}
              <div className="p-3 rounded-xl bg-[#161922] border border-white/10 space-y-1">
                <label className="text-[11px] font-bold text-gray-300 block">
                  مستوى التروفي بالسوني (PSN Level):
                </label>
                <input
                  type="number"
                  min="1"
                  value={trophyInputs.level}
                  onChange={(e) => setTrophyInputs(prev => ({ ...prev, level: parseInt(e.target.value) || 1 }))}
                  className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-1.5 text-sm text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            {/* Confirm buttons */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleConfirmApproval}
                className="flex-1 py-3 rounded-xl bg-white text-black hover:bg-gray-200 font-black text-xs transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4 text-black" />
                <span>تأكيد التوثيق والإدراج بالمتصدرين</span>
              </button>
              <button
                type="button"
                onClick={() => setApprovingRequest(null)}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold transition-colors cursor-pointer"
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
