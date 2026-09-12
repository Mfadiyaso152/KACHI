import { useState, FormEvent } from 'react';
import { ShieldCheck, CheckCircle2, UserCheck, Gamepad2, Copy, Check, Sparkles, AlertCircle, Clock, UserPlus } from 'lucide-react';

export function VerificationView() {
  const [psnId, setPsnId] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'checking' | 'submitted'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const verificationBotAccount = 'HamoDyMFB';

  const handleCopyBot = () => {
    navigator.clipboard.writeText(verificationBotAccount);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    if (!psnId.trim()) {
      setErrorMessage('الرجاء إدخال يوزر حسابك في السوني (PSN ID)');
      return;
    }

    setErrorMessage('');
    setVerificationStatus('checking');

    setTimeout(() => {
      setVerificationStatus('submitted');
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>مركز توثيق الحسابات</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white">توثيق حسابك</h1>
        <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto">
          وثق حسابك في السوني للانضمام إلى قائمة أفضل 100 حساب في المملكة.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-[#12141c] border border-white/15 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        
        {verificationStatus === 'submitted' ? (
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white flex items-center justify-center mx-auto text-white">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">تم استلام طلب التوثيق!</h2>
              <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                تم تسجيل يوزر حسابك <strong className="text-white font-mono font-bold">"{psnId}"</strong> بنجاح.
                يرجى التأكد من إضافة الحساب <strong className="text-white font-mono font-bold">{verificationBotAccount}</strong> في السوني، وسيتم التحقق من الحساب وإضافتك لقائمة المتصدرين خلال 24 ساعة.
              </p>
            </div>

            <div className="bg-[#161922] p-6 rounded-2xl border border-white/10 max-w-md mx-auto space-y-3 text-right">
              <div className="flex items-center justify-between text-xs text-gray-400 border-b border-white/5 pb-2">
                <span>يوزر الحساب</span>
                <span className="text-white font-bold font-mono">{psnId}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400 border-b border-white/5 pb-2">
                <span>حساب التحقق المطلوب إضافته</span>
                <span className="text-white font-bold font-mono">{verificationBotAccount}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>وقت المراجعة والتحقق</span>
                <span className="text-gray-300 font-bold">خلال 24 ساعة</span>
              </div>
            </div>

            <button
              onClick={() => {
                setVerificationStatus('idle');
                setPsnId('');
              }}
              className="px-8 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors"
            >
              توثيق حساب آخر
            </button>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-8">
            
            {/* 3 Steps */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-white" />
                <span>خطوات التوثيق (3 خطوات فقط):</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Step 1 */}
                <div className="bg-[#161922] p-5 rounded-2xl border border-white/10 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 text-white font-bold flex items-center justify-center text-sm">
                    1
                  </div>
                  <h4 className="font-bold text-white text-sm">إدخال يوزر حسابك</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    اكتب يوزر حسابك بالسوني (PSN ID) في الخانة بالأسفل بدقة.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-[#161922] p-5 rounded-2xl border border-white/10 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 text-white font-bold flex items-center justify-center text-sm">
                    2
                  </div>
                  <h4 className="font-bold text-white text-sm">إضافة الحساب بالسوني</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    أضف هذا الحساب في جهاز السوني:
                  </p>
                  
                  <div className="flex items-center justify-between bg-black/50 p-2 rounded-xl border border-white/10 font-mono text-xs text-white">
                    <span className="font-bold">{verificationBotAccount}</span>
                    <button
                      type="button"
                      onClick={handleCopyBot}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-[11px] font-sans"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>تم</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>نسخ</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-[#161922] p-5 rounded-2xl border border-white/10 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 text-white font-bold flex items-center justify-center text-sm">
                    3
                  </div>
                  <h4 className="font-bold text-white text-sm">الانتظار 24 ساعة</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    انتظر 24 ساعة لتأكيد إضافة الحساب وإدراجك في قائمة المتصدرين.
                  </p>
                </div>

              </div>
            </div>

            {/* Input Form */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  يوزر حسابك بالسوني (PSN ID)
                </label>
                <div className="relative">
                  <Gamepad2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="أدخل PSN ID الخاص بك..."
                    value={psnId}
                    onChange={(e) => setPsnId(e.target.value)}
                    className="w-full bg-[#161922] border border-white/15 focus:border-white/40 rounded-2xl pr-12 pl-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={verificationStatus === 'checking'}
                className="w-full py-4 rounded-2xl bg-white hover:bg-gray-200 text-black font-black text-base transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {verificationStatus === 'checking' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>جاري إرسال طلب التوثيق...</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-5 h-5" />
                    <span>تأكيد التوثيق</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
}
