import { GameGuide } from '../types';

export const GAMES_DATA: GameGuide[] = [
  // 1. Resident Evil Requiem
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
        guide: 'احرص على تفتيش كل غرفة ومكتب في المستشفى المهجور ومبنى الشرطة القديم قبل التقدم لنقاط اللاعودة.'
      },
      {
        id: 'rer-t6',
        title: 'صائد الطفرات',
        englishTitle: 'Mutation Purge',
        description: 'اقضِ على جميع الكائنات الطافرة الخاصة والزعماء الجانبيين في المهمات الفرعية.',
        type: 'silver',
        guide: 'أكمل جميع طلبات التحقيق الجانبية المعلقة واستدرج الكائنات النادرة لقتلها بأسلحة ثقيلة.'
      },
      {
        id: 'rer-t7',
        title: 'عين الصقر الفيدرالية',
        englishTitle: 'Deadly Precision',
        description: 'تخلص من 50 مصاباً بطلقات مركزة مباشرة في نقاط الضعف أو الرأس.',
        type: 'bronze',
        guide: 'استخدم مؤشر الليزر أو المنظار المقرب وتأنَّ في التصويب قبل إطلاق الرصاصة للحصول على قتل فوري.'
      },
      {
        id: 'rer-t8',
        title: 'الهدوء تحت الضغط',
        englishTitle: 'Survival Alchemist',
        description: 'اصنع 30 أداة علاج أو ذخيرة باستخدام نظام الدمج الميداني في الحقيبة.',
        type: 'bronze',
        guide: 'ادمج الأعشاب الخضراء والحمراء معاً واخلط البارود الكيميائي لصناعة رصاص الشوتجن والمسدس.'
      }
    ]
  },

  // 2. God of War Ragnarök
  {
    id: 'god-of-war-ragnarok',
    slug: 'god-of-war-ragnarok',
    title: 'جود أوف وور: راغناروك',
    englishTitle: 'God of War Ragnarök',
    platform: 'PS5 / PS4',
    genre: 'أكشن مغامرات',
    coverImage: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.jpg',
    bannerImage: 'https://images.igdb.com/igdb/image/upload/t_1080p/sc735t.jpg',
    difficulty: 4,
    estimatedHours: '50 - 60 ساعة',
    platinumRarity: '24.5%',
    totalTrophiesCount: 36,
    platinumCount: 1,
    goldCount: 4,
    silverCount: 15,
    bronzeCount: 16,
    missableTrophiesCount: 0,
    onlineTrophiesCount: 0,
    trophiesList: [
      {
        id: 'gowr-plat',
        title: 'الدب والذئب',
        englishTitle: 'The Bear and the Wolf',
        description: 'احصل على جميع التروفيات في اللعبة.',
        type: 'platinum',
        guide: 'يُفتح تلقائياً بمجرد فتح جميع التروفيات الـ 35 الأخرى في اللعبة دون أي تروفي قابل للفقد.'
      },
      {
        id: 'gowr-t1',
        title: 'قتال الفالكري الحقيقية',
        englishTitle: 'The True Queen',
        description: 'اهزم غنا ملكة الفالكري في موسبلهايم.',
        type: 'gold',
        guide: 'تظهر بعد نهاية القصة في معسكر موسبلهايم. طوّر عتادك وأسلحتك إلى المستوى 9 واستخدم حركات الرونيك الفعالة.'
      },
      {
        id: 'gowr-t2',
        title: 'مقبرة هروف',
        englishTitle: 'Grave Mistake',
        description: 'اهزم الملك هروف في نيفلهايم.',
        type: 'gold',
        guide: 'اهزم جميع محاربي البيرزيركر الـ 12 الموزعين في العوالم لتفعيل شاهد القبر الأخير في نيفلهايم ومواجهة الملك.'
      },
      {
        id: 'gowr-t3',
        title: 'الاسترداد الكامل',
        englishTitle: 'Full Florist',
        description: 'اجمع زهرة واحدة من كل من العوالم التسعة.',
        type: 'silver',
        guide: 'تتطلب إكمال مهمة صالح العوالم التسعة (Nine Realms in Bloom) بعد نهاية القصة.'
      },
      {
        id: 'gowr-t4',
        title: 'أمين المكتبة',
        englishTitle: 'The Librarian',
        description: 'اجمع جميع الكتب والقصائد الأدبية لكسفير.',
        type: 'silver',
        guide: 'اجمع القصائد الـ 14 الموزعة في عوالم ألفهايم وفانهايم ونيفيلهايم وسفارتالفهايم.'
      },
      {
        id: 'gowr-t5',
        title: 'صياد الغربان',
        englishTitle: 'The Feathered Friends',
        description: 'اقضِ على جميع غربان أودين الخضراء الـ 48 وافتح الصناديق الستة في نيفلهايم.',
        type: 'silver',
        guide: 'استمع لأصوات نعيق الغربان الخضراء وارمِ الفأس عليها، ثم توجه إلى شجرة الغربان في نيفلهايم لفتح الصناديق وهزيمة حارسة الغربان.'
      },
      {
        id: 'gowr-t6',
        title: 'راغناروك الحقيقي',
        englishTitle: 'Ragnarök',
        description: 'قاتل ملك الآلهة أودين وأنهِ معركة راغناروك.',
        type: 'gold',
        guide: 'مترابط بالقصة الرئيسية ويُفتح تلقائياً بنهاية أحداث الفصل الأخير.'
      }
    ]
  },

  // 3. Ghost of Tsushima
  {
    id: 'ghost-of-tsushima',
    slug: 'ghost-of-tsushima',
    title: 'شبح تسوشيما',
    englishTitle: "Ghost of Tsushima Director's Cut",
    platform: 'PS5 / PS4',
    genre: 'أكشن مغامرات / ساموراي',
    coverImage: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2crj.jpg',
    bannerImage: 'https://images.igdb.com/igdb/image/upload/t_1080p/sc8i5m.jpg',
    difficulty: 3,
    estimatedHours: '50 - 60 ساعة',
    platinumRarity: '31.8%',
    totalTrophiesCount: 52,
    platinumCount: 1,
    goldCount: 2,
    silverCount: 9,
    bronzeCount: 40,
    missableTrophiesCount: 0,
    onlineTrophiesCount: 0,
    trophiesList: [
      {
        id: 'got-plat',
        title: 'أسطورة حية',
        englishTitle: 'Living Legend',
        description: 'احصل على جميع التروفيات في شبح تسوشيما.',
        type: 'platinum',
        guide: 'يُفتح فور إنهاء مهام جين ساكاي وقصص الرفاق وتحرير جميع معسكرات المغول.'
      },
      {
        id: 'got-t1',
        title: 'محرر تسوشيما',
        englishTitle: 'Master Liberator',
        description: 'حرر جزيرة تسوشيما بالكامل من قبضة الغزو المغولي.',
        type: 'gold',
        guide: 'حرر جميع المعسكرات والمزارع والمقاطعات في إزوهارا وتويوتاما وكاميغاتا لتكشف كامل الخريطة.'
      },
      {
        id: 'got-t2',
        title: 'حامي العشب',
        englishTitle: 'Helping Sword Hand',
        description: 'أكمل جميع حكايات تسوشيما الـ 61.',
        type: 'gold',
        guide: 'أكمل مهمات الرفاق (ماساكو، إيشيكاوا، نوريو، ويونا) وجميع المهام الجانبية والأسطورية السبع.'
      },
      {
        id: 'got-t3',
        title: 'تفضيل الكامي',
        englishTitle: 'Favor of the Kami',
        description: 'اعثر على جميع مزارات الشنتو الـ 16 واصعد لقممها.',
        type: 'bronze',
        guide: 'اتبع البوابات الحمراء المحطمة وتسلق المنحدرات الصخرية للوصول لمزارات الشنتو والحصول على التمائم.'
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
