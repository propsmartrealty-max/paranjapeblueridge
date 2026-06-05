"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (targetLang: 'en' | 'mr') => {
    setLanguage(targetLang);

    if (!pathname) return;

    // Detect if this is a regional PSEO route
    const configs = ['2-bhk-flats', '3-bhk-flats', '4-bhk-flats'];
    const locations = ['hinjewadi-phase-1', 'hinjewadi-phase-2', 'hinjewadi-phase-3'];
    const slug = pathname.substring(1);

    const isRegionalPseo = configs.some(c => 
      locations.some(l => slug === `${c}-in-${l}` || slug === `mr-${c}-in-${l}`)
    );

    if (isRegionalPseo) {
      if (targetLang === 'mr') {
        if (!slug.startsWith('mr-')) {
          router.push(`/mr-${slug}`);
        }
      } else {
        if (slug.startsWith('mr-')) {
          router.push(`/${slug.replace(/^mr-/, '')}`);
        }
      }
    } else {
      // Static pages and project pages use query parameter ?lang=mr
      if (targetLang === 'mr') {
        router.push(`${pathname}?lang=mr`);
      } else {
        router.push(pathname);
      }
    }
  };

  return (
    <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${
          language === 'en' ? 'bg-gold text-navy shadow-lg shadow-gold/20' : 'text-text-light hover:text-warm-white'
        }`}
        aria-label="Switch language to English"
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('mr')}
        className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${
          language === 'mr' ? 'bg-gold text-navy shadow-lg shadow-gold/20' : 'text-text-light hover:text-warm-white'
        }`}
        aria-label="Switch language to Marathi"
      >
        मराठी
      </button>
    </div>
  );
}
