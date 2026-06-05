"use client";

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageInitializer({ lang }: { lang: 'en' | 'mr' }) {
  const { setLanguage } = useLanguage();
  useEffect(() => {
    setLanguage(lang);
  }, [lang, setLanguage]);
  return null;
}
