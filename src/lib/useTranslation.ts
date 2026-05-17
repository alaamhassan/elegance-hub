import { useLanguageStore } from './languageStore';
import { translations, TranslationKey } from './translations';

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return { t, language };
}
