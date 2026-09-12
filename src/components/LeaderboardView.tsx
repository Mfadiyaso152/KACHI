import { useNavigate } from 'react-router-dom';
import { Award, ShieldCheck, ArrowLeft, Users, Sparkles, Trophy } from 'lucide-react';
import { getStoredUsers } from '../lib/adminStore';

export function LeaderboardView() {
  const navigate = useNavigate();

  // Get verified non-banned users from storage
  const verifiedUsers = getStoredUsers().filter(u => u.isVerified && !u.isBanned && u.psnId);

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold">
          <Award className="w-4 h-4 text-white" />
          <span>لوحة الشرف</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white">لوحة المتصدرين</h1>
        <p className="text-sm md:text-base text-gray-400">
          قائمة أفضل اللاعبين وصائدي تروفيات البلاتينيوم.
        </p>
      </div>

      {verifiedUsers.length > 0 ? (
        <div className="max-w-4xl mx-auto bg-[#12141c] border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-white" />
              <span>الصيادون المعتمدون والموثقون بالسوني ({verifiedUsers.length})</span>
            </h2>
            <button
              onClick={() => navigate('/verify')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>توثيق حسابك</span>
            </button>
          </div>

          <div className="divide-y divide-white/5">
            {verifiedUsers.map((user, idx) => (
              <div 
                key={user.uid} 
                className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                    idx === 0 ? 'bg-white text-black' :
                    idx === 1 ? 'bg-gray-200 text-black' :
                    idx === 2 ? 'bg-gray-400 text-black' :
                    'bg-white/10 text-gray-300'
                  }`}>
                    {idx + 1}
                  </div>

                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName} className="w-11 h-11 rounded-full object-cover border border-white/20" />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white">
                        {user.displayName?.[0] || 'U'}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{user.displayName}</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20 text-[10px]">
                          <ShieldCheck className="w-3 h-3" />
                          <span>موثق</span>
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 font-mono">
                        PSN ID: <strong className="text-white">{user.psnId}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-left">
                  <span className="text-xs text-gray-400 font-medium">عضو موثق</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State Card */
        <div className="max-w-2xl mx-auto bg-[#12141c] border border-white/15 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative w-24 h-24 mx-auto rounded-3xl bg-gradient-to-b from-white/15 to-white/5 border border-white/20 flex items-center justify-center shadow-inner">
            <Users className="w-12 h-12 text-gray-300" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-md">
              <Trophy className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-white">
              لا يوجد متصدرين حالياً
            </h2>
            <p className="text-sm md:text-base text-gray-400 max-w-md mx-auto leading-relaxed">
              لم يتم إضافة أي حساب حتى الآن في النسخة التجريبية الحالية.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/verify')}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white hover:bg-gray-200 text-black font-black text-base transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-black" />
              <span>توثيق حسابك</span>
              <ArrowLeft className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
