import { GameGuide } from '../types';

export const GAMES_DATA: GameGuide[] = [
  // 1. God of War Ragnarök
  {
    id: 'god-of-war-ragnarok',
    slug: 'god-of-war-ragnarok',
    title: 'جود أوف وور: راغناروك',
    englishTitle: 'God of War Ragnarök',
    platform: 'PS5 / PS4',
    genre: 'أكشن مغامرات / أساطير إسكندنافية',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/header.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
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
    description: 'كريتوس وأتريوس في مواجهة نهاية العوالم التسعة والآلهة الإسكندنافية في ملحمة ختامية ملحمية لا تُنسى على أجهزة PlayStation.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: تختيم القصة الرئيسية',
        description: 'العب القصة بأي مستوى صعوبة تفضله، لا توجد تروفيات صعوبة أو تروفيات قابلة للفقد. استمتع بالأحداث والقتال وقم بترقية أسلحتك متى ما أمكن.',
        estimatedHours: '25 - 30 ساعة',
        unlockedTrophies: 'تروفيات القصة الإلزامية'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: استكشاف العوالم والمهام الجانبية (Favors)',
        description: 'أنهِ كافة مهام صالح العوالم، واجمع الصناديق وكتب الأساطير وغربان أودين الموزعة عبر الممالك التسعة بنسبة 100%.',
        estimatedHours: '15 - 20 ساعة',
        unlockedTrophies: 'تروفيات التجميع والمهام الفرعية'
      },
      {
        stepNumber: 3,
        title: 'المرحلة الثالثة: زعماء النهاية وتروفي البلاتينيوم',
        description: 'اهزم جميع مقابر البيرزيركر واقضِ على ملك البيرزيركر هروف في نيفلهايم، ثم واجه ملكة الفالكري جناح في موطن النار للحصول على البلاتينيوم.',
        estimatedHours: '8 - 12 ساعة',
        unlockedTrophies: 'The Bear and the Wolf (البلاتينيوم)'
      }
    ],
    trophiesList: [
      {
        id: 'gowr-plat',
        title: 'الدب والذئب',
        englishTitle: 'The Bear and the Wolf',
        description: 'احصل على جميع التروفيات في اللعبة.',
        type: 'platinum',
        guide: 'يُفتح تلقائياً بمجرد فتح جميع التروفيات الـ 35 الأخرى في اللعبة.'
      },
      {
        id: 'gowr-t1',
        title: 'قتال الفالكري',
        englishTitle: 'The True Queen',
        description: 'اهزم غنا ملكة الفالكري في موسبلهايم.',
        type: 'gold',
        guide: 'تظهر بعد نهاية القصة في منطقة الموتى في موسبلهايم، يُنصح بتطوير عتاد كريتوس للمستوى 9 قبل مواجهتها.'
      },
      {
        id: 'gowr-t2',
        title: 'مقبرة هروف',
        englishTitle: 'Grave Mistake',
        description: 'اهزم الملك هروف في نيفلهايم.',
        type: 'gold',
        guide: 'بعد هزيمة شواهد البيرزيركر الـ 12، توجه إلى المقبرة في نيفلهايم لمواجهة الملك.'
      },
      {
        id: 'gowr-t3',
        title: 'المكتبة الكاملة',
        englishTitle: 'The Librarian',
        description: 'اجمع جميع الكتب والأشعار في الممالك.',
        type: 'silver',
        guide: 'اعثر على كتب أشعار كفاسير المخبأة في العوالم المختلفة (تحتوي تلميحات لألعاب بلايستيشن الشهيرة).'
      },
      {
        id: 'gowr-t4',
        title: 'مفتش الجذور',
        englishTitle: 'Invasive Species',
        description: 'أكمل جميع رحلات الصيد في الفوهة (The Crater) في فاناهايم.',
        type: 'silver',
        guide: 'منطقة الفوهة الضخمة في فاناهايم تحتوي على مهام جانبية لصيد التنانين والوحوش الشرسة.'
      },
      {
        id: 'gowr-t5',
        title: 'زعيم السحلية',
        englishTitle: 'Phalanx',
        description: 'اصنع درعاً كاملاً وطوره إلى أقصى حد.',
        type: 'silver',
        guide: 'قم بزيارة بروك وسندري لتطوير درع الصدر والخصر والمعصم للمستوى الأقصى.'
      }
    ],
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

  // 2. Astro Bot
  {
    id: 'astro-bot',
    slug: 'astro-bot',
    title: 'أسترو بوت',
    englishTitle: 'Astro Bot',
    platform: 'PS5',
    genre: 'منصات / مغامرات / استعراض DualSense',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop',
    difficulty: 3,
    estimatedHours: '12 - 15 ساعة',
    platinumRarity: '39.2%',
    totalTrophiesCount: 44,
    platinumCount: 1,
    goldCount: 3,
    silverCount: 17,
    bronzeCount: 23,
    missableTrophiesCount: 0,
    onlineTrophiesCount: 0,
    description: 'المغامرة الرائعة والاحتفالية الكبرى بتاريخ بلايستيشن الحائزة على تقييمات استثنائية مع استغلال مذهل ليد التحكم DualSense ومئات البوتات الأيقونية.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: إكمال المجرات الخمس والزعماء',
        description: 'العب المراحل واستمتع بإنقاذ البوتات وجمع قطع الألغاز، يمكنك إعادة أي مرحلة في أي وقت بفضل نظام تحديد المراحل السلس.',
        estimatedHours: '8 - 10 ساعات',
        unlockedTrophies: 'تروفيات إنهاء المجرات وقطع سفينة البلايستيشن'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: إنقاذ جميع البوتات المميزة (VIP Bots) والتحديات',
        description: 'أنقذ الـ 300 بوت بالكامل وتجاوز مراحل الرموز التحديّة الصعبة (مثل مراحل المربّع والدائرة والمثلّث والإكس).',
        estimatedHours: '3 - 4 ساعات',
        unlockedTrophies: 'تروفيات جمع البوتات وحل الألغاز 100%'
      },
      {
        stepNumber: 3,
        title: 'المرحلة الثالثة: التروفيات المتنوعة والتفاعلية في ساحة القاعدة (Crash Site)',
        description: 'قم بالتفاعل مع الروبوتات في القاعدة الرئيسية وتصوير اللحظات المرحة وفتح الجوائز من آلة الكبسولات للحصول على البلاتينيوم.',
        estimatedHours: '1 - 2 ساعة',
        unlockedTrophies: 'Astro-nomical! (البلاتينيوم)'
      }
    ],
    trophiesList: [
      {
        id: 'astro-plat',
        title: 'فلكي عظيم (Astro-nomical!)',
        englishTitle: 'Astro-nomical!',
        description: 'احصل على جميع تروفيات مغامرة أسترو بوت.',
        type: 'platinum',
        guide: 'يُفتح عند تجميع كافة التروفيات الـ 43 الأخرى في اللعبة.'
      },
      {
        id: 'astro-t1',
        title: 'إنقاذ الأسطول بالكامل',
        englishTitle: 'The Great Rescuer',
        description: 'أنقذ جميع روبوتات البوت الـ 300 في اللعبة.',
        type: 'gold',
        guide: 'استخدم الطائر الكاشف المتاح عند إعادة المرحلة لمساعدتك في إيجاد أي بوت مفقود بسهولة.'
      },
      {
        id: 'astro-t2',
        title: 'إصلاح سفينة الأم PS5',
        englishTitle: 'Mothership Restored',
        description: 'استرجع كافة القطع المفقودة من سفينة PS5 الأم واهزم الفضائي نيبولا.',
        type: 'gold',
        guide: 'مترابط بالقصة الرئيسية بعد هزيمة الزعيم النهائي للعبة.'
      },
      {
        id: 'astro-t3',
        title: 'ملك آلة الكبسولات',
        englishTitle: 'Gacha Master',
        description: 'افتح جميع أزياء وأغراض البوتات من آلة الكبسولات في القاعدة.',
        type: 'silver',
        guide: 'استخدم القطع النقدية الذهبية التي تجمعها من المراحل في سحب كل جوائز آلة الـ Gacha.'
      },
      {
        id: 'astro-t4',
        title: 'تحدي الرموز الأسطوري',
        englishTitle: 'Symbol of Mastery',
        description: 'أكمل جميع مراحل التحدي للأزرار الأربعة الصعبة.',
        type: 'silver',
        guide: 'تعتمد على المهارة والدقة وتوقيت القفزات، تتطلب بضع محاولات لتجاوزها بنجاح.'
      }
    ],
    steps: [
      {
        id: 'astro-1',
        title: 'فلكي عظيم (Astro-nomical!)',
        description: 'احصل على تروفي البلاتينيوم بإنقاذ كافة البوتات وإصلاح سفينة PS5.',
        type: 'platinum'
      },
      {
        id: 'astro-2',
        title: 'إنقاذ 300 بوت واستعادة قطع السفينة',
        description: 'اجمع كافة البوتات العادية وروبوتات شخصيات ألعاب بلايستيشن التاريخية.',
        type: 'gold'
      },
      {
        id: 'astro-3',
        title: 'تحديات الرموز والتفاعل في القاعدة',
        description: 'تجاوز المراحل الصعبة واستمتع بتفعيل تفاعلات البوتات في مقر الهبوط.',
        type: 'silver'
      }
    ]
  },

  // 3. Marvel's Spider-Man 2
  {
    id: 'marvels-spider-man-2',
    slug: 'marvels-spider-man-2',
    title: 'مارفل سبايدرمان 2',
    englishTitle: "Marvel's Spider-Man 2",
    platform: 'PS5',
    genre: 'أكشن مغامرات / بطل خارق / عالم مفتوح',
    coverImage: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?q=80&w=1200&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    difficulty: 3,
    estimatedHours: '25 - 30 ساعة',
    platinumRarity: '46.7%',
    totalTrophiesCount: 42,
    platinumCount: 1,
    goldCount: 2,
    silverCount: 17,
    bronzeCount: 22,
    missableTrophiesCount: 0,
    onlineTrophiesCount: 0,
    description: 'تشارك بيتر باركر ومايلز موراليس في مواجهة كرافن الصياد وفينوم في ملحمة بصرية مذهلة تجوب سماء وأحياء نيويورك وبروكلين وكوينز.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: خوض القصة وفتح القدرات',
        description: 'أكمل مهمات القصة الشيقة مع تبادل اللعب بين بيتر ومايلز واستمتع بأجنحة الويب Web Wings والسفر السريع اللحظي.',
        estimatedHours: '15 - 18 ساعة',
        unlockedTrophies: 'تروفيات القصة وزعماء فينوم وكرافن'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: إكمال كافة المقاطعات بنسبة 100%',
        description: 'أنهِ قواعد الصيادين، ذكريات ماركو، عش السيمبيوت، تجارب بروكلين فجنز، وألغاز الميستيريوم في جميع الأحياء.',
        estimatedHours: '8 - 10 ساعات',
        unlockedTrophies: 'تروفيات تنظيف أحياء نيويورك بالكامل'
      },
      {
        stepNumber: 3,
        title: 'المرحلة الثالثة: صنع جميع البدلات والتروفيات المتفرقة',
        description: 'افتح جميع البدلات والقدرات وطور الأدوات، وقم بتنفيذ الحيل الهوائية والطيران بأجنحة الويب من الحي المالي حتى كوينز.',
        estimatedHours: '2 - 3 ساعات',
        unlockedTrophies: 'Dedicated (البلاتينيوم)'
      }
    ],
    trophiesList: [
      {
        id: 'sm2-plat',
        title: 'مخلص تماماً (Dedicated)',
        englishTitle: 'Dedicated',
        description: 'اجمع جميع تروفيات لعبة سبايدرمان 2.',
        type: 'platinum',
        guide: 'يُمنح فور إكمال كافة التروفيات الأخرى، لا توجد تروفيات صعوبة أو قابلة للفقد.'
      },
      {
        id: 'sm2-t1',
        title: 'مدينة نيويورك العظيمة',
        englishTitle: 'Superior',
        description: 'أكمل جميع المقاطعات والأحياء في الخريطة بنسبة 100%.',
        type: 'gold',
        guide: 'أنهِ كافة الفعاليات الجانبية في كل حي في مانهاتن، كوينز، وبروكلين.'
      },
      {
        id: 'sm2-t2',
        title: 'علاج العالم',
        englishTitle: 'Heal the World',
        description: 'أكمل القصة الرئيسية للعبة.',
        type: 'gold',
        guide: 'يُفتح تلقائياً بعد إنهاء المهمة الختامية للقصة ومواجهة فينوم.'
      },
      {
        id: 'sm2-t3',
        title: 'خزانة البدلات الكاملة',
        englishTitle: 'Kitted Out',
        description: 'اشترِ واصنع جميع البدلات المتاحة لكلا العنكبوتين.',
        type: 'silver',
        guide: 'استخدم قطع التكنولوجيا وعملات المدن لصناعة جميع بدلات بيتر ومايلز.'
      },
      {
        id: 'sm2-t4',
        title: 'طيران انسيابي',
        englishTitle: 'Soar',
        description: 'حلّق بأجنحة الويب من الحي المالي إلى أستوريا بدون لمس الأرض.',
        type: 'silver',
        guide: 'استخدم التيارات الهوائية وأنابيب الرياح فوق النهر للتحليق دون فقدان الارتفاع.'
      }
    ],
    steps: [
      {
        id: 'sm2-1',
        title: 'مخلص تماماً (Dedicated Platinum)',
        description: 'احصل على تروفي البلاتينيوم للعبة سبايدرمان 2 بسهولة ومتعة.',
        type: 'platinum'
      },
      {
        id: 'sm2-2',
        title: 'تنظيف جميع مقاطعات نيويورك 100%',
        description: 'أنهِ كافة المهمات والفعاليات الجانبية في مانهاتن وبروكلين وكوينز.',
        type: 'gold'
      },
      {
        id: 'sm2-3',
        title: 'صناعة البدلات ومهارات أجنحة الويب',
        description: 'اصنع جميع بدلات بيتر ومايلز ونفذ حركات الطيران والحيل الهوائية.',
        type: 'silver'
      }
    ]
  },

  // 4. The Last of Us Part I
  {
    id: 'the-last-of-us-part-1',
    slug: 'the-last-of-us-part-1',
    title: 'ذا لاست أوف أس الجزء الأول',
    englishTitle: 'The Last of Us Part I',
    platform: 'PS5',
    genre: 'أكشن مغامرات / نجاة',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1888930/header.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    difficulty: 2,
    estimatedHours: '15 - 20 ساعة',
    platinumRarity: '36.8%',
    totalTrophiesCount: 29,
    platinumCount: 1,
    goldCount: 7,
    silverCount: 7,
    bronzeCount: 14,
    missableTrophiesCount: 0,
    onlineTrophiesCount: 0,
    description: 'رحلة جول وإيلي العاطفية عبر أمريكا ما بعد الوباء مع تحسينات الرسومية وتجربة DualSense الكاملة على PS5 بدون تروفيات صعوبة.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: تختيم القصة وجمع المقتنيات',
        description: 'أنهِ القصة مع التقاط المقتنيات والمحادثات الاختيارية، تتوفر ميزة اختيار الفصول بعد التختيم لتعويض أي قطعة ناقصة.',
        estimatedHours: '12 - 15 ساعة',
        unlockedTrophies: 'تروفيات إنهاء الفصول'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: ترقية الأسلحة واختيار الفصول للبلاتينيوم',
        description: 'استكمل ترقيات طاولة العمل والتقط المقتنيات المتبقية عبر اختيار الفصول لتنال البلاتينيوم بكل بساطة.',
        estimatedHours: '3 - 5 ساعات',
        unlockedTrophies: 'It can\'t be for nothing (البلاتينيوم)'
      }
    ],
    trophiesList: [
      {
        id: 'tlou-plat',
        title: 'إنه لا يمكن أن يكون عبثاً',
        englishTitle: "It can't be for nothing",
        description: 'احصل على جميع تروفيات الجزء الأول.',
        type: 'platinum',
        guide: 'يُفتح فور جمع كل التروفيات الأخرى.'
      },
      {
        id: 'tlou-t1',
        title: 'مهما حدث',
        englishTitle: 'No Matter What',
        description: 'أكمل اللعبة على أي مستوى صعوبة.',
        type: 'gold',
        guide: 'يُفتح بنهاية القصة.'
      },
      {
        id: 'tlou-t2',
        title: 'تاريخ كامل',
        englishTitle: 'Chronicles',
        description: 'اعثر على جميع المقتنيات والملاحظات والآثار الـ 97.',
        type: 'gold',
        guide: 'يمكن استخدام تتبع المقتنيات المدمج في قائمة اختيار الفصول.'
      }
    ],
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

  // 5. Marvel's Spider-Man Remastered
  {
    id: 'spiderman-remastered',
    slug: 'spiderman-remastered',
    title: 'مارفل سبايدرمان',
    englishTitle: "Marvel's Spider-Man",
    platform: 'PS5 / PS4',
    genre: 'أكشن مغامرات / بطل خارق',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1817070/header.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1600&auto=format&fit=crop',
    difficulty: 3,
    estimatedHours: '30 - 35 ساعة',
    platinumRarity: '45.1%',
    totalTrophiesCount: 51,
    platinumCount: 1,
    goldCount: 2,
    silverCount: 10,
    bronzeCount: 38,
    missableTrophiesCount: 0,
    onlineTrophiesCount: 0,
    description: 'تأرجح في سماء نيويورك بشخصية بيتر باركر، وواجه أشهر أعداء مارفل في تجربة قتالية واستكشافية رائعة مع معدل بلاتينيوم ممتع وعالٍ جداً.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: إنهاء القصة والمهام',
        description: 'أكمل أحداث قصة بيتر باركر وواجه أعضاء Sinister Six وافتح أبراج المراقبة في الأحياء.',
        estimatedHours: '15 - 20 ساعة',
        unlockedTrophies: 'تروفيات مسار القصة'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: تطهير الأحياء 100% والمقتنيات',
        description: 'اجمع الحقائب الظهرية، والتقط معالم نيويورك، وأوقف الجرائم العشوائية في كل حي.',
        estimatedHours: '10 - 12 ساعة',
        unlockedTrophies: 'تروفيات تنظيف مانهاتن'
      },
      {
        stepNumber: 3,
        title: 'المرحلة الثالثة: صنع جميع البدلات وتروفي البلاتينيوم',
        description: 'اصنع جميع البدلات المتاحة في اللعبة الأساسية ونفذ متطلبات التروفيات القتالية.',
        estimatedHours: '2 - 3 ساعات',
        unlockedTrophies: 'Be Greater (البلاتينيوم)'
      }
    ],
    trophiesList: [
      {
        id: 'sp1-plat',
        title: 'أفضل بطل',
        englishTitle: 'Be Greater',
        description: 'اجمع جميع تروفيات مارفل سبايدرمان.',
        type: 'platinum',
        guide: 'يُفتح عند إكمال كل تروفيات القصة وتطهير الأحياء بالكامل.'
      }
    ],
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

  // 6. Ghost of Tsushima
  {
    id: 'ghost-of-tsushima',
    slug: 'ghost-of-tsushima',
    title: 'شبح تسوشيما',
    englishTitle: "Ghost of Tsushima Director's Cut",
    platform: 'PS5 / PS4',
    genre: 'أكشن مغامرات / ساموراي',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2215430/header.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?q=80&w=1600&auto=format&fit=crop',
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
    description: 'عش ملحمة الساموراي جين ساكاي وهو يدافع عن جزيرة تسوشيما ضد الغزو المغولي بين الشرف وأسلوب الشبح بدون تروفيات قابلة للفقد.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: إكمال قصة جين ساكاي',
        description: 'أكمل الفصول الثلاثة لتحرير أجزاء الجزيرة إزوهارا وتويوتاما وكاميغاتا.',
        estimatedHours: '25 - 30 ساعة',
        unlockedTrophies: 'تروفيات القصة الرئيسية'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: تحرير معسكرات المغول وحكايات تسوشيما',
        description: 'حرر جميع المقاطعات المحتلة وأكمل حكايات الرفاق ماساكو وإيشيكاوا ونوريو ويونا والقصص الأسطورية.',
        estimatedHours: '20 - 25 ساعة',
        unlockedTrophies: 'تروفيات تحرير الجزيرة والمهام الفرعية'
      },
      {
        stepNumber: 3,
        title: 'المرحلة الثالثة: المزارات والينابيع الساخنة والبلاتينيوم',
        description: 'اتبع الرياح الاسترشادية للوصول لمزارات الشنتو وقصائد الهايكو والينابيع الساخنة للحصول على البلاتينيوم.',
        estimatedHours: '5 - 8 ساعات',
        unlockedTrophies: 'Living Legend (البلاتينيوم)'
      }
    ],
    trophiesList: [
      {
        id: 'got-plat',
        title: 'أسطورة حية',
        englishTitle: 'Living Legend',
        description: 'احصل على جميع التروفيات في شبح تسوشيما.',
        type: 'platinum',
        guide: 'يُفتح فور إكمال كافة التروفيات دون أي تروفي قابل للفقد.'
      }
    ],
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

  // 7. Elden Ring
  {
    id: 'elden-ring',
    slug: 'elden-ring',
    title: 'إلدين رينغ',
    englishTitle: 'Elden Ring',
    platform: 'PS5 / PS4',
    genre: 'أكشن آر بي جي / عالم مفتوح',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
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
    description: 'لعبة الأر بي جي الحائزة على لعبة العام من FromSoftware، في عالم الأراضي الوسطى الشاسع المليء بالأسرار والزعماء العظام.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: استكشاف العالم وجمع الأسلحة الأسطورية',
        description: 'تأكد من التقاط رمح Bolt of Gransax في العاصمة الملكية قبل هزيمة الزعيم مالكث وتحول العاصمة إلى رماد.',
        estimatedHours: '60 - 80 ساعة',
        unlockedTrophies: 'تروفيات الزعماء والأسلحة والرماد الأسطوري'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: النهايات الثلاث عبر النسخ الاحتياطي للتخزين',
        description: 'قبل التفاعل مع تمثال ماريكا الأخير، ارفع تخزينتك على السحابة لتحصل على نهاية عصر النجوم، ونهاية لهب الجنون، ونهاية ملك الإلدين في جولة واحدة.',
        estimatedHours: '5 - 10 ساعات',
        unlockedTrophies: 'Elden Ring (البلاتينيوم)'
      }
    ],
    trophiesList: [
      {
        id: 'er-plat',
        title: 'إلدين رينغ',
        englishTitle: 'Elden Ring',
        description: 'احصل على جميع التروفيات في إلدين رينغ.',
        type: 'platinum',
        guide: 'يُفتح فور الحصول على كافة التروفيات الأخرى.'
      }
    ],
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

  // 8. Resident Evil 4 Remake
  {
    id: 'resident-evil-4-remake',
    slug: 'resident-evil-4-remake',
    title: 'رزدنت إيفل 4 ريميك',
    englishTitle: 'Resident Evil 4 Remake',
    platform: 'PS5 / PS4',
    genre: 'رعب بقاء / ريميك أسطوري',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    difficulty: 7,
    estimatedHours: '40 - 55 ساعة',
    platinumRarity: '16.5%',
    totalTrophiesCount: 40,
    platinumCount: 1,
    goldCount: 4,
    silverCount: 10,
    bronzeCount: 25,
    missableTrophiesCount: 4,
    onlineTrophiesCount: 0,
    description: 'ريميك تحفة كابكوم الخالدة لرحلة ليون كينيدي لإنقاذ آشلي من القرية الإسبانية الملعونة بأعلى المعايير الحديثة وتحديات الرتبة S+ المثيرة.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: تختيم القصة وجمع المقتنيات والتماثيل',
        description: 'العب القصة بالوتيرة الطبيعية واعثر على جميع تماثيل Clockwork Castellan الـ 16 لفتح السكين الأبدي Primal Knife.',
        estimatedHours: '15 - 18 ساعة',
        unlockedTrophies: 'تروفيات القصة والمقتنيات'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: جولات التحدي (بدون علاج، مسدس وسكين فقط)',
        description: 'العب على طور Assisted في New Game Plus بالمسدس وسكين فقط وبدون استخدام أي أعشاب أو بخاخات.',
        estimatedHours: '10 - 12 ساعة',
        unlockedTrophies: 'تروفيات قيود اللعب'
      },
      {
        stepNumber: 3,
        title: 'المرحلة الثالثة: رتبة S+ على صعوبة الاحتراف (Professional)',
        description: 'ابدأ تختيمة جديدة من الصفر، وأنهِ القصة في أقل من 5 ساعات ونصف وبأقل من 15 تخزينة للحصول على قبعة الدجاج أو آذان القطة.',
        estimatedHours: '12 - 15 ساعة',
        unlockedTrophies: 'Cuz I\'m a Pro (البلاتينيوم)'
      }
    ],
    trophiesList: [
      {
        id: 're4-plat',
        title: 'تلميذ كوز',
        englishTitle: "Cuz I'm a Pro",
        description: 'افتح جميع تروفيات ريميك Resident Evil 4.',
        type: 'platinum',
        guide: 'يُفتح فور إكمال جميع متطلبات التروفيات والتحديات في اللعبة.'
      },
      {
        id: 're4-t1',
        title: 'المحترف الأسطوري S+',
        englishTitle: 'Mission Accomplished S+',
        description: 'أنهِ القصة على صعوبة Professional برتبة S+ من تختيمة جديدة.',
        type: 'gold',
        isMissable: true,
        guide: 'تتطلب إنهاء اللعبة بأقل من 5:30 ساعات وبأقل من 15 تخزينة ومن لعبة جديدة تماماً (ليس NG+).'
      }
    ],
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

  // 9. Horizon Forbidden West
  {
    id: 'horizon-forbidden-west',
    slug: 'horizon-forbidden-west',
    title: 'هورايزون الغرب المحظور',
    englishTitle: 'Horizon Forbidden West',
    platform: 'PS5 / PS4',
    genre: 'أكشن أر بي جي / عالم مفتوح',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2420110/header.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    difficulty: 3,
    estimatedHours: '40 - 50 ساعة',
    platinumRarity: '21.4%',
    totalTrophiesCount: 50,
    platinumCount: 1,
    goldCount: 2,
    silverCount: 7,
    bronzeCount: 40,
    missableTrophiesCount: 1,
    onlineTrophiesCount: 0,
    description: 'انطلق مع إلوي إلى أراضي الغرب المحظور لمواجهة آلات عملاقة مذهلة وكشف سر الوباء الذي يهدد الأرض مع تروفي فحص الآلات الوحيد القابل للفقد.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: خوض القصة وفحص آلات Specter',
        description: 'تأكد أثناء المهمة الرئيسية الختامية من فحص آلة Specter و Specter Prime لأنها التروفي الوحيد القابل للفقد.',
        estimatedHours: '25 - 30 ساعة',
        unlockedTrophies: 'تروفيات القصة وفحص الآلات'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: الاستكشاف والأفران والبلاتينيوم',
        description: 'أكمل أفران التعديل ومهام الصيد والزعماء الجانبيين للوصول لتروفي البلاتينيوم.',
        estimatedHours: '15 - 20 ساعة',
        unlockedTrophies: 'All Trophies Obtained (البلاتينيوم)'
      }
    ],
    trophiesList: [
      {
        id: 'hfw-plat',
        title: 'جميع التروفيات مكتملة',
        englishTitle: 'All Trophies Obtained',
        description: 'احصل على تروفي البلاتينيوم في هورايزون الغرب المحظور.',
        type: 'platinum',
        guide: 'يُفتح فور إكمال كافة التروفيات المتاحة.'
      }
    ],
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

  // 10. Uncharted: Legacy of Thieves Collection
  {
    id: 'uncharted-legacy-of-thieves',
    slug: 'uncharted-legacy-of-thieves',
    title: 'أنشارتد: مجموعة إرث اللصوص',
    englishTitle: 'Uncharted: Legacy of Thieves Collection',
    platform: 'PS5',
    genre: 'أكشن مغامرات / إثارة سينمائية',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1659420/header.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
    difficulty: 4,
    estimatedHours: '25 - 35 ساعة',
    platinumRarity: '18.9%',
    totalTrophiesCount: 43,
    platinumCount: 1,
    goldCount: 2,
    silverCount: 10,
    bronzeCount: 30,
    missableTrophiesCount: 0,
    onlineTrophiesCount: 0,
    description: 'استمتع بمغامرات ناثان دريك في Uncharted 4 وكلوي فريزر في The Lost Legacy برسومات محسنة وأداء سلس على جهاز PS5.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: إنهاء القصة واستكشاف الكنوز',
        description: 'أنهِ القصة مع إمكانية استخدام محدد الفصول لاحقاً لأي كنز أو محادثة مفقودة.',
        estimatedHours: '15 - 20 ساعة',
        unlockedTrophies: 'تروفيات القصة'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: صعوبة Crushing وتفعيل التعديلات',
        description: 'فعل ميزة الذخيرة اللانهائية والقتل بضربة واحدة بعد التختيم لتسهيل صعوبة Crushing.',
        estimatedHours: '10 - 15 ساعة',
        unlockedTrophies: 'تروفي البلاتينيوم وصعوبة Crushing'
      }
    ],
    trophiesList: [
      {
        id: 'unc-plat',
        title: 'أسطورة صائدي الكنوز',
        englishTitle: 'A Thief\'s End & The Lost Legacy',
        description: 'احصل على تروفي البلاتينيوم للنسخة المحدثة.',
        type: 'platinum',
        guide: 'يُفتح فور إكمال كافة التروفيات المطلوبة.'
      }
    ],
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

  // 11. Returnal
  {
    id: 'returnal',
    slug: 'returnal',
    title: 'ريتيرنال',
    englishTitle: 'Returnal',
    platform: 'PS5',
    genre: 'روغلايك / إطلاق نار خيال علمي',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1649240/header.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    difficulty: 8,
    estimatedHours: '50 - 70 ساعة',
    platinumRarity: '11.3%',
    totalTrophiesCount: 31,
    platinumCount: 1,
    goldCount: 7,
    silverCount: 5,
    bronzeCount: 18,
    missableTrophiesCount: 0,
    onlineTrophiesCount: 0,
    description: 'تجربة حصرية ساحرة لـ PS5 تضعك في حلقة زمنية على كوكب أتروبوس الغامض مع استغلال مذهل لصوتيات 3D ويد التحكم.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: كسر الحلقة وإنهاء الفصول الـ 3',
        description: 'تعود على أسلوب اللعب السريع وتطوير الأسلحة لتجاوز زعماء الكوكب الـ 5.',
        estimatedHours: '25 - 35 ساعة',
        unlockedTrophies: 'تروفيات القصة والزعماء'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: مسح البيئات الحيوية 100% (Biomes 1-6)',
        description: 'اجمع نصوص السينوغليف ومسجلات الصوت لجميع البيئات للحصول على البلاتينيوم.',
        estimatedHours: '25 - 35 ساعة',
        unlockedTrophies: 'Helios (البلاتينيوم)'
      }
    ],
    trophiesList: [
      {
        id: 'ret-plat',
        title: 'هيليوس',
        englishTitle: 'Helios',
        description: 'اجمع كافة التروفيات واكسر الحلقة الزمنية في ريتيرنال.',
        type: 'platinum',
        guide: 'يُفتح عند إكمال مسوحات البيئات الست بالكامل.'
      }
    ],
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

  // 12. Helldivers 2
  {
    id: 'helldivers-2',
    slug: 'helldivers-2',
    title: 'هيلدايفرز 2',
    englishTitle: 'Helldivers 2',
    platform: 'PS5',
    genre: 'تصويب تعاوني / حرب مجرية',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/553850/header.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
    difficulty: 5,
    estimatedHours: '30 - 45 ساعة',
    platinumRarity: '19.7%',
    totalTrophiesCount: 39,
    platinumCount: 1,
    goldCount: 3,
    silverCount: 11,
    bronzeCount: 24,
    missableTrophiesCount: 0,
    onlineTrophiesCount: 39,
    description: 'انضم لصفوف الحرية والديمقراطية في المجرة وقاتل الحشرات والآليين مع زملائك في أمتع تجارب اللعب التعاوني على PS5.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: ترقية السفينة والوصول لمستوى 20',
        description: 'العب مهمات الحشرات والروبوتات واجمع العينات لتطوير الاستراتيجيات والأسلحة.',
        estimatedHours: '20 - 25 ساعة',
        unlockedTrophies: 'تروفيات التقدم والرتب'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: التروفيات التكتيكية وتحديات الصعوبة العالية',
        description: 'أنهِ مهمة بصعوبة Extreme بدون وفيات أو بدون أسلحة أولية مع فريق متعاون للحصول على البلاتينيوم.',
        estimatedHours: '10 - 15 ساعة',
        unlockedTrophies: 'The Epitome of Super Earth (البلاتينيوم)'
      }
    ],
    trophiesList: [
      {
        id: 'hd2-plat',
        title: 'مثال للديمقراطية',
        englishTitle: 'The Epitome of Super Earth',
        description: 'احصل على جميع تروفيات هيلدايفرز 2.',
        type: 'platinum',
        isOnline: true,
        guide: 'تتطلب إكمال جميع متطلبات التروفيات في اللعب الجماعي عبر الإنترنت.'
      }
    ],
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

  // 13. Days Gone
  {
    id: 'days-gone',
    slug: 'days-gone',
    title: 'ديز غون',
    englishTitle: 'Days Gone',
    platform: 'PS5 / PS4',
    genre: 'عالم مفتوح / نجاة وزومبي',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1259420/header.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    difficulty: 3,
    estimatedHours: '55 - 65 ساعة',
    platinumRarity: '27.6%',
    totalTrophiesCount: 46,
    platinumCount: 1,
    goldCount: 2,
    silverCount: 15,
    bronzeCount: 28,
    missableTrophiesCount: 0,
    onlineTrophiesCount: 0,
    description: 'قد دراجتك النارية عبر أوريغون المدمرة بشخصية ديكون سانت جون واقضِ على حشود الفريكرز الهائلة بدون أي تروفيات قابلة للفقد.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: قصة ديكون واستكشاف المعسكرات',
        description: 'أكمل جميع خطوط القصة وتعرف على المعسكرات واجمع نقاط المهارة.',
        estimatedHours: '35 - 40 ساعة',
        unlockedTrophies: 'تروفيات القصة'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: تدمير الحشود والوصول لأقصى ثقة',
        description: 'اقضِ على حشود الزومبي وافتح الترقية القصوى للدراجة للحصول على البلاتينيوم.',
        estimatedHours: '15 - 20 ساعة',
        unlockedTrophies: 'One Percenter (البلاتينيوم)'
      }
    ],
    trophiesList: [
      {
        id: 'dg-plat',
        title: 'فارس الطريق السريع',
        englishTitle: 'One Percenter',
        description: 'احصل على جميع تروفيات ديز غون.',
        type: 'platinum',
        guide: 'يُفتح بمجرد إنهاء كافة متطلبات اللعبة الأساسية.'
      }
    ],
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

  // 14. Resident Evil 2 Remake
  {
    id: 'resident-evil-2-remake',
    slug: 'resident-evil-2-remake',
    title: 'رزدنت إيفل 2 ريميك',
    englishTitle: 'Resident Evil 2 Remake',
    platform: 'PS5 / PS4',
    genre: 'رعب بقاء / مركز شرطة راكون',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/883710/header.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    difficulty: 6,
    estimatedHours: '30 - 40 ساعة',
    platinumRarity: '17.3%',
    totalTrophiesCount: 42,
    platinumCount: 1,
    goldCount: 4,
    silverCount: 9,
    bronzeCount: 28,
    missableTrophiesCount: 3,
    onlineTrophiesCount: 0,
    description: 'الريميك الحائز على إشادة عالمية الذي أعاد ابتكار الرعب في مركز شرطة راكون سيتي مع ليون وكلير ووحش مستر إكس المرعب.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: سيناريو ليون وكلير A و B',
        description: 'أكمل السيناريوهات الأساسية وتعرف على خريطة مركز الشرطة والمجاري والمختبر.',
        estimatedHours: '15 - 20 ساعة',
        unlockedTrophies: 'تروفيات القصة والسيناريوهات'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: رتبة S على Hardcore وتحديات الخطوات',
        description: 'أنهِ سيناريو بدون فتح الصندوق وبأقل من 14 ألف خطوة، ثم حقق رتبة S في Hardcore للحصول على البلاتينيوم.',
        estimatedHours: '15 - 20 ساعة',
        unlockedTrophies: 'Raccoon City Native (البلاتينيوم)'
      }
    ],
    trophiesList: [
      {
        id: 're2-plat',
        title: 'بطل راكون سيتي',
        englishTitle: 'Raccoon City Native',
        description: 'احصل على البلاتينيوم بإنهاء جميع التروفيات.',
        type: 'platinum',
        guide: 'يُفتح فور إكمال جميع التروفيات.'
      }
    ],
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

  // 15. Resident Evil 3 Remake
  {
    id: 'resident-evil-3-remake',
    slug: 'resident-evil-3-remake',
    title: 'رزدنت إيفل 3 ريميك',
    englishTitle: 'Resident Evil 3 Remake',
    platform: 'PS5 / PS4',
    genre: 'رعب أكشن / مطاردة النمسيس',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/952060/header.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    difficulty: 4,
    estimatedHours: '15 - 20 ساعة',
    platinumRarity: '24.9%',
    totalTrophiesCount: 33,
    platinumCount: 1,
    goldCount: 5,
    silverCount: 11,
    bronzeCount: 16,
    missableTrophiesCount: 2,
    onlineTrophiesCount: 0,
    description: 'هروب جيل فالنتاين المثير من شوارع مدينة راكون سيتي المنهارة تحت مطاردة الوحش المرعب نيمسيس مع إمكانية استخدام أسلحة المتجر اللانهائية.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: القصة والمقتنيات وجمع نقاط المتجر',
        description: 'أنهِ القصة مع تدمير دمى شارلي الـ 20 واجمع نقاط النقاط (Shop Points).',
        estimatedHours: '6 - 8 ساعات',
        unlockedTrophies: 'تروفيات القصة والمقتنيات'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: شراء قاذف الصواريخ اللانهائي وإنهاء Inferno',
        description: 'اشترِ قاذف الصواريخ من متجر النقاط وأنهِ صعوبات Nightmare و Inferno بأقل من ساعتين للحصول على البلاتينيوم.',
        estimatedHours: '8 - 10 ساعات',
        unlockedTrophies: 'Goodbye, Raccoon City (البلاتينيوم)'
      }
    ],
    trophiesList: [
      {
        id: 're3-plat',
        title: 'وداعاً راكون سيتي',
        englishTitle: 'Goodbye, Raccoon City',
        description: 'احصل على تروفي البلاتينيوم في رزدنت إيفل 3 ريميك.',
        type: 'platinum',
        guide: 'يُفتح فور إكمال متطلبات جميع التروفيات الـ 32 الأخرى.'
      }
    ],
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

  // 16. Resident Evil HD Remaster (RE1)
  {
    id: 'resident-evil-1-remake',
    slug: 'resident-evil-1-remake',
    title: 'رزدنت إيفل 1 ريميك (HD)',
    englishTitle: 'Resident Evil HD Remaster',
    platform: 'PS4 / PS5',
    genre: 'رعب بقاء كلاسيكي / قصر سبنسر',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/304240/header.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    difficulty: 7,
    estimatedHours: '30 - 45 ساعة',
    platinumRarity: '12.8%',
    totalTrophiesCount: 45,
    platinumCount: 1,
    goldCount: 3,
    silverCount: 15,
    bronzeCount: 26,
    missableTrophiesCount: 5,
    onlineTrophiesCount: 0,
    description: 'الريميك المتقن والمحدث للقصر الأسطوري في جبال آركلاي مع كريس ريدفيلد وجيل فالنتاين وألغاز النجاة الكلاسيكية والعدو غير المرئي.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: استكشاف قصر سبنسر وإنقاذ الرفاق',
        description: 'أنهِ القصة بجيل وكريس مع التعرف على أماكن المفاتيح والألغاز وحرق الجثث لتفادي تحولهم لكريمزون هيد.',
        estimatedHours: '15 - 20 ساعة',
        unlockedTrophies: 'تروفيات القصة ونهايات الشخصيات'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: التختيم بالسكين فقط والأعداء الخفيين',
        description: 'أكمل طور السكين فقط في الصعوبة السهلة، وطور Invisible Enemy وطور Real Survival للحصول على البلاتينيوم.',
        estimatedHours: '15 - 25 ساعة',
        unlockedTrophies: 'Like a Boss (البلاتينيوم)'
      }
    ],
    trophiesList: [
      {
        id: 're1-plat',
        title: 'البلاتينيوم',
        englishTitle: 'Like a Boss',
        description: 'احصل على جميع تروفيات اللعبة في قصر سبنسر الغامض.',
        type: 'platinum',
        guide: 'يُفتح فور إكمال جميع التروفيات.'
      }
    ],
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

  // 17. Resident Evil 0 HD Remaster
  {
    id: 'resident-evil-0-remake',
    slug: 'resident-evil-0-remake',
    title: 'رزدنت إيفل 0 ريميك (HD)',
    englishTitle: 'Resident Evil 0 HD Remaster',
    platform: 'PS4 / PS5',
    genre: 'رعب بقاء كلاسيكي / قطار الموت',
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/339340/header.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    difficulty: 7,
    estimatedHours: '35 - 50 ساعة',
    platinumRarity: '11.1%',
    totalTrophiesCount: 48,
    platinumCount: 1,
    goldCount: 3,
    silverCount: 14,
    bronzeCount: 30,
    missableTrophiesCount: 4,
    onlineTrophiesCount: 0,
    description: 'بدايات الكارثة مع ريبيكا تشامبرز وبيلي كوين على متن قطار إكليبس إكسبريس والمرفق التدريبي لأمبريلا بدون صناديق أدوات.',
    roadmap: [
      {
        stepNumber: 1,
        title: 'المرحلة الأولى: إنهاء القصة وطور صائد العلقات (Leech Hunter)',
        description: 'أنهِ القصة وافتح طور Leech Hunter واجمع 100 علقة لفتح أسلحة لا نهائية لكل الصعوبات.',
        estimatedHours: '15 - 20 ساعة',
        unlockedTrophies: 'تروفيات القصة والأسلحة اللانهائية'
      },
      {
        stepNumber: 2,
        title: 'المرحلة الثانية: إنهاء الصعوبة القاسية Hard بدون علاج وتختيم البلاتينيوم',
        description: 'أنهِ اللعبة برتبة S على Hard وأكمل تختيمة بدون علاج وتختيمة بدون حفظ للحصول على البلاتينيوم.',
        estimatedHours: '15 - 25 ساعة',
        unlockedTrophies: 'Wanna Be a Member? (البلاتينيوم)'
      }
    ],
    trophiesList: [
      {
        id: 're0-plat',
        title: 'نجم S.T.A.R.S الأسطوري',
        englishTitle: 'Wanna Be a Member?',
        description: 'احصل على جميع تروفيات رزدنت إيفل 0.',
        type: 'platinum',
        guide: 'يُفتح فور إكمال جميع التروفيات والتحديات في اللعبة.'
      }
    ],
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

// Helper functions for scalable database integration
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
