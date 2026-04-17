import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('km-lang');
    // Force refresh to Telugu for the project requirement if it was English or unset
    if (!saved || saved === 'en') {
      localStorage.setItem('km-lang', 'te');
      return 'te';
    }
    return saved;
  });

  const changeLang = useCallback((newLang) => {
    setLang(newLang);
    localStorage.setItem('km-lang', newLang);
  }, []);

  // t('nav.diagnosis') → looks up translations[lang].nav.diagnosis
  const t = useCallback((key) => {
    const keys = key.split('.');
    let val = translations[lang];
    for (const k of keys) {
      if (val && typeof val === 'object' && k in val) {
        val = val[k];
      } else {
        // Fallback to English
        let fallback = translations['en'];
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return key; // Return the key if nothing found
          }
        }
        return fallback;
      }
    }
    return val;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
