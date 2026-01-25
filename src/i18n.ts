import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import headerEn from "./locales/en/header.json";
import headerAr from "./locales/ar/header.json";

import homeEn from "./locales/en/home.json";
import homeAr from "./locales/ar/home.json";

import authEn from "./locales/en/auth.json";
import authAr from "./locales/ar/auth.json";

import exploreEn from "./locales/en/explore.json";
import exploreAr from "./locales/ar/explore.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        home: homeEn,
        header: headerEn,
        auth: authEn,
        explore: exploreEn,
      },
      ar: {
        home: homeAr,
        header: headerAr,
        auth: authAr,
        explore: exploreAr,
      },
    },

    fallbackLng: "ar",
    defaultNS: "home",
    load: "languageOnly",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },
  });

i18n.on("languageChanged", (lng) => {
  const baseLng = lng.split("-")[0];
  document.documentElement.dir = baseLng === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = baseLng;
});

export default i18n;
