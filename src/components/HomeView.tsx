import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Gamepad2, 
  Award, 
  ShieldCheck, 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2
} from 'lucide-react';

export function HomeView() {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#161922] via-[#10121a] to-[#0c0d12] border border-white/10 p-8 md:p-14 shadow-2xl">
        {/* Decorative Japanese background watermark */}
        <div className="absolute -top-10 -left-10 text-[180px] font-black text-white/5 select-none pointer-events-none font-serif">
          勝
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            منصة كاتشي لتروفيات البلاتينيوم <span className="text-gray-300 font-serif">勝</span>
          </h1>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl">
            مرحباً بك في <strong className="text-white">كاتشي (KACHI)</strong>. وجهتك الأولى لأدلة تروفيات ألعاب البلايستيشن، وتوثيق حسابات السوني، والتنافس على قائمة صائدي البلاتينيوم في المملكة.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => navigate('/games')}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white hover:bg-gray-100 text-black font-black text-base shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Trophy className="w-5 h-5" />
              <span>استعرض الألعاب وأدلة البلاتينيوم</span>
              <ArrowLeft className="w-5 h-5 mr-1" />
            </button>

            <button
              onClick={() => navigate('/verify')}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-base transition-all cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-white" />
              <span>توثيق حسابك بالسوني</span>
            </button>
          </div>

          {/* Quick trust indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
              <span>أدلة بلاتينيوم خطوة بخطوة</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
              <span>توثيق آمن عبر سوني PSN</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
              <span>تسجيل سريع عبر Firebase</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white">مميزات منصة كاتشي</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div 
            onClick={() => navigate('/games')}
            className="group p-8 rounded-3xl bg-[#12141c] border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer space-y-4 hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-gray-200 transition-colors">
              قائمة التروفيات وأدلة البلاتينيوم
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              تصفح أشهر ألعاب البلايستيشن وسلسلة رزدنت إيفل ريميك مع خطوات تفصيلية وخارطة طريق للحصول على التروفي البلاتيني بأسرع طريقة.
            </p>
            <div className="flex items-center gap-1 text-white font-semibold text-sm pt-2">
              <span>تصفح الألعاب (/games)</span>
              <ChevronRight className="w-4 h-4 transform rotate-180" />
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => navigate('/leaderboard')}
            className="group p-8 rounded-3xl bg-[#12141c] border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer space-y-4 hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-gray-200 transition-colors">
              لوحة المتصدرين (أفضل 100 حساب)
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              كن من أوائل المسجلين! وثق حسابك الآن لتكون ضمن صدارة المتصدرين في حصد تروفيات البلاتينيوم على مستوى المملكة.
            </p>
            <div className="flex items-center gap-1 text-white font-semibold text-sm pt-2">
              <span>شاهد المتصدرين</span>
              <ChevronRight className="w-4 h-4 transform rotate-180" />
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => navigate('/verify')}
            className="group p-8 rounded-3xl bg-[#12141c] border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer space-y-4 hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-gray-200 transition-colors">
              توثيق الحساب والتحقق
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              3 خطوات بسيطة: أدخل يوزر حسابك، أضف الحساب الرسمي في السوني، وسيتم التحقق من حسابك خلال 24 ساعة.
            </p>
            <div className="flex items-center gap-1 text-white font-semibold text-sm pt-2">
              <span>وثق حسابك الآن</span>
              <ChevronRight className="w-4 h-4 transform rotate-180" />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
