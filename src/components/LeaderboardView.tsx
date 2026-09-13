import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Trophy, Search, Check } from 'lucide-react';
import { getStoredUsers, DATA_SYNC_EVENT } from '../lib/adminStore';

export function LeaderboardView() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [usersList, setUsersList] = useState(getStoredUsers());

  // Real-time synchronization
  useEffect(() => {
    const updateList = () => {
      setUsersList(getStoredUsers());
    };

    window.addEventListener(DATA_SYNC_EVENT, updateList);
    window.addEventListener('storage', updateList);
    const interval = setInterval(updateList, 1000);

    return () => {
      window.removeEventListener(DATA_SYNC_EVENT, updateList);
      window.removeEventListener('storage', updateList);
      clearInterval(interval);
    };
  }, []);

  // Get verified non-banned users from storage with PSN ID and trophy stats
  const allVerified = usersList.filter(u => u.isVerified && !u.isBanned && u.psnId);

  // Sort by level descending, then platinum, then gold, then total
  const sortedUsers = [...allVerified].sort((a, b) => {
    const levelA = a.trophyStats?.level || 0;
    const levelB = b.trophyStats?.level || 0;
    if (levelB !== levelA) return levelB - levelA;

    const platA = a.trophyStats?.platinum || 0;
    const platB = b.trophyStats?.platinum || 0;
    if (platB !== platA) return platB - platA;

    const totalA = a.trophyStats?.total || 0;
    const totalB = b.trophyStats?.total || 0;
    return totalB - totalA;
  });

  const filteredUsers = sortedUsers.filter(u => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      u.psnId?.toLowerCase().includes(q) ||
      u.displayName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-[var(--text-main)]">لوحة المتصدرين</h1>
      </div>

      {sortedUsers.length > 0 ? (
        <div className="max-w-5xl mx-auto space-y-4">
          
          {/* Controls Bar */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-app)] rounded-3xl p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="relative w-full sm:w-72">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="بحث بمعرّف السوني..."
                className="w-full bg-[var(--input-bg)] border border-[var(--border-app)] focus:border-[var(--border-hover)] rounded-xl pr-10 pl-4 py-2 text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none transition-all font-mono"
              />
            </div>

            <button
              onClick={() => navigate('/verify')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>توثيق حسابك في السوني</span>
            </button>
          </div>

          {/* Leaderboard Table / Cards */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-app)] rounded-3xl overflow-hidden shadow-2xl">
            <div className="divide-y divide-[var(--border-app)]">
              {filteredUsers.map((user, idx) => {
                const stats = user.trophyStats || {
                  platinum: 0,
                  gold: 0,
                  silver: 0,
                  bronze: 0,
                  level: 1,
                  total: 0
                };

                return (
                  <div 
                    key={user.uid} 
                    className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-[var(--bg-card-hover)] transition-colors"
                  >
                    {/* Player Info with Anonymous/Private Avatar */}
                    <div className="flex items-center gap-4">
                      {/* Rank Number */}
                      <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm flex-shrink-0 ${
                        idx === 0 ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-lg' :
                        idx === 1 ? 'bg-slate-300 dark:bg-slate-400 text-black' :
                        idx === 2 ? 'bg-amber-600/30 text-[var(--text-main)] border border-amber-600/40' :
                        'bg-[var(--chip-bg)] text-[var(--text-sub)] border border-[var(--border-app)]'
                      }`}>
                        {idx + 1}
                      </div>

                      {/* Anonymous Avatar for Privacy */}
                      <div className="relative w-12 h-12 rounded-2xl bg-[var(--chip-bg)] border border-[var(--border-app)] flex items-center justify-center flex-shrink-0 text-[var(--text-main)] shadow-inner">
                        {/* Masked / Incognito Anonymous Icon */}
                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[var(--text-sub)]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="7" r="4" />
                          <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
                          <line x1="7" y1="7" x2="17" y2="7" strokeWidth="2.5" stroke="currentColor" />
                        </svg>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border border-[var(--bg-card)] flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base font-black text-[var(--text-main)] font-mono tracking-wide">
                            {user.psnId}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--chip-bg)] text-[var(--text-main)] border border-[var(--border-app)] text-[10px] font-bold">
                            <ShieldCheck className="w-3 h-3 text-emerald-500" />
                            <span>موثق رسمياً</span>
                          </span>
                        </div>
                        <div className="text-xs text-[var(--text-sub)] flex items-center gap-2 mt-0.5">
                          <span>مستوى التروفي (PSN Level):</span>
                          <strong className="text-[var(--text-main)] font-mono text-sm bg-[var(--chip-bg)] px-2 py-0.5 rounded-md border border-[var(--border-app)]">
                            {stats.level}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Trophy Breakdown: Platinum, Gold, Silver, Bronze & Total */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full md:w-auto justify-start md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[var(--border-app)]">
                      
                      {/* Platinum */}
                      <div className="px-3 py-1.5 rounded-xl bg-[var(--chip-bg)] border border-[var(--border-app)] text-center min-w-[64px]">
                        <div className="text-[10px] font-bold text-[var(--text-sub)]">بلاتينيوم</div>
                        <div className="text-sm font-black text-[var(--text-main)] font-mono">
                          {stats.platinum}
                        </div>
                      </div>

                      {/* Gold */}
                      <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-center min-w-[60px]">
                        <div className="text-[10px] font-bold text-amber-500 dark:text-amber-300">ذهبي</div>
                        <div className="text-sm font-black text-amber-600 dark:text-amber-200 font-mono">
                          {stats.gold}
                        </div>
                      </div>

                      {/* Silver */}
                      <div className="px-3 py-1.5 rounded-xl bg-slate-400/10 border border-slate-400/25 text-center min-w-[60px]">
                        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-300">فضي</div>
                        <div className="text-sm font-black text-slate-700 dark:text-slate-100 font-mono">
                          {stats.silver}
                        </div>
                      </div>

                      {/* Bronze */}
                      <div className="px-3 py-1.5 rounded-xl bg-orange-700/10 border border-orange-700/25 text-center min-w-[60px]">
                        <div className="text-[10px] font-bold text-orange-600 dark:text-orange-300">برونزي</div>
                        <div className="text-sm font-black text-orange-700 dark:text-orange-200 font-mono">
                          {stats.bronze}
                        </div>
                      </div>

                      {/* Total */}
                      <div className="px-3 py-1.5 rounded-xl bg-[var(--chip-bg)] border border-[var(--border-app)] text-center min-w-[68px]">
                        <div className="text-[10px] font-bold text-[var(--text-muted)]">الإجمالي</div>
                        <div className="text-sm font-black text-[var(--text-main)] font-mono">
                          {stats.total || (stats.platinum + stats.gold + stats.silver + stats.bronze)}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="max-w-2xl mx-auto bg-[var(--bg-card)] border border-[var(--border-app)] rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[var(--chip-bg)] border border-[var(--border-app)] flex items-center justify-center">
            <Trophy className="w-10 h-10 text-[var(--text-muted)]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--text-main)]">
              لا يوجد متصدرين موثقين حالياً
            </h2>
            <p className="text-sm text-[var(--text-sub)] max-w-md mx-auto leading-relaxed">
              كن أول من يوثق حسابه في السوني وينضم إلى صدارة صائدي البلاتينيوم في كاتشي.
            </p>
          </div>
          <button
            onClick={() => navigate('/verify')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-black text-sm hover:opacity-90 transition-all cursor-pointer shadow-lg"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>توثيق حسابك الآن</span>
          </button>
        </div>
      )}

    </div>
  );
}

