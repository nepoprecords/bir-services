import { useState, useCallback, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

export function useLanguage() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bir_lang');
      if (saved === 'ne' || saved === 'en') return saved;
    }
    return 'ne'; // Default to authentic Nepali for local viral impact!
  });

  const toggleLanguage = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'ne' ? 'en' : 'ne';
      localStorage.setItem('bir_lang', next);
      return next;
    });
  }, []);

  const t = translations[lang];

  return {
    lang,
    setLang,
    toggleLanguage,
    t,
  };
}
