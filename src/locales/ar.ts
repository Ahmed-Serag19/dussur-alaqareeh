const ar = {
  // Navigation
  nav: {
    notifications: "الإشعارات",
    profile: "الملف الشخصي",
    logout: "تسجيل خروج",
    language: "اللغة",
  },

  // Sidebar
  sidebar: {
    addProperty: "إضافة عقار ",
    viewProperties: "عرض العقارات",
    profile: "الملف الشخصي",
    logout: "تسجيل خروج",
    home: "الرئيسية",
  },

  // Auth
  auth: {
    login: {
      title: "تسجيل دخول",
      description: "أدخل بياناتك للوصول إلى حسابك",
      email: "البريد الإلكتروني",
      emailPlaceholder: "أدخل البريد الإلكتروني",
      password: "كلمة المرور",
      passwordPlaceholder: "أدخل كلمة المرور",
      forgotPassword: "نسيت كلمة المرور؟",
      loginButton: "تسجيل دخول",
      loginButtonLoading: "جاري تسجيل الدخول...",
      noAccount: "ليس لديك حساب؟",
      createAccount: "إنشاء حساب جديد",
      loginSuccess: "تم تسجيل الدخول بنجاح",
      loginError: "حدث خطأ في تسجيل الدخول",
    },
    register: {
      title: "إنشاء حساب جديد",
      description: "أدخل بياناتك لإنشاء حساب جديد",
      name: "الاسم",
      namePlaceholder: "أدخل الاسم الكامل",
      email: "البريد الإلكتروني",
      emailPlaceholder: "أدخل البريد الإلكتروني",
      phone: "رقم الجوال",
      phonePlaceholder: "أدخل رقم الجوال",
      password: "كلمة المرور",
      passwordPlaceholder: "أدخل كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      confirmPasswordPlaceholder: "أعد إدخال كلمة المرور",
      registerButton: "إنشاء حساب",
      registerButtonLoading: "جاري إنشاء الحساب...",
      haveAccount: "لديك حساب بالفعل؟",
      loginLink: "تسجيل دخول",
      registerSuccess: "تم إنشاء الحساب بنجاح",
      registerError: "حدث خطأ في إنشاء الحساب",
    },
    validation: {
      emailRequired: "البريد الإلكتروني مطلوب",
      emailInvalid: "البريد الإلكتروني غير صحيح",
      passwordRequired: "كلمة المرور مطلوبة",
      passwordMinLength: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
      nameRequired: "الاسم مطلوب",
      nameMinLength: "الاسم يجب أن يكون حرفين على الأقل",
      phoneRequired: "رقم الجوال مطلوب",
      phoneInvalid: "رقم الجوال غير صحيح",
      confirmPasswordRequired: "تأكيد كلمة المرور مطلوب",
      passwordsNotMatch: "كلمات المرور غير متطابقة",
    },
    logout: {
      success: "تم تسجيل الخروج بنجاح",
    },
  },

  // Dashboard
  dashboard: {
    title: "لوحة التحكم",
    welcome: "دسر العقارية",
    addNewProperty: "تسجيل عقار جديد",
    viewProperties: "عرض العقارات",
    stats: {
      total: "إجمالي العقارات",
      available: "العقارات المتاحة",
    },
    actions: {
      add: "تسجيل عقار جديد",
      addDesc: "إضافة عقار جديد إلى النظام",
      view: "عرض العقارات",
      viewDesc: "عرض وإدارة جميع العقارات",
    },
  },

  // Common
  common: {
    loading: "جاري التحميل...",
    error: "حدث خطأ",
    success: "تم بنجاح",
    cancel: "إلغاء",
    save: "حفظ",
    delete: "حذف",
    edit: "تعديل",
    view: "عرض",
    add: "إضافة",
    search: "بحث",
    filter: "تصفية",
    export: "تصدير",
    import: "استيراد",
    refresh: "تحديث",
    or: "أو",
  },
  // Properties
  properties: {
    addProperty: "إضافة عقار جديد",
    propertyDetails: "تفاصيل العقار",
    basicInfo: "المعلومات الأساسية",
    locationInfo: "معلومات الموقع",
    propertySpecs: "مواصفات العقار",
    propertyFeatures: "مميزات العقار",
    details: "تفاصيل العقار",
    locationInfoAndSpecs: "المنطقة مدينة حي الخ..",

    // Form fields
    title: "اسم العقار",
    titlePlaceholder: "أدخل اسم للعقار",
    descriptionAr: "الوصف بالعربية",
    descriptionEn: "الوصف بالإنجليزية",
    price: "السعر (ريال)",
    pricePlaceholder: "أدخل السعر",
    area: "المساحة (متر مربع)",
    areaPlaceholder: "أدخل المساحة",

    // Location
    region: "المنطقة",
    city: "المدينة",
    neighborhood: "الحي",
    streetAr: "الشارع (عربي)",
    streetEn: "الشارع (إنجليزي)",
    selectRegion: "اختر المنطقة",
    selectCity: "اختر المدينة",
    selectNeighborhood: "اختر الحي",

    // Property details
    propertyType: "نوع العقار",
    listingType: "نوع الإعلان",
    condition: "حالة العقار",
    finishType: "نوع التشطيب",
    roomsCount: "عدد الغرف",
    bathroomsCount: "عدد دورات المياه",
    livingroomsCount: "عدد غرف المعيشة",
    floorsCount: "عدد الأدوار",
    buildingAge: "عمر البناء (سنوات)",

    // Map
    selectLocation: "اختيار الموقع",
    mapInstructions: "انقر على الخريطة لتحديد الموقع",

    // Buttons
    saveProperty: "حفظ العقار",
    saveDraft: "حفظ كمسودة",
    cancel: "إلغاء",

    // Validation
    validation: {
      titleRequired: "عنوان العقار مطلوب",
      descriptionRequired: "الوصف مطلوب",
      priceRequired: "السعر مطلوب",
      areaRequired: "المساحة مطلوبة",
      regionRequired: "المنطقة مطلوبة",
      cityRequired: "المدينة مطلوبة",
      neighborhoodRequired: "الحي مطلوب",
      propertyTypeRequired: "نوع العقار مطلوب",
      listingTypeRequired: "نوع الإعلان مطلوب",
      conditionRequired: "حالة العقار مطلوبة",
      finishTypeRequired: "نوع التشطيب مطلوب",
      streetRequired: "الشارع مطلوب",
      locationRequired: "الموقع مطلوب",
    },

    // Success/Error messages
    createSuccess: "تم إنشاء العقار بنجاح",
    createError: "حدث خطأ في إنشاء العقار",
  },
};

export default ar;
