import { useState, FormEvent } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Gamepad2, 
  Copy, 
  Check, 
  AlertCircle, 
  LogIn,
  Construction,
  Clock
} from 'lucide-react';
import { User } from '../lib/firebase';
import { submitVerificationRequest, getStoredRequests } from '../lib/adminStore';

interface VerificationViewProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  isVerified?: boolean;
}

export function VerificationView({ currentUser, onOpenAuth, isVerified }: VerificationViewProps) {
  const [psnId, setPsnId] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'checking' | 'submitted'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const verificationBotAccount = 'HamoDyMFB';

  const userEmail = currentUser?.email || '';
  const existingReq = userEmail ? getStoredRequests().find(r => r.userEmail.toLowerCase() === userEmail.toLowerCase()) : null;

  const handleCopyBot = () => {
    navigator.clipboard.writeText(verificationBotAccount);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();

    // If user is not logged in, trigger login modal
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    if (!psnId.trim()) {
      setErrorMessage('الرجاء إدخال معرف حسابك في السوني (PSN ID)');
      return;
    }

    setErrorMessage('');
    setVerificationStatus('checking');

    setTimeout(() => {
      submitVerificationRequest(
        {
          email: currentUser.email || '',
          displayName: currentUser.displayName || currentUser.email?.split('@')[0] || '',
          uid: currentUser.uid
        },
        psnId.trim()
      );
      setVerificationStatus('submitted');
    }, 900);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      
      {/* Experimental/Beta Notice Banner: Page Inactive */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <Construction className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>صفحة توثيق الحساب (قيد التطوير والتجربة)</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-white text-black font-bold">
                غير مفعلة حالياً
              </span>
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              خدمة توثيق الحسابات معلقة حالياً لحين انتهاء النسخة التجريبية للموقع.
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>مركز توثيق الحسابات</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white">توثيق حسابك</h1>
        <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto">
          اربط ووثق حسابك في السوني للانضمام لقائمة المتصدرين وفتح كافة مزايا المنصة.
        </p>
      </div>

      {/* If Not Logged In Banner with button that triggers Auth modal */}
      {!currentUser && (
        <div className="p-5 rounded-3xl bg-[#12141c] border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-right">
            <h3 className="text-base font-bold text-white">هل تود توثيق حسابك؟</h3>
            <p className="text-xs text-gray-400">
              يتطلب التوثيق تسجيل الدخول أولاً للربط بحسابك.
            </p>
          </div>
          <button
            onClick={onOpenAuth}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 font-bold text-xs transition-all cursor-pointer shadow-lg"
          >
            <LogIn className="w-4 h-4" />
            <span>تسجيل الدخول الآن</span>
          </button>
        </div>
      )}

      {/* Verification Form Card */}
      <div className="bg-[#12141c] border border-white/15 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl opacity-90">
        
        {/* Step 1 & 2 Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#161922] border border-white/10 space-y-2">
            <span className="text-xs font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 inline-block">
              الخطوة 1
            </span>
            <h4 className="text-sm font-bold text-white">إضافة حساب البوت في السوني</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              أرسل طلب صداقة لحساب المنصة الرسمي للتحقق من ملكية الحساب:
            </p>
            <div className="flex items-center justify-between bg-black/50 p-2.5 rounded-xl border border-white/10">
              <span className="font-mono text-sm font-bold text-white tracking-wider">
                {verificationBotAccount}
              </span>
              <button
                type="button"
                onClick={handleCopyBot}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                title="نسخ الحساب"
              >
                {isCopied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#161922] border border-white/10 space-y-2">
            <span className="text-xs font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 inline-block">
              الخطوة 2
            </span>
            <h4 className="text-sm font-bold text-white">إدخال معرّف حسابك (PSN ID)</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              اكتب اسم حسابك الدقيق في PlayStation Network كما يظهر في جهازك.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleVerify} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-2">
              معرّف حساب السوني (PSN Online ID):
            </label>
            <div className="relative">
              <Gamepad2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={psnId}
                onChange={(e) => setPsnId(e.target.value)}
                placeholder="مثال: SaudiGamer_99"
                className="w-full bg-[#161922] border border-white/15 focus:border-white/40 rounded-xl pr-10 pl-4 py-3 text-sm text-white font-mono placeholder-gray-500 focus:outline-none transition-all"
              />
            </div>
            {errorMessage && (
              <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMessage}</span>
              </p>
            )}
          </div>

          {/* Action button: Disabled or redirects to login */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-white text-black hover:bg-gray-200 font-black text-sm transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-black" />
            <span>
              {!currentUser ? 'تسجيل الدخول لتوثيق الحساب' : 'إرسال طلب التوثيق (تجريبي)'}
            </span>
          </button>
        </form>

      </div>

    </div>
  );
}
