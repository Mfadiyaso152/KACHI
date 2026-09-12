import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllGames } from '../data/gamesData';
import { Search, Trophy, Clock, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';

export function TrophiesView() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const games = getAllGames();

  const filteredGames = games.filter((game) => {
    const matchesSearch = 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlatform = 
      selectedPlatform === 'all' ? true : 
      game.platform.includes(selectedPlatform);

    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-white text-xs font-bold mb-1">
            <Trophy className="w-4 h-4 text-white" />
            <span>مكتبة أدلة البلاتينيوم وألعاب PlayStation</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white">قائمة الألعاب والتروفيات</h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            اضغط على أي لعبة للانتقال إلى صفحتها المخصصة وخارطة طريق البلاتينيوم الخاصة بها.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن لعبة (مثال: God of War، أسترو بوت)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#12141c] border border-white/10 focus:border-white/40 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Quick stats and filters bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <span>متوفر:</span>
          <span className="font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/10">
            {filteredGames.length} لعبة
          </span>
        </div>

        {/* Platform quick pills */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedPlatform('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedPlatform === 'all'
                ? 'bg-white text-black font-bold'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            جميع المنصات
          </button>
          <button
            onClick={() => setSelectedPlatform('PS5')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedPlatform === 'PS5'
                ? 'bg-white text-black font-bold'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            PS5
          </button>
          <button
            onClick={() => setSelectedPlatform('PS4')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedPlatform === 'PS4'
                ? 'bg-white text-black font-bold'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            PS4
          </button>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <Link
            key={game.id}
            to={`/games/${game.slug}`}
            className="group bg-[#12141c] border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col shadow-lg"
          >
            {/* Cover Image & Platinum badge */}
            <div className="relative h-48 overflow-hidden bg-gray-900">
              <img
                src={game.coverImage}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                referrerPolicy="no-referrer"
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

              {/* Slug preview badge */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-0.5 rounded bg-black/80 text-[10px] text-gray-300 font-mono dir-ltr">
                /games/{game.slug}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <div className="text-xs text-gray-400 font-medium font-mono">{game.englishTitle}</div>
                <h3 className="text-lg font-bold text-white group-hover:text-gray-200 transition-colors flex items-center justify-between">
                  <span>{game.title}</span>
                  <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-white transform group-hover:-translate-x-1 transition-all" />
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{game.description}</p>
              </div>

              {/* Stats Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500">الصعوبة:</span>
                  <div className="flex items-center text-white font-bold font-mono">
                    {game.difficulty}/10
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>{game.estimatedHours}</span>
                </div>
              </div>
            </div>
          </Link>
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
