import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGames } from '../data/gamesData';
import { Search, Trophy, Clock, AlertTriangle, Wifi, WifiOff } from 'lucide-react';

export function TrophiesView() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const games = getAllGames();

  const filteredGames = games.filter((game) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      game.title.toLowerCase().includes(query) ||
      game.englishTitle.toLowerCase().includes(query) ||
      game.genre.toLowerCase().includes(query) ||
      game.slug.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white">تروفيات</h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            اضغط على أي لعبة للاطلاع على جميع الجوائز وطريقة الحصول عليها.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن لعبة (مثال: God of War)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#12141c] border border-white/10 focus:border-white/40 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Quick count bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <span>متوفر في المنصة:</span>
          <span className="font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/10">
            {filteredGames.length} لعبة
          </span>
        </div>
      </div>

      {/* Games Grid - Cleaned to show ONLY Name, Difficulty, Time, Missable Trophies, and Online */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => navigate(`/games/${game.slug}`)}
            className="group bg-[#12141c] border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col shadow-lg"
          >
            {/* Real Official Cover Image */}
            <div className="relative h-56 overflow-hidden bg-black">
              <img
                src={game.coverImage}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-transparent" />
              
              {/* Platform tag */}
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
                {game.platform}
              </span>
            </div>

            {/* Content: Only Name, Difficulty, Time, Missable, and Online */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              {/* Name only */}
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white group-hover:text-gray-200 transition-colors">
                  {game.title}
                </h3>
                <div className="text-xs text-gray-400 font-medium font-mono">{game.englishTitle}</div>
              </div>

              {/* Specs Grid: Difficulty, Time, Missable, Online */}
              <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                {/* Row 1: Difficulty & Time */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <span className="text-gray-400">الصعوبة:</span>
                    <span className="font-bold text-white font-mono">{game.difficulty} / 10</span>
                  </div>

                  <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <span className="text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-300" />
                      الوقت:
                    </span>
                    <span className="font-bold text-white text-[11px]">{game.estimatedHours}</span>
                  </div>
                </div>

                {/* Row 2: Missable & Online */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <span className="text-gray-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-gray-300" />
                      للفقد:
                    </span>
                    <span className="font-bold text-white text-[11px]">
                      {game.missableTrophiesCount > 0 ? `${game.missableTrophiesCount} تروفي` : 'لا يوجد (0)'}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <span className="text-gray-400 flex items-center gap-1">
                      {game.onlineTrophiesCount > 0 ? (
                        <Wifi className="w-3 h-3 text-gray-300" />
                      ) : (
                        <WifiOff className="w-3 h-3 text-gray-300" />
                      )}
                      أونلاين:
                    </span>
                    <span className="font-bold text-white text-[11px]">
                      {game.onlineTrophiesCount > 0 ? `${game.onlineTrophiesCount} تروفي` : 'أوفلاين (0)'}
                    </span>
                  </div>
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
          <p className="text-sm text-gray-400">جرب البحث باسم لعبة أخرى أو إعادة ضبط الفلتر.</p>
        </div>
      )}

    </div>
  );
}
