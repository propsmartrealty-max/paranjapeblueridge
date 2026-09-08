import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

interface EmiCalculatorProps {
  initialPrice?: number;
  projectName?: string;
}

export default function EmiCalculator({ initialPrice = 9760000, projectName = 'Paranjape Blue Ridge' }: EmiCalculatorProps) {
  // Assume standard 80% loan of property value
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  // Computed loan principal
  const loanAmount = useMemo(() => {
    return Math.round(propertyPrice * (1 - downPaymentPercent / 100));
  }, [propertyPrice, downPaymentPercent]);

  // Monthly EMI calculation formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const { monthlyEmi, totalInterest, totalPayment } = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / (12 * 100);
    const n = tenureYears * 12;

    if (P <= 0 || r <= 0 || n <= 0) {
      return { monthlyEmi: 0, totalInterest: 0, totalPayment: 0 };
    }

    const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const total = emi * n;
    const interest = total - P;

    return {
      monthlyEmi: emi,
      totalInterest: interest > 0 ? interest : 0,
      totalPayment: total > 0 ? total : 0
    };
  }, [loanAmount, interestRate, tenureYears]);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(2)} L`;
    }
    return `₹ ${val.toLocaleString('en-IN')}`;
  };

  const principalPercent = totalPayment > 0 ? Math.round((loanAmount / totalPayment) * 100) : 50;
  const interestPercent = 100 - principalPercent;

  const triggerLeadModal = () => {
    const trigger = document.querySelector('[data-enquiry-trigger="true"]') as HTMLButtonElement;
    if (trigger) {
      trigger.click();
    } else {
      window.location.href = '#enquiry';
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-10 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-100/30 rounded-full blur-3xl -z-0 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-mono uppercase tracking-widest text-[#785415] font-bold mb-2">
              <Calculator size={13} className="text-[#785415]" />
              <span>Mortgage & Affordability Estimator</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#070D1A]">
              Monthly EMI Calculator
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans mt-1">
              Calculate projected monthly installments for residences across {projectName}.
            </p>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setPropertyPrice(9760000)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                propertyPrice === 9760000
                  ? 'bg-[#785415] text-white border-[#785415]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#785415]'
              }`}
            >
              2 BHK (₹97.6 L)
            </button>
            <button
              onClick={() => setPropertyPrice(16500000)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                propertyPrice === 16500000
                  ? 'bg-[#785415] text-white border-[#785415]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#785415]'
              }`}
            >
              3 BHK (₹1.65 Cr)
            </button>
            <button
              onClick={() => setPropertyPrice(18000000)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                propertyPrice === 18000000
                  ? 'bg-[#785415] text-white border-[#785415]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#785415]'
              }`}
            >
              4 BHK (₹1.80 Cr)
            </button>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Slider 1: Property Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="font-bold text-slate-700 uppercase tracking-wider">Property Base Price</span>
                <span className="font-mono font-extrabold text-[#785415] text-sm sm:text-base">
                  {formatCurrency(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min={7500000}
                max={30000000}
                step={250000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#785415]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>₹ 75 L</span>
                <span>₹ 1.85 Cr</span>
                <span>₹ 3.00 Cr</span>
              </div>
            </div>

            {/* Slider 2: Down Payment */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="font-bold text-slate-700 uppercase tracking-wider">Down Payment ({downPaymentPercent}%)</span>
                <span className="font-mono font-extrabold text-slate-800 text-sm">
                  {formatCurrency(Math.round(propertyPrice * (downPaymentPercent / 100)))}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#785415]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>10% (Min)</span>
                <span>20% (Standard)</span>
                <span>50%</span>
              </div>
            </div>

            {/* Slider 3: Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="font-bold text-slate-700 uppercase tracking-wider">Annual Interest Rate</span>
                <span className="font-mono font-extrabold text-slate-800 text-sm">
                  {interestRate.toFixed(1)}% p.a.
                </span>
              </div>
              <input
                type="range"
                min={7.5}
                max={11.5}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#785415]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>7.5% (Prime)</span>
                <span>8.5% (Average)</span>
                <span>11.5%</span>
              </div>
            </div>

            {/* Slider 4: Loan Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="font-bold text-slate-700 uppercase tracking-wider">Tenure</span>
                <span className="font-mono font-extrabold text-slate-800 text-sm">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#785415]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>5 Years</span>
                <span>20 Years</span>
                <span>30 Years</span>
              </div>
            </div>

          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#070D1A] text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block">
                Estimated Monthly Obligation
              </span>
              <div className="text-3xl sm:text-4xl font-mono font-black text-white">
                ₹ {monthlyEmi.toLocaleString('en-IN')}
                <span className="text-xs font-sans font-normal text-slate-400 block mt-1">/ month for {tenureYears} years</span>
              </div>

              {/* Progress Bar: Principal vs Interest */}
              <div className="pt-4 space-y-2">
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                  <div style={{ width: `${principalPercent}%` }} className="bg-[#B88E3E] h-full transition-all duration-300"></div>
                  <div style={{ width: `${interestPercent}%` }} className="bg-slate-600 h-full transition-all duration-300"></div>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#B88E3E]"></span> Principal: {principalPercent}%
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-600"></span> Interest: {interestPercent}%
                  </span>
                </div>
              </div>

              {/* Breakdown metrics */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Loan Amount</span>
                  <span className="font-mono font-bold text-white text-sm">{formatCurrency(loanAmount)}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Total Interest</span>
                  <span className="font-mono font-bold text-amber-200 text-sm">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Total Outlay (Principal + Interest)</span>
                  <span className="font-mono font-extrabold text-white text-base">{formatCurrency(totalPayment)}</span>
                </div>
              </div>
            </div>

            {/* CTA button */}
            <div className="pt-2 space-y-3">
              <button
                onClick={triggerLeadModal}
                className="w-full btn-champagne py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <span>Check Bank Pre-Approval</span>
                <ArrowRight size={14} />
              </button>
              
              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400 text-center">
                <ShieldCheck size={12} className="text-amber-400 shrink-0" />
                <span>Approved by SBI, HDFC, ICICI, Axis & Kotak</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
