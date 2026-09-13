import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home,
  Menu, 
  ShieldCheck, 
  Sparkles, 
  Gamepad2, 
  LogIn, 
  LogOut, 
  User as UserIcon,
  Sliders
} from 'lucide-react';
import { Logo } from './Logo';
import { User } from '../lib/firebase';
import { ADMIN_EMAIL } from '../lib/adminStore';

interface NavbarProps {
  onToggleSidebar: () => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogOut: () => void;
  isUserVerified?: boolean;
}

export function Navbar({ 
  onToggleSidebar, 
  currentUser, 
  onOpenAuth,
  onLogOut,
  isUserVerified = false
}: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const isHome = path === '/';
  const isGames = path === '/games' || path.startsWith('/games/');
  const isLeaderboard = path === '/leaderboard';
  const isVerify = path === '/verify';
  const isAdmin = path === '/admin';

  const isCurrentAdmin = currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  return (
    <header className="sticky top-0 z-40 bg-[#0c0d12]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left side: Logo */}
        <div className="flex items-center gap-3 md:gap-4 order-1 md:order-1">
          <div 
            onClick={() => navigate('/')}
            className="cursor-pointer flex items-center flex-shrink-0"
          >
            <Logo />
          </div>
        </div>

        {/* Center/Desktop Navigation - Icons only with rich tooltips */}
        <nav className="hidden md:flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/10 order-2">
          <button
            onClick={() => navigate('/')}
            title="الرئيسية"
            aria-label="الرئيسية"
            className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
              isHome
                ? 'bg-white text-black shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Home className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => navigate('/games')}
            title="تروفيات الألعاب"
            aria-label="تروفيات الألعاب"
            className={`p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
              isGames
                ? 'bg-white text-black shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate('/leaderboard')}
            title="لوحة المتصدرين"
            aria-label="لوحة المتصدرين"
            className={`p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
              isLeaderboard
                ? 'bg-white text-black shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate('/verify')}
            title="توثيق الحساب بالسوني"
            aria-label="توثيق الحساب بالسوني"
            className={`p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
              isVerify
                ? 'bg-white text-black shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
          </button>

          {isCurrentAdmin && (
            <button
              onClick={() => navigate('/admin')}
              title="لوحة الإدارة"
              aria-label="لوحة الإدارة"
              className={`p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                isAdmin
                  ? 'bg-white text-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sliders className="w-5 h-5" />
            </button>
          )}
        </nav>

        {/* Right side: Auth Icon Button + Hamburger Menu */}
        <div className="flex items-center gap-2.5 md:gap-3 order-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white shadow-sm">
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="user" className="w-5 h-5 rounded-full object-cover border border-white/20" />
                ) : (
                  <UserIcon className="w-4 h-4 text-gray-300" />
                )}
                <span className="font-medium max-w-[120px] sm:max-w-[180px] truncate flex items-center gap-1">
                  <span>مرحباً {currentUser.displayName || currentUser.email?.split('@')[0]}</span>
                  {isUserVerified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" title="حساب موثق" />
                  )}
                </span>
              </div>

              <button
                onClick={onLogOut}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                title="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="p-2.5 rounded-xl bg-white text-black hover:bg-gray-200 transition-all shadow-md cursor-pointer flex items-center justify-center flex-shrink-0"
              title="تسجيل الدخول"
              aria-label="تسجيل الدخول"
            >
              <LogIn className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={onToggleSidebar}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 transition-all duration-200 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer flex-shrink-0"
            title="القائمة الجانبية"
          >
            <Menu className="w-5 h-5 md:w-6 md:h-6 transform group-hover:scale-105 transition-transform" />
          </button>
        </div>

      </div>
    </header>
  );
}
