"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, CURRENCIES } from '@/context/CurrencyContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function CurrencyHeaderToggle() {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currenciesList = [
    { code: 'INR', symbol: '₹', label: 'INR (IST)', flag: '🇮🇳' },
    { code: 'AED', symbol: 'AED', label: 'AED (Gulf)', flag: '🇦🇪' },
    { code: 'USD', symbol: '$', label: 'USD (US/Can)', flag: '🇺🇸' },
    { code: 'GBP', symbol: '£', label: 'GBP (UK)', flag: '🇬🇧' },
    { code: 'SGD', symbol: 'S$', label: 'SGD (SG)', flag: '🇸🇬' },
    { code: 'EUR', symbol: '€', label: 'EUR (EU)', flag: '🇪🇺' },
  ];

  const currentMeta = currenciesList.find(c => c.code === currency.code) || currenciesList[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy/80 hover:bg-navy border border-gold/30 hover:border-gold text-warm-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer"
        aria-label="Select Currency and Region"
      >
        <span>{currentMeta.flag}</span>
        <span>{currentMeta.code}</span>
        <ChevronDown size={12} className={`text-gold transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl ultra-glass-card shadow-2xl p-2 z-50 border border-gold/30">
          <div className="text-[10px] font-mono text-gold font-bold px-3 py-1 uppercase tracking-wider border-b border-white/10 mb-1">
            Global NRI Currency
          </div>
          {currenciesList.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                setCurrency(item.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer border-none text-left ${
                currency.code === item.code
                  ? 'bg-gold text-navy font-bold shadow-md'
                  : 'text-warm-white/90 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{item.flag}</span>
                <span className="font-mono">{item.label}</span>
              </div>
              {currency.code === item.code && <Check size={14} className="stroke-[3]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
