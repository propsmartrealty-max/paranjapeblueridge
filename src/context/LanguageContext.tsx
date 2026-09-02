"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (en: string, mr: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (en: string, mr: string) => (language === 'en' ? en : mr);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: (en: string, mr: string) => {
        if (typeof window !== 'undefined' && window.location.pathname.startsWith('/mr')) {
          return mr;
        }
        return en;
      },
    };
  }
  return context;
}
