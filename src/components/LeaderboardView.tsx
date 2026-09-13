import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, ShieldCheck, Trophy, Search, Sparkles } from 'lucide-react';
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
        <h1 className="text-3xl md:text-5xl font-black text-white">لوحة المتصدرين</h1>
      </div>

      {sortedUsers.length > 0 ? (
        <div className="max-w-5xl mx-auto space-y-4">
          
          {/* Controls Bar */}
          <div className="bg-[#12141c] border border-white/15 rounded-3xl p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="relative w-full sm:w-72">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="بحث بمعرّف السوني..."
                className="w-full bg-[#161922] border border-white/10 focus:border-white/40 rounded-xl pr-10 pl-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none transition-all font-mono"
              />
            </div>

            <button
              onClick={() => navigate('/verify')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>توثيق حسابك في السوني</span>
            </button>
          </div>

          {/* Leaderboard Table / Cards */}
          <div className="bg-[#12141c] border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
            <div className="divide-y divide-white/5">
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
                    className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Player Info with Anonymous/Private Avatar */}
                    <div className="flex items-center gap-4">
                      {/* Rank Number */}
                      <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm flex-shrink-0 ${
                        idx === 0 ? 'bg-white text-black shadow-lg' :
                        idx === 1 ? 'bg-gray-300 text-black' :
                        idx === 2 ? 'bg-gray-400 text-black' :
                        'bg-white/10 text-gray-300 border border-white/10'
                      }`}>
                        {idx + 1}
                      </div>

                      {/* Anonymous Avatar for Privacy */}
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-b from-white/15 to-white/5 border border-white/20 flex items-center justify-center flex-shrink-0 text-white shadow-inner">
                        {/* Masked / Incognito Anonymous Icon */}
                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="7" r="4" />
                          <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
                          <line x1="7" y1="7" x2="17" y2="7" strokeWidth="2.5" stroke="currentColor" />
                        </svg>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border border-[#12141c] flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-black stroke-[3]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base font-black text-white font-mono tracking-wide">
                            {user.psnId}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20 text-[10px] font-bold">
                            <ShieldCheck className="w-3 h-3 text-white" />
                            <span>موثق رسمياً</span>
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                          <span>مستوى التروفي (PSN Level):</span>
                          <strong className="text-white font-mono text-sm bg-white/10 px-2 py-0.5 rounded-md">
                            {stats.level}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Trophy Breakdown: Platinum, Gold, Silver, Bronze & Total */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full md:w-auto justify-start md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-white/5">
                      
                      {/* Platinum */}
                      <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-center min-w-[64px]">
                        <div className="text-[10px] font-bold text-gray-300">بلاتينيوم</div>
                        <div className="text-sm font-black text-white font-mono">
                          {stats.platinum}
                        </div>
                      </div>

                      {/* Gold */}
                      <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-center min-w-[60px]">
                        <div className="text-[10px] font-bold text-amber-300">ذهبي</div>
                        <div className="text-sm font-black text-amber-200 font-mono">
                          {stats.gold}
                        </div>
                      </div>

                      {/* Silver */}
                      <div className="px-3 py-1.5 rounded-xl bg-slate-300/10 border border-slate-300/25 text-center min-w-[60px]">
                        <div className="text-[10px] font-bold text-slate-300">فضي</div>
                        <div className="text-sm font-black text-slate-100 font-mono">
                          {stats.silver}
                        </div>
                      </div>

                      {/* Bronze */}
                      <div className="px-3 py-1.5 rounded-xl bg-orange-700/10 border border-orange-700/25 text-center min-w-[60px]">
                        <div className="text-[10px] font-bold text-orange-300">برونزي</div>
                        <div className="text-sm font-black text-orange-200 font-mono">
                          {stats.bronze}
                        </div>
                      </div>

                      {/* Total */}
                      <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center min-w-[68px]">
                        <div className="text-[10px] font-bold text-gray-400">الإجمالي</div>
                        <div className="text-sm font-black text-gray-200 font-mono">
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
        <div className="max-w-2xl mx-auto bg-[#12141c] border border-white/15 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-white/5 border border-white/15 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-gray-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-white">
              لا يوجد متصدرين موثقين حالياً
            </h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
              كن أول من يوثق حسابه في السوني وينضم إلى صدارة صائدي البلاتينيوم في كاتشي.
            </p>
          </div>
          <button
            onClick={() => navigate('/verify')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-black font-black text-sm hover:bg-gray-200 transition-all cursor-pointer shadow-lg"
          >
            <ShieldCheck className="w-4 h-4 text-black" />
            <span>توثيق حسابك الآن</span>
          </button>
        </div>
      )}

    </div>
  );
}

function Check(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
