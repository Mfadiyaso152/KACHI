import { GameGuide } from '../types';

export const GAMES_DATA: GameGuide[] = [
  // 1. Resident Evil 2 Remake
  {
    id: 'resident-evil-2-remake',
    slug: 'resident-evil-2-remake',
    title: 'ريزدنت إيفل 2',
    englishTitle: 'Resident Evil 2',
    platform: 'PlayStation 4 / PlayStation 5',
    genre: 'رعب بقاء / ريميك',
    coverImage: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1inw.jpg',
    bannerImage: 'https://images.igdb.com/igdb/image/upload/t_1080p/sc66m6.jpg',
    difficulty: 6, // 6/10
    estimatedHours: '30+ ساعة',
    platinumRarity: '16.8%',
    totalTrophiesCount: 42,
    platinumCount: 1,
    goldCount: 4,
    silverCount: 9,
    bronzeCount: 28,
    missableTrophiesCount: 6,
    onlineTrophiesCount: 0,
    description: 'نسخة الريميك من Resident Evil 2 تعيد تقديم قصة ليون كينيدي وكلير ريدفيلد داخل مدينة راكون سيتي. الحصول على البلاتينيوم يتطلب إكمال عدة سيناريوهات، جمع مقتنيات، تنفيذ تحديات خاصة، وإنهاء اللعبة على مستويات صعوبة مرتفعة.',
    trophiesList: [
      {
        id: 're2-t1',
        title: 'أهلاً بك في مدينة الأموات',
        englishTitle: 'Welcome to the City of the Dead',
        description: 'تقدم في القصة حتى تصل إلى مركز شرطة مدينة راكون سيتي.',
        type: 'bronze',
        guide: 'تقدم طبيعياً في القصة الافتتاحية حتى تدخل بهو مركز شرطة راكون (R.P.D.) وتُفتح تلقائياً.'
      },
      {
        id: 're2-t2',
        title: 'طريق الإلهة',
        englishTitle: 'Path to the Goddess',
        description: 'حل لغز تمثال الإلهة داخل مركز الشرطة والتقدم إلى المنطقة التالية.',
        type: 'bronze',
        guide: 'اعثر على الميداليات الثلاث (الأسد، وحيد القرن، العذراء) وضعها في قاعدة تمثال الإلهة الرئيسي في البهو لفتح الممر السري.'
      },
      {
        id: 're2-t3',
        title: 'مطر لا ينتهي',
        englishTitle: 'Never-Ending Rain',
        description: 'أكمل جزء مركز الشرطة واهرب منه لمواصلة القصة.',
        type: 'bronze',
        guide: 'أنهِ كافة مهام وممرات مركز الشرطة واخرج من منطقة المرآب السفلي نحو شوارع ومجاري المدينة.'
      },
      {
        id: 're2-t4',
        title: 'اكتمال الاختراق',
        englishTitle: 'Hack Complete',
        description: 'أكمل الجزء الخاص بـ Ada Wong أثناء سيناريو Leon.',
        type: 'bronze',
        guide: 'تحكم بالعميلة آدا وانغ في مرحلة المجاري واستخدم جهاز الفحص الكهرومغناطيسي EMF لاختراق المفاتيح والمراوح حتى إنهاء القسم.'
      },
      {
        id: 're2-t5',
        title: 'الغميضة',
        englishTitle: 'Hide and Seek',
        description: 'أكمل الجزء الخاص بـ Sherry Birkin أثناء سيناريو Claire.',
        type: 'bronze',
        guide: 'العب بشخصية الطفلة شيري في دار الأيتام وتفادَ المأمور آيرونز بالاختباء خلف الأثاث حتى فتح الباب والهروب.'
      },
      {
        id: 're2-t6',
        title: 'حاجة ماسة إلى الاستحمام',
        englishTitle: 'A Great Need for a Shower',
        description: 'اهرب من المجاري وأكمل المرحلة الخاصة بها.',
        type: 'bronze',
        guide: 'اجمع قوابس الشطرنج الستة وافتح باب المخرج واستقل التلفريك السريع المؤدي إلى مختبرات مظلة NEST.'
      },
      {
        id: 're2-t7',
        title: 'بزوغ بطل',
        englishTitle: 'A Hero Emerges',
        description: 'أكمل قصة Leon بنجاح.',
        type: 'bronze',
        guide: 'أكمل سيناريو العميل ليون كينيدي وهزم الزعيم في المنصة واستقل القطار المتجه للخارج.'
      },
      {
        id: 're2-t8',
        title: 'بزوغ بطلة',
        englishTitle: 'A Heroine Emerges',
        description: 'أكمل قصة Claire بنجاح.',
        type: 'bronze',
        guide: 'أكمل سيناريو كلير ريدفيلد واحمِ الطفلة شيري حتى الوصول إلى قطار الإخلاء السريع.'
      },
      {
        id: 're2-t9',
        title: 'انهيار مظلة',
        englishTitle: 'Broken Umbrella',
        description: 'شاهد النهاية الحقيقية للقصة من خلال إكمال السيناريوهات المطلوبة.',
        type: 'silver',
        isHidden: true,
        guide: 'أكمل السيناريو الثاني (2nd Run / B Scenario) بأي شخصية بعد إنهاء السيناريو الأول لقتال الزعيم الحقيقي على القطار ومشاهدة النهاية الكاملة.'
      },
      {
        id: 're2-t10',
        title: 'أساسيات البقاء',
        englishTitle: 'The Basics of Survival',
        description: 'اصنع عنصرًا من خلال دمج عنصرين معًا، مثل دمج الأعشاب.',
        type: 'bronze',
        guide: 'افتح حقيبتك وادمج عشبة خضراء مع عشبة حمراء، أو ادمج بارودين لتصنيع الذخيرة.'
      },
      {
        id: 're2-t11',
        title: 'مساحة إضافية',
        englishTitle: 'Hip to Add Squares',
        description: 'اعثر على حقيبة Hip Pouch وقم بزيادة عدد خانات الحقيبة.',
        type: 'bronze',
        guide: 'اعثر على أول حقيبة خصر صغيرة موجودة في خزانة غرفة الأمانات أو الطابق الثالث في مركز الشرطة.'
      },
      {
        id: 're2-t12',
        title: 'التخصيص المتقن',
        englishTitle: 'Customizer',
        description: 'قم بتركيب قطعة تطوير على أحد الأسلحة.',
        type: 'bronze',
        guide: 'اعثر على قطعة تعديل سلاح (مثل مخزن إضافي أو كاتم صوت) وافتح الحقيبة وادمجها مع السلاح المناسب.'
      },
      {
        id: 're2-t13',
        title: 'تفضل هذا!',
        englishTitle: 'Eat This!',
        description: 'استخدم سلاحًا أو عنصرًا مناسبًا للقضاء على عدو في موقف محدد أثناء اللعب.',
        type: 'bronze',
        guide: 'عندما يهجم زومبي للإمساك بك، اضغط L1 لاستخدام السكين أو القنبلة كدفاع مضاد فوري في فمه.'
      },
      {
        id: 're2-t14',
        title: 'سيمسك بهم هذا',
        englishTitle: "That'll Hold 'Em",
        description: 'استخدم قنبلة أو سلاحًا مناسبًا لتثبيت مجموعة من الأعداء في مكانها.',
        type: 'bronze',
        guide: 'استخدم ألواح الخشب لتدعيم النوافذ الزجاجية في مركز الشرطة لمنع الزومبي من التسلل للداخل.'
      },
      {
        id: 're2-t15',
        title: 'إبادة الآفات',
        englishTitle: 'Vermin Extermination',
        description: 'اعثر على أحد Mr. Raccoons المخفيين وقم بتدميره.',
        type: 'bronze',
        guide: 'استمع لصوت الدمية المتحركة واطلق النار على أي تمثال Mr. Raccoon مخفي في المركز أو المجاري.'
      },
      {
        id: 're2-t16',
        title: 'عقل الخزنة',
        englishTitle: 'A Vault-like Mind',
        description: 'افتح أحد الخزائن أو الخزائن ذات القفل الخاص.',
        type: 'bronze',
        guide: 'أدخل الأرقام السرية لفتح أي خزانة حديدية دوارة أو قفل حروف (مثل قفل مكتب ليون NED و MRG).'
      },
      {
        id: 're2-t17',
        title: 'الاقتحام الأول',
        englishTitle: 'First Break-In',
        description: 'افتح أول خزنة محمولة Portable Safe.',
        type: 'bronze',
        guide: 'اعثر على الخزنة المحمولة واضغط الأزرار الثمانية بالترتيب الدائري الأخضر الصحيح لفتحها واستخراج المفتاح البديل.'
      },
      {
        id: 're2-t18',
        title: 'رفع القبعات!',
        englishTitle: 'Hats Off!',
        description: 'أطلق قبعة Mr. X أثناء مطاردته باستخدام سلاح مناسب.',
        type: 'bronze',
        guide: 'عندما يبدأ الوحش تايرنت (Mr. X) بمطاردتك، صوب بمسدسك أو بندقيتك مباشرة على قبعته وأسقطها برصاصة واحدة.'
      },
      {
        id: 're2-t19',
        title: 'مثل صيد الأطباق',
        englishTitle: 'Like Skeet Shooting',
        description: 'دمر أحد أهداف Mr. Raccoon أثناء وجوده في الهواء.',
        type: 'bronze',
        guide: 'أطلق النار على كلب زومبي أو ليكر أثناء قفزه في الهواء قبل أن يصل إليك.'
      },
      {
        id: 're2-t20',
        title: 'شهية طيبة',
        englishTitle: 'Bon Appétit',
        description: 'أطلق النار على قنبلة Frag Grenade تم وضعها داخل فم عدو.',
        type: 'bronze',
        guide: 'تسلح بقنبلة يدوية كعنصر دفاع مضاد، وعند هجوم الزومبي عليك ضعه في فمه ثم تراجع بسرعة واطلق عليه ليفجر رأسه.'
      },
      {
        id: 're2-t21',
        title: 'تطويق الموتى',
        englishTitle: 'Zombie Roundup',
        description: 'اقتل عددًا كبيرًا من الأعداء في منطقة أو موقف يتطلب التعامل مع مجموعة من الزومبي.',
        type: 'silver',
        guide: 'اجمع 3 أو أكثر من الزومبي في ممر ضيق والقِ قنبلة متفجرة لتصفيتهم جميعاً بضربة واحدة.'
      },
      {
        id: 're2-t22',
        title: 'جندي باسل',
        englishTitle: 'A Valiant Soldier',
        description: 'أكمل جزءًا من القصة يتطلب النجاة في مواجهة خطيرة.',
        type: 'bronze',
        guide: 'انجُ من المواجهة الصعبة واهرب من الغرفة المحاصرة قبل انقضاء المهلة المحددة.'
      },
      {
        id: 're2-t23',
        title: 'جاسوسة فائقة المهارة',
        englishTitle: 'One Slick Super-Spy',
        description: 'أكمل قسم Ada Wong دون الوقوع في الأخطاء المطلوبة لإنجاز التحدي.',
        type: 'bronze',
        isMissable: true,
        guide: 'أكمل طور آدا بالكامل دون استخدام المسدس أو أي سلاح ناري، واعتمد فقط على جهاز الاختراق EMF لتجاوز العقبات.'
      },
      {
        id: 're2-t24',
        title: 'صياد الكنوز',
        englishTitle: 'Treasure Hunter',
        description: 'اعثر على العناصر المخفية باستخدام أدلة Treasure Photo.',
        type: 'bronze',
        guide: 'حمّض فيلم الصور في الغرفة المظلمة لترى صورتين لكنز خفي (مكتب STARS ومكتب في ممر الأسلحة) واذهب للحصول عليهما.'
      },
      {
        id: 're2-t25',
        title: 'مستكشف الأسرار',
        englishTitle: 'Lore Explorer',
        description: 'اقرأ عددًا محددًا من الملفات والمستندات الموجودة في اللعبة.',
        type: 'bronze',
        guide: 'اقرأ وابحث عن المذكرات والملفات الموزعة في المكاتب والمختبرات والمجاري (إجمالي 58 ملفاً عبر الحملتين).'
      },
      {
        id: 're2-t26',
        title: 'خبير فتح الأقفال',
        englishTitle: 'Master of Unlocking',
        description: 'افتح جميع الخزائن والأقفال والأبواب التي تتطلب حلولًا خاصة.',
        type: 'silver',
        guide: 'افتح كافة الخزائن الجدارية الكبيرة الثلاث، وأقفال الخزانات الصغيرة، والخزائن المحمولة خلال تكرارات اللعب.'
      },
      {
        id: 're2-t27',
        title: 'مع متسع من الوقت',
        englishTitle: 'With Time to Spare',
        description: 'أكمل مواجهة رئيس محدد مع الالتزام بالوقت المطلوب.',
        type: 'silver',
        isMissable: true,
        guide: 'اهزم الزعيم G المرحلة الرابعة في سيناريو كلير مع بقاء أكثر من 4 دقائق في عداد وقت الهروب التنازلي.'
      },
      {
        id: 're2-t28',
        title: 'في رمشة عين',
        englishTitle: 'In the Blink of an Eye',
        description: 'اهزم رئيسًا محددًا بسرعة قبل الوصول إلى المرحلة التالية من المواجهة.',
        type: 'silver',
        isMissable: true,
        guide: 'اهزم الوحش Super Tyrant في سيناريو ليون مع بقاء أكثر من 5 دقائق في عداد الإخلاء النهائي.'
      },
      {
        id: 're2-t29',
        title: 'المقتصد الصارم',
        englishTitle: 'Frugalist',
        description: 'أكمل القصة دون استخدام أي عنصر علاجي.',
        type: 'silver',
        isMissable: true,
        difficultyRequirement: 'عادي / سهل (Assisted)',
        guide: 'أكمل اللعبة بأكملها دون استهلاك أي عشبة أو بخاخ إسعافي (First Aid Spray). يُفضل إنجازه على نمط Assisted لتجدد جزء من الصحة تلقائياً.'
      },
      {
        id: 're2-t30',
        title: 'الحد الأدنى',
        englishTitle: 'Minimalist',
        description: 'أكمل اللعبة باستخدام عدد محدود من أنواع الأسلحة، وفق شروط التحدي.',
        type: 'silver',
        isMissable: true,
        guide: 'أكمل قصة اللعبة كاملة دون فتح صندوق التخزين الإضافي Item Box نهائياً ولا مرة واحدة طوال التختيمة!'
      },
      {
        id: 're2-t31',
        title: 'إهدار للمساحة',
        englishTitle: 'A Waste of Space',
        description: 'وسّع حقيبتك إلى أقصى حد ممكن من خلال العثور على جميع حقائب Hip Pouch المطلوبة.',
        type: 'bronze',
        guide: 'اجمع حقائب الخصر الست الموزعة في مركز الشرطة وغرفة المجاري والمختبر لترقية الحقيبة إلى الحجم الأقصى.'
      },
      {
        id: 're2-t32',
        title: 'حاصد الأرواح',
        englishTitle: 'Grim Reaper',
        description: 'أكمل وضع The 4th Survivor الخاص بـ HUNK.',
        type: 'silver',
        difficultyRequirement: 'طور هانك الإضافي',
        guide: 'تحكم بالعميل هانك واهرب من المجاري حتى الباب الخارجي لمركز الشرطة وسط حشود الزومبي مع استخدام الموارد بحذر شديد.'
      },
      {
        id: 're2-t33',
        title: 'مستجد المحترفين',
        englishTitle: 'Hardcore Rookie',
        description: 'أكمل سيناريو Leon على مستوى Hardcore.',
        type: 'bronze',
        difficultyRequirement: 'Hardcore',
        guide: 'أنهِ قصة ليون على أعلى صعوبة، حيث لا يوجد حفظ تلقائي ويجب استخدام أشرطة الحبر Ink Ribbons.'
      },
      {
        id: 're2-t34',
        title: 'ليون س. كينيدي',
        englishTitle: 'Leon S. Kennedy',
        description: 'أكمل تحديًا متقدمًا مرتبطًا بإكمال سيناريو Leon.',
        type: 'silver',
        difficultyRequirement: 'S-Rank (Standard or Hardcore)',
        guide: 'احصل على تصنيف S في قصة ليون من خلال إنهاء السيناريو الأول في أقل من 3 ساعات ونصف (أو السيناريو الثاني في أقل من 3 ساعات).'
      },
      {
        id: 're2-t35',
        title: 'طالبة جامعية محترفة',
        englishTitle: 'Hardcore College Student',
        description: 'أكمل سيناريو Claire على مستوى Hardcore.',
        type: 'bronze',
        difficultyRequirement: 'Hardcore',
        guide: 'أنهِ قصة كلير على صعوبة Hardcore مع مواجهة وحوش الليكر والزعيم بيركين بإدارة دقيقة لقاذف القنابل.'
      },
      {
        id: 're2-t36',
        title: 'بطلة القرمزي المتوهجة',
        englishTitle: 'Sizzling Scarlet Hero',
        description: 'أكمل تحديًا متقدمًا مرتبطًا بإكمال سيناريو Claire.',
        type: 'silver',
        difficultyRequirement: 'S-Rank (Standard or Hardcore)',
        guide: 'احصل على تصنيف S في قصة كلير بإكمال السيناريو الأول في أقل من 3 ساعات ونصف.'
      },
      {
        id: 're2-t37',
        title: 'بزوغ بطل — إكمال التحدي',
        englishTitle: 'A Hero Emerges — Challenge Completion',
        description: 'أكمل متطلبات إكمال قصة Leon بالشروط المطلوبة.',
        type: 'gold',
        difficultyRequirement: 'Hardcore S-Rank',
        guide: 'أنهِ سيناريو ليون على صعوبة Hardcore مع تحقيق رتبة S (أقل من ساعتين ونصف للسيناريو الأول أو ساعتين للثاني).'
      },
      {
        id: 're2-t38',
        title: 'بزوغ بطلة — إكمال التحدي',
        englishTitle: 'A Heroine Emerges — Challenge Completion',
        description: 'أكمل متطلبات إكمال قصة Claire بالشروط المطلوبة.',
        type: 'gold',
        difficultyRequirement: 'Hardcore S-Rank',
        guide: 'أنهِ سيناريو كلير على صعوبة Hardcore مع تحقيق رتبة S بزمن قياسي.'
      },
      {
        id: 're2-t39',
        title: 'انهيار مظلة — النهاية الحقيقية',
        englishTitle: 'Broken Umbrella — True Ending',
        description: 'شاهد النهاية الحقيقية بعد إكمال السيناريوهات المطلوبة.',
        type: 'gold',
        isHidden: true,
        guide: 'أنهِ السيناريو الثاني (2nd Run) وتغلب على التحول الخامس والأخير لبيركين داخل مقطورة القطار لمشاهدة النهاية الأسطورية وهروب الناجين.'
      },
      {
        id: 're2-t40',
        title: 'الإكمال الاحترافي الخارق',
        englishTitle: 'Hardcore Completion',
        description: 'أكمل اللعبة على مستوى Hardcore وفق متطلبات الإنجاز.',
        type: 'gold',
        difficultyRequirement: 'Hardcore',
        guide: 'أكمل كلا سيناريوهي اللعبة على نمط Hardcore مع إتقان جميع استراتيجيات الركض والمراوغة وحفظ الذخائر.'
      },
      {
        id: 're2-t41',
        title: 'الناجي الكامل',
        englishTitle: 'Complete Survivor',
        description: 'أكمل جميع المتطلبات الرئيسية للحصول على أعلى مستوى من الإنجاز.',
        type: 'gold',
        guide: 'أكمل السجلات والتحديات الإضافية واجمع جميع دمى الراكون الـ 15 لفتح السكين اللانهائي القابل للاستخدام في كافة المحاولات.'
      },
      {
        id: 're2-t42',
        title: 'ابن راكون سيتي الأصيل',
        englishTitle: 'Raccoon City Native',
        description: 'احصل على جميع تروفيات Resident Evil 2 Remake الأخرى.',
        type: 'platinum',
        guide: 'مبروك! يفتح تلقائياً فور إنجاز كافة التروفيات الـ 41 الأخرى وتتويج مسيرتك بالبلاتينيوم المستحق في ريزدنت إيفل 2 ريميك.'
      }
    ]
  },

  // 2. Resident Evil Requiem
  {
    id: 'resident-evil-requiem',
    slug: 'resident-evil-requiem',
    title: 'رزدنت إيفل ريكويم',
    englishTitle: 'Resident Evil Requiem',
    platform: 'PS5',
    genre: 'رعب بقاء / أكشن',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/1/15/Resident_Evil_Requiem_Cover_Art.jpg',
    bannerImage: 'https://upload.wikimedia.org/wikipedia/en/1/15/Resident_Evil_Requiem_Cover_Art.jpg',
    difficulty: 6,
    estimatedHours: '35 - 45 ساعة',
    platinumRarity: '16.4%',
    totalTrophiesCount: 48,
    platinumCount: 1,
    goldCount: 3,
    silverCount: 14,
    bronzeCount: 30,
    missableTrophiesCount: 4,
    onlineTrophiesCount: 0,
    trophiesList: [
      {
        id: 'rer-plat',
        title: 'مرثية راكون الأخيرة',
        englishTitle: "Raccoon's Final Requiem",
        description: 'احصل على جميع تروفيات مغامرة رزدنت إيفل ريكويم.',
        type: 'platinum',
        guide: 'يُفتح فور جمع جميع التروفيات الـ 47 الأخرى في اللعبة وإنهاء مساري غريس آشكروفت وليون كينيدي.'
      },
      {
        id: 'rer-t1',
        title: 'عودة الأسطورة',
        englishTitle: "Veteran's Resolve",
        description: 'أكمل مسار العميل ليون كينيدي على أعلى مستوى صعوبة (Hardcore).',
        type: 'gold',
        guide: 'اعتمد على إدارة الذخيرة بحكمة واستخدم تفادي الهجمات بالسكين والتركيز على نقاط ضعف المتحولين.'
      },
      {
        id: 'rer-t2',
        title: 'كشف المستور',
        englishTitle: 'Truth in the Shadows',
        description: 'أكمل تحقيقات المحللة الفيدرالية غريس واكشف حقيقة مؤامرة مستشفى راكون المهجور.',
        type: 'gold',
        guide: 'مترابط بالقصة الرئيسية ويُفتح تلقائياً عند حل آخر لغز مختبري وإنهاء أحداث الفصل الختامي.'
      },
      {
        id: 'rer-t3',
        title: 'الهروب السريع',
        englishTitle: 'Flawless Escape',
        description: 'أنهِ القصة في أقل من 4 ساعات دون استخدام أكثر من 3 بخاخات إسعافية.',
        type: 'gold',
        isMissable: true,
        guide: 'يُفضل إنجازه في التختيمة الثانية بعد فتح الأسلحة غير المحدودة مع حفظ اللعبة في نقاط محددة فقط.'
      },
      {
        id: 'rer-t4',
        title: 'ترسانة راكون المتكاملة',
        englishTitle: 'Master Gunsmith',
        description: 'طوّر جميع الأسلحة المتاحة لشخصيتي ليون وغريس إلى الحد الأقصى.',
        type: 'silver',
        guide: 'اجمع قطع الخردة والمكونات المتقدمة من الخزائن وطاولات التطوير الموزعة عبر أرجاء الخريطة.'
      },
      {
        id: 'rer-t5',
        title: 'أرشيف الكارثة',
        englishTitle: 'Complete Dossier',
        description: 'اعثر على جميع الملفات والمذكرات السرية الـ 44 في اللعبة.',
        type: 'silver',
        isMissable: true,
        guide: 'استكشف الممرات الجانبية وتفقد خزائن الموظفين وقواعد البيانات قبل التقدم لنقطة اللاعودة.'
      }
    ]
  },

  // 3. Black Myth: Wukong
  {
    id: 'black-myth-wukong',
    slug: 'black-myth-wukong',
    title: 'بلاك ميث: ووكونغ',
    englishTitle: 'Black Myth: Wukong',
    platform: 'PS5',
    genre: 'أكشن آر بي جي / سولز لايك',
    coverImage: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co8325.jpg',
    bannerImage: 'https://images.igdb.com/igdb/image/upload/t_1080p/scou4r.jpg',
    difficulty: 7,
    estimatedHours: '50 - 65 ساعة',
    platinumRarity: '13.8%',
    totalTrophiesCount: 36,
    platinumCount: 1,
    goldCount: 4,
    silverCount: 11,
    bronzeCount: 20,
    missableTrophiesCount: 5,
    onlineTrophiesCount: 0,
    trophiesList: [
      {
        id: 'bmw-plat',
        title: 'الرحلة إلى الغرب',
        englishTitle: 'Final Destination',
        description: 'احصل على جميع تروفيات بلاك ميث: ووكونغ.',
        type: 'platinum',
        guide: 'يُمنح عند إنجاز كافة المهام الجانبية وهزيمة جميع زعماء الفصول الستة في دورة New Game+.'
      },
      {
        id: 'bmw-t1',
        title: 'استعادة الأثر',
        englishTitle: 'Six Senses Cleansed',
        description: 'استعد الحواس الست وحقق النهاية السرية لمصير القرد العظيم.',
        type: 'gold',
        guide: 'تغلب على إيرلانغ شين في جبل هواغو الأسطوري ثم انهِ القتال الأخير مع القرد الحجري.'
      },
      {
        id: 'bmw-t2',
        title: 'جامع البذور',
        englishTitle: 'Seeds of Change',
        description: 'اجمع كافة بذور النباتات النادرة وقدّمها لشخصية Chen Loong.',
        type: 'silver',
        isMissable: true,
        guide: 'اجمع 15 نوعاً من بذور النباتات المنتشرة بين الفصول واستلم المحاصيل المكتملة في القرية المخفية.'
      }
    ]
  },

  // 4. Elden Ring
  {
    id: 'elden-ring',
    slug: 'elden-ring',
    title: 'إلدين رينغ',
    englishTitle: 'Elden Ring',
    platform: 'PS5 / PS4',
    genre: 'أكشن آر بي جي / عالم مفتوح',
    coverImage: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg',
    bannerImage: 'https://images.igdb.com/igdb/image/upload/t_1080p/scb70y.jpg',
    difficulty: 7,
    estimatedHours: '80 - 120 ساعة',
    platinumRarity: '15.2%',
    totalTrophiesCount: 42,
    platinumCount: 1,
    goldCount: 3,
    silverCount: 14,
    bronzeCount: 24,
    missableTrophiesCount: 3,
    onlineTrophiesCount: 0,
    trophiesList: [
      {
        id: 'er-plat',
        title: 'إلدين رينغ',
        englishTitle: 'Elden Ring',
        description: 'احصل على جميع التروفيات في إلدين رينغ.',
        type: 'platinum',
        guide: 'يُفتح فور الحصول على النهايات الثلاث وهزيمة جميع الزعماء الأسطوريين وجمع العتاد الأسطوري.'
      },
      {
        id: 'er-t1',
        title: 'ملك الإلدين',
        englishTitle: 'Elden Lord',
        description: 'احصل على نهاية ملك الإلدين.',
        type: 'gold',
        guide: 'تفاعل مع تمثال ماريكا المكسور بعد هزيمة وحش الإلدين دون اختيار ريني أو لهب الجنون.'
      },
      {
        id: 'er-t2',
        title: 'عصر النجوم',
        englishTitle: 'Age of the Stars',
        description: 'احصل على نهاية عصر النجوم مع الساحرة ريني.',
        type: 'gold',
        guide: 'أكمل خط مهام ريني واستدعها من العلامة الزرقاء على الأرض بعد المعركة الأخيرة.'
      },
      {
        id: 'er-t3',
        title: 'ملك لهب الجنون',
        englishTitle: 'Lord of Frenzied Flame',
        description: 'احصل على نهاية لهب الجنون.',
        type: 'gold',
        guide: 'انزل لأعماق المجاري أسفل العاصمة الملكية واقبل وسم الأصابع الثلاثة.'
      },
      {
        id: 'er-t4',
        title: 'الأسلحة الأسطورية',
        englishTitle: 'Legendary Armaments',
        description: 'اجمع جميع الأسلحة الأسطورية الـ 9.',
        type: 'silver',
        isMissable: true,
        guide: 'تنبيه: التقط رمح Bolt of Gransax من تمثال الرمح العملاق في العاصمة ليندل قبل هزيمة مالكث لتفادي ضياعه.'
      }
    ]
  }
];

export function getAllGames(): GameGuide[] {
  return GAMES_DATA;
}

export function getGameBySlug(slug: string): GameGuide | undefined {
  if (!slug) return undefined;
  const cleanSlug = slug.trim().toLowerCase();
  return GAMES_DATA.find(
    (g) => g.slug.toLowerCase() === cleanSlug || g.id.toLowerCase() === cleanSlug
  );
}
