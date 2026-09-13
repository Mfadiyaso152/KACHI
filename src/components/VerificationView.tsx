import { useState, useEffect, FormEvent } from 'react';
import { 
  ShieldCheck, 
  Gamepad2, 
  KeyRound, 
  Copy, 
  Check, 
  AlertCircle, 
  Sparkles,
  Info,
  Clock,
  Send,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { User } from '../lib/firebase';
import { 
  submitVerificationRequest, 
  getUserSecret, 
  getStoredRequests, 
  DATA_SYNC_EVENT 
} from '../lib/adminStore';
import { VerificationRequest } from '../types';

interface VerificationViewProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  isVerified?: boolean;
}

export function VerificationView({ currentUser, onOpenAuth, isVerified = false }: VerificationViewProps) {
  const [psnId, setPsnId] = useState('');
  const [isCopiedSecret, setIsCopiedSecret] = useState(false);
  const [isCopiedAdmin, setIsCopiedAdmin] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<VerificationRequest | null>(null);
  const [error, setError] = useState<string | null>(null);

  const adminPsn = 'KachiOfficial';
  const userSecret = currentUser?.email ? getUserSecret(currentUser.email) : 'KC-••••';

  const checkExistingRequest = () => {
    if (!currentUser?.email) return;
    const reqs = getStoredRequests();
    const myReq = reqs.find(r => r.userEmail.toLowerCase() === currentUser.email?.toLowerCase());
    if (myReq) {
      setSubmittedRequest(myReq);
      if (myReq.psnId) setPsnId(myReq.psnId);
    }
  };

  useEffect(() => {
    checkExistingRequest();

    const handleSync = () => {
      checkExistingRequest();
    };

    window.addEventListener(DATA_SYNC_EVENT, handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener(DATA_SYNC_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [currentUser?.email]);

  const handleCopySecret = () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    navigator.clipboard.writeText(userSecret);
    setIsCopiedSecret(true);
    setTimeout(() => setIsCopiedSecret(false), 2000);
  };

  const handleCopyAdmin = () => {
    navigator.clipboard.writeText(adminPsn);
    setIsCopiedAdmin(true);
    setTimeout(() => setIsCopiedAdmin(false), 2000);
  };

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentUser) {
      onOpenAuth();
      return;
    }

    if (!psnId.trim()) {
      setError('يرجى إدخال اسم مستخدم حسابك في شبكة بلايستيشن (PSN ID)');
      return;
    }

    const req = submitVerificationRequest(
      {
        email: currentUser.email || '',
        displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'لاعب',
        uid: currentUser.uid
      },
      psnId.trim()
    );

    setSubmittedRequest(req);
  };

  const existingReq = submittedRequest;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">

      {/* If Not Logged In Banner */}
      {!currentUser && (
        <div className="p-5 rounded-3xl bg-[#12141c] border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center sm:text-right">
            <h3 className="text-base font-bold text-white">هل ترغب في توثيق حسابك؟</h3>
            <p className="text-xs text-gray-400">
              يتطلب التوثيق تسجيل الدخول أولاً للربط بحسابك وتوليد كلمة السر المخصصة لك.
            </p>
          </div>
          <button
            onClick={onOpenAuth}
            className="px-6 py-2.5 rounded-2xl bg-white hover:bg-gray-100 text-black font-bold text-xs transition-all shadow-md cursor-pointer flex-shrink-0"
          >
            تسجيل الدخول الآن
          </button>
        </div>
      )}

      {/* 3 Step Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Step 1: Add Account */}
        <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
              الخطوة 1
            </span>
            <Gamepad2 className="w-4 h-4 text-gray-400" />
          </div>
          <h4 className="text-sm font-bold text-white">إضافة حساب المنصة</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            أضف حساب منصة كاتشي الرسمي على جهاز السوني:
          </p>
          <div className="flex items-center justify-between bg-black/60 p-2.5 rounded-xl border border-white/10 font-mono">
            <span className="text-xs font-bold text-white tracking-wider">{adminPsn}</span>
            <button
              onClick={handleCopyAdmin}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              title="نسخ الحساب"
            >
              {isCopiedAdmin ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Step 2: Send Secret Code */}
        <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
              الخطوة 2
            </span>
            <KeyRound className="w-4 h-4 text-gray-400" />
          </div>
          <h4 className="text-sm font-bold text-white">كلمة السر العشوائية</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            أرسل كلمة السر هذه برسالة لحساب المنصة في السوني:
          </p>
          <div className="flex items-center justify-between bg-black/60 p-2.5 rounded-xl border border-white/10 font-mono">
            <span className="text-sm font-black text-emerald-400 tracking-wider">
              {currentUser ? userSecret : 'KC-••••'}
            </span>
            {currentUser && (
              <button
                onClick={handleCopySecret}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                title="نسخ كلمة السر"
              >
                {isCopiedSecret ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Step 3: Admin Approval */}
        <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
              الخطوة 3
            </span>
            <Sparkles className="w-4 h-4 text-gray-400" />
          </div>
          <h4 className="text-sm font-bold text-white">التأكيد وإدراجك</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            تقوم الإدارة بمطابقة كلمة السر وتأكيد عدد تروفياتك وإدراجك مباشرة في لوحة المتصدرين.
          </p>
        </div>

      </div>

      {/* Verification Form Card */}
      <div className="bg-[#12141c] border border-white/15 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        
        {existingReq?.status === 'approved' || isVerified ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="text-lg font-black text-white">حسابك موثق رسمياً!</h3>
            <p className="text-xs text-emerald-300">
              معرف السوني المعتمد: <strong className="font-mono text-white">{existingReq?.psnId || 'حساب موثق'}</strong>
            </p>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-2">
                معرّف حسابك في السوني (PSN Online ID):
              </label>
              <div className="relative">
                <Gamepad2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={psnId}
                  onChange={(e) => setPsnId(e.target.value)}
                  placeholder="مثال: SonyPlayer_99"
                  disabled={!currentUser}
                  className="w-full pl-4 pr-10 py-3.5 rounded-2xl bg-black/50 border border-white/10 text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs text-rose-300 bg-rose-500/10 border border-rose-500/20 p-3.5 rounded-xl">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Status of pending request */}
            {existingReq?.status === 'pending' && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>طلب التوثيق قيد المراجعة</span>
                    <span className="font-mono text-emerald-400 font-bold">({existingReq.verificationSecret})</span>
                  </div>
                  <p className="text-gray-400">
                    تأكد من إرسال كلمة السر <strong className="font-mono text-emerald-400">{existingReq.verificationSecret}</strong> عبر رسائل السوني إلى الحساب <strong className="font-mono text-white">{adminPsn}</strong>.
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={!currentUser}
              className="w-full py-4 rounded-2xl bg-white hover:bg-gray-100 text-black font-black text-sm transition-all duration-200 shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>
                {existingReq?.status === 'pending' ? 'تحديث وتأكيد إرسال الطلب' : 'إرسال طلب التوثيق للإدارة'}
              </span>
            </button>
          </form>
        )}

      </div>

    </div>
  );
}
