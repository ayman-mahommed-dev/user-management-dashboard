import { createContext, useContext, useState, useEffect } from "react";
import { translations, departmentsTranslations, positionsTranslations } from "../i18n/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("hr-pro-lang") || "en";
  });

  useEffect(() => {
    localStorage.setItem("hr-pro-lang", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const tDept = (dept) => {
    return departmentsTranslations[language][dept] || dept;
  };

  const tPos = (pos) => {
    return positionsTranslations[language][pos] || pos;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "ar" : "en");
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    tDept,
    tPos,
    isRTL: language === "ar"
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
