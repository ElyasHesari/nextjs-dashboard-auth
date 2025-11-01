export const translations = {
  // Login Form
  login: {
    brandName: "نام برند",
    testText: "متن تست",
    version: "نسخه 1.1.1",
    welcome: "خوش آمدید",
    welcomeDescription: "جهت ورود لطفا نام کاربری و رمز عبور خود را وارد کنید",
    username: "نام کاربری",
    password: "رمز عبور",
    loginButton: "ورود به سامانه",
    loggingIn: "در حال ورود...",
    testCredentials: "اطلاعات تست:",
    fillAllFields: "لطفاً تمام فیلدها را پر کنید",
    unknownError: "خطای ناشناخته",
    networkError: "خطا در اتصال به اینترنت. لطفاً دوباره تلاش کنید.",
    serverError: "خطای سرور. لطفاً بعداً تلاش کنید.",
    unexpectedError: "خطای غیرمنتظره رخ داده است.",
    invalidCredentials: "نام کاربری یا رمز عبور اشتباه است",
  },

  // Dashboard
  dashboard: {
    title: "داشبورد",
    welcome: "خوش آمدید، {username} ({role})",
    admin: "مدیر",
    owner: "صاحب",
    logout: "خروج",
    dashboardCards: "کارت‌های داشبورد",
    adminCardsCount: "5 کارت",
    ownerCardsCount: "10 کارت",
    refresh: "بروزرسانی",
    loadingError: "خطا در دریافت داده‌ها",
    loadingErrorMessage: "متأسفانه مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.",
    tryAgain: "تلاش مجدد",
    noCardsFound: "هیچ کارتی یافت نشد",
    noDataMessage: "در حال حاضر داده‌ای برای نمایش وجود ندارد.",
  },

  // Common
  common: {
    loading: "در حال بارگذاری...",
    redirectingToDashboard: "در حال انتقال به داشبورد...",
    card: "کارت",
  },
} as const;

export type TranslationKey = 
  | `login.${keyof typeof translations.login}`
  | `dashboard.${keyof typeof translations.dashboard}`
  | `common.${keyof typeof translations.common}`;

export type Translations = typeof translations;

