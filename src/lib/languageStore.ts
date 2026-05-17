import { create } from 'zustand';
import { Language } from './translations';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => {
  // Get language from localStorage or default to 'en'
  const savedLanguage = typeof window !== 'undefined' 
    ? (localStorage.getItem('language') as Language) || 'en'
    : 'en';

  return {
    language: savedLanguage,
    setLanguage: (lang: Language) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
      }
      set({ language: lang });
      // Update document direction for RTL support
      if (typeof document !== 'undefined') {
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
      }
    },
  };
});
