import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { FileText } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#08090d] border-t border-white/10 py-10 px-4 lg:px-8 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        
        {/* Brand */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Quick Links with single Terms of Use */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
          <Link to="/" className="hover:text-white transition-colors">
            الرئيسية
          </Link>
          <Link to="/games" className="hover:text-white transition-colors">
            تروفيات
          </Link>
          <Link to="/leaderboard" className="hover:text-white transition-colors">
            لوحة المتصدرين
          </Link>
          <Link to="/verify" className="hover:text-white transition-colors">
            توثيق الحساب
          </Link>
          <Link
            to="/terms"
            className="hover:text-white transition-colors flex items-center gap-1.5 text-gray-300 font-medium"
          >
            <FileText className="w-3.5 h-3.5 text-white" />
            <span>شروط الاستخدام</span>
          </Link>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <div>جميع الحقوق محفوظة © 2026 كاتشي KACHI.</div>
        <div className="flex items-center gap-2">
          <span>المملكة العربية السعودية</span>
        </div>
      </div>
    </footer>
  );
}

