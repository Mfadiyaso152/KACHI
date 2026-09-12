import { ShieldAlert, LogIn, ShieldCheck, ArrowLeft, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProtectedAccessViewProps {
  type: 'auth_required' | 'verification_required' | 'banned';
  title?: string;
  message?: string;
  onOpenAuth?: () => void;
}

export function ProtectedAccessView({
  type,
  title,
  message,
  onOpenAuth
}: ProtectedAccessViewProps) {
  const navigate = useNavigate();

  if (type === 'banned') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-xl w-full bg-[#12141c] border border-rose-500/30 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-500">
            <ShieldAlert className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-black text-white">
              تم حظر هذا الحساب
            </h1>
            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
              عذراً، تم حظر حسابك من قبل إدارة منصة كاتشي لمخالفة الشروط أو القوانين. لا يمكنك الوصول إلى الخدمات المقيدة.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/games')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>تصفح تروفيات الألعاب المتاحة للجميع</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'auth_required') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-xl w-full bg-[#12141c] border border-white/15 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden space-y-6">
          
          <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-white">
            <LogIn className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/10">
              <span>تسجيل الدخول مطلوب</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              {title || 'يرجى تسجيل الدخول أولاً'}
            </h1>
            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
              {message || 'هذه الخدمة تتطلب أن يكون لديك حساب مسجل في منصة كاتشي، يرجى تسجيل الدخول عبر Google أو Microsoft للمتابعة.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {onOpenAuth && (
              <button
                onClick={onOpenAuth}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white hover:bg-gray-200 text-black font-black text-sm transition-all shadow-md cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>تسجيل الدخول الآن</span>
              </button>
            )}

            <button
              onClick={() => navigate('/games')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm transition-all cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>تصفح تروفيات الألعاب</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // verification_required
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full bg-[#12141c] border border-white/15 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden space-y-6">
        
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-400">
          <ShieldCheck className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
            <span>توثيق الحساب مطلوب</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            {title || 'هذه الخدمة تتطلب حساباً موثقاً'}
          </h1>
          <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            {message || 'للمحافظة على مصداقية المنصة، تتطلب كافة الخدمات (مثل لوحة المتصدرين وتتبع التروفيات) ربط وتوثيق حسابك بالسوني. يمكنك تقديم طلب التوثيق الآن بسهولة.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/verify')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white hover:bg-gray-200 text-black font-black text-sm transition-all shadow-md cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>الذهاب لتوثيق حسابك</span>
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/games')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm transition-all cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>تصفح الألعاب فقط</span>
          </button>
        </div>

      </div>
    </div>
  );
}
