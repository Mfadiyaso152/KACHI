import { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  Lock, 
  RefreshCw,
  Construction,
  Check
} from 'lucide-react';
import { 
  ADMIN_EMAIL, 
  getStoredUsers, 
  getStoredRequests, 
  toggleUserBan, 
  toggleUserVerification, 
  approveVerificationRequest, 
  rejectVerificationRequest 
} from '../lib/adminStore';
import { AppUserAccount, VerificationRequest } from '../types';

interface AdminDashboardViewProps {
  currentUserEmail?: string | null;
}

export function AdminDashboardView({ currentUserEmail }: AdminDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'users' | 'requests'>('users');
  const [users, setUsers] = useState<AppUserAccount[]>([]);
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'unverified' | 'banned'>('all');
  const [requestFilter, setRequestFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const isAdmin = currentUserEmail?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const loadData = () => {
    setUsers(getStoredUsers());
    setRequests(getStoredRequests());
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleToggleBan = (user: AppUserAccount) => {
    if (user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      alert('لا يمكن حظر حساب المدير العام.');
      return;
    }
    const result = toggleUserBan(user.uid);
    if (result.success) {
      loadData();
      triggerNotice(result.isBanned ? `تم حظر اللاعب ${user.displayName || user.email}` : `تم فك حظر اللاعب ${user.displayName || user.email}`);
    }
  };

  const handleToggleVerify = (user: AppUserAccount) => {
    const result = toggleUserVerification(user.uid);
    if (result.success) {
      loadData();
      triggerNotice(result.isVerified ? `تم توثيق حساب اللاعب ${user.displayName || user.email} بنجاح` : `تم إلغاء توثيق اللاعب ${user.displayName || user.email}`);
    }
  };

  const handleApproveRequest = (req: VerificationRequest) => {
    const success = approveVerificationRequest(req.id);
    if (success) {
      loadData();
      triggerNotice(`تم قبول طلب توثيق الحساب ${req.psnId} بنجاح`);
    }
  };

  const handleRejectRequest = (req: VerificationRequest) => {
    const reason = prompt('سبب رفض الطلب (اختياري):', 'لم يتم العثور على طلب الإضافة في السوني أو الحساب غير مطابق');
    if (reason === null) return;
    const success = rejectVerificationRequest(req.id, reason);
    if (success) {
      loadData();
      triggerNotice(`تم رفض طلب التوثيق للحساب ${req.psnId}`);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-[#12141c] border border-white/10 rounded-3xl p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">منطقة الإدارة</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            هذه اللوحة مخصصة فقط لمدير المنصة ({ADMIN_EMAIL}).
          </p>
        </div>
      </div>
    );
  }

  // Filter users
  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      (u.displayName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.psnId || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' ? true :
      statusFilter === 'verified' ? u.isVerified :
      statusFilter === 'unverified' ? !u.isVerified :
      statusFilter === 'banned' ? u.isBanned : true;

    return matchesSearch && matchesStatus;
  });

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    const matchesSearch = 
      r.psnId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.displayName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      requestFilter === 'all' ? true :
      r.status === requestFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-8 pb-20">
      
      {/* Experimental/Beta Notice: Page Disabled in Beta */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <Construction className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>لوحة الإدارة (تجريبية)</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-white text-black font-bold">
                غير مفعلة حالياً
              </span>
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              صفحة إدارة اللاعبين والتوثيق معلقة أثناء الفترة التجريبية الحالية للموقع.
            </div>
          </div>
        </div>
      </div>

      {/* Header - White Theme Only (No Gold/Amber) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>لوحة التحكم الإدارية</span>
          </div>
          <h1 className="text-3xl font-black text-white">إدارة اللاعبين والتوثيق</h1>
          <p className="text-xs text-gray-400">
            المدير المسجل: <span className="text-white font-mono">{ADMIN_EMAIL}</span>
          </p>
        </div>

        <button
          onClick={loadData}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 hover:text-white transition-all self-start md:self-auto cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>تحديث البيانات</span>
        </button>
      </div>

      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="p-4 rounded-2xl bg-white/10 border border-white/20 text-white text-sm font-bold flex items-center gap-3 animate-fade-in shadow-lg">
          <Check className="w-5 h-5 text-white flex-shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Navigation Tabs - Clean White Aesthetic */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
            activeTab === 'users'
              ? 'bg-white text-black shadow-lg'
              : 'bg-white/5 text-gray-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>قائمة المستخدمين واللاعبين ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('requests')}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all relative cursor-pointer ${
            activeTab === 'requests'
              ? 'bg-white text-black shadow-lg'
              : 'bg-white/5 text-gray-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>طلبات التوثيق</span>
          {pendingCount > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
              activeTab === 'requests' ? 'bg-black text-white' : 'bg-white text-black'
            }`}>
              {pendingCount} جديد
            </span>
          )}
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#12141c] p-4 rounded-2xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={activeTab === 'users' ? 'بحث بالاسم أو الإيميل...' : 'بحث في طلبات التوثيق...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#161922] border border-white/10 focus:border-white/30 rounded-xl pr-10 pl-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
          />
        </div>

        {activeTab === 'users' ? (
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'all' ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              الكل ({users.length})
            </button>
            <button
              onClick={() => setStatusFilter('verified')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'verified' ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              موثقين ({users.filter(u => u.isVerified).length})
            </button>
            <button
              onClick={() => setStatusFilter('unverified')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'unverified' ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              غير موثقين ({users.filter(u => !u.isVerified).length})
            </button>
            <button
              onClick={() => setStatusFilter('banned')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'banned' ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              محظورين ({users.filter(u => u.isBanned).length})
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setRequestFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                requestFilter === 'all' ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              الكل ({requests.length})
            </button>
            <button
              onClick={() => setRequestFilter('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                requestFilter === 'pending' ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              قيد الانتظار ({pendingCount})
            </button>
            <button
              onClick={() => setRequestFilter('approved')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                requestFilter === 'approved' ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              المقبولة ({requests.filter(r => r.status === 'approved').length})
            </button>
            <button
              onClick={() => setRequestFilter('rejected')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                requestFilter === 'rejected' ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              المرفوضة ({requests.filter(r => r.status === 'rejected').length})
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: USERS LIST */}
      {activeTab === 'users' && (
        <div className="bg-[#12141c] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#161922] text-xs text-gray-400 font-semibold">
                  <th className="p-4">اللاعب / المستخدم</th>
                  <th className="p-4">معرف السوني (PSN ID)</th>
                  <th className="p-4">حالة التوثيق</th>
                  <th className="p-4">حالة الحساب</th>
                  <th className="p-4">تاريخ الانضمام</th>
                  <th className="p-4 text-center">إجراءات الإدارة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredUsers.map((user) => {
                  const isRootAdmin = user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

                  return (
                    <tr key={user.uid} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {user.photoURL ? (
                            <img 
                              src={user.photoURL} 
                              alt={user.displayName} 
                              className="w-10 h-10 rounded-full object-cover border border-white/10" 
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white">
                              {user.displayName?.[0] || 'U'}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span>{user.displayName || 'بدون اسم'}</span>
                              {isRootAdmin && (
                                <span className="px-1.5 py-0.5 rounded bg-white/20 text-white text-[10px] font-mono">
                                  ADMIN
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-gray-400 font-mono">{user.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-mono font-bold text-gray-200">
                        {user.psnId ? (
                          <span className="bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
                            {user.psnId}
                          </span>
                        ) : (
                          <span className="text-gray-500 font-normal">لم يربط بعد</span>
                        )}
                      </td>

                      <td className="p-4">
                        {user.isVerified ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white font-bold text-[11px]">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>موثق</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[11px]">
                            <span>غير موثق</span>
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        {user.isBanned ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300 font-bold text-[11px]">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span>محظور</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-[11px]">
                            <span>نشط</span>
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-gray-400 font-mono text-[11px]">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('ar-SA') : '2026/03/10'}
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleToggleVerify(user)}
                            className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all cursor-pointer ${
                              user.isVerified
                                ? 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                                : 'bg-white text-black hover:bg-gray-200 shadow-md'
                            }`}
                          >
                            {user.isVerified ? 'إلغاء التوثيق' : 'توثيق الحساب'}
                          </button>

                          {!isRootAdmin && (
                            <button
                              onClick={() => handleToggleBan(user)}
                              className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all cursor-pointer ${
                                user.isBanned
                                  ? 'bg-white text-black hover:bg-gray-200'
                                  : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
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
      )}

      {/* TAB 2: VERIFICATION REQUESTS */}
      {activeTab === 'requests' && (
        <div className="bg-[#12141c] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#161922] text-xs text-gray-400 font-semibold">
                  <th className="p-4">اللاعب / الإيميل</th>
                  <th className="p-4">معرف السوني المطلوب توثيقه</th>
                  <th className="p-4">تاريخ الطلب</th>
                  <th className="p-4">حالة الطلب</th>
                  <th className="p-4 text-center">الإجراء الإداري</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white">{req.displayName}</div>
                      <div className="text-[11px] text-gray-400 font-mono">{req.userEmail}</div>
                    </td>

                    <td className="p-4">
                      <span className="font-mono font-bold text-white bg-black/40 px-3 py-1.5 rounded-xl border border-white/15">
                        {req.psnId}
                      </span>
                    </td>

                    <td className="p-4 text-gray-400 font-mono text-[11px]">
                      {new Date(req.requestedAt).toLocaleString('ar-SA')}
                    </td>

                    <td className="p-4">
                      {req.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white font-bold text-[11px] border border-white/20">
                          قيد المراجعة
                        </span>
                      )}
                      {req.status === 'approved' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white font-bold text-[11px] border border-white/20">
                          تم القبول
                        </span>
                      )}
                      {req.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-gray-400 font-bold text-[11px] border border-white/10">
                          مرفوض
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-center">
                      {req.status === 'pending' ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleApproveRequest(req)}
                            className="px-3 py-1.5 rounded-xl bg-white text-black hover:bg-gray-200 font-bold text-[11px] transition-all cursor-pointer shadow-md"
                          >
                            قبول وتوثيق
                          </button>
                          <button
                            onClick={() => handleRejectRequest(req)}
                            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-[11px] transition-all cursor-pointer border border-white/10"
                          >
                            رفض
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-[11px]">تم اتخاذ الإجراء</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
