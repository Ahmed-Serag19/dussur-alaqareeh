const ar = {
  // Common
  common: {
    loading: "جاري التحميل...",
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تعديل",
    view: "عرض",
    search: "بحث",
    filter: "تصفية",
    clear: "مسح",
    submit: "إرسال",
    back: "رجوع",
    next: "التالي",
    previous: "السابق",
    close: "إغلاق",
    confirm: "تأكيد",
    yes: "نعم",
    no: "لا",
    success: "نجح",
    error: "خطأ",
    warning: "تحذير",
    info: "معلومات",
    add: "إضافة",
    export: "تصدير",
    import: "استيراد",
    refresh: "تحديث",
    retry: "إعادة المحاولة",
    tryAgain: "حاول مرة أخرى",
    or: "أو",
  },

  // Navigation
  nav: {
    dashboard: "لوحة التحكم",
    properties: "العقارات",
    addProperty: "إضافة عقار",
    users: "المستخدمين",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",
    notifications: "الإشعارات",
    profile: "الملف الشخصي",
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

  // Authentication
  auth: {
    confirmPassword: "تأكيد كلمة المرور",
    rememberMe: "تذكرني",
    loginButton: "دخول",
    registerButton: "إنشاء حساب",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    dontHaveAccount: "ليس لديك حساب؟",
    loginHere: "سجل دخولك هنا",
    registerHere: "أنشئ حسابك هنا",
    sessionExpired: "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.",
    login: {
      title: "تسجيل دخول",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      forgotPassword: "نسيت كلمة المرور؟",
      loginButton: "تسجيل الدخول",
      description: "أدخل بياناتك للوصول إلى حسابك",
      emailPlaceholder: "أدخل البريد الإلكتروني",
      passwordPlaceholder: "أدخل كلمة المرور",
      loginButtonLoading: "جاري تسجيل الدخول...",
      noAccount: "ليس لديك حساب؟",
      createAccount: "إنشاء حساب جديد",
      loginSuccess: "تم تسجيل الدخول بنجاح",
      loginError: "حدث خطأ في تسجيل الدخول",
      invalidRole: "يجب ان تكون ادمن للدخول لتلك الصفحة",
    },
    register: {
      title: "إنشاء حساب جديد",
      description: "أدخل بياناتك لإنشاء حساب جديد",
      name: "الاسم",
      namePlaceholder: "أدخل الاسم الكامل",
      emailPlaceholder: "أدخل البريد الإلكتروني",
      phone: "رقم الجوال",
      phonePlaceholder: "أدخل رقم الجوال",
      passwordPlaceholder: "أدخل كلمة المرور",
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
    welcome: "مرحباً بك",
    totalProperties: "إجمالي العقارات",
    pendingProperties: "العقارات في الانتظار",
    approvedProperties: "العقارات المقبولة",
    rejectedProperties: "العقارات المرفوضة",
    recentProperties: "العقارات الحديثة",
    quickActions: "الإجراءات السريعة",
    title: "لوحة التحكم",
    // welcome: "دسر العقارية",
    addNewProperty: "تسجيل عقار جديد",
    viewProperties: "عرض العقارات",
    stats: {
      total: "إجمالي العقارات",
      available: "العقارات المقبولة",
    },
    actions: {
      add: "تسجيل عقار جديد",
      addDesc: "إضافة عقار جديد إلى النظام",
      view: "عرض العقارات",
      viewDesc: "عرض وإدارة جميع العقارات",
    },
  },

  // Properties
  properties: {
    // Basic Info
    basicInfo: "المعلومات الأساسية",
    title: "اسم العقار",
    titlePlaceholder: "أدخل اسم العقار",
    description: "الوصف",
    descriptionPlaceholder: "أدخل وصف العقار",
    price: "السعر",
    pricePlaceholder: "أدخل السعر",
    area: "المساحة",
    areaPlaceholder: "أدخل المساحة بالمتر المربع",
    propertyType: "نوع العقار",
    selectPropertyType: "اختر نوع العقار",
    listingType: "نوع الإعلان",
    selectListingType: "اختر نوع الإعلان",
    createSuccess: "تم إنشاء العقار بنجاح",
    // Location Info
    locationInfo: "معلومات الموقع",
    region: "المنطقة",
    selectRegion: "اختر المنطقة",
    city: "المدينة",
    selectCity: "اختر المدينة",
    neighborhood: "الحي",
    selectNeighborhood: "اختر الحي",
    streetAr: "الشارع (عربي)",
    streetArPlaceholder: "أدخل اسم الشارع بالعربية",
    streetEn: "الشارع (إنجليزي)",
    streetEnPlaceholder: "أدخل اسم الشارع بالإنجليزية",
    selectLocation: "اختيار الموقع على الخريطة",
    selectOnMap: "اختر على الخريطة",
    updateLocation: "تحديث الموقع",
    locationSelected: "تم اختيار الموقع",
    coordinates: "الإحداثيات",

    // Property Specs
    propertySpecs: "مواصفات العقار",
    condition: "حالة العقار",
    selectCondition: "اختر حالة العقار",
    finishType: "نوع التشطيب",
    selectFinishType: "اختر نوع التشطيب",
    roomsCount: "عدد الغرف",
    bathroomsCount: "عدد دورات المياه",
    livingroomsCount: "عدد الصالات",
    floorsCount: "عدد الطوابق",
    buildingAge: "عمر البناء (بالسنوات)",

    // Descriptions
    detailedDescriptions: "الوصف التفصيلي",
    descriptionAr: "الوصف (عربي)",
    descriptionEn: "الوصف (إنجليزي)",

    // Actions
    saveProperty: "حفظ العقار",
    addProperty: "إضافة عقار جديد",
    editProperty: "تعديل العقار",
    deleteProperty: "حذف العقار",
    viewProperty: "عرض العقار",

    // Status
    status: {
      pending: "في الانتظار",
      approved: "مقبول",
      rejected: "مرفوض",
      all: "جميع العقارات",
    },
    features: {
      title: "مزايا العقار",
      subtitle: "اختر أي مزايا تنطبق على هذا العقار",
    },

    // Validation
    validation: {
      locationRequired: "يجب اختيار الموقع على الخريطة",
      titleRequired: "عنوان العقار مطلوب",
      descriptionRequired: "وصف العقار مطلوب",
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
    },

    // Messages
    messages: {
      propertyAdded: "تم إضافة العقار بنجاح",
      propertyUpdated: "تم تحديث العقار بنجاح",
      propertyDeleted: "تم حذف العقار بنجاح",
      deleteConfirmation: "هل أنت متأكد من حذف هذا العقار؟",
      createSuccess: "تم إنشاء العقار بنجاح",
      createError: "حدث خطأ أثناء إنشاء العقار",
      saveDraftSuccess: "تم حفظ العقار كمسودة",
      locationRequiredToast: "يرجى تحديد الموقع على الخريطة",
      fixErrorsBeforeSubmit: "يرجى تصحيح جميع الأخطاء قبل الإرسال",
      missingFields: "بعض الحقول المطلوبة مفقودة",
    },

    // Additional properties from second set
    propertyDetails: "تفاصيل العقار",
    propertyFeatures: "مميزات العقار",
    details: "تفاصيل العقار",
    locationInfoAndSpecs: "المنطقة مدينة حي الخ..",
    basicInfoDescription: "أدخل المعلومات الأساسية للعقار",
    shortDescription: "نبذة سريعة",
    systemInformation: "تفاصيل النظام",
    loadError: "فشل في تحميل بيانات النموذج",
    step: "الخطوة",
    of: "من",
    mapInstructions: "انقر على الخريطة لتحديد الموقع",
    saveDraft: "حفظ كمسودة",

    // List
    list: {
      title: "عقاراتي",
      subtitle: "إدارة جميع العقارات الخاصة بك",
      addNew: "إضافة عقار جديد",
      refreshSuccess: "تم تحديث قائمة العقارات",
      viewProperty: "عرض تفاصيل العقار: {{title}}",
      editProperty: "تعديل العقار: {{title}}",
      errorTitle: "حدث خطأ في تحميل العقارات",
      errorMessage: "تعذر تحميل قائمة العقارات. يرجى المحاولة مرة أخرى.",
      noProperties: "لا توجد عقارات",
      noPropertiesMessage:
        "لم يتم العثور على أي عقارات. ابدأ بإضافة عقار جديد.",
    },

    // View Modal
    viewModal: {
      title: "تفاصيل العقار",
      generalInfo: "المعلومات العامة",
      locationDetails: "تفاصيل الموقع",
      propertySpecs: "مواصفات العقار",
      coordinates: "الإحداثيات",
      createdAt: "تاريخ الإنشاء",
      updatedAt: "تاريخ التحديث",
      propertyId: "رقم العقار",
      adminId: "رقم المدير",
      statusId: "رقم الحالة",
    },

    // Delete
    delete: {
      title: "حذف العقار",
      message: "هل أنت متأكد من حذف هذا العقار؟",
      warning: "هذا الإجراء لا يمكن التراجع عنه.",
      confirm: "حذف العقار",
      deleting: "جاري الحذف...",
      success: "تم حذف العقار بنجاح",
      error: "حدث خطأ أثناء حذف العقار",
    },

    // Actions
    actions: {
      view: "عرض",
      edit: "تعديل",
      delete: "حذف",
    },

    // Images
    images: {
      title: "صور العقار",
      description: "قم برفع صور العقار (حد أقصى 10 صور)",
      dragDropText: "اسحب وأفلت الصور هنا",
      orClickText: "أو انقر للتصفح",
      selectImages: "اختر الصور",
      selectedImages: "الصور المختارة",
      clearAll: "مسح الكل",
      maxImagesExceeded: "الحد الأقصى 10 صور مسموح",
      uploadSuccess: "تم رفع الصور بنجاح",
      uploadError: "خطأ في رفع الصور",
      imageRequired: "مطلوب صورة واحدة على الأقل",
    },

    mapModal: {
      selectLocation: "اختيار الموقع",
      mapInterface: "واجهة الخريطة لاختيار الموقع",
      locating: "جاري تحديد الموقع...",
      useMyLocation: "استخدم موقعي الحالي",
      usingIpLocation: "تم استخدام الموقع بناءً على عنوان IP",
      couldNotGetLocation: "تعذر الحصول على الموقع.",
    },
  },
};
export default ar;
