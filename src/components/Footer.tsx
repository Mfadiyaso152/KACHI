import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { FileText } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[var(--footer-bg)] border-t border-[var(--border-app)] py-10 px-4 lg:px-8 text-[var(--text-muted)] mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        
        {/* Brand */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Quick Links with single Terms of Use */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
          <Link to="/" className="hover:text-[var(--text-main)] transition-colors">
            الرئيسية
          </Link>
          <Link to="/games" className="hover:text-[var(--text-main)] transition-colors">
            تروفيات
          </Link>
          <Link to="/leaderboard" className="hover:text-[var(--text-main)] transition-colors">
            لوحة المتصدرين
          </Link>
          <Link to="/verify" className="hover:text-[var(--text-main)] transition-colors">
            توثيق الحساب
          </Link>
          <Link
            to="/terms"
            className="hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5 text-[var(--text-sub)] font-medium"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--text-main)]" />
            <span>شروط الاستخدام</span>
          </Link>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[var(--border-app)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-4">
        <div>جميع الحقوق محفوظة © 2026 كاتشي KACHI.</div>
        <div className="flex items-center gap-2">
          <span>المملكة العربية السعودية</span>
        </div>
      </div>
    </footer>
  );
}


