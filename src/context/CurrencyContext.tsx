"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CurrencyOption {
  code: string;
  symbol: string;
  rateToInr: number;
}

export const CURRENCIES: Record<string, CurrencyOption> = {
  INR: { code: 'INR', symbol: '₹', rateToInr: 1 },
  USD: { code: 'USD', symbol: '$', rateToInr: 83.5 },
  AED: { code: 'AED', symbol: 'AED ', rateToInr: 22.7 },
  GBP: { code: 'GBP', symbol: '£', rateToInr: 106.2 },
  SGD: { code: 'SGD', symbol: 'S$', rateToInr: 62.1 },
};

// Map country codes to currencies
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  'US': 'USD',
  'AE': 'AED',
  'GB': 'GBP',
  'SG': 'SGD',
  'IN': 'INR'
};

interface CurrencyContextType {
  currency: CurrencyOption;
  setCurrency: (code: string) => void;
  formatPrice: (priceInr: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children, initialCountry = 'IN' }: { children: React.ReactNode, initialCountry?: string }) {
  const [currencyCode, setCurrencyCode] = useState<string>('INR');

  useEffect(() => {
    // On mount, set default based on country header if not already overridden by user
    const saved = localStorage.getItem('sovereign-currency');
    if (saved && CURRENCIES[saved]) {
      setCurrencyCode(saved);
    } else {
      const defaultCurrency = COUNTRY_TO_CURRENCY[initialCountry] || 'INR';
      setCurrencyCode(defaultCurrency);
    }
  }, [initialCountry]);

  const setCurrency = (code: string) => {
    if (CURRENCIES[code]) {
      setCurrencyCode(code);
      localStorage.setItem('sovereign-currency', code);
    }
  };

  const formatPrice = (priceInr: number) => {
    if (!priceInr) return 'Price on Request';
    const curr = CURRENCIES[currencyCode] || CURRENCIES['INR'];
    if (curr.code === 'INR') {
      const cr = priceInr / 10000000;
      return `₹ ${cr.toFixed(2)} Cr`;
    }
    const converted = priceInr / curr.rateToInr;
    return `${curr.symbol}${converted.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency: CURRENCIES[currencyCode], setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
