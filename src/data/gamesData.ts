import { GameGuide } from '../types';

export const GAMES_DATA: GameGuide[] = [
  // 10 Famous PlayStation Games
  {
    id: 'the-last-of-us-part-1',
    title: 'ذا لاست أوف أس الجزء الأول',
    englishTitle: 'The Last of Us Part I',
    platform: 'PS5',
    genre: 'أكشن مغامرات / نجاة',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1888930/header.jpg',
    difficulty: 2,
    estimatedHours: '15 - 20 ساعة',
    platinumRarity: '36.8%',
    missableTrophiesCount: 0,
    description: 'رحلة جول وإيلي العاطفية عبر أمريكا ما بعد الوباء مع تحسينات الرسومية وتجربة DualSense الكاملة على PS5.',
    steps: [
      {
        id: 'tlou-1',
        title: 'إنه لا يمكن أن يكون عبثاً (البلاتينيوم)',
        description: 'احصل على جميع تروفيات اللعبة، لا توجد تروفيات صعوبة أو قابلة للضياع بفضل ميزة تحديد الفصول.',
        type: 'platinum'
      },
      {
        id: 'tlou-2',
        title: 'ختم القصة وتجميع كل شيء',
        description: 'التقط القطع الأثرية الـ 97، المحادثات الاختيارية الـ 54، والقصص المصورة وبطاقات التداول.',
        type: 'gold'
      },
      {
        id: 'tlou-3',
        title: 'ترقية جميع الأسلحة بالكامل',
        description: 'استخدم طاولات العمل والقطع لترقية جميع أسلحة جول إلى المستوى الأقصى.',
        type: 'silver'
      }
    ]
  },
  {
    id: 'god-of-war-ragnarok',
    title: 'جود أوف وور: راغناروك',
    englishTitle: 'God of War Ragnarök',
    platform: 'PS5 / PS4',
    genre: 'أكشن مغامرات / أساطير إسكندنافية',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/header.jpg',
    difficulty: 4,
    estimatedHours: '50 - 60 ساعة',
    platinumRarity: '24.5%',
    missableTrophiesCount: 0,
    description: 'كريتوس وأتريوس في مواجهة نهاية العوالم التسعة والآلهة الإسكندنافية في ملحمة ختامية لا تُنسى.',
    steps: [
      {
        id: 'gowr-1',
        title: 'الدب والذئب (The Bear and the Wolf)',
        description: 'احصل على تروفي البلاتينيوم بعد إكمال جميع مهام القصة والعوالم.',
        type: 'platinum'
      },
      {
        id: 'gowr-2',
        title: 'هزيمة ملك البيرزيركر وجنا الفالكري الجديدة',
        description: 'اهزم جميع محاربي البيرزيركر ثم واجه الملك هروف في نيفلهايم، واهزم ملكة الفالكري جناح.',
        type: 'gold'
      },
      {
        id: 'gowr-3',
        title: 'استكشاف العوالم التسعة بنسبة 100%',
        description: 'أكمل جميع مهام صالح العوالم، وجمع الغربان، وصناديق نورنير.',
        type: 'gold'
      }
    ]
  },
  {
    id: 'spiderman-remastered',
    title: 'مارفل سبايدرمان',
    englishTitle: "Marvel's Spider-Man",
    platform: 'PS5 / PS4',
    genre: 'أكشن مغامرات / بطل خارق',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1817070/header.jpg',
    difficulty: 3,
    estimatedHours: '30 - 35 ساعة',
    platinumRarity: '45.1%',
    missableTrophiesCount: 0,
    description: 'تأرجح في سماء نيويورك بشخصية بيتر باركر، وواجه أشهر أعداء مارفل في تجربة قتالية واستكشافية رائعة.',
    steps: [
      {
        id: 'sp-1',
        title: 'أفضل بطل (Be Greater)',
        description: 'احصل على جميع التروفيات في اللعبة بدون أي تروفي قابل للضياع.',
        type: 'platinum'
      },
      {
        id: 'sp-2',
        title: 'تنظيف جميع الأحياء 100%',
        description: 'أوقف الجرائم العشوائية واجمع كل الحقائب والمحطات العلمية وأبراج المراقبة في مانهاتن.',
        type: 'gold'
      },
      {
        id: 'sp-3',
        title: 'فتح جميع البدلات وتطوير الأدوات',
        description: 'اصنع جميع بدلات سبايدرمان وافتح مهارات القتال والتأرجح.',
        type: 'silver'
      }
    ]
  },
  {
    id: 'ghost-of-tsushima',
    title: 'شبح تسوشيما',
    englishTitle: 'Ghost of Tsushima Director\'s Cut',
    platform: 'PS5 / PS4',
    genre: 'أكشن مغامرات / ساموراي',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2215430/header.jpg',
    difficulty: 3,
    estimatedHours: '50 - 60 ساعة',
    platinumRarity: '31.8%',
    missableTrophiesCount: 0,
    description: 'عش ملحمة الساموراي جين ساكاي وهو يدافع عن جزيرة تسوشيما ضد الغزو المغولي بين الشرف وأسلوب الشبح.',
    steps: [
      {
        id: 'got-1',
        title: 'شبح تسوشيما (Living Legend)',
        description: 'احصل على جميع تروفيات القصة والاستكشاف وتحرير الجزيرة.',
        type: 'platinum'
      },
      {
        id: 'got-2',
        title: 'تحرير أقاليم تسوشيما بالكامل',
        description: 'قم بتحرير جميع معسكرات المغول في إزوهارا وتويوتاما وكاميغاتا.',
        type: 'gold'
      },
      {
        id: 'got-3',
        title: 'حكايات الرفاق والأساطير',
        description: 'أكمل سلاسل مهام ماساكو، إيشيكاوا، نوريو، ويونا والمهام الأسطورية الـ 7.',
        type: 'gold'
      }
    ]
  },
  {
    id: 'elden-ring',
    title: 'إلدين رينغ',
    englishTitle: 'Elden Ring',
    platform: 'PS5 / PS4',
    genre: 'أكشن آر بي جي / عالم مفتوح',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg',
    difficulty: 7,
    estimatedHours: '80 - 120 ساعة',
    platinumRarity: '15.2%',
    missableTrophiesCount: 3,
    description: 'لعبة الأر بي جي الحائزة على لعبة العام من FromSoftware، في عالم الأراضي الوسطى الشاسع المليء بالأسرار والزعماء.',
    steps: [
      {
        id: 'er-1',
        title: 'إلدين رينغ (Elden Ring Platinum)',
        description: 'احصل على كافة التروفيات في اللعبة.',
        type: 'platinum'
      },
      {
        id: 'er-2',
        title: 'النهايات الثلاث الرئيسية',
        description: 'أكمل نهاية ملك الإلدين، ونهاية عصر النجوم مع ريني، ونهاية لهب الجنون (يمكن استخدام الحفظ السحابي).',
        isMissable: true,
        type: 'gold'
      },
      {
        id: 'er-3',
        title: 'الأسلحة والتعاويذ والرماد الأسطوري',
        description: 'اجمع الأسلحة والتعاويذ الأسطورية قبل تفجير العاصمة الملكية لتفادي ضياع بعضها.',
        isMissable: true,
        type: 'gold'
      }
    ]
  },
  {
    id: 'horizon-forbidden-west',
    title: 'هورايزون الغرب المحظور',
    englishTitle: 'Horizon Forbidden West',
    platform: 'PS5 / PS4',
    genre: 'أكشن أر بي جي / عالم مفتوح',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2420110/header.jpg',
    difficulty: 3,
    estimatedHours: '40 - 50 ساعة',
    platinumRarity: '21.4%',
    missableTrophiesCount: 1,
    description: 'انطلق مع إلوي إلى أراضي الغرب المحظور لمواجهة آلات عملاقة مذهلة وكشف سر الوباء الذي يهدد الأرض.',
    steps: [
      {
        id: 'hfw-1',
        title: 'جميع التروفيات مكتملة (All Trophies Obtained)',
        description: 'احصل على تروفي البلاتينيوم بعد إكمال مهام إلوي واستكشاف الغرب.',
        type: 'platinum'
      },
      {
        id: 'hfw-2',
        title: 'فحص جميع أنواع الآلات',
        description: 'تأكد من فحص آلة Specter و Specter Prime في المهمة الأخيرة لأنها قابلة للضياع.',
        isMissable: true,
        type: 'gold'
      },
      {
        id: 'hfw-3',
        title: 'تجاوز الأفران واصطياد الآلات الشرسة',
        description: 'أكمل جميع الأفران (Cauldrons) واهزم آلات أبيكس وافتح قدرات الشجرة بالكامل.',
        type: 'silver'
      }
    ]
  },
  {
    id: 'uncharted-legacy-of-thieves',
    title: 'أنشارتد: مجموعة إرث اللصوص',
    englishTitle: 'Uncharted: Legacy of Thieves Collection',
    platform: 'PS5',
    genre: 'أكشن مغامرات / إثارة سنمائية',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1659420/header.jpg',
    difficulty: 4,
    estimatedHours: '25 - 35 ساعة',
    platinumRarity: '18.9%',
    missableTrophiesCount: 0,
    description: 'استمتع بمغامرات ناثان دريك في Uncharted 4 وكلوي فريزر في The Lost Legacy برسومات محسنة وأداء سلس.',
    steps: [
      {
        id: 'unc-1',
        title: 'أسطورة صائدي الكنوز',
        description: 'أكمل اللعبتين واحصل على تروفي البلاتينيوم للنسخة المحسنة.',
        type: 'platinum'
      },
      {
        id: 'unc-2',
        title: 'إنهاء اللعبة على صعوبة Crushing',
        description: 'اختبر مهاراتك في أصعب مستوى صعوبة، مع إمكانية تفعيل ذخيرة لا نهائية بعد أول تختيم.',
        type: 'gold'
      },
      {
        id: 'unc-3',
        title: 'جمع الكنوز والمحادثات الاختيارية',
        description: 'اعثر على الكنوز الدفينة وسجلات المذكرات وملاحظات الرحلة عبر ميزة اختيار الفصول.',
        type: 'silver'
      }
    ]
  },
  {
    id: 'returnal',
    title: 'ريتيرنال',
    englishTitle: 'Returnal',
    platform: 'PS5',
    genre: 'روغلايك / إطلاق نار خيال علمي',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1649240/header.jpg',
    difficulty: 8,
    estimatedHours: '50 - 70 ساعة',
    platinumRarity: '11.3%',
    missableTrophiesCount: 0,
    description: 'تجربة حصرية ساحرة لـ PS5 تضعك في حلقة زمنية على كوكب أتروبوس الغامض مع استغلال مذهل لصوتيات 3D ويد التحكم.',
    steps: [
      {
        id: 'ret-1',
        title: 'هيليوس (Helios Platinum)',
        description: 'اكسر الحلقة الزمنية واجمع كافة مسوحات الاستكشاف في العوالم الستة.',
        type: 'platinum'
      },
      {
        id: 'ret-2',
        title: 'مسح جميع المناطق 100%',
        description: 'اجمع نصوص السينوغليف ومسجلات الصوت لجميع البيئات الحيوية (Biomes 1-6).',
        type: 'gold'
      },
      {
        id: 'ret-3',
        title: 'النهاية الحقيقية وسلسلة المنزل',
        description: 'أكمل جميع تسلسلات البيت واعثر على شظايا الشمس الست لفتح النهاية الحقيقية لكارثة سيلين.',
        type: 'gold'
      }
    ]
  },
  {
    id: 'helldivers-2',
    title: 'هيلدايفرز 2',
    englishTitle: 'Helldivers 2',
    platform: 'PS5',
    genre: 'تصويب تعاوني / حرب مجرية',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/553850/header.jpg',
    difficulty: 5,
    estimatedHours: '30 - 45 ساعة',
    platinumRarity: '19.7%',
    missableTrophiesCount: 0,
    description: 'انضم لصفوف الحرية والديمقراطية في المجرة وقاتل الحشرات والآليين مع زملائك في أمتع تجارب اللعب التعاوني على PS5.',
    steps: [
      {
        id: 'hd2-1',
        title: 'مثال للديمقراطية (The Epitome of Super Earth)',
        description: 'احصل على البلاتينيوم بإكمال جميع متطلبات المهام والأوسمة والتكتيكات.',
        type: 'platinum'
      },
      {
        id: 'hd2-2',
        title: 'إنهاء مهمة صعبة دون استخدام أسلحة أولية',
        description: 'أكمل مهمة بصعوبة 6 أو أعلى دون إطلاق رصاصة من سلاحك الأساسي أو الثانوي.',
        type: 'gold'
      },
      {
        id: 'hd2-3',
        title: 'إصابة 100 عدو بضربة مدارية ونجاة الفريق',
        description: 'نفذ الاستراتيجيات بنجاح واهرب مع فريقك كاملاً بعد تحقيق أهداف المهمة الرئيسية.',
        type: 'silver'
      }
    ]
  },
  {
    id: 'days-gone',
    title: 'ديز غون',
    englishTitle: 'Days Gone',
    platform: 'PS5 / PS4',
    genre: 'عالم مفتوح / نجاة وزومبي',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1259420/header.jpg',
    difficulty: 3,
    estimatedHours: '55 - 65 ساعة',
    platinumRarity: '27.6%',
    missableTrophiesCount: 0,
    description: 'قد دراجتك النارية عبر أوريغون المدمرة بشخصية ديكون سانت جون واقضِ على حشود الفريكرز الهائلة.',
    steps: [
      {
        id: 'dg-1',
        title: 'فارس الطريق السريع (One Percenter)',
        description: 'احصل على جميع تروفيات اللعبة في رحلة ديكون.',
        type: 'platinum'
      },
      {
        id: 'dg-2',
        title: 'القضاء على أول حشد فريكرز وحشود كاملة',
        description: 'اقضِ على جحافل الزومبي الضخمة باستخدام المتفجرات وتكتيكات البيئة.',
        type: 'gold'
      },
      {
        id: 'dg-3',
        title: 'تطوير الدراجة النارية والوصول لثقة المعسكرات',
        description: 'ارفع مستوى الثقة في جميع المعسكرات إلى الحد الأقصى وركب أفضل محرك وخزان للدراجة.',
        type: 'silver'
      }
    ]
  },

  // 5 Resident Evil Remake Games
  {
    id: 'resident-evil-4-remake',
    title: 'رزدنت إيفل 4 ريميك',
    englishTitle: 'Resident Evil 4 Remake',
    platform: 'PS5 / PS4',
    genre: 'رعب بقاء / ريميك أسطوري',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg',
    difficulty: 7,
    estimatedHours: '40 - 55 ساعة',
    platinumRarity: '16.5%',
    missableTrophiesCount: 4,
    description: 'ريميك تحفة كابكوم الخالدة لرحلة ليون كينيدي لإنقاذ آشلي من القرية الإسبانية الملعونة بأعلى المعايير الحديثة.',
    steps: [
      {
        id: 're4-1',
        title: 'تلميذ كوز (Cuz I\'m a Pro)',
        description: 'افتح جميع تروفيات ريميك Resident Evil 4 واحصل على البلاتينيوم.',
        type: 'platinum'
      },
      {
        id: 're4-2',
        title: 'رتبة S+ على صعوبة الاحتراف (Professional)',
        description: 'أنهِ اللعبة من البداية (New Game) على صعوبة Professional في أقل من 5 ساعات ونصف وبأقل من 15 تخزينة.',
        isMissable: true,
        type: 'gold'
      },
      {
        id: 're4-3',
        title: 'تحدي بدون علاج وتحدي المسدس والسكين فقط',
        description: 'أكمل تختيمة كاملة دون استخدام أي عناصر علاجية وتختيمة بالمسدس والسكين فقط في صعوبة المساعد.',
        type: 'gold'
      },
      {
        id: 're4-4',
        title: 'تدمير جميع تماثيل كاستيلان الـ 16',
        description: 'اعثر على جميع دمى Clockwork Castellan المخبأة في كل فصل لتفتح السكين البديل البدائي.',
        isMissable: true,
        type: 'silver'
      }
    ]
  },
  {
    id: 'resident-evil-2-remake',
    title: 'رزدنت إيفل 2 ريميك',
    englishTitle: 'Resident Evil 2 Remake',
    platform: 'PS5 / PS4',
    genre: 'رعب بقاء / مركز شرطة راكون',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/883710/header.jpg',
    difficulty: 6,
    estimatedHours: '30 - 40 ساعة',
    platinumRarity: '17.3%',
    missableTrophiesCount: 3,
    description: 'الريميك الحائز على إشادة عالمية الذي أعاد ابتكار الرعب في مركز شرطة راكون سيتي مع ليون وكلير ووحش مستر إكس المرعب.',
    steps: [
      {
        id: 're2-1',
        title: 'بطل راكون سيتي (Raccoon City Native)',
        description: 'احصل على البلاتينيوم بإنهاء سيناريوهات ليون وكلير والمسارات البديلة.',
        type: 'platinum'
      },
      {
        id: 're2-2',
        title: 'رتبة S على صعوبة الهاردكور (Hardcore)',
        description: 'أنهِ سيناريو ليون وكلير على صعوبة Hardcore بوقت قياسي للحصول على رتبة S وفتح أسلحة لانهائية الذخيرة.',
        isMissable: true,
        type: 'gold'
      },
      {
        id: 're2-3',
        title: 'الحد الأدنى للخطوات وبدون فتح الصندوق',
        description: 'أكمل سيناريو كامل بأقل من 14000 خطوة وبدون فتح صندوق الأدوات إطلاقاً.',
        type: 'silver'
      },
      {
        id: 're2-4',
        title: 'تدمير جميع تماثيل مستر راكون الـ 15',
        description: 'اعثر على دمى الراكون المنتشرة بين سيناريو ليون وسيناريو كلير (A و B).',
        isMissable: true,
        type: 'silver'
      }
    ]
  },
  {
    id: 'resident-evil-3-remake',
    title: 'رزدنت إيفل 3 ريميك',
    englishTitle: 'Resident Evil 3 Remake',
    platform: 'PS5 / PS4',
    genre: 'رعب أكشن / مطاردة النمسيس',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/952060/header.jpg',
    difficulty: 4,
    estimatedHours: '15 - 20 ساعة',
    platinumRarity: '24.9%',
    missableTrophiesCount: 2,
    description: 'هروب جيل فالنتاين المثير من شوارع مدينة راكون سيتي المنهارة تحت مطاردة الوحش المرعب نيمسيس.',
    steps: [
      {
        id: 're3-1',
        title: 'وداعاً راكون سيتي (Goodbye, Raccoon City)',
        description: 'احصل على تروفي البلاتينيوم، وهي من أسهل وأمتع بلاتينيومات سلسلة رزدنت إيفل.',
        type: 'platinum'
      },
      {
        id: 're3-2',
        title: 'صعوبة الجحيم (Inferno) مع رتبة S',
        description: 'استخدم متجر النقاط واشترِ قاذف الصواريخ اللانهائي لتسهيل صعوبة Nightmare و Inferno وإنهاء اللعبة بأقل من ساعتين.',
        type: 'gold'
      },
      {
        id: 're3-3',
        title: 'تختيم بدون فتح صندوق الأدوات وبدون علاج',
        description: 'أنهِ اللعبة على صعوبة أسيستيد (Assisted) في جولة سريعة دون علاج وبدون صندوق لتوفير التروفيات.',
        type: 'silver'
      },
      {
        id: 're3-4',
        title: 'تدمير جميع دمى شارلي الـ 20',
        description: 'اعثر على كافة دمى Charlie Bobbleheads واقضِ عليها عبر مراحل جيل وكارلوس.',
        isMissable: true,
        type: 'silver'
      }
    ]
  },
  {
    id: 'resident-evil-1-remake',
    title: 'رزدنت إيفل 1 ريميك (HD)',
    englishTitle: 'Resident Evil HD Remaster',
    platform: 'PS4 / PS5',
    genre: 'رعب بقاء كلاسيكي / قصر سبنسر',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/304240/header.jpg',
    difficulty: 7,
    estimatedHours: '30 - 45 ساعة',
    platinumRarity: '12.8%',
    missableTrophiesCount: 5,
    description: 'الريميك المتقن والمحدث للقصر الأسطوري في جبال آركلاي مع كريس ريدفيلد وجيل فالنتاين وألغاز النجاة الكلاسيكية.',
    steps: [
      {
        id: 're1-1',
        title: 'البلاتينيوم (Like a Boss)',
        description: 'احصل على جميع تروفيات اللعبة في قصر سبنسر الغامض.',
        type: 'platinum'
      },
      {
        id: 're1-2',
        title: 'وضع النجاة الحقيقي (Real Survival) والعدو الخفي',
        description: 'أكمل اللعبة في طور النجاة الواقعي بدون اتصال صناديق الأدوات، وطور الأعداء غير المرئيين (Invisible Enemy).',
        isMissable: true,
        type: 'gold'
      },
      {
        id: 're1-3',
        title: 'تختيمة السكين فقط وبدون حفظ اللعبة',
        description: 'أنهِ القصة باستخدام السكين فقط دون أي سلاح ناري، وأنهِ تختيمة كاملة دون استخدام شريط الحبر إطلاقاً.',
        type: 'gold'
      },
      {
        id: 're1-4',
        title: 'إنهاء اللعبة في أقل من 3 ساعات',
        description: 'أسرع في حل الألغاز لفتح قاذف الصواريخ اللانهائي والمسدس السريع.',
        type: 'silver'
      }
    ]
  },
  {
    id: 'resident-evil-0-remake',
    title: 'رزدنت إيفل 0 ريميك (HD)',
    englishTitle: 'Resident Evil 0 HD Remaster',
    platform: 'PS4 / PS5',
    genre: 'رعب بقاء كلاسيكي / قطار الموت',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/339340/header.jpg',
    difficulty: 7,
    estimatedHours: '35 - 50 ساعة',
    platinumRarity: '11.1%',
    missableTrophiesCount: 4,
    description: 'بدايات الكارثة مع ريبيكا تشامبرز وبيلي كوين على متن قطار إكليبس إكسبريس والمرفق التدريبي لأمبريلا بدون صناديق أدوات.',
    steps: [
      {
        id: 're0-1',
        title: 'نجم S.T.A.R.S الأسطوري (Wanna Be a Member?)',
        description: 'احصل على البلاتينيوم بعد إتقان التحكم بالشخصيتين وتبادل العناصر.',
        type: 'platinum'
      },
      {
        id: 're0-2',
        title: 'صعوبة الهارد (Hard Mode) مع رتبة S',
        description: 'أنهِ اللعبة على أصعب طور مع إدارة الذخيرة بحكمة وإنهاء القصة في أقل من 3.5 ساعات.',
        isMissable: true,
        type: 'gold'
      },
      {
        id: 're0-3',
        title: 'إنهاء اللعبة دون أي علاج ودون حفظ',
        description: 'أكمل اللعبة من البداية للنهاية دون تناول الأعشاب أو البخاخات، وتحدي عدم استخدام ماكينة الحفظ.',
        type: 'gold'
      },
      {
        id: 're0-4',
        title: 'طور صائد العلقات (Leech Hunter)',
        description: 'احصل على رتبة A بجمع 100 علقة في الطور الإضافي لفتح أسلحة غير محدودة الذخيرة.',
        type: 'silver'
      }
    ]
  }
];
