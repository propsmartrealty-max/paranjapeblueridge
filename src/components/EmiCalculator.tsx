'use client';

import React, { useState } from 'react';
import { Calculator, Percent, Landmark, Check } from 'lucide-react';

interface BankPreset {
  name: string;
  rate: number;
}

const BANK_PRESETS: BankPreset[] = [
  { name: 'SBI', rate: 8.40 },
  { name: 'HDFC Bank', rate: 8.50 },
  { name: 'ICICI Bank', rate: 8.55 },
  { name: 'Axis Bank', rate: 8.60 },
];

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(12000000); // 1.2 Cr baseline
  const [interestRate, setInterestRate] = useState<number>(8.50);
  const [tenureYears, setTenureYears] = useState<number>(20);

  // EMI Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculateEmi = () => {
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;
    if (r === 0) return loanAmount / n;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const monthlyEmi = calculateEmi();
  const totalPayment = monthlyEmi * tenureYears * 12;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="bg-navy-light/60 border border-gold/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-xl my-8">
      <div className="flex items-center justify-between border-b border-gold/20 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gold/10 rounded-xl border border-gold/30 text-gold">
            <Calculator size={22} />
          </div>
          <div>
            <h4 className="text-xl font-serif text-warm-white">Interactive Home Loan & EMI Estimator</h4>
            <p className="text-xs text-text-muted">Calculate monthly installments with top Indian bank interest rate benchmarks</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sliders */}
        <div className="space-y-6">
          {/* Bank Presets */}
          <div>
            <label className="text-xs font-semibold text-text-muted block mb-2">Preferred Bank Benchmark</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BANK_PRESETS.map((b, i) => (
                <button
                  key={i}
                  onClick={() => setInterestRate(b.rate)}
                  className={`p-2 rounded-xl text-xs flex items-center justify-between border transition-all ${
                    interestRate === b.rate
                      ? 'bg-gold/10 border-gold text-gold font-bold'
                      : 'bg-navy/60 border-gold/10 text-text-muted hover:border-gold/30'
                  }`}
                >
                  <span>{b.name}</span>
                  <span className="font-mono font-bold">{b.rate}%</span>
                </button>
              ))}
            </div>
          </div>

          {/* Loan Amount Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-text-muted">Loan Amount</span>
              <span className="text-gold font-mono font-bold">₹{(loanAmount / 100000).toFixed(1)} Lakhs</span>
            </div>
            <input
              type="range"
              min={3000000}
              max={30000000}
              step={500000}
              value={loanAmount}
              onChange={e => setLoanAmount(Number(e.target.value))}
              className="w-full accent-gold bg-navy h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-muted mt-1">
              <span>₹30 Lakhs</span>
              <span>₹3 Crores</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-text-muted">Interest Rate</span>
              <span className="text-gold font-mono font-bold">{interestRate.toFixed(2)}% p.a.</span>
            </div>
            <input
              type="range"
              min={7.0}
              max={11.0}
              step={0.05}
              value={interestRate}
              onChange={e => setInterestRate(Number(e.target.value))}
              className="w-full accent-gold bg-navy h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Tenure Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-text-muted">Tenure (Years)</span>
              <span className="text-gold font-mono font-bold">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={tenureYears}
              onChange={e => setTenureYears(Number(e.target.value))}
              className="w-full accent-gold bg-navy h-2 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Output Card */}
        <div className="bg-navy/80 border border-gold/20 rounded-xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-text-muted font-bold block mb-1">Monthly Payable EMI</span>
            <div className="text-4xl font-serif text-gilded font-mono font-bold">
              ₹{monthlyEmi.toLocaleString('en-IN')}
              <span className="text-sm font-sans font-normal text-text-muted"> / month</span>
            </div>
          </div>

          <div className="space-y-3 border-t border-gold/10 pt-4 text-xs text-text">
            <div className="flex justify-between">
              <span className="text-text-muted">Principal Loan Amount</span>
              <span className="font-mono font-bold text-warm-white">₹{loanAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Total Interest Payable</span>
              <span className="font-mono font-bold text-gold">₹{totalInterest.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between border-t border-gold/10 pt-2 font-bold text-sm">
              <span className="text-warm-white">Total Amount Payable</span>
              <span className="font-mono text-emerald-400">₹{totalPayment.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <a
            href="#enquiry-modal"
            className="w-full py-3 bg-gold hover:bg-gold-light text-navy font-bold rounded-xl text-center text-xs uppercase tracking-widest transition-all shadow-lg block"
          >
            Check Home Loan Pre-Approval Eligibility
          </a>
        </div>
      </div>
    </div>
  );
}
