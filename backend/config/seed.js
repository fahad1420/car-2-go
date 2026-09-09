import bcrypt from 'bcryptjs';
import { dbStore } from '../services/storage.js';

export const seedDatabase = async () => {
  console.log('[Seed] Populating initial luxury fleet and configuration...');

  // Hash password for default admin & sample accounts
  const adminPasswordHash = await bcrypt.hash('Admin@Car2Go2026!', 10);
  const userPasswordHash = await bcrypt.hash('Client@2026!', 10);

  const defaultUsers = [
    {
      _id: 'usr_admin_01',
      name: 'Prestige Operations Admin',
      email: 'admin@car2go.sa',
      password: adminPasswordHash,
      phone: '+966 50 111 2233',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      idNumber: 'SA-ADM-9901',
      drivingLicenseNumber: 'SA-DL-448821',
      createdAt: new Date().toISOString()
    },
    {
      _id: 'usr_client_01',
      name: 'Tariq Al-Mansoor',
      email: 'tariq.mansoor@vip.sa',
      password: userPasswordHash,
      phone: '+966 55 987 6543',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      idNumber: '1098234567',
      drivingLicenseNumber: '9876543210',
      createdAt: new Date().toISOString()
    }
  ];

  const defaultVehicles = [
    {
      _id: 'veh_rr_spectre',
      name: 'Rolls-Royce Spectre',
      brand: 'Rolls-Royce',
      category: 'Luxury',
      tagline: 'The Ultra-Luxury All-Electric Super Coupé',
      taglineAr: 'الكوبيه الفاخرة الكهربائية الأرقى في العالم',
      year: 2025,
      pricePerDay: 4800,
      weeklyDiscount: 15,
      deposit: 8000,
      currency: 'SAR',
      transmission: 'Automatic Dual-Drive',
      fuelType: 'All-Electric Ultra-Quiet',
      seats: 4,
      doors: 2,
      acceleration: '4.5s (0-100 km/h)',
      topSpeed: '250 km/h',
      horsepower: '584 HP',
      engine: 'Dual Synchronous Electric Motors',
      color: 'Chartreuse & Black Diamond Two-Tone',
      available: true,
      featured: true,
      rating: 4.98,
      reviewCount: 28,
      mileageLimitPerDay: 250,
      extraMileageCost: 18,
      location: 'Riyadh - King Khalid International Airport (Terminal 1-5 VIP)',
      images: [
        'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1600&q=85'
      ],
      features: [
        'Starlight Headliner with 4,796 Hand-Placed Fibre-Optic Stars',
        'Illuminated Spirit of Ecstasy & Pantheon Grille',
        'Planar Suspension System with Electronic Decoupling',
        'Bespoke 18-Speaker Audio Architecture (1,400W)',
        'Effortless Power-Assisted Coach Doors',
        'Whisper-Quiet Acoustic Glazing Cabin'
      ],
      featuresAr: [
        'سقف النجوم المضاء بـ 4,796 نقطة ألياف ضوئية متلألئة',
        'تمثال روح النشوة وشبك البانثيون المضيء بتقنية LED',
        'نظام تعليق بلانار فائق النعومة مع فصل إلكتروني',
        'نظام صوتي بيسبوك فاخر بقوة 1,400 واط بـ 18 مكبراً',
        'أبواب كوتش تفتح وتغلق كهربائياً بلمسة زر',
        'عزل صوتي فائق الهدوء مع زجاج مزدوج مقوّى'
      ]
    },
    {
      _id: 'veh_porsche_911gt3',
      name: 'Porsche 911 GT3 RS',
      brand: 'Porsche',
      category: 'Sports',
      tagline: 'Aerodynamic Perfection & High-Revving Racing Precision',
      taglineAr: 'قمة الهندسة الديناميكية الهوائية والأداء الحلباتي الخارق',
      year: 2025,
      pricePerDay: 3900,
      weeklyDiscount: 12,
      deposit: 6000,
      currency: 'SAR',
      transmission: '7-Speed Dual-Clutch PDK',
      fuelType: 'Super 98 Premium Petrol',
      seats: 2,
      doors: 2,
      acceleration: '3.2s (0-100 km/h)',
      topSpeed: '296 km/h',
      horsepower: '525 HP',
      engine: '4.0L Naturally Aspirated Boxer-6 (9,000 RPM)',
      color: 'Arctic Grey with Acid Accent Carbon',
      available: true,
      featured: true,
      rating: 4.96,
      reviewCount: 42,
      mileageLimitPerDay: 200,
      extraMileageCost: 15,
      location: 'Riyadh - Al Olaya Prestige Showroom',
      images: [
        'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=85'
      ],
      features: [
        'Active Drag Reduction System (DRS) Active Aero Wing',
        'Porsche Ceramic Composite Brakes (PCCB)',
        'Full Carbon Fiber Bucket Seats & Lightweight Rollcage',
        'Chrono Package with Precision Lap Trigger',
        'Multi-stage PASM & PTV Plus Torque Vectoring',
        'Titanium Sports Exhaust System with Valve Control'
      ],
      featuresAr: [
        'جناح خلفي هوائي نشط مع نظام تخفيض السحب DRS',
        'مكابح بورشه السيراميكية المركبة فائقة القوة PCCB',
        'مقاعد باكت رياضية بالكامل من ألياف الكربون الخفيف',
        'باقة كرونو الرياضية مع مؤقت حلبات دقيق',
        'نظام توجيه العزم والتعليق المتكيف PASM & PTV Plus',
        'عادم رياضي من التيتانيوم بصوت زئير طبيعي حماسي'
      ]
    },
    {
      _id: 'veh_maybach_s680',
      name: 'Mercedes-Maybach S 680',
      brand: 'Mercedes-Benz',
      category: 'Executive',
      tagline: 'Unrivaled First-Class Luxury & V12 Majesty',
      taglineAr: 'فخامة الدرجة الأولى الملكية بمحرك V12 الأسطوري',
      year: 2025,
      pricePerDay: 4200,
      weeklyDiscount: 15,
      deposit: 7000,
      currency: 'SAR',
      transmission: '9G-TRONIC Automatic',
      fuelType: 'Premium Petrol',
      seats: 4,
      doors: 4,
      acceleration: '4.5s (0-100 km/h)',
      topSpeed: '250 km/h',
      horsepower: '621 HP',
      engine: '6.0L Twin-Turbocharged V12 Biturbo',
      color: 'Onyx Black & Selenite Grey Duo-Tone',
      available: true,
      featured: true,
      rating: 4.99,
      reviewCount: 35,
      mileageLimitPerDay: 250,
      extraMileageCost: 16,
      location: 'Jeddah - North Corniche Waterfront Hub',
      images: [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85'
      ],
      features: [
        'Executive First-Class Rear Lounge with Calf Massage & Recline',
        'Burmester High-End 4D Surround Sound (31 Speakers, 1,750W)',
        'Active Road Noise Compensation & Soft-Close Panoramic Roof',
        'Silver-Plated Champagne Flutes & Refrigerated Compartment',
        'E-ACTIVE BODY CONTROL Predictive Hydro-Pneumatic Suspension',
        'Chauffeur Package with Footrest Extension'
      ],
      featuresAr: [
        'جناح خلفي فاخر من الدرجة الأولى مع تدليك الساقين وانحناء كامل',
        'نظام بورميستر الصوتي رباعي الأبعاد بـ 31 مكبراً وقوة 1,750 واط',
        'نظام نشط لعزل ضوضاء الطريق وسقف بانورامي معتم إلكترونياً',
        'كؤوس شمبانيا مطلية بالفضة مع ثلاجة تبريد مدمجة',
        'نظام تعليق E-ACTIVE التنبؤي لمسح الطريق وامتصاص المطبات',
        'باقة السائق الخاص مع دعامة ممتدة للقدمين وراحة مطلقة'
      ]
    },
    {
      _id: 'veh_lambo_urus',
      name: 'Lamborghini Urus Performante',
      brand: 'Lamborghini',
      category: 'SUV',
      tagline: 'The Ultimate Super Sports Utility Masterpiece',
      taglineAr: 'أقوى وأشرس سيارة دفع رباعي فائقة الأداء في العالم',
      year: 2025,
      pricePerDay: 4400,
      weeklyDiscount: 10,
      deposit: 7500,
      currency: 'SAR',
      transmission: '8-Speed Automatic All-Wheel Drive',
      fuelType: 'Super 98 Premium Petrol',
      seats: 5,
      doors: 5,
      acceleration: '3.3s (0-100 km/h)',
      topSpeed: '306 km/h',
      horsepower: '666 HP',
      engine: '4.0L Twin-Turbocharged V8 with Rally Mode',
      color: 'Giallo Inti Lemon Yellow & Naked Carbon',
      available: true,
      featured: true,
      rating: 4.97,
      reviewCount: 51,
      mileageLimitPerDay: 200,
      extraMileageCost: 18,
      location: 'AlUla - Banyan Tree & Desert Resort Pavilion',
      images: [
        'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=85'
      ],
      features: [
        'Carbon Fiber Bonnet, Roof, and Aerodynamic Rear Spoiler',
        'Akrapovič Titanium Lightweight Quad Sport Exhaust',
        'Rally Drive Mode for High-Speed Loose Surface Drifting',
        'Carbon Ceramic Brakes with Giallo Brake Calipers',
        '23-inch Forged Pelope Diamond-Cut Alloys with Trofeo R Tyres',
        'Alcantara Sport Seats with Contrast Hexagonal Stitching'
      ],
      featuresAr: [
        'غطاء محرك وسقف وجناح هوائي خلفي بالكامل من ألياف الكربون',
        'نظام عادم أكرابوفيتش تيتانيوم رباعي المخرج بصوت جهوري مذهل',
        'وضع قيادة الرالي المخصص للانجرافات السريعة على المسارات الرملية',
        'مكابح كربون سيراميكية مع كليبرات رياضية صفراء مخصصة',
        'جنوط بيسكوك قياس 23 إنش مع إطارات تروفيو آر عالية التماسك',
        'مقصورة ألكانتارا فاخرة بتطريزات سداسية متقنة وألياف الكربون'
      ]
    },
    {
      _id: 'veh_lucid_sapphire',
      name: 'Lucid Air Sapphire',
      brand: 'Lucid Motors',
      category: 'Luxury',
      tagline: '1,234 Horsepower Sub-2-Second Electric Dominance',
      taglineAr: 'هندسة المستقبل بقوة 1,234 حصاناً وتسارع يكسر حاجز الثانيتين',
      year: 2025,
      pricePerDay: 3700,
      weeklyDiscount: 14,
      deposit: 5500,
      currency: 'SAR',
      transmission: 'Tri-Motor AWD with Torque Vectoring',
      fuelType: 'Ultra-High Voltage 900V Electric Architecture',
      seats: 5,
      doors: 4,
      acceleration: '1.89s (0-100 km/h)',
      topSpeed: '330 km/h',
      horsepower: '1,234 HP',
      engine: 'Tri-Motor In-House Electric Powertrain',
      color: 'Sapphire Midnight Blue Metallic',
      available: true,
      featured: true,
      rating: 4.95,
      reviewCount: 19,
      mileageLimitPerDay: 300,
      extraMileageCost: 12,
      location: 'Riyadh - King Khalid International Airport (Terminal 1-5 VIP)',
      images: [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85'
      ],
      features: [
        '34-Inch Curved Glass Cockpit 5K Display',
        'Carbon Ceramic Brakes with 10-Piston Calipers',
        'Sapphire Themed Adaptive 18-Way Bolstered Sport Seats',
        'Surreal Sound Pro 21-Speaker Immersive Spatial Audio',
        'DreamDrive Pro Advanced Autonomous Driver Assistance',
        'Over 700 km Real-World Electric Range per Charge'
      ],
      featuresAr: [
        'شاشة قمرة القيادة الزجاجية المنحنية بدقة 5K قياس 34 إنش',
        'مكابح كربون سيراميكية بـ 10 مكابس لقوة توقف فائقة الثبات',
        'مقاعد رياضية متكيفة بـ 18 وضعية مخصصة للتحكم التام',
        'نظام صوتي سريالي محيطي بـ 21 مكبراً وتوزيع صوتي مكاني',
        'نظام دريم درايف برو للقيادة الذاتية والمساعدة المتقدمة',
        'مدى سير كهربائي يتجاوز 700 كم بالشحنة الواحدة الفائقة'
      ]
    },
    {
      _id: 'veh_range_rover_sv',
      name: 'Range Rover SV Long Wheelbase',
      brand: 'Land Rover',
      category: 'SUV',
      tagline: 'The Pinnacle of Aristocratic Luxury & Refined All-Terrain Capability',
      taglineAr: 'قمة الفخامة البريطانية الأرستقراطية وقوة الدفع الرباعي المطلقة',
      year: 2025,
      pricePerDay: 3600,
      weeklyDiscount: 15,
      deposit: 5500,
      currency: 'SAR',
      transmission: '8-Speed Electronic Automatic',
      fuelType: 'Twin-Turbo V8 Petrol with MHEV',
      seats: 5,
      doors: 5,
      acceleration: '4.4s (0-100 km/h)',
      topSpeed: '261 km/h',
      horsepower: '606 HP',
      engine: '4.4L Twin-Turbocharged V8 Engine',
      color: 'Sunrise Copper Satin with Contrast Narvik Black',
      available: true,
      featured: false,
      rating: 4.93,
      reviewCount: 33,
      mileageLimitPerDay: 250,
      extraMileageCost: 14,
      location: 'Eastern Province - Al Khobar Corniche Concierge',
      images: [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85'
      ],
      features: [
        'SV Signature Suite with Electrically Deployable Club Table',
        'Meridian Signature 3D Sound System with Active Headrest Noise Cancellation',
        'Ceramic Gear Shifter & Volume Controls with White Glaze',
        'All-Wheel Steering & Electronic Air Suspension with Dynamic Response Pro',
        'Power-Assisted Gesture Doors & Automated Deployable Steps',
        'Dual 13.1-Inch Rear Entertainment Touchscreens with Wireless HDMI'
      ],
      featuresAr: [
        'جناح إس في الخلفي الحصري مع طاولة نادي متحركة كهربائياً',
        'نظام ميريديان سيغنتشر الصوتي مع عزل نشط داخل مساند الرأس',
        'عصا ناقل حركة وأزرار مصنوعة يدوياً من السيراميك الأبيض المصقول',
        'توجيه رباعي لجميع العجلات ونظام تعليق هوائي ديناميكي ذكي',
        'أبواب كهربائية مع استشعار الإيماءات وعتبات هيدروليكية ذكية',
        'شاشات ترفيه خلفية لمسية مزدوجة قياس 13.1 إنش مع منافذ HDMI'
      ]
    },
    {
      _id: 'veh_ferrari_roma',
      name: 'Ferrari Roma Spider',
      brand: 'Ferrari',
      category: 'Sports',
      tagline: 'La Nuova Dolce Vita Open-Top Elegance & Prancing Horse Thrill',
      taglineAr: 'أناقة الحياة الإيطالية الساحرة المكشوفة مع هدير فيراري الخالد',
      year: 2025,
      pricePerDay: 4600,
      weeklyDiscount: 10,
      deposit: 8000,
      currency: 'SAR',
      transmission: '8-Speed F1 Dual-Clutch Gearbox',
      fuelType: 'Super 98 Premium Petrol',
      seats: 2,
      doors: 2,
      acceleration: '3.4s (0-100 km/h)',
      topSpeed: '320 km/h',
      horsepower: '620 HP',
      engine: '3.9L Twin-Turbocharged 90° V8 Award-Winner',
      color: 'Rosso Corsa & Nero Roof with Lemon Accents',
      available: true,
      featured: false,
      rating: 4.97,
      reviewCount: 22,
      mileageLimitPerDay: 200,
      extraMileageCost: 20,
      location: 'Dubai - DIFC Gate Precinct Hub',
      images: [
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1600&q=85'
      ],
      features: [
        '5-Layer Soft Top Deployable in 13.5 Seconds up to 60 km/h',
        'Manettino 5-Position Racing Selector (Wet, Comfort, Sport, Race, ESC-Off)',
        'Side Slip Control (SSC 6.0) with Ferrari Dynamic Enhancer',
        'Dual-Cockpit Architecture with 8.4-Inch Central HD Screen',
        'Full Carbon Fiber Steering Wheel with LED Shift Lights',
        'Bespoke JBL Professional Automotive Sound System'
      ],
      featuresAr: [
        'سقف قماشي فاخر بـ 5 طبقات عازلة يفتح خلال 13.5 ثانية أثناء القيادة',
        'قرص مانيتينو الشهير بـ 5 وضعيات للتحكم بالثبات والانطلاق الحلباتي',
        'نظام التحكم بالانزلاق الجانبي المتقدم SSC 6.0 لثبات استثنائي',
        'مقصورة قيادة مزدوجة مستوحاة من سيارات السباق مع شاشة HD مركزية',
        'مقود قيادة بالكامل من ألياف الكربون مع أضواء LED لتبديل السرعات',
        'نظام صوتي بيسبوك من جي بي إل مصمم خصيصاً للمقصورات المكشوفة'
      ]
    },
    {
      _id: 'veh_bmw_m8',
      name: 'BMW M8 Competition Gran Coupé',
      brand: 'BMW',
      category: 'Executive',
      tagline: 'High-Performance Grand Tourer with M xDrive Dominance',
      taglineAr: 'جراند تورير فائقة القوة مع نظام الدفع الرباعي الذكي M xDrive',
      year: 2025,
      pricePerDay: 2900,
      weeklyDiscount: 15,
      deposit: 4500,
      currency: 'SAR',
      transmission: '8-Speed M Steptronic with Drivelogic',
      fuelType: 'Premium Petrol',
      seats: 5,
      doors: 4,
      acceleration: '3.2s (0-100 km/h)',
      topSpeed: '305 km/h',
      horsepower: '625 HP',
      engine: '4.4L M TwinPower Turbo V8',
      color: 'Frozen Isle of Man Green Metallic',
      available: true,
      featured: false,
      rating: 4.91,
      reviewCount: 29,
      mileageLimitPerDay: 250,
      extraMileageCost: 12,
      location: 'Doha - The Pearl Island Concierge',
      images: [
        'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=85'
      ],
      features: [
        'M Carbon Ceramic Brakes & M Sport Differential',
        'Bowers & Wilkins Diamond Surround Sound System',
        'BMW Laserlight with Adaptive High-Beam Assistant',
        'M Carbon Bucket Seats with Illuminated M8 Badging',
        'Head-Up Display with M-Specific G-Force & Shift Indicators',
        'Active M Suspension with Dynamic Damper Control'
      ],
      featuresAr: [
        'مكابح إم كربون سيراميكية وترس تفاضلي إم الرياضي النشط',
        'نظام باورز آند ويلكنز الصوتي بأغشية الألماس النقية',
        'مصابيح ليزر بي إم دبليو المتكيفة لمدى رؤية ليلي فائق',
        'مقاعد إم باكت كربونية مع شعارات M8 المضيئة الفاخرة',
        'شاشة عرض على الزجاج الأمامي لعرض قوى التسارع وتبديل السرعات',
        'نظام تعليق إم النشط مع تحكم ديناميكي متكيف بصلابة المخمدات'
      ]
    }
  ];

  const defaultPromos = [
    {
      _id: 'prm_prestige20',
      code: 'PRESTIGE20',
      discountPercent: 20,
      maxDiscount: 2000,
      validUntil: '2027-12-31',
      description: 'Exclusive 20% discount for inaugural luxury bookings',
      active: true
    },
    {
      _id: 'prm_riyadh15',
      code: 'RIYADH15',
      discountPercent: 15,
      maxDiscount: 1500,
      validUntil: '2027-12-31',
      description: '15% off for airport VIP deliveries across Riyadh & GCC',
      active: true
    },
    {
      _id: 'prm_lemon10',
      code: 'CAR2GO',
      discountPercent: 10,
      maxDiscount: 1000,
      validUntil: '2027-12-31',
      description: '10% Welcome VIP courtesy privilege',
      active: true
    }
  ];

  const defaultReviews = [
    {
      _id: 'rev_01',
      vehicleId: 'veh_rr_spectre',
      userId: 'usr_client_01',
      userName: 'HRH Prince Khalid Al-Saud',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      title: 'Flawless VIP Arrival at Riyadh Private Aviation',
      titleAr: 'استقبال استثنائي في صالة الطيران الخاص بمطار الرياض',
      comment: 'The Rolls-Royce Spectre was delivered directly to the private jet steps. Pristine condition, exquisite whisper-quiet performance, and the concierge was truly world-class.',
      commentAr: 'تم تسليم رولز رويس سبكتر مباشرة أمام سلم الطائرة الخاصة. حالة السيارة لا تشوبها شائبة وعزلها الصوتي خيالي، وتعامل فريق الكونسيرج راقٍ ومحترف للغاية.',
      date: '2026-08-14T10:00:00.000Z',
      verified: true
    },
    {
      _id: 'rev_02',
      vehicleId: 'veh_porsche_911gt3',
      userId: 'usr_client_01',
      userName: 'Faisal Bin Hamad',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      title: 'Unbelievable driving dynamics in Diriyah and AlUla',
      titleAr: 'أداء قيادة خارق على طرق الدرعية والعلا',
      comment: 'The GT3 RS is a masterpiece. Flawless ceramic brakes, telepathic steering response, and seamless digital booking. The only luxury rental brand I trust in the Kingdom.',
      commentAr: 'سيارة GT3 RS تحفة هندسية بحق. المكابح السيراميكية واستجابة المقود فورية، وتجربة الحجز الرقمية كانت سلسة وسريعة بدون أي تعقيد. المنصة الأولى للسيارات الفارهة.',
      date: '2026-08-28T14:30:00.000Z',
      verified: true
    },
    {
      _id: 'rev_03',
      vehicleId: 'veh_maybach_s680',
      userId: 'usr_client_01',
      userName: 'Alexander Vance',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      title: 'Executive Perfection for International Diplomatic Summit',
      titleAr: 'فخامة مطلقة لقمة الوفود الدبلوماسية الدولية',
      comment: 'Unmatched comfort and presence. The rear executive lounge with Champagne cooler made long inter-city transfers between Riyadh and Jeddah entirely effortless.',
      commentAr: 'راحة لا تضاهى وهيبة ملكية. الجناح الخلفي مع المبرد الفاخر جعل التنقل بين الرياض وجدة في غاية السلاسة والراحة التامة.',
      date: '2026-09-02T18:15:00.000Z',
      verified: true
    }
  ];

  const defaultBookings = [
    {
      _id: 'c2g_bk_sample1',
      bookingReference: 'C2G-89241',
      vehicleId: 'veh_rr_spectre',
      vehicleName: 'Rolls-Royce Spectre',
      vehicleImage: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=800&q=80',
      userId: 'usr_client_01',
      customerName: 'Tariq Al-Mansoor',
      customerEmail: 'tariq.mansoor@vip.sa',
      customerPhone: '+966 55 987 6543',
      idNumber: '1098234567',
      pickupLocation: 'Riyadh - King Khalid International Airport (Terminal 1-5 VIP)',
      returnLocation: 'Riyadh - Al Olaya Prestige Showroom',
      pickupDate: '2026-09-12T10:00:00.000Z',
      returnDate: '2026-09-15T18:00:00.000Z',
      days: 3,
      baseDailyRate: 4800,
      baseTotal: 14400,
      addons: [
        { id: 'vip-delivery', name: 'VIP Airport Meet & Escort', price: 500, selected: true },
        { id: 'full-protection', name: 'Zero-Deductible Elite Protection', price: 450, selected: true }
      ],
      addonsTotal: 950,
      vatRate: 0.15,
      vatAmount: 2302.5,
      discountAmount: 1440, // from coupon
      depositAmount: 8000,
      totalAmount: 16212.5,
      paymentMethod: 'Credit Card / Mada (Simulated)',
      status: 'Confirmed', // Pending, Confirmed, Active, Completed, Cancelled
      notes: 'Please ensure chilled sparkling water and Arabic dates inside cabin upon runway hand-off.',
      createdAt: '2026-09-08T09:30:00.000Z'
    }
  ];

  // Save to persistent storage engine
  dbStore.setCollection('users', defaultUsers);
  dbStore.setCollection('vehicles', defaultVehicles);
  dbStore.setCollection('promos', defaultPromos);
  dbStore.setCollection('reviews', defaultReviews);
  dbStore.setCollection('bookings', defaultBookings);

  console.log('[Seed] Database initialization completed successfully.');
};

