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

    // Sovereign Tracking logic for intent-based content injection
  }, [pathname, searchParams]);

  return (
    <TrackingContext.Provider value={{ intent }}>
      {children}
    </TrackingContext.Provider>
  );
}

export const useBuyerIntent = () => useContext(TrackingContext);
