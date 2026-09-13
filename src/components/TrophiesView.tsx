import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGames } from '../data/gamesData';
import { Search } from 'lucide-react';

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

      {/* Games Grid - Name Only */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => navigate(`/games/${game.slug}`)}
            className="group bg-[#12141c] border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col shadow-lg"
          >
            {/* Real Official Cover Image */}
            <div className="relative h-60 overflow-hidden bg-black">
              <img
                src={game.coverImage}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-transparent" />
            </div>

            {/* Content: Game name only */}
            <div className="p-5 flex-1 flex flex-col justify-center">
              <h3 className="text-lg font-bold text-white group-hover:text-gray-200 transition-colors">
                {game.title}
              </h3>
              <div className="text-xs text-gray-400 font-medium font-mono mt-1">
                {game.englishTitle}
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

