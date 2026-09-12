import { Sparkles } from 'lucide-react';
import { ViewType } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0c0d12] border-t border-white/10 py-12 px-4 lg:px-8 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand info */}
        <div className="space-y-4 md:col-span-2">
          <Logo />
          <p className="text-xs text-gray-400 leading-relaxed max-w-md">
            منصة الألعاب والتروفيات الأولى في المملكة العربية السعودية. نوفر أدلة بلاتينيوم دقيقة لجميع ألعاب سوني، ولوحة متصدرين لأفضل 100 لاعب، ونظام توثيق حسابات آمن وسلس.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">روابط سريعة</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                الرئيسية
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('trophies')} className="hover:text-white transition-colors">
                التروفيات والبلاتينيوم
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('leaderboard')} className="hover:text-white transition-colors">
                لوحة المتصدرين (أفضل 100)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('verify')} className="hover:text-white transition-colors">
                توثيق الحساب
              </button>
            </li>
          </ul>
        </div>

        {/* About */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">عن كاتشي</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            منصة متخصصة لتسهيل تتبع تروفيات ألعاب PlayStation، توفير خطوات البلاتينيوم، وتوثيق الحسابات.
          </p>
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
