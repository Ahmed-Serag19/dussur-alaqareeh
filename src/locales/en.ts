const en = {
  // Navigation
  nav: {
    notifications: "Notifications",
    profile: "Profile",
    logout: "Logout",
    language: "Language",
  },

  // Sidebar
  sidebar: {
    addProperty: "Add Property",
    viewProperties: "View Properties",
    profile: "Profile",
    logout: "Logout",
    home: "Homepage",
  },

  // Auth
  auth: {
    login: {
      title: "Login",
      description: "Enter your credentials to access your account",
      email: "Email",
      emailPlaceholder: "Enter your email",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      forgotPassword: "Forgot password?",
      loginButton: "Login",
      loginButtonLoading: "Logging in...",
      noAccount: "Don't have an account?",
      createAccount: "Create new account",
      loginSuccess: "Login successful",
      loginError: "Login error occurred",
      invalidRole: "You must be an admin to access this page",
    },
    register: {
      title: "Create New Account",
      description: "Enter your details to create a new account",
      name: "Name",
      namePlaceholder: "Enter your full name",
      email: "Email",
      emailPlaceholder: "Enter your email",
      phone: "Phone",
      phonePlaceholder: "Enter your phone number",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Re-enter your password",
      registerButton: "Create Account",
      registerButtonLoading: "Creating account...",
      haveAccount: "Already have an account?",
      loginLink: "Login",
      registerSuccess: "Account created successfully",
      registerError: "Account creation error occurred",
    },
    validation: {
      emailRequired: "Email is required",
      emailInvalid: "Email is invalid",
      passwordRequired: "Password is required",
      passwordMinLength: "Password must be at least 6 characters",
      nameRequired: "Name is required",
      nameMinLength: "Name must be at least 2 characters",
      phoneRequired: "Phone is required",
      phoneInvalid: "Phone number is invalid",
      confirmPasswordRequired: "Confirm password is required",
      passwordsNotMatch: "Passwords do not match",
    },
    logout: {
      success: "Logged out successfully",
    },
  },

  // Dashboard
  dashboard: {
    title: "Dashboard",
    welcome: "Dusser Real Estate Management System",
    addNewProperty: "Add New Property",
    viewProperties: "View Properties",
    stats: {
      total: "Total Properties",
      available: "Available Properties",
    },
    actions: {
      add: "Register New Property",
      addDesc: "Add a new property to the system",
      view: "View Properties",
      viewDesc: "Browse and manage all properties",
    },
  },

  // Common
  common: {
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    add: "Add",
    search: "Search",
    filter: "Filter",
    export: "Export",
    import: "Import",
    refresh: "Refresh",
    retry: "Retry",
    or: "Or",
    previous: "Previous",
    next: "Next",
    close: "Close",
    confirm: "Confirm",
    yes: "Yes",
    no: "No",
  },

  properties: {
    addProperty: "Add New Property",
    propertyDetails: "Property Details",
    basicInfo: "Basic Information",
    locationInfo: "Location Information",
    propertySpecs: "Property Specifications",
    propertyFeatures: "Property Features",
    details: "Property Details",
    locationInfoAndSpecs: "City Region etc..",
    basicInfoDescription: "Enter basic property information",
    descriptionPlaceholder: "Enter property description",
    shortDescription: "Short description",
    createSuccess: "Property created successfully",
    createError: "Error creating property",
    saveDraftSuccess: "Property saved as draft",
    locationRequiredToast: "Please select a location on the map",
    fixErrorsBeforeSubmit: "Please fix all errors before submitting",
    missingFields: "Missing required fields",
    systemInformation: "System Information",
    loadError: "Failed to load form data",
    saveProperty: "Save Property",
    step: "Step",
    of: "of",

    // Form fields
    title: "Property Title",
    titlePlaceholder: "Enter property title",
    descriptionAr: "Description (Arabic)",
    descriptionEn: "Description (English)",
    price: "Price (SAR)",
    pricePlaceholder: "Enter price",
    area: "Area (sqm)",
    areaPlaceholder: "Enter area",

    // Location
    region: "Region",
    city: "City",
    neighborhood: "Neighborhood",
    streetAr: "Street (Arabic)",
    streetEn: "Street (English)",
    selectRegion: "Select Region",
    selectCity: "Select City",
    selectNeighborhood: "Select Neighborhood",

    // Property details
    propertyType: "Property Type",
    listingType: "Listing Type",
    condition: "Property Condition",
    finishType: "Finish Type",
    roomsCount: "Number of Rooms",
    bathroomsCount: "Number of Bathrooms",
    livingroomsCount: "Number of Living Rooms",
    floorsCount: "Number of Floors",
    buildingAge: "Building Age (years)",
    streetEnPlaceholder: "Enter street name En",
    streetArPlaceholder: "Enter street name in Arabic",
    selectOnMap: "Select Location",

    // Map selectOnMap
    selectLocation: "Select Location",
    mapInstructions: "Click on the map to select location",

    // Buttons
    saveDraft: "Save as Draft",
    cancel: "Cancel",

    // Validation
    validation: {
      titleRequired: "Property title is required",
      descriptionRequired: "Description is required",
      priceRequired: "Price is required",
      areaRequired: "Area is required",
      regionRequired: "Region is required",
      cityRequired: "City is required",
      neighborhoodRequired: "Neighborhood is required",
      propertyTypeRequired: "Property type is required",
      listingTypeRequired: "Listing type is required",
      conditionRequired: "Property condition is required",
      finishTypeRequired: "Finish type is required",
      streetRequired: "Street is required",
      locationRequired: "Location is required",
    },

    // Status
    status: {
      all: "All Properties",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
    },

    // Actions
    actions: {
      view: "View",
      edit: "Edit",
      delete: "Delete",
    },

    // Delete
    delete: {
      title: "Delete Property",
      message: "Are you sure you want to delete this property?",
      warning: "This action cannot be undone.",
      confirm: "Delete Property",
      deleting: "Deleting...",
      success: "Property deleted successfully",
      error: "Error deleting property",
    },

    // List
    list: {
      title: "My Properties",
      subtitle: "Manage all your properties",
      addNew: "Add New Property",
      refreshSuccess: "Property list refreshed successfully",
      viewProperty: "Viewing details of: {{title}}",
      editProperty: "Editing property: {{title}}",
      errorTitle: "Failed to load properties",
      errorMessage: "Could not load property list. Please try again.",
      noProperties: "No Properties",
      noPropertiesMessage:
        "No properties found. Start by adding a new property.",
    },

    // View Modal
    viewModal: {
      title: "Property Details",
      generalInfo: "General Information",
      locationDetails: "Location Details",
      propertySpecs: "Property Specifications",
      coordinates: "Coordinates",
      createdAt: "Created At",
      updatedAt: "Updated At",
      propertyId: "Property ID",
      adminId: "Admin ID",
      statusId: "Status ID",
    },
  },
};

export default en;
