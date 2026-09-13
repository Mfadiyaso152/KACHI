import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { 
  X, 
  Gamepad2, 
  ShieldCheck, 
  Home, 
  Award, 
  LogIn, 
  LogOut, 
  Sliders,
  FileText
} from 'lucide-react';
import { Logo } from './Logo';
import { User } from '../lib/firebase';
import { ADMIN_EMAIL } from '../lib/adminStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogOut: () => void;
  isUserVerified?: boolean;
}

export function Sidebar({ 
  isOpen, 
  onClose, 
  currentUser, 
  onOpenAuth, 
  onLogOut,
  isUserVerified = false
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;
  const isHome = path === '/';
  const isGames = path === '/games' || path.startsWith('/games/');
  const isLeaderboard = path === '/leaderboard';
  const isVerify = path === '/verify';
  const isAdmin = path === '/admin';

  const isCurrentAdmin = currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const handleNav = (targetPath: string) => {
    navigate(targetPath);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with smooth gradual fade */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Drawer opening with smooth gradual ease-out spring transition from right */}
          <motion.div 
            initial={{ x: '100%', opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.8 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260, mass: 0.85 }}
            className="absolute inset-y-0 right-0 max-w-xs w-full bg-[#12141c] border-l border-white/10 shadow-2xl flex flex-col"
          >
            
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#161922]">
              <div onClick={() => handleNav('/')} className="cursor-pointer flex items-center">
                <Logo />
              </div>
              <motion.button 
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="إغلاق القائمة"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* User Account Strip */}
            <div className="p-4 border-b border-white/10 bg-black/30">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      {currentUser.photoURL ? (
                        <img src={currentUser.photoURL} alt="user" className="w-9 h-9 rounded-full object-cover border border-white/20" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold text-white">
                          {currentUser.displayName?.[0] || 'U'}
                        </div>
                      )}
                      <div className="overflow-hidden text-right">
                        <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                          <span>{currentUser.displayName || 'مستخدم'}</span>
                          {isUserVerified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" title="حساب موثق" />
                          )}
                        </div>
                        <div className="text-[10px] text-gray-400 truncate font-mono">{currentUser.email}</div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => {
                        onLogOut();
                        onClose();
                      }}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                      title="تسجيل الخروج"
                    >
                      <LogOut className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Status info */}
                  <div className="flex items-center gap-1.5 pt-1 text-[11px]">
                    {isUserVerified ? (
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-white font-bold border border-white/20 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>حساب موثق بالسوني</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-gray-400 font-medium">
                        غير موثق بالسوني بعد
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onOpenAuth();
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-black font-bold text-xs hover:bg-gray-200 transition-colors shadow-sm cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>تسجيل الدخول</span>
                </motion.button>
              )}
            </div>

            {/* Navigation Links with staggered animation */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                القوائم
              </div>

              <motion.button
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNav('/')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right font-medium transition-all cursor-pointer ${
                  isHome
                    ? 'bg-white text-black font-bold shadow-lg'
                    : 'text-gray-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Home className="w-5 h-5" />
                <div className="text-right">
                  <div>الرئيسية</div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNav('/games')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right font-medium transition-all cursor-pointer ${
                  isGames
                    ? 'bg-white text-black font-bold shadow-lg'
                    : 'text-gray-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Gamepad2 className="w-5 h-5" />
                <div className="text-right">
                  <div>تروفيات</div>
                </div>
              </motion.button>

              {/* Leaderboard */}
              <motion.button
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNav('/leaderboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right font-medium transition-all cursor-pointer ${
                  isLeaderboard
                    ? 'bg-white text-black font-bold shadow-lg'
                    : 'text-gray-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Award className="w-5 h-5" />
                <div className="text-right">
                  <div>لوحة المتصدرين</div>
                </div>
              </motion.button>

              {/* Verification */}
              <motion.button
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNav('/verify')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right font-medium transition-all cursor-pointer ${
                  isVerify
                    ? 'bg-white text-black font-bold shadow-lg'
                    : 'text-gray-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <div className="text-right">
                  <div>توثيق الحساب</div>
                </div>
              </motion.button>

              {/* ADMIN ONLY SECTION */}
              {isCurrentAdmin && (
                <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
                  <div className="text-[11px] font-bold text-white uppercase tracking-wider px-3 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-white" />
                    <span>الإدارة</span>
                  </div>

                  <motion.button
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNav('/admin')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right font-bold transition-all cursor-pointer ${
                      isAdmin
                        ? 'bg-white text-black shadow-lg'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    <Sliders className="w-5 h-5" />
                    <div className="text-right">
                      <div>لوحة الإدارة والطلبات</div>
                    </div>
                  </motion.button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-[#0c0d12] text-center text-xs text-gray-500">
              جميع الحقوق محفوظة © 2026 كاتشي KACHI
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
