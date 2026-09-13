import { useState, useEffect, FormEvent } from 'react';
import { 
  Gamepad2, 
  KeyRound, 
  Copy, 
  Check, 
  AlertCircle, 
  Sparkles,
  Clock,
  Send
} from 'lucide-react';
import { User } from '../lib/firebase';
import { 
  submitVerificationRequest, 
  getUserSecret, 
  getStoredRequests, 
  DATA_SYNC_EVENT 
} from '../lib/adminStore';
import { VerificationRequest } from '../types';

interface VerificationViewProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  isVerified?: boolean;
}

export function VerificationView({ currentUser, onOpenAuth, isVerified = false }: VerificationViewProps) {
  const [psnId, setPsnId] = useState('');
  const [isCopiedSecret, setIsCopiedSecret] = useState(false);
  const [isCopiedAdmin, setIsCopiedAdmin] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<VerificationRequest | null>(null);
  const [error, setError] = useState<string | null>(null);

  const adminPsn = 'KachiOfficial';
  const userSecret = currentUser?.email ? getUserSecret(currentUser.email) : 'KC-••••';

  const checkExistingRequest = () => {
    if (!currentUser?.email) return;
    const reqs = getStoredRequests();
    const myReq = reqs.find(r => r.userEmail.toLowerCase() === currentUser.email?.toLowerCase());
    if (myReq) {
      setSubmittedRequest(myReq);
      if (myReq.psnId) setPsnId(myReq.psnId);
    }
  };

  useEffect(() => {
    checkExistingRequest();

    const handleSync = () => {
      checkExistingRequest();
    };

    window.addEventListener(DATA_SYNC_EVENT, handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener(DATA_SYNC_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [currentUser?.email]);

  const handleCopySecret = () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    navigator.clipboard.writeText(userSecret);
    setIsCopiedSecret(true);
    setTimeout(() => setIsCopiedSecret(false), 2000);
  };

  const handleCopyAdmin = () => {
    navigator.clipboard.writeText(adminPsn);
    setIsCopiedAdmin(true);
    setTimeout(() => setIsCopiedAdmin(false), 2000);
  };

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentUser) {
      onOpenAuth();
      return;
    }

    if (!psnId.trim()) {
      setError('يرجى إدخال اسم مستخدم حسابك في شبكة بلايستيشن (PSN ID)');
      return;
    }

    const req = submitVerificationRequest(
      {
        email: currentUser.email || '',
        displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'لاعب',
        uid: currentUser.uid
      },
      psnId.trim()
    );

    setSubmittedRequest(req);
  };

  const existingReq = submittedRequest;
  const isAccountVerified = Boolean(isVerified || existingReq?.status === 'approved');

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">

      {isAccountVerified ? (
        /* Verified Account: Only show clean checkmark card with verified PSN ID */
        <div className="bg-[var(--bg-card)] border border-[var(--border-app)] rounded-3xl p-8 md:p-12 space-y-6 shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto shadow-lg">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-[var(--text-main)]">حسابك موثق</h3>
            <p className="text-sm text-[var(--text-sub)] max-w-md mx-auto">
              تم التحقق من حسابك وربط معرّف السوني بنجاح في منصة كاتشي.
            </p>
          </div>

          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-[var(--chip-bg)] border border-[var(--border-app)]">
            <Gamepad2 className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-xs text-[var(--text-sub)]">معرّف PSN المعتمد:</span>
            <span className="text-sm font-black font-mono text-[var(--text-main)]">
              {existingReq?.psnId || psnId || 'حساب موثق'}
            </span>
          </div>
        </div>
      ) : (
        <>
          {/* If Not Logged In Banner */}
          {!currentUser && (
            <div className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-app)] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1 text-center sm:text-right">
                <h3 className="text-base font-bold text-[var(--text-main)]">هل ترغب في توثيق حسابك؟</h3>
                <p className="text-xs text-[var(--text-sub)]">
                  يتطلب التوثيق تسجيل الدخول أولاً للربط بحسابك وتوليد كلمة السر المخصصة لك.
                </p>
              </div>
              <button
                onClick={onOpenAuth}
                className="px-6 py-2.5 rounded-2xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 font-bold text-xs transition-all shadow-md cursor-pointer flex-shrink-0"
              >
                تسجيل الدخول الآن
              </button>
            </div>
          )}

          {/* 3 Step Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Step 1: Add Account */}
            <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-app)] space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[var(--text-main)] bg-[var(--chip-bg)] px-2.5 py-0.5 rounded-full border border-[var(--border-app)]">
                  الخطوة 1
                </span>
                <Gamepad2 className="w-4 h-4 text-[var(--text-muted)]" />
              </div>
              <h4 className="text-sm font-bold text-[var(--text-main)]">إضافة حساب المنصة</h4>
              <p className="text-xs text-[var(--text-sub)] leading-relaxed">
                أضف حساب منصة كاتشي الرسمي على جهاز السوني:
              </p>
              <div className="flex items-center justify-between bg-[var(--input-bg)] p-2.5 rounded-xl border border-[var(--border-app)] font-mono">
                <span className="text-xs font-bold text-[var(--text-main)] tracking-wider">{adminPsn}</span>
                <button
                  onClick={handleCopyAdmin}
                  className="p-1.5 rounded-lg bg-[var(--chip-bg)] hover:bg-[var(--bg-card-hover)] text-[var(--text-main)] transition-all cursor-pointer border border-[var(--border-app)]"
                  title="نسخ الحساب"
                >
                  {isCopiedAdmin ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Step 2: Send Secret Code */}
            <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-app)] space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[var(--text-main)] bg-[var(--chip-bg)] px-2.5 py-0.5 rounded-full border border-[var(--border-app)]">
                  الخطوة 2
                </span>
                <KeyRound className="w-4 h-4 text-[var(--text-muted)]" />
              </div>
              <h4 className="text-sm font-bold text-[var(--text-main)]">كلمة السر العشوائية</h4>
              <p className="text-xs text-[var(--text-sub)] leading-relaxed">
                أرسل كلمة السر هذه برسالة لحساب المنصة في السوني:
              </p>
              <div className="flex items-center justify-between bg-[var(--input-bg)] p-2.5 rounded-xl border border-[var(--border-app)] font-mono">
                <span className="text-sm font-black text-emerald-500 tracking-wider">
                  {currentUser ? userSecret : 'KC-••••'}
                </span>
                {currentUser && (
                  <button
                    onClick={handleCopySecret}
                    className="p-1.5 rounded-lg bg-[var(--chip-bg)] hover:bg-[var(--bg-card-hover)] text-[var(--text-main)] transition-all cursor-pointer border border-[var(--border-app)]"
                    title="نسخ كلمة السر"
                  >
                    {isCopiedSecret ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>

            {/* Step 3: Admin Approval */}
            <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-app)] space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[var(--text-main)] bg-[var(--chip-bg)] px-2.5 py-0.5 rounded-full border border-[var(--border-app)]">
                  الخطوة 3
                </span>
                <Sparkles className="w-4 h-4 text-[var(--text-muted)]" />
              </div>
              <h4 className="text-sm font-bold text-[var(--text-main)]">التأكيد وإدراجك</h4>
              <p className="text-xs text-[var(--text-sub)] leading-relaxed">
                تقوم الإدارة بمطابقة كلمة السر وتأكيد عدد تروفياتك وإدراجك مباشرة في لوحة المتصدرين.
              </p>
            </div>

          </div>

          {/* Verification Form Card */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-app)] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[var(--text-main)] mb-2">
                  معرّف حسابك في السوني (PSN Online ID):
                </label>
                <div className="relative">
                  <Gamepad2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={psnId}
                    onChange={(e) => setPsnId(e.target.value)}
                    placeholder="مثال: SonyPlayer_99"
                    disabled={!currentUser}
                    className="w-full pl-4 pr-10 py-3.5 rounded-2xl bg-[var(--input-bg)] border border-[var(--border-app)] text-sm font-mono text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--border-hover)] transition-all disabled:opacity-50 shadow-inner"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-xs text-rose-500 dark:text-rose-300 bg-rose-500/10 border border-rose-500/20 p-3.5 rounded-xl">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Status of pending request */}
              {existingReq?.status === 'pending' && (
                <div className="p-4 rounded-2xl bg-[var(--chip-bg)] border border-[var(--border-app)] flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-[var(--text-main)] flex items-center gap-2">
                      <span>طلب التوثيق قيد المراجعة</span>
                      <span className="font-mono text-emerald-500 font-bold">({existingReq.verificationSecret})</span>
                    </div>
                    <p className="text-[var(--text-sub)]">
                      تأكد من إرسال كلمة السر <strong className="font-mono text-emerald-500">{existingReq.verificationSecret}</strong> عبر رسائل السوني إلى الحساب <strong className="font-mono text-[var(--text-main)]">{adminPsn}</strong>.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!currentUser}
                className="w-full py-4 rounded-2xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 font-black text-sm transition-all duration-200 shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>
                  {existingReq?.status === 'pending' ? 'تحديث وتأكيد إرسال الطلب' : 'إرسال طلب التوثيق للإدارة'}
                </span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

