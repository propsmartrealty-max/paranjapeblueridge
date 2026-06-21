"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type Intent = 'general' | 'investor' | 'homebuyer';

interface TrackingContextType {
  intent: Intent;
}

const TrackingContext = createContext<TrackingContextType>({ intent: 'general' });

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [intent, setIntent] = useState<Intent>('general');

  useEffect(() => {
    // Detect intent based on path and search params
    const path = pathname.toLowerCase();
    const query = searchParams.toString().toLowerCase();
    
    let currentIntent: Intent = 'general';
    
    const investorKeywords = ['yield', 'roi', 'investment', 'nri', 'rental', 'appreciation', 'market'];
    const homebuyerKeywords = ['bhk', 'flats', 'apartments', 'residences', 'family', 'school', 'amenities'];

    if (investorKeywords.some(k => path.includes(k) || query.includes(k))) {
      currentIntent = 'investor';
    } else if (homebuyerKeywords.some(k => path.includes(k) || query.includes(k))) {
      currentIntent = 'homebuyer';
    }

    if (currentIntent !== 'general') {
      setIntent(currentIntent);
      localStorage.setItem('sovereign-intent', currentIntent);
    } else {
      const saved = localStorage.getItem('sovereign-intent') as Intent;
      if (saved) setIntent(saved);
    }

    // --- UTM Trapping Engine ---
    const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    let hasUtms = false;
    const currentUtms: Record<string, string> = {};
    
    utms.forEach(utm => {
      const value = searchParams.get(utm);
      if (value) {
        hasUtms = true;
        currentUtms[utm] = value;
      }
    });

    if (hasUtms) {
      localStorage.setItem('sovereign-utms', JSON.stringify(currentUtms));
    }

    // --- Behavioral Micro-Data Fingerprint ---
    // Track what configurations the user lingers on
    let hoverTimer: NodeJS.Timeout;
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const trackingId = target.closest('[data-tracking-id]')?.getAttribute('data-tracking-id');
      
      if (trackingId) {
        hoverTimer = setTimeout(() => {
          const current = JSON.parse(localStorage.getItem('sovereign-fingerprint') || '[]');
          if (!current.includes(trackingId)) {
            current.push(trackingId);
            localStorage.setItem('sovereign-fingerprint', JSON.stringify(current.slice(-5))); // Keep last 5
          }
        }, 1500); // 1.5 seconds constitutes "lingering intent"
      }
    };

    const handleMouseOut = () => clearTimeout(hoverTimer);

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [pathname, searchParams]);

  return (
    <TrackingContext.Provider value={{ intent }}>
      {children}
    </TrackingContext.Provider>
  );
}

export const useBuyerIntent = () => useContext(TrackingContext);
