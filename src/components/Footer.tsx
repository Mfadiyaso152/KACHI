import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { TermsModal } from './TermsModal';
import { FileText } from 'lucide-react';

export function Footer() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#08090d] border-t border-white/10 py-12 px-4 lg:px-8 text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand */}
          <div className="space-y-3 md:col-span-2">
            <Logo />
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed pt-1">
              منصة كاتشي (KACHI 勝) لتروفيات البلاتينيوم وألعاب البلايستيشن في المملكة العربية السعودية والوطن العربي.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/games" className="hover:text-white transition-colors">
                  الألعاب والتروفيات
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-white transition-colors">
                  لوحة المتصدرين
                </Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-white transition-colors">
                  توثيق الحساب بالسوني
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors text-right flex items-center gap-1.5 cursor-pointer text-gray-300"
                >
                  <FileText className="w-3.5 h-3.5 text-white" />
                  <span className="font-bold">شروط الاستخدام</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">عن كاتشي</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              منصة متخصصة لتسهيل تتبع تروفيات ألعاب PlayStation، توفير خطوات البلاتينيوم، وتوثيق الحسابات مع خصوصية تامة.
            </p>
            <div>
              <Link
                to="/terms"
                className="text-xs text-gray-400 hover:text-white underline underline-offset-4 cursor-pointer"
              >
                شروط الاستخدام والسياسات
              </Link>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>جميع الحقوق محفوظة © 2026 كاتشي KACHI.</div>
          <div className="flex items-center gap-2">
            <span>المملكة العربية السعودية</span>
          </div>
        </div>
      </footer>

      {/* Terms & Conditions Modal */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </>
  );
}
