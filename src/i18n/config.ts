import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from './locales/en/common.json';
import enMarketing from './locales/en/marketing.json';
import esCommon from './locales/es/common.json';
import esMarketing from './locales/es/marketing.json';

const resources = {
  en: {
    common: enCommon,
    marketing: enMarketing,
  },
  es: {
    common: esCommon,
    marketing: esMarketing,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Always start in English
    fallbackLng: 'en',
    debug: false,
    defaultNS: 'common',
    ns: ['common', 'marketing'],
    
    interpolation: {
      escapeValue: false,
    },

    detection: {
      // Only use localStorage - language only changes when user explicitly toggles it
      order: ['localStorage'],
      caches: ['localStorage'],
    },
  });

export default i18n;