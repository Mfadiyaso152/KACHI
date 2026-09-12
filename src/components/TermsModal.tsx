import { useNavigate } from 'react-router-dom';
import { X, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const termsList = [
    {
      number: '1',
      title: 'صحة البيانات',
      content: 'يجب على المستخدم إدخال معلومات صحيحة عند إنشاء حسابه أو إضافة حساب PlayStation الخاص به.'
    },
    {
      number: '2',
      title: 'عدم التلاعب',
      content: 'يُمنع التلاعب بعدد التروفيات أو الـPlatinum أو أي إحصائيات أخرى بهدف تحسين ترتيب الحساب.'
    },
    {
      number: '3',
      title: 'التحقق من الحساب',
      content: 'يحق لإدارة KACHI طلب التحقق من بيانات اللاعب أو حساب PlayStation قبل اعتماد الحساب أو تحديث إحصائياته.'
    },
    {
      number: '4',
      title: 'التحديثات',
      content: 'لا يتم اعتماد تحديثات التروفيات والإحصائيات إلا بعد مراجعتها من إدارة KACHI وفق نظام التحقق المعتمد في المنصة.'
    },
    {
      number: '5',
      title: 'الترتيب',
      content: 'يتم تحديد ترتيب اللاعبين بناءً على البيانات المعتمدة من KACHI، ويحق للإدارة تصحيح أو تعديل الترتيب عند اكتشاف خطأ أو تلاعب.'
    },
    {
      number: '6',
      title: 'الحسابات الوهمية',
      content: 'يُمنع إنشاء حسابات متعددة أو وهمية بهدف التأثير على ترتيب اللاعبين أو المنافسات أو إحصائيات المنصة.'
    },
    {
      number: '7',
      title: 'انتحال الشخصية',
      content: 'يُمنع استخدام اسم أو هوية لاعب آخر أو تقديم حساب PlayStation لا يخص المستخدم.'
    },
    {
      number: '8',
      title: 'إساءة استخدام المنصة',
      content: 'يُمنع استخدام KACHI بطريقة تضر بالمنصة أو المستخدمين الآخرين، بما في ذلك استغلال الثغرات أو محاولة الوصول غير المصرح به إلى بيانات أو حسابات الآخرين.'
    },
    {
      number: '9',
      title: 'المحتوى',
      content: 'يجب ألا يقوم المستخدم بإضافة أو نشر أي محتوى مسيء أو مخالف للأنظمة أو يتضمن انتحالًا أو تشهيرًا أو تهديدًا أو إساءة للمستخدمين الآخرين.'
    },
    {
      number: '10',
      title: 'الأدلة والتروفيات',
      content: 'قد تحتوي بعض أدلة الألعاب على Spoilers، ويستخدمها اللاعب على مسؤوليته. وقد تتغير بعض طرق الحصول على التروفيات نتيجة تحديثات الألعاب.'
    },
    {
      number: '11',
      title: 'التوثيق',
      content: 'علامة التوثيق في KACHI تعني أن الحساب أو البيانات خضعت لعملية تحقق من إدارة المنصة، ويحق للإدارة إزالة التوثيق عند اكتشاف مخالفة أو معلومات غير صحيحة.'
    },
    {
      number: '12',
      title: 'الإجراءات الإدارية',
      content: 'يحق لإدارة KACHI حذف أو تعديل البيانات غير الصحيحة، واتخاذ الإجراءات المناسبة بحق الحسابات المخالفة.'
    },
    {
      number: '13',
      title: 'حظر الحساب',
      content: 'في حال مخالفة أي من شروط استخدام KACHI، يحق لإدارة المنصة حظر الحساب بشكل مؤقت أو دائم، أو تقييد بعض ميزاته، بحسب طبيعة المخالفة وتكرارها. ويشمل ذلك التلاعب بالتروفيات أو الترتيب، انتحال الشخصية، إنشاء حسابات وهمية، محاولة اختراق أو استغلال المنصة، أو الإضرار بالمنصة أو مستخدميها.',
      highlight: true
    },
    {
      number: '14',
      title: 'تحديث الشروط',
      content: 'يحق لـKACHI تحديث هذه الشروط عند الحاجة، وسيتم نشر النسخة المحدثة داخل المنصة.'
    },
    {
      number: '15',
      title: 'الموافقة',
      content: 'باستخدام KACHI أو إنشاء حساب فيها، يقر المستخدم بأنه قرأ هذه الشروط ووافق على الالتزام بها.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-[#12141c] border border-white/20 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 z-10 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">KACHI | كاتشي</h2>
              <p className="text-xs text-gray-400">شروط الاستخدام الرسمية</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto space-y-4 text-xs md:text-sm text-gray-300 leading-relaxed pr-1 pl-1">
          {termsList.map(term => (
            <div 
              key={term.number} 
              className={`p-4 rounded-xl border ${
                term.highlight 
                  ? 'bg-rose-500/10 border-rose-500/25' 
                  : 'bg-[#161922] border-white/10'
              }`}
            >
              <h4 className="font-bold text-white mb-1 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/10 inline-flex items-center justify-center text-[11px] font-mono">
                  {term.number}
                </span>
                <span>{term.title}</span>
              </h4>
              <p className="text-xs text-gray-300 pr-7">{term.content}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('/terms');
            }}
            className="text-xs text-gray-300 hover:text-white underline underline-offset-4 cursor-pointer flex items-center gap-1"
          >
            <span>فتح صفحة الشروط الكاملة</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white hover:bg-gray-200 text-black font-bold text-xs transition-colors cursor-pointer"
          >
            موافق وفهمت
          </button>
        </div>

      </div>
    </div>
  );
}
