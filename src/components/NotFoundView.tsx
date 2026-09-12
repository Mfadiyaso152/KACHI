import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft, Home, Search, ShieldAlert } from 'lucide-react';

interface NotFoundViewProps {
  title?: string;
  message?: string;
}

export function NotFoundView({ 
  title = 'الصفحة غير موجودة', 
  message = 'عذراً، اللعبة أو الرابط الذي تحاول الوصول إليه غير متوفر أو تم نقله.' 
}: NotFoundViewProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full bg-[#12141c] border border-white/15 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden space-y-6">
        
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold">
          <ShieldAlert className="w-4 h-4" />
          <span>خطأ 404 - صفحة غير متوفرة</span>
        </div>

        {/* Large 404 text with gamepad */}
        <div className="relative flex items-center justify-center">
          <span className="text-7xl md:text-8xl font-black text-white/10 select-none tracking-widest">
            404
          </span>
          <div className="absolute w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Gamepad2 className="w-8 h-8" />
          </div>
        </div>

        {/* Headings */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-black text-white">
            {title}
          </h1>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-md mx-auto">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/games"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-gray-200 text-black font-bold text-sm transition-all shadow-md cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>تصفح قائمة الألعاب</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-white/10 text-xs text-gray-500 flex items-center justify-center gap-1.5">
          <Search className="w-3.5 h-3.5" />
          <span>تأكد من كتابة الرابط بشكل صحيح مثل: /games/god-of-war-ragnarok</span>
        </div>

      </div>
    </div>
  );
}
