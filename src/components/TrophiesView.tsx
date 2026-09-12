import { useState } from 'react';
import { GameGuide } from '../types';
import { GAMES_DATA } from '../data/mockData';
import { Search, Trophy, Clock, AlertTriangle, X, Sparkles } from 'lucide-react';

export function TrophiesView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<GameGuide | null>(null);

  const filteredGames = GAMES_DATA.filter((game) => {
    return (
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-white text-xs font-bold mb-1">
            <Trophy className="w-4 h-4 text-white" />
            <span>قائمة التروفيات وألعاب PlayStation</span>
          </div>
          <h1 className="text-3xl font-black text-white">التروفيات والبلاتينيوم</h1>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن لعبة (مثال: رزدنت إيفل، Elden Ring)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#12141c] border border-white/10 focus:border-white/40 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => setSelectedGame(game)}
            className="group bg-[#12141c] border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col shadow-lg"
          >
            {/* Cover Image & Platinum badge */}
            <div className="relative h-48 overflow-hidden bg-gray-900">
              <img
                src={game.coverImage}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-transparent" />
              
              {/* Platform tag */}
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
                {game.platform}
              </span>

              {/* Rarity badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-black font-bold text-xs shadow-md">
                <Trophy className="w-3.5 h-3.5 text-black" />
                <span>{game.platinumRarity}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <div className="text-xs text-gray-400 font-medium font-mono">{game.englishTitle}</div>
                <h3 className="text-lg font-bold text-white group-hover:text-gray-200 transition-colors">
                  {game.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{game.description}</p>
              </div>

              {/* Stats Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500">الصعوبة:</span>
                  <div className="flex items-center text-white font-bold">
                    {game.difficulty}/10
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>{game.estimatedHours}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">لم يتم العثور على ألعاب مطابقة</h3>
          <p className="text-sm text-gray-400">جرب البحث باسم لعبة أخرى.</p>
        </div>
      )}

      {/* Game Platinum Guide Modal */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedGame(null)}
          />

          <div className="relative bg-[#161922] border border-white/20 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 shadow-2xl p-6 md:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-4">
                <img
                  src={selectedGame.coverImage}
                  alt={selectedGame.title}
                  className="w-16 h-16 rounded-2xl object-cover border border-white/20 flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white px-2 py-0.5 rounded bg-white/10 border border-white/20">
                      {selectedGame.platform}
                    </span>
                    <span className="text-xs text-gray-400">{selectedGame.genre}</span>
                  </div>
                  <h2 className="text-2xl font-black text-white mt-1">{selectedGame.title}</h2>
                  <p className="text-xs text-gray-400 font-mono">{selectedGame.englishTitle}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedGame(null)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#10121a] p-4 rounded-2xl border border-white/10 text-center">
              <div>
                <div className="text-xs text-gray-400">صعوبة البلاتينيوم</div>
                <div className="text-lg font-bold text-white mt-1">{selectedGame.difficulty} / 10</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">الوقت المتوقع</div>
                <div className="text-lg font-bold text-white mt-1">{selectedGame.estimatedHours}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">ندرة البلاتينيوم</div>
                <div className="text-lg font-bold text-gray-200 mt-1">{selectedGame.platinumRarity}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">تروفيات قابلة للضياع</div>
                <div className="text-lg font-bold text-rose-400 mt-1">{selectedGame.missableTrophiesCount} تروفي</div>
              </div>
            </div>

            {/* Description */}
            <div className="text-sm text-gray-300 leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
              {selectedGame.description}
            </div>

            {/* Step-by-Step Platinum Guide */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-white" />
                  <span>خطوات الحصول على البلاتينيوم</span>
                </h3>
                <span className="text-xs text-gray-400">{selectedGame.steps.length} خطوات</span>
              </div>

              <div className="space-y-3">
                {selectedGame.steps.map((step, idx) => (
                  <div 
                    key={step.id}
                    className="p-4 rounded-2xl bg-[#10121a] border border-white/10 flex items-start gap-4 hover:border-white/30 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                      {idx + 1}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-base">{step.title}</h4>
                        {step.type === 'platinum' && (
                          <span className="px-2 py-0.5 rounded bg-white text-black text-xs font-black">بلاتينيوم</span>
                        )}
                        {step.type === 'gold' && (
                          <span className="px-2 py-0.5 rounded bg-white/15 text-white text-xs font-bold border border-white/25">ذهبي</span>
                        )}
                        {step.type === 'silver' && (
                          <span className="px-2 py-0.5 rounded bg-white/10 text-gray-300 text-xs font-bold border border-white/15">فضي</span>
                        )}
                        {step.type === 'bronze' && (
                          <span className="px-2 py-0.5 rounded bg-white/5 text-gray-400 text-xs font-bold border border-white/10">برونزي</span>
                        )}
                      </div>

                      <p className="text-sm text-gray-300 leading-relaxed">{step.description}</p>

                      {step.isMissable && (
                        <div className="inline-flex items-center gap-1.5 text-rose-400 text-xs font-semibold pt-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>تنبيه: هذا التروفي قابل للضياع ولن تستطيع العودة له إلا بلعبة جديدة!</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedGame(null)}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
