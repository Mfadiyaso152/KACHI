import { useNavigate } from 'react-router-dom';
import { Award, ShieldCheck, ArrowLeft, Users, Sparkles, Trophy } from 'lucide-react';

export function LeaderboardView() {
  const navigate = useNavigate();

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold">
          <Award className="w-4 h-4 text-white" />
          <span>لوحة الشرف الوطنية 🇸🇦</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white">لوحة المتصدرين</h1>
        <p className="text-sm md:text-base text-gray-400">
          تنافس مع نخبة صائدي التروفيز في المملكة.
        </p>
      </div>

      {/* Empty State Card */}
      <div className="max-w-2xl mx-auto bg-[#12141c] border border-white/15 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden space-y-6">
        
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Icon */}
        <div className="relative w-24 h-24 mx-auto rounded-3xl bg-gradient-to-b from-white/15 to-white/5 border border-white/20 flex items-center justify-center shadow-inner">
          <Users className="w-12 h-12 text-gray-300" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-md">
            <Trophy className="w-4 h-4" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-black text-white">
            لا يوجد متصدرين حالياً
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-md mx-auto leading-relaxed">
            لم يتم إضافة أي حساب حتى الآن. كن أول من يوثق حسابه في السوني ويتصدر قائمة أفضل صائدي التروفيات في المملكة!
          </p>
        </div>

        {/* Action Button to Verification */}
        <div className="pt-2">
          <button
            onClick={() => navigate('/verify')}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white hover:bg-gray-200 text-black font-black text-base transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <ShieldCheck className="w-5 h-5 text-black" />
            <span>توثيق حسابك الآن</span>
            <ArrowLeft className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Benefits reminder */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10 text-right">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-xs font-bold text-white flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>ميزة التوثيق</span>
            </div>
            <p className="text-[11px] text-gray-400">إظهار شارة التوثيق الرسمية بجانب يوزرك.</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-xs font-bold text-white flex items-center gap-1.5 mb-1">
              <Trophy className="w-3.5 h-3.5 text-white" />
              <span>مستوى التروفيات</span>
            </div>
            <p className="text-[11px] text-gray-400">حساب فوري لعدد البلاتينيوم ومستواك بالسوني.</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-xs font-bold text-white flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>تحديث تلقائي</span>
            </div>
            <p className="text-[11px] text-gray-400">تحديث ترتيبك خلال 24 ساعة من تأكيد الإضافة.</p>
          </div>
        </div>

      </div>

    </div>
  );
}
