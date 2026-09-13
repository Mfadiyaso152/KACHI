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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-app)] pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[var(--text-main)]">تروفيات</h1>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="ابحث عن لعبة (مثال: God of War)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--input-bg)] border border-[var(--border-app)] focus:border-[var(--border-hover)] rounded-xl pr-10 pl-4 py-2.5 text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Games Grid - Name Only */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => navigate(`/games/${game.slug}`)}
            className="group bg-[var(--bg-card)] border border-[var(--border-app)] hover:border-[var(--border-hover)] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col shadow-md hover:shadow-xl"
          >
            {/* Real Official Cover Image */}
            <div className="relative h-60 overflow-hidden bg-black">
              <img
                src={game.coverImage}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-80" />
            </div>

            {/* Content: Game name only */}
            <div className="p-5 flex-1 flex flex-col justify-center">
              <h3 className="text-lg font-bold text-[var(--text-main)] transition-colors">
                {game.title}
              </h3>
              <div className="text-xs text-[var(--text-sub)] font-medium font-mono mt-1">
                {game.englishTitle}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <div className="w-16 h-16 bg-[var(--chip-bg)] rounded-full flex items-center justify-center mx-auto text-[var(--text-muted)]">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[var(--text-main)]">لم يتم العثور على ألعاب مطابقة</h3>
          <p className="text-sm text-[var(--text-sub)]">جرب البحث باسم لعبة أخرى أو إعادة ضبط الفلتر.</p>
        </div>
      )}

    </div>
  );
}


