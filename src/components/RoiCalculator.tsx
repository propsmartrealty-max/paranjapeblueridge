'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, ShieldCheck, ArrowRight } from 'lucide-react';

interface RoiCalculatorProps {
  initialPrice?: number;
  title?: string;
}

export default function RoiCalculator({ initialPrice = 12500000, title = 'Blue Ridge Investment' }: RoiCalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [rentalYield, setRentalYield] = useState<number>(4.8);
  const [loanRatio, setLoanRatio] = useState<number>(70);
  const [appreciationRate, setAppreciationRate] = useState<number>(10.5);

  // Calculations
  const annualRentalIncome = (propertyPrice * rentalYield) / 100;
  const monthlyRentalIncome = Math.round(annualRentalIncome / 12);
  
  const loanAmount = (propertyPrice * loanRatio) / 100;
  const annualInterestRate = 0.085; // 8.5%
  const monthlyRate = annualInterestRate / 12;
  const tenureMonths = 240; // 20 years

  const monthlyEmi = loanAmount > 0 
    ? Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1))
    : 0;

  const estimatedValueIn5Years = Math.round(propertyPrice * Math.pow(1 + appreciationRate / 100, 5));
  const capitalGain5Years = estimatedValueIn5Years - propertyPrice;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="ultra-glass-card border border-gold/30 rounded-[2.5rem] sm:rounded-[3rem] p-6 md:p-10 shadow-2xl my-12 text-text relative overflow-hidden hud-frame">
      <div className="luminous-line-gold absolute top-0 left-0 right-0 opacity-40"></div>
      <div className="flex items-center gap-3.5 mb-8 border-b border-gold/20 pb-5">
        <div className="p-3.5 bg-gold/10 rounded-2xl border border-gold/30 text-gold shadow-sm">
          <Calculator size={26} />
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-serif text-warm-white font-bold">Interactive Investment & ROI Calculator</h3>
          <p className="text-xs sm:text-sm text-text-muted font-medium mt-1">Simulate rental yields, capital growth, and home loan EMI for {title}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders Input Panel */}
        <div className="lg:col-span-7 space-y-6">
          {/* Property Price Slider */}
          <div className="p-4 bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-gold/20 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-warm-white flex items-center gap-2 font-sans">
                <DollarSign size={16} className="text-gold" />
                Property Value
              </label>
              <span className="text-lg font-bold text-gold font-mono">{formatCurrency(propertyPrice)}</span>
            </div>
            <input 
              type="range"
              min={7500000}
              max={35000000}
              step={250000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-2.5 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1.5 font-mono font-medium">
              <span>₹75 Lakh</span>
              <span>₹3.5 Cr</span>
            </div>
          </div>

          {/* Rental Yield Slider */}
          <div className="p-4 bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-gold/20 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-warm-white flex items-center gap-2 font-sans">
                <TrendingUp size={16} className="text-gold" />
                Estimated Rental Yield (%)
              </label>
              <span className="text-lg font-bold text-gold font-mono">{rentalYield.toFixed(1)}% / yr</span>
            </div>
            <input 
              type="range"
              min={3.5}
              max={6.5}
              step={0.1}
              value={rentalYield}
              onChange={(e) => setRentalYield(Number(e.target.value))}
              className="w-full h-2.5 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1.5 font-mono font-medium">
              <span>3.5% (Conservative)</span>
              <span>6.5% (High Demand)</span>
            </div>
          </div>

          {/* Loan Ratio Slider */}
          <div className="p-4 bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-gold/20 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-warm-white flex items-center gap-2 font-sans">
                <ShieldCheck size={16} className="text-gold" />
                Home Loan Funding (%)
              </label>
              <span className="text-lg font-bold text-gold font-mono">{loanRatio}% ({formatCurrency(loanAmount)})</span>
            </div>
            <input 
              type="range"
              min={0}
              max={80}
              step={5}
              value={loanRatio}
              onChange={(e) => setLoanRatio(Number(e.target.value))}
              className="w-full h-2.5 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1.5 font-mono font-medium">
              <span>0% (Self-Funded)</span>
              <span>80% (Max Loan)</span>
            </div>
          </div>

          {/* Appreciation Rate Slider */}
          <div className="p-4 bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-gold/20 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-warm-white flex items-center gap-2 font-sans">
                <TrendingUp size={16} className="text-gold" />
                Annual Capital Appreciation (%)
              </label>
              <span className="text-lg font-bold text-gold font-mono">{appreciationRate.toFixed(1)}% / yr</span>
            </div>
            <input 
              type="range"
              min={7.0}
              max={15.0}
              step={0.5}
              value={appreciationRate}
              onChange={(e) => setAppreciationRate(Number(e.target.value))}
              className="w-full h-2.5 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1.5 font-mono font-medium">
              <span>7.0%</span>
              <span>15.0% (Metro Line 3 Surge)</span>
            </div>
          </div>
        </div>

        {/* Output Calculation Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-gold/5 border border-gold/25 rounded-3xl p-6 space-y-4 shadow-inner">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-text-muted font-medium">Est. Monthly Rental Income</span>
              <span className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">₹{monthlyRentalIncome.toLocaleString('en-IN')} / mo</span>
            </div>
            <div className="flex justify-between items-center border-t border-gold/15 pt-3.5">
              <span className="text-xs sm:text-sm text-text-muted font-medium">Est. Monthly Loan EMI (20 Yrs @ 8.5%)</span>
              <span className="text-lg sm:text-xl font-bold text-warm-white font-mono">₹{monthlyEmi.toLocaleString('en-IN')} / mo</span>
            </div>
            <div className="flex justify-between items-center border-t border-gold/15 pt-3.5">
              <span className="text-xs sm:text-sm text-text-muted font-medium">Est. Property Value in 5 Years</span>
              <span className="text-lg sm:text-xl font-bold text-gold font-mono">{formatCurrency(estimatedValueIn5Years)}</span>
            </div>
            <div className="flex justify-between items-center border-t border-gold/15 pt-3.5">
              <span className="text-xs sm:text-sm text-text-muted font-medium">Estimated 5-Year Capital Gain</span>
              <span className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">+{formatCurrency(capitalGain5Years)}</span>
            </div>
          </div>

          <a 
            href="#enquiry" 
            className="w-full py-4 bg-gradient-to-r from-gold via-gold-light to-gold text-navy font-bold rounded-2xl text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl hover:shadow-gold/30 text-xs sm:text-sm uppercase tracking-wider btn-sheen"
          >
            <span>Request Official Cost Sheet & Payment Plan</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
      <div className="luminous-line-gold absolute bottom-0 left-0 right-0 opacity-40"></div>
    </div>
  );
}
