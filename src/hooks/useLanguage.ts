import { useTranslation } from "react-i18next";
import { useCallback } from "react";

const useLanguage = () => {
  const { i18n, t } = useTranslation();

  const isRTL = i18n.language === "ar";
  const currentLanguage = i18n.language;

  const changeLanguage = useCallback(
    (langCode: string) => {
      i18n.changeLanguage(langCode);
      document.dir = langCode === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = langCode;
      // Store in localStorage for persistence
      localStorage.setItem("language", langCode);
    },
    [i18n]
  );

  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    changeLanguage(newLang);
  }, [i18n.language, changeLanguage]);

  return {
    isRTL,
    currentLanguage,
    changeLanguage,
    toggleLanguage,
    t,
  };
};
export default useLanguage;
