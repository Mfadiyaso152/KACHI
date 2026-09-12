import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Clock, 
  AlertTriangle, 
  Wifi, 
  WifiOff, 
  ArrowRight, 
  Share2, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { getGameBySlug } from '../data/gamesData';
import { NotFoundView } from './NotFoundView';
import { TrophyItem } from '../types';

export function GameDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Selected trophy for expanding guide description
  const [expandedTrophyId, setExpandedTrophyId] = useState<string | null>(null);

  if (!slug) {
    return <NotFoundView />;
  }

  const game = getGameBySlug(slug);

  if (!game) {
    return (
      <NotFoundView 
        title="اللعبة غير موجودة"
        message={`عذراً، لم نتمكن من العثور على صفحة اللعبة بالمعرف "${slug}".`}
      />
    );
  }

  const canonicalGameUrl = `https://kachi-sa.vercel.app/games/${game.slug}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(canonicalGameUrl);
      } else {
        // Fallback for non-secure contexts or certain iframes
        const textArea = document.createElement('textarea');
        textArea.value = canonicalGameUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Prompt fallback if clipboard access fails
      prompt('انسخ رابط اللعبة:', canonicalGameUrl);
    }
  };

  const allTrophies: TrophyItem[] = game.trophiesList || [];

  const toggleTrophy = (id: string) => {
    setExpandedTrophyId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Top Breadcrumb and Back Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          onClick={() => navigate('/games')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold text-gray-200 hover:text-white transition-all cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لتروفيات الألعاب</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span className="text-white">تم نسخ الرابط</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة الرابط</span>
            </>
          )}
        </button>
      </div>

      {/* Game Header: Only Name, Difficulty, Time, Missable, and Online */}
      <div className="relative overflow-hidden rounded-3xl bg-[#12141c] border border-white/15 shadow-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          
          {/* Official Cover Image */}
          <div className="w-40 md:w-48 flex-shrink-0 aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
            <img 
              src={game.coverImage} 
              alt={game.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Details: Only Name, Difficulty, Time, Missable, Online */}
          <div className="flex-1 space-y-4 text-center md:text-right w-full">
            
            {/* Title & Platform */}
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-white font-mono text-xs font-bold inline-block mb-2">
                {game.platform}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                {game.title}
              </h1>
              <p className="text-base md:text-lg font-medium text-gray-400 font-mono">
                {game.englishTitle}
              </p>
            </div>

            {/* Exactly the 4 specs: Difficulty, Time, Missable, Online */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#161922] border border-white/10 space-y-1 text-center">
                <div className="text-xs text-gray-400">الصعوبة</div>
                <div className="text-lg font-black text-white font-mono">
                  {game.difficulty} / 10
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#161922] border border-white/10 space-y-1 text-center">
                <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-300" />
                  الوقت
                </div>
                <div className="text-sm font-bold text-white">
                  {game.estimatedHours}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#161922] border border-white/10 space-y-1 text-center">
                <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-gray-300" />
                  للفقد
                </div>
                <div className="text-sm font-bold text-white">
                  {game.missableTrophiesCount > 0 ? `${game.missableTrophiesCount} تروفي` : 'لا يوجد (0)'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#161922] border border-white/10 space-y-1 text-center">
                <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                  {game.onlineTrophiesCount > 0 ? (
                    <Wifi className="w-3.5 h-3.5 text-gray-300" />
                  ) : (
                    <WifiOff className="w-3.5 h-3.5 text-gray-300" />
                  )}
                  أونلاين
                </div>
                <div className="text-sm font-bold text-white">
                  {game.onlineTrophiesCount > 0 ? `${game.onlineTrophiesCount} تروفي` : 'أوفلاين (0)'}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* طريق البلاتينيوم: يعطيك كل الجوائز وتضغط على الجائزة ويعطيك وصف كيف تجيبها فقط */}
      <div className="bg-[#12141c] border border-white/15 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">طريق البلاتينيوم</h2>
              <p className="text-xs text-gray-400">اضغط على أي جائزة لمعرفة طريقة الحصول عليها وشرحها.</p>
            </div>
          </div>
          <span className="text-xs text-white bg-white/10 px-3 py-1 rounded-full border border-white/10 font-bold font-mono">
            {allTrophies.length} جوائز
          </span>
        </div>

        {/* Trophies List: Click to reveal how to obtain it */}
        <div className="space-y-3">
          {allTrophies.map((trophy) => {
            const isExpanded = expandedTrophyId === trophy.id;

            return (
              <div
                key={trophy.id}
                onClick={() => toggleTrophy(trophy.id)}
                className={`p-4 md:p-5 rounded-2xl border transition-all cursor-pointer select-none ${
                  isExpanded 
                    ? 'bg-[#181b24] border-white/40 shadow-lg' 
                    : 'bg-[#161922] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  
                  {/* Left: Icon and Name */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-white">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-white text-base">
                          {trophy.title}
                        </h4>
                        {trophy.englishTitle && (
                          <span className="text-xs text-gray-400 font-mono">
                            ({trophy.englishTitle})
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {trophy.description}
                      </div>
                    </div>
                  </div>

                  {/* Right: Badge & Expand arrow */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold border bg-white/10 text-white border-white/20">
                      {trophy.type === 'platinum' ? 'بلاتينيوم' :
                       trophy.type === 'gold' ? 'ذهبي' :
                       trophy.type === 'silver' ? 'فضي' : 'برونزي'}
                    </span>
                    <div className="p-1.5 rounded-lg bg-white/5 text-gray-400">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-white" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>

                </div>

                {/* Expanded Section: How to obtain the trophy only */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
                    <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                        <span>كيف تجيبها:</span>
                      </div>
                      <p className="text-sm text-gray-200 leading-relaxed">
                        {trophy.guide || 'يمكن الحصول عليها بالتقدم في مراحل اللعبة الطبيعية وإكمال المتطلبات المذكورة.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
