import { useEffect } from 'react';
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
  Moon,
  Sun
} from 'lucide-react';
import { Logo } from './Logo';
import { User } from '../lib/firebase';
import { ADMIN_EMAIL } from '../lib/adminStore';
import { useTheme } from '../lib/themeContext';

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
  const { theme, setTheme } = useTheme();

  const path = location.pathname;
  const isHome = path === '/';
  const isGames = path === '/games' || path.startsWith('/games/');
  const isLeaderboard = path === '/leaderboard';
  const isVerify = path === '/verify';
  const isAdmin = path === '/admin';

  const isCurrentAdmin = currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  // Prevent background scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isOpen]);

  const handleNav = (targetPath: string) => {
    navigate(targetPath);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with smooth gradual fade and touch scroll blocking */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            onTouchMove={(e) => e.preventDefault()}
            onWheel={(e) => e.preventDefault()}
          />

          {/* Drawer opening with smooth gradual ease-out spring transition from right */}
          <motion.div 
            initial={{ x: '100%', opacity: 0.85 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.85 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260, mass: 0.85 }}
            className="absolute inset-y-0 right-0 max-w-xs w-full bg-[var(--sidebar-bg)] border-l border-[var(--sidebar-border)] shadow-2xl flex flex-col text-[var(--text-main)] transition-colors duration-200"
          >
            
            {/* Header */}
            <div className="p-5 border-b border-[var(--sidebar-border)] flex items-center justify-between bg-[var(--sidebar-header)]">
              <div onClick={() => handleNav('/')} className="cursor-pointer flex items-center">
                <Logo />
              </div>
              <motion.button 
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                className="p-2 rounded-xl bg-[var(--chip-bg)] hover:bg-[var(--bg-card-hover)] text-[var(--text-sub)] hover:text-[var(--text-main)] border border-[var(--border-app)] transition-colors cursor-pointer"
                title="إغلاق القائمة"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* User Account Strip */}
            <div className="p-4 border-b border-[var(--sidebar-border)] bg-[var(--bg-card-secondary)]">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      {currentUser.photoURL ? (
                        <img src={currentUser.photoURL} alt="user" className="w-9 h-9 rounded-full object-cover border border-[var(--border-app)]" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[var(--chip-bg)] border border-[var(--border-app)] flex items-center justify-center text-xs font-bold text-[var(--text-main)]">
                          {currentUser.displayName?.[0] || 'U'}
                        </div>
                      )}
                      <div className="overflow-hidden text-right">
                        <div className="text-xs font-bold text-[var(--text-main)] truncate flex items-center gap-1">
                          <span>{currentUser.displayName || 'مستخدم'}</span>
                          {isUserVerified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" title="حساب موثق" />
                          )}
                        </div>
                        <div className="text-[10px] text-[var(--text-sub)] truncate font-mono">{currentUser.email}</div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => {
                        onLogOut();
                        onClose();
                      }}
                      className="p-2 rounded-lg bg-[var(--chip-bg)] hover:bg-[var(--bg-card-hover)] text-[var(--text-sub)] hover:text-[var(--text-main)] border border-[var(--border-app)] transition-colors cursor-pointer"
                      title="تسجيل الخروج"
                    >
                      <LogOut className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Status info */}
                  <div className="flex items-center gap-1.5 pt-1 text-[11px]">
                    {isUserVerified ? (
                      <span className="px-2 py-0.5 rounded-md bg-[var(--chip-bg)] text-[var(--text-main)] font-bold border border-[var(--border-app)] flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        <span>حساب موثق بالسوني</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-[var(--chip-bg)] text-[var(--text-muted)] font-medium">
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
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold text-xs hover:opacity-90 transition-colors shadow-sm cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>تسجيل الدخول</span>
                </motion.button>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider px-3 mb-2">
                  القوائم
                </div>

                <motion.button
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNav('/')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right font-medium transition-all cursor-pointer ${
                    isHome
                      ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold shadow-md'
                      : 'text-[var(--text-sub)] hover:bg-[var(--chip-bg)] hover:text-[var(--text-main)]'
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
                      ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold shadow-md'
                      : 'text-[var(--text-sub)] hover:bg-[var(--chip-bg)] hover:text-[var(--text-main)]'
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
                      ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold shadow-md'
                      : 'text-[var(--text-sub)] hover:bg-[var(--chip-bg)] hover:text-[var(--text-main)]'
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
                      ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold shadow-md'
                      : 'text-[var(--text-sub)] hover:bg-[var(--chip-bg)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5" />
                  <div className="text-right">
                    <div>توثيق الحساب</div>
                  </div>
                </motion.button>

                {/* ADMIN ONLY SECTION */}
                {isCurrentAdmin && (
                  <div className="pt-4 mt-4 border-t border-[var(--border-app)] space-y-2">
                    <div className="text-[11px] font-bold text-[var(--text-main)] uppercase tracking-wider px-3 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[var(--text-main)]" />
                      <span>الإدارة</span>
                    </div>

                    <motion.button
                      whileHover={{ x: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNav('/admin')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right font-bold transition-all cursor-pointer ${
                        isAdmin
                          ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-md'
                          : 'bg-[var(--chip-bg)] text-[var(--text-sub)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)] border border-[var(--border-app)]'
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
            </div>

            {/* Bottom Footer with small Sun / Moon Theme Toggle */}
            <div className="p-3.5 px-4 border-t border-[var(--sidebar-border)] bg-[var(--sidebar-header)] flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span className="text-[11px]">جميع الحقوق محفوظة © 2026 كاتشي</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl bg-[var(--chip-bg)] hover:bg-[var(--bg-card-hover)] text-[var(--text-main)] border border-[var(--border-app)] transition-all cursor-pointer flex items-center justify-center shadow-sm"
                title={theme === 'dark' ? 'التبديل إلى النمط الفاتح (شمس)' : 'التبديل إلى النمط الداكن (ليل)'}
                aria-label="تبديل المظهر"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-500" />
                )}
              </motion.button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
