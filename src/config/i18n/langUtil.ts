import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@/locale/en.json';
import malay from '@/locale/malay.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      malay: { translation: malay }
    },
    lng: 'malay',          // Set default language to Malay
    fallbackLng: 'en',  // if key doesn't exist, fallback to English
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'], // check stored language first
      caches: ['localStorage']              // save user choice
    }
  });

export default i18n;