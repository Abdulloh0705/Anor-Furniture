import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ingI18  from "./locales/en/ingI18.json";
import rusI18 from "./locales/ru/rusI18.json";
import uzbI18 from "./locales/uz/uzbI18.json";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: ingI18 },
      ru: { translation: rusI18 },
      uz: { translation: uzbI18 }
    },
    fallbackLng: 'uz',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
