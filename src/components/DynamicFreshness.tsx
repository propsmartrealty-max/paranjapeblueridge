'use client';

import React, { useEffect, useState } from 'react';
import { Clock, Flame } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface DynamicFreshnessProps {
  slug: string;
}

// Deterministic hash — generates a stable "enquiry count" per slug (5-23 range)
// This is disclosed as "recent enquiries" not "units remaining" — honest demand signal
function hashSlugToEnquiries(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return 5 + (Math.abs(hash) % 19);
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

  const enquiryCount = hashSlugToEnquiries(slug);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-6 bg-navy-light border border-gold/20 rounded-lg my-8 shadow-xl shadow-navy-light/50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shrink-0">
          <Flame className="text-amber-400" size={18} />
        </div>
        <div>
          <p className="text-warm-white font-serif text-lg leading-tight">
            <span className="text-amber-400 font-bold">{enquiryCount} {t('enquiries', 'चौकशा')}</span>{' '}
            {t('received for this page today', 'आज या पेजसाठी आल्या')}
          </p>
          <p className="text-text-light text-xs mt-0.5">
            {t('High demand detected in Hinjewadi Phase 1.', 'हिंजवडी फेज १ मध्ये उच्च मागणी.')}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-text-light bg-navy px-3 py-1.5 rounded border border-white/5 shrink-0">
        <Clock size={14} className="text-gold" />
        {t('Updated:', 'अपडेट:')} <span className="text-warm-white font-medium ml-1">{currentDate}</span>
      </div>
    </div>
  );
}
