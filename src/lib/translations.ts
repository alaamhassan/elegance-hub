export const translations = {
  en: {
    // Header & Navigation
    home: 'Home',
    services: 'Services',
    portfolio: 'Portfolio',
    team: 'Team',
    testimonials: 'Testimonials',
    contact: 'Contact',
    language: 'Language',

    // Home Page
    homeHero: 'Welcome to Our Studio',
    homeHeroSubtitle: 'Creating exceptional experiences through design and innovation',
    exploreServices: 'Explore Services',
    featuredServices: 'Featured Services',
    viewAllServices: 'View All Services',
    whyChooseUs: 'Why Choose Us',
    ourTeam: 'Our Team',
    clientTestimonials: 'Client Testimonials',
    getInTouch: 'Get In Touch',

    // Services Page
    allServices: 'All Services',
    serviceCategory: 'Category',
    estimatedDuration: 'Estimated Duration',
    price: 'Price',
    learnMore: 'Learn More',
    noServices: 'No services available',

    // Service Detail Page
    serviceDetails: 'Service Details',
    duration: 'Duration',
    backToServices: 'Back to Services',
    relatedServices: 'Related Services',

    // Portfolio Page
    ourPortfolio: 'Our Portfolio',
    portfolioDescription: 'Explore our latest projects and creative work',
    allProjects: 'All Projects',
    viewProject: 'View Project',
    noPortfolioItems: 'No portfolio items available',

    // Team Page
    meetOurTeam: 'Meet Our Team',
    teamDescription: 'Talented professionals dedicated to excellence',
    yearsExperience: 'Years of Experience',
    noTeamMembers: 'No team members available',

    // Testimonials Page
    clientReviews: 'Client Reviews',
    testimonialsDescription: 'What our clients say about us',
    rating: 'Rating',
    noTestimonials: 'No testimonials available',

    // Contact Page
    contactUs: 'Contact Us',
    contactDescription: 'Get in touch with us today',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    subject: 'Subject',
    message: 'Message',
    send: 'Send',
    sending: 'Sending...',
    successMessage: 'Thank you for your message. We will get back to you soon!',
    errorMessage: 'There was an error sending your message. Please try again.',

    // Footer
    footerDescription: 'Creating beautiful and functional designs',
    allRightsReserved: 'All rights reserved',
    followUs: 'Follow Us',

    // Common
    loading: 'Loading...',
    error: 'Error',
    tryAgain: 'Try Again',
    close: 'Close',
    submit: 'Submit',
    cancel: 'Cancel',
  },
  ar: {
    // Header & Navigation
    home: 'الرئيسية',
    services: 'الخدمات',
    portfolio: 'المحفظة',
    team: 'الفريق',
    testimonials: 'آراء العملاء',
    contact: 'اتصل بنا',
    language: 'اللغة',

    // Home Page
    homeHero: 'أهلا بك في استوديونا',
    homeHeroSubtitle: 'إنشاء تجارب استثنائية من خلال التصميم والابتكار',
    exploreServices: 'استكشف الخدمات',
    featuredServices: 'الخدمات المميزة',
    viewAllServices: 'عرض جميع الخدمات',
    whyChooseUs: 'لماذا تختارنا',
    ourTeam: 'فريقنا',
    clientTestimonials: 'آراء العملاء',
    getInTouch: 'تواصل معنا',

    // Services Page
    allServices: 'جميع الخدمات',
    serviceCategory: 'الفئة',
    estimatedDuration: 'المدة المتوقعة',
    price: 'السعر',
    learnMore: 'تعرف على المزيد',
    noServices: 'لا توجد خدمات متاحة',

    // Service Detail Page
    serviceDetails: 'تفاصيل الخدمة',
    duration: 'المدة',
    backToServices: 'العودة إلى الخدمات',
    relatedServices: 'خدمات ذات صلة',

    // Portfolio Page
    ourPortfolio: 'محفظتنا',
    portfolioDescription: 'استكشف مشاريعنا الأخيرة وأعمالنا الإبداعية',
    allProjects: 'جميع المشاريع',
    viewProject: 'عرض المشروع',
    noPortfolioItems: 'لا توجد عناصر محفظة متاحة',

    // Team Page
    meetOurTeam: 'تعرف على فريقنا',
    teamDescription: 'متخصصون موهوبون مكرسون للتميز',
    yearsExperience: 'سنوات الخبرة',
    noTeamMembers: 'لا يوجد أعضاء فريق متاحون',

    // Testimonials Page
    clientReviews: 'تقييمات العملاء',
    testimonialsDescription: 'ما يقوله عملاؤنا عنا',
    rating: 'التقييم',
    noTestimonials: 'لا توجد شهادات متاحة',

    // Contact Page
    contactUs: 'اتصل بنا',
    contactDescription: 'تواصل معنا اليوم',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    subject: 'الموضوع',
    message: 'الرسالة',
    send: 'إرسال',
    sending: 'جاري الإرسال...',
    successMessage: 'شكراً لرسالتك. سنعود إليك قريباً!',
    errorMessage: 'حدث خطأ في إرسال رسالتك. يرجى المحاولة مرة أخرى.',

    // Footer
    footerDescription: 'إنشاء تصاميم جميلة وعملية',
    allRightsReserved: 'جميع الحقوق محفوظة',
    followUs: 'تابعنا',

    // Common
    loading: 'جاري التحميل...',
    error: 'خطأ',
    tryAgain: 'حاول مرة أخرى',
    close: 'إغلاق',
    submit: 'إرسال',
    cancel: 'إلغاء',
  },
};

export type Language = 'en' | 'ar';
export type TranslationKey = keyof typeof translations.en;
