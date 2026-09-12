import { Menu, ShieldCheck, Sparkles, Gamepad2, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { ViewType } from '../types';
import { Logo } from './Logo';
import { User } from '../lib/firebase';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onToggleSidebar: () => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogOut: () => void;
}

export function Navbar({ 
  currentView, 
  onNavigate, 
  onToggleSidebar, 
  currentUser, 
  onOpenAuth,
  onLogOut 
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#0c0d12]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Right side: 3 lines hamburger menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 transition-all duration-200 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
            title="القائمة الرئيسية (3 خطوط)"
          >
            <Menu className="w-6 h-6 transform group-hover:scale-105 transition-transform" />
          </button>
        </div>

        {/* Center/Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-black/40 p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => onNavigate('home')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              currentView === 'home'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            الرئيسية
          </button>
          <button
            onClick={() => onNavigate('trophies')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'trophies'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            التروفيات والبلاتينيوم
          </button>
          <button
            onClick={() => onNavigate('leaderboard')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'leaderboard'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            لوحة المتصدرين
          </button>
          <button
            onClick={() => onNavigate('verify')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'verify'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            توثيق الحساب
          </button>
        </nav>

        {/* Left side: Auth Button + Logo */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white">
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="user" className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <UserIcon className="w-4 h-4 text-gray-300" />
                )}
                <span className="max-w-[100px] truncate">{currentUser.displayName || currentUser.email?.split('@')[0]}</span>
              </div>

              <button
                onClick={onLogOut}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs md:text-sm font-bold hover:bg-gray-200 transition-all shadow-md cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>تسجيل الدخول</span>
            </button>
          )}

          <div 
            onClick={() => onNavigate('home')}
            className="cursor-pointer"
            title="كاتشي KACHI"
          >
            <Logo showText={false} className="w-9 h-9" />
          </div>
        </div>

      </div>
    </header>
  );
}
