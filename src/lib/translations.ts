export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    nav: {
      home: 'الرئيسية',
      services: 'خدماتنا',
      equipment: 'المعدات',
      about: 'من نحن',
      contact: 'اتصل بنا',
      book: 'احجز موعد',
      admin: 'لوحة التحكم',
      tips: 'نصائح الصيانة',
      testimonials: 'آراء العملاء',
      my_bookings: 'حجوزاتي',
      support: 'الدعم الفني',
      privacy: 'سياسة الخصوصية',
    },
    faq: {
      title: 'الأسئلة الشائعة والدعم الفني',
      subtitle: 'كل ما تحتاج معرفته عن خدمات مركز نور الماسي',
      questions: [
        {
          q: 'ما هي مواعيد العمل في المركز؟',
          a: 'نعمل من السبت إلى الخميس، من الساعة 8 صباحاً وحتى 10 مساءً. يوم الجمعة مغلق.'
        },
        {
          q: 'هل يتطلب فحص الكمبيوتر وقتاً طويلاً؟',
          a: 'عادة ما يستغرق الفحص الشامل من 15 إلى 30 دقيقة، حسب نوع السيارة والمشكلة.'
        },
        {
          q: 'هل توفرون ضماناً على خدمات البرمجة؟',
          a: 'نعم، جميع خدمات البرمجة لدينا مضمونة، ونحرص على رضا العميل التام قبل مغادرة المركز.'
        },
        {
          q: 'كيف يمكنني حجز موعد؟',
          a: 'يمكنك الحجز مباشرة عبر الموقع من خلال قسم "احجز موعد"، أو الاتصال بنا هاتفياً أو عبر واتساب.'
        },
        {
          q: 'هل تتوفر خدمة السطحة لنقل السيارات المتعطلة؟',
          a: 'نعم، نوفر خدمة سطحة احترافية لنقل سيارتك إلى مركزنا بأمان وفي أي وقت.'
        }
      ]
    },
    hero: {
      title: 'أفضل مركز للفحص والبرمجة والصيانة في المدينة المنورة',
      subtitle: 'مركز نور الماسي - دقة في التشخيص، احترافية في الصيانة.',
      cta_book: 'احجز موعد الآن',
      cta_contact: 'تواصل معنا',
    },
    services: {
      title: 'خدماتنا الاحترافية',
      description: 'نقدم مجموعة واسعة من الخدمات التقنية لسيارتك بأحدث الأجهزة.',
      computer_check: 'فحص كمبيوتر',
      computer_check_desc: 'تشخيص دقيق لجميع أعطال السيارة باستخدام أحدث الأجهزة.',
      programming: 'برمجة سيارات',
      programming_desc: 'برمجة المفاتيح، وحدات التحكم، وتحسين أداء المحرك.',
      electrical: 'صيانة كهرباء',
      electrical_desc: 'إصلاح وصيانة جميع الأنظمة الكهربائية والإلكترونية.',
      diagnostics: 'تشخيص الأعطال',
      diagnostics_desc: 'تحديد مسببات الأعطال الميكانيكية والكهربائية بدقة.',
      towing: 'خدمة السطحة',
      towing_desc: 'خدمة نقل السيارات المتعطلة بأمان واحترافية على مدار الساعة.',
    },
    booking: {
      title: 'احجز موعدك الآن',
      name: 'الاسم الكامل',
      phone: 'رقم الجوال',
      service: 'نوع الخدمة',
      car_type: 'نوع السيارة (اختياري)',
      date: 'التاريخ',
      time: 'الوقت',
      submit: 'تأكيد الحجز',
      success: 'تم استلام طلب الحجز بنجاح! سنتواصل معك قريباً.',
      select_service: 'اختر الخدمة',
    },
    equipment: {
      title: 'معداتنا المتطورة',
      modern_check: 'أجهزة فحص حديثة',
      advanced_prog: 'أدوات برمجة متقدمة',
      pro_tools: 'معدات صيانة احترافية',
    },
    about: {
      title: 'عن مركز نور الماسي',
      content: 'نحن مركز متخصص في صيانة وبرمجة السيارات في المدينة المنورة، نعتمد على أحدث التقنيات والخبرات الطويلة التي تمتد لأكثر من 30 عاماً لضمان أفضل أداء لسيارتك. نحن نؤمن بأن كل سيارة تستحق العناية الفائقة، ولذلك نسعى دائماً لتوفير أفضل الحلول التقنية والميكانيكية لعملائنا في المدينة المنورة. فريقنا مدرب على أعلى مستوى للتعامل مع كافة أنواع السيارات الحديثة.',
      experience: 'خبرة تزيد عن 30 عاماً',
      location: 'المدينة المنورة، المملكة العربية السعودية',
    },
    contact: {
      title: 'تواصل معنا',
      phone_label: 'اتصل بنا',
      phone: '0551933926',
      whatsapp_label: 'واتساب',
      whatsapp: '0530012363',
      address: 'العنوان',
      location: 'المدينة المنورة، المملكة العربية السعودية',
      send: 'إرسال الرسالة',
    },
    admin: {
      title: 'لوحة تحكم الحجوزات',
      no_bookings: 'لا توجد حجوزات حالياً.',
      status: 'الحالة',
      actions: 'إجراءات',
    },
    tips: {
      title: 'نصائح الصيانة الدورية',
      description: 'دليلك الشامل للحفاظ على أداء سيارتك وإطالة عمرها الافتراضي. نصائح من خبراء مركز نور الماسي بالمدينة المنورة.',
      battery: {
        title: 'كيف تحافظ على عمر بطارية سيارتك؟',
        content: 'لتطيل عمر البطارية، تجنب ترك الأجهزة تعمل بعد إيقاف المحرك. افحص مستوى الماء في البطارية بانتظام، وتأكد من تنظيف الأطراف من الصدأ. هل تواجه مشاكل متكررة في تشغيل السيارة؟ البطارية هي القلب النابض لأي سيارة، ومع الإهمال، قد تجد نفسك عالقًا في منتصف الطريق.',
      },
      oil: {
        title: 'متى يجب تغيير زيت المحرك؟',
        content: 'يُنصح بتغيير زيت المحرك كل 5,000 إلى 10,000 كم حسب نوع الزيت ونوع السيارة. تأكد دائمًا من متابعة دليل الصيانة الخاص بالسيارة لضمان أفضل أداء للمحرك.',
      },
      air_filter: {
        title: 'متى يجب تغيير فلاتر الهواء في السيارة؟',
        content: 'فلتر الهواء النظيف يحسّن أداء المحرك ويوفر الوقود. يُنصح بتغييره كل 15,000 كم أو في حال القيادة في بيئة مليئة بالغبار. من علامات انسداده: ضعف التسارع وزيادة استهلاك البنزين.',
      },
      tires: {
        title: 'أهمية فحص الإطارات بانتظام',
        content: 'تأكد من ضغط الهواء الصحيح، وتحقق من تآكل الإطارات. الفحص الشهري يمكن أن يمنع الحوادث ويطيل عمر الإطار ويوفر في استهلاك الوقود.',
      },
      brakes: {
        title: 'أهمية فحص فرامل السيارة بانتظام',
        content: 'فرامل السيارة عنصر أساسي للسلامة. افحص تآكل الأقراص والأقمشة كل 6 أشهر أو عند سماع صوت صرير. الصيانة الدورية للفرامل تمنع الحوادث وتطيل عمر النظام.',
      },
      spark_plugs: {
        title: 'متى تغيّر شمعات الإشعال (البواجي)؟',
        content: 'البواجي التالفة تسبب اهتزاز المحرك وزيادة الاستهلاك. يجب تغيير شمعات الإشعال كل 30,000 إلى 60,000 كم حسب نوع السيارة. الفحص المنتظم يحسن الأداء ويمنع الأعطال المفاجئة.',
      },
      seo_keywords: 'صيانة سيارات المدينة المنورة، فحص كمبيوتر سيارات، برمجة سيارات، تغيير زيت، فحص بطارية، صيانة فرامل، مركز نور الماسي، ورشة سيارات المدينة',
    },
    user_bookings: {
      title: 'حجوزاتي',
      no_bookings: 'لم تقم بأي حجوزات بعد.',
      book_now: 'احجز موعدك الأول الآن',
      status_pending: 'قيد الانتظار',
      status_confirmed: 'تم التأكيد',
      status_completed: 'مكتمل',
      status_cancelled: 'ملغي',
      login_required: 'يرجى تسجيل الدخول لعرض حجوزاتك.',
    },
    expert: {
      title: 'المهندس زياد - خبير تقني',
      subtitle: 'خبرة تزيد عن 20 عاماً في برمجة السيارات والتشخيص المتقدم.',
      description: 'يعد المهندس زياد من أبرز الخبراء في المدينة المنورة في مجال إلكترونيات السيارات، حيث يجمع بين الخبرة العملية والشهادات التقنية المعتمدة.',
      certificates: [
        'خبير معتمد في تشخيص أعطال السيارات المتقدمة',
        'متخصص في برمجة وحدات التحكم (ECU) وتحسين الأداء',
        'شهادة احترافية في أنظمة السيارات الهجينة والكهربائية',
        'كبير فنيي إلكترونيات السيارات وأنظمة الأمان'
      ],
      experience_years: '20+ سنة خبرة',
      certified: 'فني معتمد'
    },
    testimonials: {
      title: 'ماذا يقول عملاؤنا؟',
      subtitle: 'نفتخر بخدمة آلاف العملاء في المدينة المنورة بصدق وإتقان، خذها من مراجعات المحل بقوقل خرائط.',
      reviews: [
        {
          name: 'عبدالرحمن المطيري',
          car: 'نيسان باترول',
          text: 'بصراحة أفضل ورشة في المدينة المنورة من ناحية الفحص والبرمجة. المهندس زياد قمة في الأخلاق والخبرة، حل لي مشكلة كانت محيرة للجميع.',
          rating: 5
        },
        {
          name: 'سلطان الحربي',
          car: 'تويوتا لاندكروزر',
          text: 'شغل نظيف ومرتب وأجهزة حديثة جداً. تعامل راقي وسرعة في الإنجاز. أنصح به كل من يبحث عن دقة في التشخيص.',
          rating: 5
        },
        {
          name: 'فهد الجهني',
          car: 'لكزس LS',
          text: 'تمت برمجة السيارة وفحصها بالكامل، والنتيجة كانت مبهرة. دقة في المواعيد واحترافية عالية في العمل.',
          rating: 5
        }
      ]
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      equipment: 'Equipment',
      about: 'About Us',
      contact: 'Contact',
      book: 'Book Now',
      admin: 'Admin',
      tips: 'Maintenance Tips',
      testimonials: 'Testimonials',
      my_bookings: 'My Bookings',
      support: 'Technical Support',
      privacy: 'Privacy Policy',
    },
    faq: {
      title: 'FAQ & Technical Support',
      subtitle: 'Everything you need to know about Noor Al-Masi services',
      questions: [
        {
          q: 'What are the working hours?',
          a: 'We are open from Saturday to Thursday, 8:00 AM to 10:00 PM. Friday is closed.'
        },
        {
          q: 'How long does a computer check take?',
          a: 'A comprehensive check usually takes 15 to 30 minutes, depending on the car and the issue.'
        },
        {
          q: 'Do you provide a warranty on programming services?',
          a: 'Yes, all our programming services are guaranteed, and we ensure full customer satisfaction.'
        },
        {
          q: 'How can I book an appointment?',
          a: 'You can book directly through the website in the "Book Now" section, or call us via phone or WhatsApp.'
        },
        {
          q: 'Is there a towing service available?',
          a: 'Yes, we provide professional towing services to transport your car safely to our center at any time.'
        }
      ]
    },
    hero: {
      title: 'The Best Inspection, Programming & Maintenance Center in Madinah',
      subtitle: 'Noor Al-Masi Center - Precision in Diagnosis, Professionalism in Maintenance.',
      cta_book: 'Book Appointment',
      cta_contact: 'Contact Us',
    },
    services: {
      title: 'Our Professional Services',
      description: 'We offer a wide range of technical services for your car using the latest equipment.',
      computer_check: 'Computer Diagnostics',
      computer_check_desc: 'Accurate diagnosis of all car faults using the latest devices.',
      programming: 'Car Programming',
      programming_desc: 'Key programming, control units, and engine performance tuning.',
      electrical: 'Electrical Maintenance',
      electrical_desc: 'Repair and maintenance of all electrical and electronic systems.',
      diagnostics: 'Fault Diagnosis',
      diagnostics_desc: 'Precisely identifying mechanical and electrical fault causes.',
      towing: 'Towing Service',
      towing_desc: 'Safe and professional car towing service available 24/7.',
    },
    booking: {
      title: 'Book Your Appointment',
      name: 'Full Name',
      phone: 'Phone Number',
      service: 'Service Type',
      car_type: 'Car Type (Optional)',
      date: 'Date',
      time: 'Time',
      submit: 'Confirm Booking',
      success: 'Booking request received! We will contact you soon.',
      select_service: 'Select Service',
    },
    equipment: {
      title: 'Our Advanced Equipment',
      modern_check: 'Modern Diagnostic Tools',
      advanced_prog: 'Advanced Programming Tools',
      pro_tools: 'Professional Maintenance Gear',
    },
    about: {
      title: 'About Noor Al-Masi Center',
      content: 'We are a specialized center for car maintenance and programming in Madinah, relying on the latest technologies and over 30 years of experience to ensure the best performance for your car.',
      experience: 'Over 30 years of experience',
      location: 'Madinah, Saudi Arabia',
    },
    contact: {
      title: 'Contact Us',
      phone_label: 'Call Us',
      phone: '0551933926',
      whatsapp_label: 'WhatsApp',
      whatsapp: '0530012363',
      address: 'Address',
      location: 'Madinah, Saudi Arabia',
      send: 'Send Message',
    },
    admin: {
      title: 'Booking Dashboard',
      no_bookings: 'No bookings currently.',
      status: 'Status',
      actions: 'Actions',
    },
    tips: {
      title: 'Periodic Maintenance Tips',
      description: 'Your comprehensive guide to maintaining your car performance and extending its lifespan. Tips from Noor Al-Masi experts in Madinah.',
      battery: {
        title: 'How to Maintain Your Car Battery Life?',
        content: 'To extend battery life, avoid leaving devices running after the engine is off. Check the battery water level regularly and ensure the terminals are clean from rust. Facing frequent starting issues? The battery is the heart of any car, and with neglect, you might find yourself stuck.',
      },
      oil: {
        title: 'When Should You Change Engine Oil?',
        content: 'It is recommended to change the engine oil every 5,000 to 10,000 km depending on the oil and car type. Always follow your car maintenance manual to ensure best engine performance.',
      },
      air_filter: {
        title: 'When Should You Change Car Air Filters?',
        content: 'A clean air filter improves engine performance and saves fuel. It is recommended to change it every 15,000 km or when driving in dusty environments. Signs of clogging include weak acceleration and increased fuel consumption.',
      },
      tires: {
        title: 'Importance of Regular Tire Checks',
        content: 'Ensure correct air pressure and check for tire wear. Monthly checks can prevent accidents, extend tire life, and save fuel.',
      },
      brakes: {
        title: 'Importance of Regular Brake Checks',
        content: 'Car brakes are essential for safety. Check disc and pad wear every 6 months or when hearing squeaking sounds. Regular maintenance prevents accidents and extends system life.',
      },
      spark_plugs: {
        title: 'When to Change Spark Plugs?',
        content: 'Damaged spark plugs cause engine vibration and increased consumption. Change them every 30,000 to 60,000 km depending on the car type. Regular checks improve performance and prevent sudden breakdowns.',
      },
      seo_keywords: 'Car maintenance Madinah, car computer check, car programming, oil change, battery check, brake maintenance, Noor Al-Masi Center, car workshop Madinah',
    },
    user_bookings: {
      title: 'My Bookings',
      no_bookings: 'You haven\'t made any bookings yet.',
      book_now: 'Book your first appointment now',
      status_pending: 'Pending',
      status_confirmed: 'Confirmed',
      status_completed: 'Completed',
      status_cancelled: 'Cancelled',
      login_required: 'Please login to view your bookings.',
    },
    expert: {
      title: 'Engineer Ziad - Technical Expert',
      subtitle: 'Over 20 years of experience in car programming and advanced diagnostics.',
      description: 'Engineer Ziad is one of the leading experts in Madinah in the field of automotive electronics, combining practical experience with certified technical certifications.',
      certificates: [
        'Certified Advanced Vehicle Diagnostics Specialist',
        'Expert in ECU Programming and Performance Tuning',
        'Professional Certificate in Hybrid and Electric Vehicle Systems',
        'Master Technician in Automotive Electronics and Safety Systems'
      ],
      experience_years: '20+ Years Experience',
      certified: 'Certified Technician'
    },
    testimonials: {
      title: 'What Our Customers Say',
      subtitle: 'We are proud to serve thousands of customers in Madinah with honesty and perfection.',
      reviews: [
        {
          name: 'Ahmed Al-Harbi',
          car: 'Toyota Camry',
          text: 'Excellent and fast service! The computer check was very accurate and the fault was fixed in record time.',
          rating: 5
        },
        {
          name: 'Mohammed Al-Saedi',
          car: 'Nissan Patrol',
          text: 'I highly recommend Noor Al-Masi Center! Engineer Ziad is very expert, the treatment is sophisticated, and the prices are competitive.',
          rating: 5
        },
        {
          name: 'Khaled Al-Juhani',
          car: 'Hyundai Sonata',
          text: 'The best programming center in Madinah. A gearbox problem that was baffling many workshops was solved.',
          rating: 5
        }
      ]
    }
  }
};
