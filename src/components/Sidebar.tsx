import { useNavigate, useLocation } from 'react-router-dom';
import { X, Gamepad2, Sparkles, ShieldCheck, Home, Award, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { Logo } from './Logo';
import { User } from '../lib/firebase';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogOut: () => void;
}

export function Sidebar({ 
  isOpen, 
  onClose, 
  currentUser, 
  onOpenAuth, 
  onLogOut 
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!isOpen) return null;

  const path = location.pathname;
  const isHome = path === '/';
  const isGames = path === '/games' || path.startsWith('/games/');
  const isLeaderboard = path === '/leaderboard';
  const isVerify = path === '/verify';

  const handleNav = (targetPath: string) => {
    navigate(targetPath);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-[#12141c] border-r border-white/10 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#161922]">
          <Logo />
          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Account Strip */}
        <div className="p-4 border-b border-white/10 bg-black/30">
          {currentUser ? (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 overflow-hidden">
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="user" className="w-8 h-8 rounded-full object-cover border border-white/20" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold text-white">
                    {currentUser.displayName?.[0] || 'U'}
                  </div>
                )}
                <div className="overflow-hidden text-right">
                  <div className="text-xs font-bold text-white truncate">{currentUser.displayName || 'مستخدم'}</div>
                  <div className="text-[10px] text-gray-400 truncate">{currentUser.email}</div>
                </div>
              </div>

              <button
                onClick={() => {
                  onLogOut();
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onOpenAuth();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-black font-bold text-xs hover:bg-gray-200 transition-colors shadow-sm cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>تسجيل الدخول (Google / MS)</span>
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
            القوائم الرئيسية
          </div>

          <button
            onClick={() => handleNav('/')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right font-medium transition-all cursor-pointer ${
              isHome
                ? 'bg-white text-black font-bold shadow-lg'
                : 'text-gray-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>الرئيسية (عن المنصة)</span>
          </button>

          <button
            onClick={() => handleNav('/games')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right font-medium transition-all cursor-pointer ${
              isGames
                ? 'bg-white text-black font-bold shadow-lg'
                : 'text-gray-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
            <span>التروفيات وأدلة البلاتينيوم</span>
          </button>

          <button
            onClick={() => handleNav('/leaderboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right font-medium transition-all cursor-pointer ${
              isLeaderboard
                ? 'bg-white text-black font-bold shadow-lg'
                : 'text-gray-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Award className="w-5 h-5" />
            <span>لوحة المتصدرين</span>
          </button>

          <button
            onClick={() => handleNav('/verify')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right font-medium transition-all cursor-pointer ${
              isVerify
                ? 'bg-white text-black font-bold shadow-lg'
                : 'text-gray-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span>توثيق الحساب بالسوني</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0c0d12] text-center text-xs text-gray-500">
          جميع الحقوق محفوظة © 2026 كاتشي KACHI
        </div>

      </div>
    </div>
  );
}
