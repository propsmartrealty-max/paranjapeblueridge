'use client';

import React, { useState } from 'react';
import { DollarSign, Globe, Sparkles } from 'lucide-react';

interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
  rateToInr: number; // 1 Foreign Currency = X INR
}

const CURRENCIES: CurrencyOption[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateToInr: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rateToInr: 83.5 },
  { code: 'AED', symbol: 'AED ', name: 'UAE Dirham', rateToInr: 22.7 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rateToInr: 106.2 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rateToInr: 62.1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rateToInr: 90.8 },
];

export default function CurrencySwitcher() {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(CURRENCIES[0]);
  const [samplePriceInr, setSamplePriceInr] = useState<number>(16500000); // 1.65 Cr baseline

  const formatConverted = (priceInr: number, currency: CurrencyOption) => {
    if (currency.code === 'INR') {
      const cr = priceInr / 10000000;
      return `₹${cr.toFixed(2)} Cr`;
    }
    const converted = priceInr / currency.rateToInr;
    return `${currency.symbol}${converted.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="bg-navy-light/60 border border-gold/30 rounded-2xl p-6 backdrop-blur-md shadow-xl my-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold/20 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gold/10 rounded-xl border border-gold/30 text-gold">
            <Globe size={22} />
          </div>
          <div>
            <h4 className="text-lg font-serif text-warm-white flex items-center gap-2">
              NRI Global Currency Estimator
              <Sparkles size={16} className="text-gold animate-pulse" />
            </h4>
            <p className="text-xs text-text-muted">Real-time indicative property value conversion for international buyers</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-navy/80 p-1.5 rounded-xl border border-gold/20">
          {CURRENCIES.map(curr => (
            <button
              key={curr.code}
              onClick={() => setSelectedCurrency(curr)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                selectedCurrency.code === curr.code
                  ? 'bg-gold text-navy shadow-md font-bold'
                  : 'text-text-muted hover:text-warm-white'
              }`}
            >
              {curr.code}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-navy/80 border border-gold/10 rounded-xl p-4">
          <span className="text-xs text-text-muted">Promenade 3 BHK (1,316 sq.ft.)</span>
          <div className="text-xl font-bold text-gilded mt-1 font-mono">
            {formatConverted(16500000, selectedCurrency)}
          </div>
        </div>
        <div className="bg-navy/80 border border-gold/10 rounded-xl p-4">
          <span className="text-xs text-text-muted">The Altius 4 BHK (2,100 sq.ft.)</span>
          <div className="text-xl font-bold text-gilded mt-1 font-mono">
            {formatConverted(24500000, selectedCurrency)}
          </div>
        </div>
        <div className="bg-navy/80 border border-gold/10 rounded-xl p-4">
          <span className="text-xs text-text-muted">Ridges 41 2 BHK (785 sq.ft.)</span>
          <div className="text-xl font-bold text-gilded mt-1 font-mono">
            {formatConverted(9760000, selectedCurrency)}
          </div>
        </div>
      </div>
    </div>
  );
}
