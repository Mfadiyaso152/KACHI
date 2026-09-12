import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Clock, 
  AlertTriangle, 
  Wifi, 
  WifiOff, 
  ArrowRight, 
  Share2, 
  Check, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ListOrdered,
  HelpCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { getGameBySlug, getAllGames } from '../data/gamesData';
import { NotFoundView } from './NotFoundView';
import { TrophyType, TrophyItem } from '../types';

export function GameDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = useState(false);
  const [trophyFilter, setTrophyFilter] = useState<'all' | TrophyType | 'missable'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!slug) {
    return <NotFoundView />;
  }

  const game = getGameBySlug(slug);

  if (!game) {
    return (
      <NotFoundView 
        title="اللعبة غير موجودة"
        message={`عذراً، لم نتمكن من العثور على صفحة اللعبة بالمعرف "${slug}". تأكد من صحة الرابط أو تصفح الألعاب المتاحة.`}
      />
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Combine trophiesList with steps if any
  const allTrophies: TrophyItem[] = game.trophiesList && game.trophiesList.length > 0 
    ? game.trophiesList 
    : game.steps.map(s => ({
        id: s.id,
        title: s.title,
        description: s.description,
        type: s.type,
        isMissable: s.isMissable
      }));

  const filteredTrophies = allTrophies.filter(trophy => {
    const matchesFilter = 
      trophyFilter === 'all' ? true :
      trophyFilter === 'missable' ? trophy.isMissable :
      trophy.type === trophyFilter;

    const matchesSearch = 
      trophy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (trophy.englishTitle && trophy.englishTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      trophy.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-10 pb-20">
      
      {/* Top Breadcrumb and Back Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          onClick={() => navigate('/games')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold text-gray-200 hover:text-white transition-all cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لجميع الألعاب (/games)</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
            title="نسخ رابط صفحة اللعبة"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">تم نسخ الرابط</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>مشاركة الرابط</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hero Banner with Game Cover & Key Meta */}
      <div className="relative overflow-hidden rounded-3xl bg-[#12141c] border border-white/15 shadow-2xl">
        
        {/* Banner Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0 h-72 md:h-80 overflow-hidden opacity-30">
          <img 
            src={game.bannerImage || game.coverImage} 
            alt={game.englishTitle} 
            className="w-full h-full object-cover object-center filter blur-xs scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#12141c]/40 via-[#12141c]/90 to-[#12141c]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 md:p-10 space-y-8">
          
          {/* Top Info Row */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Cover Image */}
            <div className="w-full md:w-64 flex-shrink-0 aspect-[16/9] md:aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
              <img 
                src={game.coverImage} 
                alt={game.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Main Details */}
            <div className="flex-1 space-y-4">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-white font-mono text-xs font-bold">
                  {game.platform}
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs">
                  {game.genre}
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-mono text-xs dir-ltr">
                  /games/{game.slug}
                </span>
              </div>

              {/* Titles */}
              <div className="space-y-1">
                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                  {game.title}
                </h1>
                <p className="text-lg md:text-xl font-medium text-gray-400 font-sans tracking-wide">
                  {game.englishTitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-3xl">
                {game.description}
              </p>

              {/* Quick Summary Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>صعوبة البلاتينيوم</span>
                  </div>
                  <div className="text-lg font-black text-white font-mono">
                    {game.difficulty}<span className="text-xs text-gray-400 font-normal"> / 10</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-white" />
                    <span>الوقت المقدر</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    {game.estimatedHours}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-white" />
                    <span>تروفيات قابلة للفقد</span>
                  </div>
                  <div className="text-sm font-bold">
                    {game.missableTrophiesCount > 0 ? (
                      <span className="text-amber-400 font-bold">{game.missableTrophiesCount} تروفيات</span>
                    ) : (
                      <span className="text-emerald-400 font-bold">لا يوجد (0)</span>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
                    {game.onlineTrophiesCount > 0 ? (
                      <Wifi className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <WifiOff className="w-3.5 h-3.5 text-white" />
                    )}
                    <span>تروفيات أونلاين</span>
                  </div>
                  <div className="text-sm font-bold">
                    {game.onlineTrophiesCount > 0 ? (
                      <span className="text-amber-400 font-bold">{game.onlineTrophiesCount} تروفيات</span>
                    ) : (
                      <span className="text-emerald-400 font-bold">أوفلاين بالكامل</span>
                    )}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Trophy Counts Detailed Breakdown Card */}
      <div className="bg-[#12141c] border border-white/15 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-white" />
            <h2 className="text-xl font-bold text-white">إحصائيات وعدد التروفيات</h2>
          </div>
          <div className="text-xs text-gray-400">
            مجموع التروفيات: <strong className="text-white font-mono text-sm">{game.totalTrophiesCount}</strong>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
          
          {/* Total */}
          <div className="p-4 rounded-2xl bg-[#161922] border border-white/10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-400">الإجمالي</div>
              <div className="text-2xl font-black text-white font-mono">{game.totalTrophiesCount}</div>
            </div>
          </div>

          {/* Platinum */}
          <div className="p-4 rounded-2xl bg-[#161922] border border-white/20 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white font-bold">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-300 font-semibold">بلاتينيوم (Platinum)</div>
              <div className="text-2xl font-black text-white font-mono">{game.platinumCount}</div>
            </div>
          </div>

          {/* Gold */}
          <div className="p-4 rounded-2xl bg-[#161922] border border-white/10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-gray-200 font-bold">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-400">ذهبي (Gold)</div>
              <div className="text-2xl font-black text-white font-mono">{game.goldCount}</div>
            </div>
          </div>

          {/* Silver */}
          <div className="p-4 rounded-2xl bg-[#161922] border border-white/10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-gray-300 font-bold">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-400">فضي (Silver)</div>
              <div className="text-2xl font-black text-white font-mono">{game.silverCount}</div>
            </div>
          </div>

          {/* Bronze */}
          <div className="p-4 rounded-2xl bg-[#161922] border border-white/10 flex items-center gap-3 col-span-2 sm:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-gray-400 font-bold">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-400">برونزي (Bronze)</div>
              <div className="text-2xl font-black text-white font-mono">{game.bronzeCount}</div>
            </div>
          </div>

        </div>
      </div>

      {/* Platinum Roadmap Section (خارطة طريق البلاتينيوم) */}
      {game.roadmap && game.roadmap.length > 0 && (
        <div className="bg-[#12141c] border border-white/15 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <ListOrdered className="w-5 h-5 text-white" />
              <h2 className="text-xl font-bold text-white">خارطة طريق البلاتينيوم (Platinum Roadmap)</h2>
            </div>
            <span className="text-xs text-gray-400">
              {game.roadmap.length} مراحل للحصول على البلاتينيوم
            </span>
          </div>

          <div className="space-y-4">
            {game.roadmap.map((step) => (
              <div 
                key={step.stepNumber}
                className="p-5 md:p-6 rounded-2xl bg-[#161922] border border-white/10 hover:border-white/20 transition-all space-y-3"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-white text-black font-black text-sm flex items-center justify-center">
                      {step.stepNumber}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-white">
                      {step.title}
                    </h3>
                  </div>

                  {step.estimatedHours && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-300 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-white" />
                      <span>{step.estimatedHours}</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-300 leading-relaxed pr-11">
                  {step.description}
                </p>

                {step.unlockedTrophies && (
                  <div className="pr-11 pt-1 flex items-center gap-2 text-xs text-gray-400">
                    <span className="font-semibold text-gray-300">التروفيات المكتسبة:</span>
                    <span className="text-white">{step.unlockedTrophies}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Trophies List & Unlock Guides (قائمة جميع التروفيات وشرح الحصول عليها) */}
      <div className="bg-[#12141c] border border-white/15 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
        
        {/* Header and Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-white" />
              <h2 className="text-xl font-bold text-white">دليل وشرح تروفيات اللعبة</h2>
            </div>
            <span className="text-xs text-gray-400">
              معروض ({filteredTrophies.length}) من أصل ({allTrophies.length}) تروفي
            </span>
          </div>

          {/* Filter Tabs & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
              <button
                onClick={() => setTrophyFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  trophyFilter === 'all'
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                الكل
              </button>
              <button
                onClick={() => setTrophyFilter('platinum')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  trophyFilter === 'platinum'
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                بلاتينيوم ({game.platinumCount})
              </button>
              <button
                onClick={() => setTrophyFilter('gold')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  trophyFilter === 'gold'
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                ذهبي ({game.goldCount})
              </button>
              <button
                onClick={() => setTrophyFilter('silver')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  trophyFilter === 'silver'
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                فضي ({game.silverCount})
              </button>
              <button
                onClick={() => setTrophyFilter('bronze')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  trophyFilter === 'bronze'
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                برونزي ({game.bronzeCount})
              </button>
              {game.missableTrophiesCount > 0 && (
                <button
                  onClick={() => setTrophyFilter('missable')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    trophyFilter === 'missable'
                      ? 'bg-amber-400 text-black'
                      : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
                  }`}
                >
                  قابلة للفقد ({game.missableTrophiesCount})
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="ابحث عن تروفي..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#161922] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
              />
            </div>

          </div>
        </div>

        {/* Trophies Grid / Cards */}
        <div className="space-y-3">
          {filteredTrophies.map((trophy) => (
            <div
              key={trophy.id}
              className="p-4 md:p-5 rounded-2xl bg-[#161922] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Side: Icon & Titles */}
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-white">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-white text-sm md:text-base">
                      {trophy.title}
                    </h4>
                    {trophy.englishTitle && (
                      <span className="text-xs text-gray-400 font-sans">
                        ({trophy.englishTitle})
                      </span>
                    )}
                    {trophy.isMissable && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold">
                        قابل للفقد ⚠️
                      </span>
                    )}
                    {trophy.isOnline && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold">
                        يتطلب أونلاين 🌐
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {trophy.description}
                  </p>
                  {trophy.guide && (
                    <div className="mt-2 text-xs text-gray-400 bg-black/40 p-2.5 rounded-xl border border-white/5">
                      <strong className="text-white">طريقة الحصول: </strong>
                      <span>{trophy.guide}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Type Badge */}
              <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                <span className={`px-3 py-1 rounded-xl text-xs font-bold border uppercase ${
                  trophy.type === 'platinum' ? 'bg-white text-black border-white' :
                  trophy.type === 'gold' ? 'bg-white/15 text-white border-white/30' :
                  trophy.type === 'silver' ? 'bg-white/10 text-gray-200 border-white/20' :
                  'bg-white/5 text-gray-400 border-white/10'
                }`}>
                  {trophy.type === 'platinum' ? 'بلاتينيوم' :
                   trophy.type === 'gold' ? 'ذهبي' :
                   trophy.type === 'silver' ? 'فضي' : 'برونزي'}
                </span>
              </div>

            </div>
          ))}

          {filteredTrophies.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-sm">
              لا توجد تروفيات مطابقة للبحث أو الفلتر المحدد.
            </div>
          )}
        </div>

      </div>

      {/* Explore More Games Footer Banner */}
      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-right">
          <h4 className="font-bold text-white text-base">استكشف المزيد من الألعاب</h4>
          <p className="text-xs text-gray-400">تصفح مكتبة ألعاب البلايستيشن وسلسلة رزدنت إيفل ريميك الكاملة.</p>
        </div>
        <button
          onClick={() => navigate('/games')}
          className="px-6 py-3 rounded-2xl bg-white text-black font-bold text-xs hover:bg-gray-200 transition-colors shadow-md cursor-pointer flex items-center gap-2"
        >
          <span>تصفح كل الألعاب (/games)</span>
          <ArrowRight className="w-3.5 h-3.5 transform rotate-180" />
        </button>
      </div>

    </div>
  );
}
