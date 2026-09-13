import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Gamepad2, 
  Award, 
  ShieldCheck, 
  ArrowLeft, 
  ChevronRight
} from 'lucide-react';

export function HomeView() {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--bg-card-secondary)] via-[var(--bg-card)] to-[var(--bg-app)] border border-[var(--border-app)] p-8 md:p-14 shadow-2xl transition-all">
        {/* Japanese background watermark */}
        <div className="absolute -top-10 -left-10 text-[180px] font-black text-[var(--text-main)] opacity-5 select-none pointer-events-none font-serif">
          勝
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--chip-bg)] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--text-main)] leading-tight flex items-center gap-3 flex-wrap">
            <span>منصة كاتشي</span>
            <span className="text-[var(--text-sub)] font-serif text-3xl md:text-5xl">勝</span>
          </h1>

          <p className="text-base md:text-lg text-[var(--text-sub)] leading-relaxed max-w-2xl">
            مرحباً بك في <strong className="text-[var(--text-main)]">كاتشي (KACHI)</strong>. وجهتك لأدلة وجوائز تروفيات ألعاب البلايستيشن، وطريق البلاتينيوم مع شروحات الحصول على كل جائزة.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => navigate('/games')}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--btn-primary-bg)] hover:opacity-90 text-[var(--btn-primary-text)] font-black text-base shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Trophy className="w-5 h-5" />
              <span>استعراض تروفيات الألعاب</span>
              <ArrowLeft className="w-5 h-5 mr-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-main)]">خدمات المنصة</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Trophies */}
          <div 
            onClick={() => navigate('/games')}
            className="group p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-app)] hover:border-[var(--border-hover)] transition-all duration-300 cursor-pointer space-y-4 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--chip-bg)] border border-[var(--border-app)] flex items-center justify-center text-[var(--text-main)] group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-main)] transition-colors">
                تروفيات
              </h3>
            </div>
            <div className="flex items-center gap-1 text-[var(--text-main)] font-semibold text-sm pt-2">
              <span>تصفح تروفيات الألعاب</span>
              <ChevronRight className="w-4 h-4 transform rotate-180" />
            </div>
          </div>

          {/* Card 2: Leaderboard */}
          <div 
            onClick={() => navigate('/leaderboard')}
            className="group p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-app)] hover:border-[var(--border-hover)] transition-all duration-300 cursor-pointer space-y-4 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--chip-bg)] border border-[var(--border-app)] flex items-center justify-center text-[var(--text-main)] group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-main)] transition-colors">
                لوحة المتصدرين
              </h3>
            </div>
            <div className="flex items-center gap-1 text-[var(--text-main)] font-semibold text-sm pt-2">
              <span>شاهد المتصدرين</span>
              <ChevronRight className="w-4 h-4 transform rotate-180" />
            </div>
          </div>

          {/* Card 3: Verification */}
          <div 
            onClick={() => navigate('/verify')}
            className="group p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-app)] hover:border-[var(--border-hover)] transition-all duration-300 cursor-pointer space-y-4 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--chip-bg)] border border-[var(--border-app)] flex items-center justify-center text-[var(--text-main)] group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-main)] transition-colors">
                توثيق الحساب
              </h3>
            </div>
            <div className="flex items-center gap-1 text-[var(--text-main)] font-semibold text-sm pt-2">
              <span>صفحة التوثيق</span>
              <ChevronRight className="w-4 h-4 transform rotate-180" />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

