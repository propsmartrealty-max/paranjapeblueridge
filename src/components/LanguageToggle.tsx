"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${
          language === 'en' ? 'bg-gold text-navy shadow-lg shadow-gold/20' : 'text-text-light hover:text-warm-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('mr')}
        className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${
          language === 'mr' ? 'bg-gold text-navy shadow-lg shadow-gold/20' : 'text-text-light hover:text-warm-white'
        }`}
      >
        मराठी
      </button>
    </div>
  );
}
