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
    <div className="bg-navy-light/90 border border-gold/30 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl my-12 text-text">
      <div className="flex items-center gap-3 mb-6 border-b border-gold/20 pb-4">
        <div className="p-3 bg-gold/10 rounded-xl border border-gold/30 text-gold">
          <Calculator size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-serif text-warm-white">Interactive Investment & ROI Calculator</h3>
          <p className="text-sm text-text-muted">Simulate rental yields, capital growth, and home loan EMI for {title}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders Input Panel */}
        <div className="lg:col-span-7 space-y-6">
          {/* Property Price Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-warm-white flex items-center gap-2">
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
              className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>₹75 Lakh</span>
              <span>₹3.5 Cr</span>
            </div>
          </div>

          {/* Rental Yield Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-warm-white flex items-center gap-2">
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
              className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>3.5% (Conservative)</span>
              <span>6.5% (High Demand)</span>
            </div>
          </div>

          {/* Loan Ratio Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-warm-white flex items-center gap-2">
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
              className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>0% (Self-Funded)</span>
              <span>80% (Max Loan)</span>
            </div>
          </div>

          {/* Appreciation Rate Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-warm-white flex items-center gap-2">
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
              className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>7.0%</span>
              <span>15.0% (Metro Line 3 Surge)</span>
            </div>
          </div>
        </div>

        {/* Output Calculation Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-navy/80 border border-gold/20 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-muted">Est. Monthly Rental Income</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">₹{monthlyRentalIncome.toLocaleString('en-IN')} / mo</span>
            </div>
            <div className="flex justify-between items-center border-t border-navy-light pt-3">
              <span className="text-sm text-text-muted">Est. Monthly Loan EMI (20 Yrs @ 8.5%)</span>
              <span className="text-xl font-bold text-warm-white font-mono">₹{monthlyEmi.toLocaleString('en-IN')} / mo</span>
            </div>
            <div className="flex justify-between items-center border-t border-navy-light pt-3">
              <span className="text-sm text-text-muted">Est. Property Value in 5 Years</span>
              <span className="text-xl font-bold text-gold font-mono">{formatCurrency(estimatedValueIn5Years)}</span>
            </div>
            <div className="flex justify-between items-center border-t border-navy-light pt-3">
              <span className="text-sm text-text-muted">Estimated 5-Year Capital Gain</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">+{formatCurrency(capitalGain5Years)}</span>
            </div>
          </div>

          <a 
            href="#enquiry-modal" 
            className="w-full py-4 bg-gradient-to-r from-gold to-gold-light text-navy font-bold rounded-xl text-center flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg shadow-gold/10"
          >
            Request Official Cost Sheet & Payment Plan
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
