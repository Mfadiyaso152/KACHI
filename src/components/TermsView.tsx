import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, CheckCircle2, AlertTriangle, FileText, Lock, Scale } from 'lucide-react';

export function TermsView() {
  const navigate = useNavigate();

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
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      
      {/* Top Breadcrumb & Return Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 hover:text-white transition-all cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للخلف</span>
        </button>
      </div>

      {/* Main Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#12141c] border border-white/15 p-8 md:p-12 shadow-2xl space-y-4 text-center md:text-right">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold font-mono">
            <Scale className="w-4 h-4 text-white" />
            <span>KACHI | كاتشي</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            شروط الاستخدام
          </h1>

          <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed">
            الوثيقة الرسمية والضوابط المنظمة لاستخدام منصة كاتشي، توثيق الحسابات، ونزاهة بيانات تروفيات PlayStation.
          </p>
        </div>
      </div>

      {/* Terms Content Card */}
      <div className="bg-[#12141c] border border-white/15 rounded-3xl p-6 md:p-10 shadow-xl space-y-6">
        
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 text-xs text-gray-400 font-mono">
          <FileText className="w-4 h-4 text-white" />
          <span>آخر تحديث: 2026 — تنطبق هذه البنود الـ 15 على جميع الأعضاء والزوار</span>
        </div>

        {/* The 15 Rules List */}
        <div className="space-y-4">
          {termsList.map((term) => (
            <div
              key={term.number}
              className={`p-5 md:p-6 rounded-2xl border transition-all ${
                term.highlight 
                  ? 'bg-rose-500/5 border-rose-500/30 shadow-md' 
                  : 'bg-[#161922] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Number Badge */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5 ${
                  term.highlight 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                    : 'bg-white/10 text-white border border-white/15'
                }`}>
                  {term.number}
                </div>

                {/* Content */}
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{term.title}</span>
                    {term.highlight && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                        مهم جداً
                      </span>
                    )}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans">
                    {term.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Confirmation Footer inside card */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/40 p-5 rounded-2xl border">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
            <span>باستخدامك لمنصة كاتشي، فإنك توافق التزاماً تاماً بكافة الشروط المذكورة أعلاه.</span>
          </div>

          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 font-bold text-xs transition-colors cursor-pointer shadow-md flex-shrink-0"
          >
            العودة للرئيسية
          </button>
        </div>

      </div>

    </div>
  );
}
