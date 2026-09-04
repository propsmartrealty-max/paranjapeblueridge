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
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm my-12 text-[#070D1A] relative overflow-hidden">
      <div className="flex items-center gap-3.5 mb-8 border-b border-slate-200 pb-5">
        <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-[#B88E3E] shadow-2xs">
          <Calculator size={26} />
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#070D1A] font-bold">Interactive Investment & ROI Calculator</h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 font-sans">Simulate rental yields, capital growth, and home loan EMI for {title}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders Input Panel */}
        <div className="lg:col-span-7 space-y-6">
          {/* Property Price Slider */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-[#070D1A] flex items-center gap-2 font-sans">
                <DollarSign size={16} className="text-[#B88E3E]" />
                Property Value
              </label>
              <span className="text-lg font-bold text-[#B88E3E] font-mono">{formatCurrency(propertyPrice)}</span>
            </div>
            <input 
              type="range"
              min={7500000}
              max={35000000}
              step={250000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-2.5 bg-amber-200/60 rounded-lg appearance-none cursor-pointer accent-[#B88E3E]"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1.5 font-mono font-medium">
              <span>₹75 Lakh</span>
              <span>₹3.5 Cr</span>
            </div>
          </div>

          {/* Rental Yield Slider */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-[#070D1A] flex items-center gap-2 font-sans">
                <TrendingUp size={16} className="text-[#B88E3E]" />
                Estimated Rental Yield (%)
              </label>
              <span className="text-lg font-bold text-[#B88E3E] font-mono">{rentalYield.toFixed(1)}% / yr</span>
            </div>
            <input 
              type="range"
              min={3.5}
              max={6.5}
              step={0.1}
              value={rentalYield}
              onChange={(e) => setRentalYield(Number(e.target.value))}
              className="w-full h-2.5 bg-amber-200/60 rounded-lg appearance-none cursor-pointer accent-[#B88E3E]"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1.5 font-mono font-medium">
              <span>3.5% (Conservative)</span>
              <span>6.5% (High Demand)</span>
            </div>
          </div>

          {/* Loan Ratio Slider */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-[#070D1A] flex items-center gap-2 font-sans">
                <ShieldCheck size={16} className="text-[#B88E3E]" />
                Home Loan Funding (%)
              </label>
              <span className="text-lg font-bold text-[#B88E3E] font-mono">{loanRatio}% ({formatCurrency(loanAmount)})</span>
            </div>
            <input 
              type="range"
              min={0}
              max={80}
              step={5}
              value={loanRatio}
              onChange={(e) => setLoanRatio(Number(e.target.value))}
              className="w-full h-2.5 bg-amber-200/60 rounded-lg appearance-none cursor-pointer accent-[#B88E3E]"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1.5 font-mono font-medium">
              <span>0% (Self-Funded)</span>
              <span>80% (Max Loan)</span>
            </div>
          </div>

          {/* Appreciation Rate Slider */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-[#070D1A] flex items-center gap-2 font-sans">
                <TrendingUp size={16} className="text-[#B88E3E]" />
                Annual Capital Appreciation (%)
              </label>
              <span className="text-lg font-bold text-[#B88E3E] font-mono">{appreciationRate.toFixed(1)}% / yr</span>
            </div>
            <input 
              type="range"
              min={7.0}
              max={15.0}
              step={0.5}
              value={appreciationRate}
              onChange={(e) => setAppreciationRate(Number(e.target.value))}
              className="w-full h-2.5 bg-amber-200/60 rounded-lg appearance-none cursor-pointer accent-[#B88E3E]"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1.5 font-mono font-medium">
              <span>7.0%</span>
              <span>15.0% (Metro Line 3 Surge)</span>
            </div>
          </div>
        </div>

        {/* Output Calculation Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-amber-50/50 border border-amber-200/80 rounded-3xl p-6 space-y-4 shadow-2xs">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-slate-600 font-medium">Est. Monthly Rental Income</span>
              <span className="text-lg sm:text-xl font-bold text-emerald-700 font-mono">₹{monthlyRentalIncome.toLocaleString('en-IN')} / mo</span>
            </div>
            <div className="flex justify-between items-center border-t border-amber-200/60 pt-3.5">
              <span className="text-xs sm:text-sm text-slate-600 font-medium">Est. Monthly Loan EMI (20 Yrs @ 8.5%)</span>
              <span className="text-lg sm:text-xl font-bold text-[#070D1A] font-mono">₹{monthlyEmi.toLocaleString('en-IN')} / mo</span>
            </div>
            <div className="flex justify-between items-center border-t border-amber-200/60 pt-3.5">
              <span className="text-xs sm:text-sm text-slate-600 font-medium">Est. Property Value in 5 Years</span>
              <span className="text-lg sm:text-xl font-bold text-[#B88E3E] font-mono">{formatCurrency(estimatedValueIn5Years)}</span>
            </div>
            <div className="flex justify-between items-center border-t border-amber-200/60 pt-3.5">
              <span className="text-xs sm:text-sm text-slate-600 font-medium">Estimated 5-Year Capital Gain</span>
              <span className="text-lg sm:text-xl font-bold text-emerald-700 font-mono">+{formatCurrency(capitalGain5Years)}</span>
            </div>
          </div>

          <a 
            href="#enquire" 
            className="w-full py-4 btn-champagne font-bold rounded-2xl text-center flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all shadow-md text-xs sm:text-sm uppercase tracking-wider no-underline"
          >
            <span>Request Official Cost Sheet & Payment Plan</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
