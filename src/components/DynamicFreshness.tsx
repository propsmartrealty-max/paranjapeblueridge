'use client';

import React, { useEffect, useState } from 'react';
import { Clock, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface DynamicFreshnessProps {
  slug: string;
}

// Deterministic hash to generate a stable "units remaining" number per slug
function hashSlugToUnits(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  // Return a number between 3 and 14
  return 3 + (Math.abs(hash) % 12);
}

export default function DynamicFreshness({ slug }: DynamicFreshnessProps) {
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    // Format: June 21, 2026
    const date = new Date();
    const formatted = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    setCurrentDate(formatted);
  }, []);

  // SSR skeleton to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 px-6 bg-navy-light/50 border border-gold/20 rounded-lg animate-pulse h-20 my-8"></div>
    );
  }

  const unitsRemaining = hashSlugToUnits(slug);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-6 bg-navy-light border border-gold/20 rounded-lg my-8 shadow-xl shadow-navy-light/50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0">
          <TrendingDown className="text-red-400" size={18} />
        </div>
        <div>
          <p className="text-warm-white font-serif text-lg leading-tight">
            <span className="text-red-400 font-bold">{unitsRemaining} {t('Units Remaining', 'युनिट्स शिल्लक')}</span> {t('in this configuration', 'या कॉन्फिगरेशनमध्ये')}
          </p>
          <p className="text-text-light text-xs mt-0.5">
            {t('High demand detected in Hinjewadi Phase 1.', 'हिंजवडी फेज १ मध्ये उच्च मागणी.')}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-text-light bg-navy px-3 py-1.5 rounded border border-white/5 shrink-0">
        <Clock size={14} className="text-gold" />
        {t('Live Update:', 'थेट अपडेट:')} <span className="text-warm-white font-medium">{currentDate}</span>
      </div>
    </div>
  );
}
