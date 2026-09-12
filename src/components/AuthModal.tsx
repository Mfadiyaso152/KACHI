import { useState } from 'react';
import { signInWithGoogle, signInWithMicrosoft, User } from '../lib/firebase';
import { Logo } from './Logo';
import { ShieldCheck, AlertCircle, FileText } from 'lucide-react';
import { TermsModal } from './TermsModal';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: User) => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'microsoft' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoadingProvider('google');
    const result = await signInWithGoogle();
    setLoadingProvider(null);
    if (result.error) {
      setError(result.error);
    } else if (result.user) {
      onSuccess?.(result.user);
      onClose();
    }
  };

  const handleMicrosoftSignIn = async () => {
    setError(null);
    setLoadingProvider('microsoft');
    const result = await signInWithMicrosoft();
    setLoadingProvider(null);
    if (result.error) {
      setError(result.error);
    } else if (result.user) {
      onSuccess?.(result.user);
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-[#12141c] border border-white/20 rounded-3xl max-w-md w-full p-6 md:p-8 space-y-6 z-10 shadow-2xl overflow-hidden">
          
          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header with Logo */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <Logo showText={true} />
            </div>
            <h2 className="text-2xl font-black text-white">تسجيل الدخول إلى كاتشي</h2>
            <p className="text-xs text-gray-400">
              سجل دخولك لحفظ بياناتك ومتابعة توثيق حسابك في السوني
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-start gap-2.5 text-xs text-rose-300 bg-rose-500/10 border border-rose-500/20 p-3.5 rounded-xl">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-3">
            {/* Google Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loadingProvider !== null}
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-white hover:bg-gray-100 text-black font-bold text-sm transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50"
            >
              {loadingProvider === 'google' ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              )}
              <span>تسجيل الدخول بواسطة Google</span>
            </button>

            {/* Microsoft Button */}
            <button
              onClick={handleMicrosoftSignIn}
              disabled={loadingProvider !== null}
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-[#1c202d] hover:bg-[#252a3a] border border-white/15 text-white font-bold text-sm transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50"
            >
              {loadingProvider === 'microsoft' ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M1 1h10v10H1z" />
                  <path fill="#81bc06" d="M12 1h10v10H12z" />
                  <path fill="#05a6f0" d="M1 12h10v10H1z" />
                  <path fill="#ffba08" d="M12 12h10v10H12z" />
                </svg>
              )}
              <span>تسجيل الدخول بواسطة Microsoft</span>
            </button>
          </div>

          {/* Terms and Conditions Acceptance Link */}
          <div className="text-center pt-2">
            <p className="text-[11px] text-gray-400 leading-relaxed">
              بتسجيل دخولك، فإنك توافق على{' '}
              <button
                type="button"
                onClick={() => setIsTermsOpen(true)}
                className="text-white underline underline-offset-4 hover:text-gray-200 font-bold cursor-pointer inline-flex items-center gap-1"
              >
                <FileText className="w-3 h-3 inline" />
                <span>الشروط والأحكام</span>
              </button>{' '}
              الخاصة بمنصة كاتشي.
            </p>
          </div>

          {/* Security & note */}
          <div className="pt-3 border-t border-white/10 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
              <span>تسجيل آمن ومحمي عبر خدمات Firebase الرسمية</span>
            </div>
            <button
              onClick={onClose}
              className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              إلغاء والمتابعة كزائر
            </button>
          </div>

        </div>
      </div>

      {/* Terms Modal */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </>
  );
}
