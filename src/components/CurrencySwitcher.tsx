'use client';

import React from 'react';
import { Globe, Sparkles } from 'lucide-react';
import { useCurrency, CURRENCIES } from '@/context/CurrencyContext';

export default function CurrencySwitcher() {
  const { currency, setCurrency, formatPrice } = useCurrency();

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
            <p className="text-xs text-text-muted">Changes the pricing display across the entire platform</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-navy/80 p-1.5 rounded-xl border border-gold/20 overflow-x-auto max-w-full">
          {Object.values(CURRENCIES).map(curr => (
            <button
              key={curr.code}
              onClick={() => setCurrency(curr.code)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                currency.code === curr.code
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
            {formatPrice(16500000)}
          </div>
        </div>
        <div className="bg-navy/80 border border-gold/10 rounded-xl p-4">
          <span className="text-xs text-text-muted">The Altius 4 BHK (2,100 sq.ft.)</span>
          <div className="text-xl font-bold text-gilded mt-1 font-mono">
            {formatPrice(24500000)}
          </div>
        </div>
        <div className="bg-navy/80 border border-gold/10 rounded-xl p-4">
          <span className="text-xs text-text-muted">Ridges 41 2 BHK (785 sq.ft.)</span>
          <div className="text-xl font-bold text-gilded mt-1 font-mono">
            {formatPrice(9760000)}
          </div>
        </div>
      </div>
    </div>
  );
}
