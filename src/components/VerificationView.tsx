import { useState, FormEvent } from 'react';
import { 
  ShieldCheck, 
  Gamepad2, 
  Copy, 
  Check, 
  AlertCircle, 
  LogIn, 
  KeyRound, 
  Send,
  Sparkles,
  Info
} from 'lucide-react';
import { User } from '../lib/firebase';
import { submitVerificationRequest, getStoredRequests, getUserSecret } from '../lib/adminStore';

interface VerificationViewProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  isVerified?: boolean;
}

export function VerificationView({ currentUser, onOpenAuth, isVerified }: VerificationViewProps) {
  const [psnId, setPsnId] = useState('');
  const [isCopiedAccount, setIsCopiedAccount] = useState(false);
  const [isCopiedSecret, setIsCopiedSecret] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // The admin PSN account the user must add as requested
  const adminPsnAccount = 'HamoDyMFB';

  const userEmail = currentUser?.email || '';
  const existingReq = userEmail ? getStoredRequests().find(r => r.userEmail.toLowerCase() === userEmail.toLowerCase()) : null;

  // The user's unique random secret password
  const userSecret = userEmail ? getUserSecret(userEmail) : 'KC-XXXX';

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(adminPsnAccount);
    setIsCopiedAccount(true);
    setTimeout(() => setIsCopiedAccount(false), 2000);
  };

  const handleCopySecret = () => {
    navigator.clipboard.writeText(userSecret);
    setIsCopiedSecret(true);
    setTimeout(() => setIsCopiedSecret(false), 2000);
  };

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      onOpenAuth();
      return;
    }

    if (!psnId.trim()) {
      setErrorMessage('الرجاء إدخال معرف حسابك في السوني (PSN ID)');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      submitVerificationRequest(
        {
          email: currentUser.email || '',
          displayName: currentUser.displayName || currentUser.email?.split('@')[0] || '',
          uid: currentUser.uid
        },
        psnId.trim()
      );
      setIsSubmitting(false);
      setSuccessMessage('تم إرسال طلبك بنجاح! يرجى إرسال كلمة السر الموضحة أدناه عبر رسائل السوني لحساب المنصة لإتمام التوثيق.');
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>مركز توثيق الحسابات</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white">توثيق حسابك في السوني</h1>
        <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto">
          اربط ووثق حسابك في السوني للانضمام لقائمة المتصدرين وتحديث إحصائيات تروفياتك الرسمية.
        </p>
      </div>

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
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 font-bold text-xs transition-all cursor-pointer shadow-lg flex-shrink-0"
          >
            <LogIn className="w-4 h-4" />
            <span>تسجيل الدخول الآن</span>
          </button>
        </div>
      )}

      {/* Verification Steps Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Step 1: Add Admin PSN */}
        <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
              الخطوة 1
            </span>
            <Gamepad2 className="w-4 h-4 text-gray-400" />
          </div>
          <h4 className="text-sm font-bold text-white">إضافة حساب المنصة</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            أضف حساب المدير في السوني كصديق:
          </p>
          <div className="flex items-center justify-between bg-black/60 p-2.5 rounded-xl border border-white/10 font-mono">
            <span className="text-sm font-bold text-white">{adminPsnAccount}</span>
            <button
              onClick={handleCopyAccount}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              title="نسخ معرف السوني"
            >
              {isCopiedAccount ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
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
                  placeholder="مثال: SaudiGamer_99"
                  disabled={!currentUser}
                  className="w-full bg-[#161922] border border-white/15 focus:border-white/40 rounded-xl pr-10 pl-4 py-3 text-sm text-white font-mono placeholder-gray-500 focus:outline-none transition-all disabled:opacity-50"
                />
              </div>
              {errorMessage && (
                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errorMessage}</span>
                </p>
              )}
              {successMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 mt-3 flex items-start gap-2">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{successMessage}</span>
                </div>
              )}
            </div>

            {/* Note about secret code */}
            {currentUser && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Info className="w-4 h-4 text-white" />
                  <span>تذكير بخصوص كلمة السر الخاصة بك:</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  كلمة السر المخصصة لك هي: <strong className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">{userSecret}</strong>. 
                  قم بإرسالها في رسالة خاصة لحساب السوني <strong className="text-white font-mono">{adminPsnAccount}</strong> حتى تتأكد الإدارة أن الحساب يعود لك حصراً.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-white text-black hover:bg-gray-200 font-black text-sm transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 text-black" />
                  <span>
                    {!currentUser ? 'تسجيل الدخول لبدء التوثيق' : 'إرسال طلب التوثيق'}
                  </span>
                </>
              )}
            </button>
          </form>
        )}

      </div>

    </div>
  );
}
