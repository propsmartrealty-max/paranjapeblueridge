'use client';

import React, { useState } from 'react';
import { Calculator, Shield, FileText } from 'lucide-react';

export default function NriCostEstimator() {
  const [agreementValue, setAgreementValue] = useState<number>(15000000); // 1.5 Cr baseline

  // Fee rates (Maharashtra Govt Rules)
  const stampDutyRate = 0.06; // 6% (Includes Metro Cess)
  const registrationFee = 30000; // Flat ₹30k
  const gstRate = 0.05; // 5% GST for premium housing
  const legalProcessing = 25000; // Est. legal fees

  const stampDuty = agreementValue * stampDutyRate;
  const gst = agreementValue * gstRate;
  const totalAcquisitionCost = agreementValue + stampDuty + registrationFee + gst + legalProcessing;

  return (
    <div className="bg-navy-light/60 border border-gold/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-xl my-8">
      <div className="flex items-center justify-between border-b border-gold/20 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gold/10 rounded-xl border border-gold/30 text-gold">
            <FileText size={22} />
          </div>
          <div>
            <h4 className="text-xl font-serif text-warm-white">All-Inclusive Acquisition & Stamp Duty Calculator</h4>
            <p className="text-xs text-text-muted">Itemized breakdown of Maharashtra Stamp Duty, Registration, GST & Legal fees</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-text-muted">Agreement Value</span>
              <span className="text-gold font-mono font-bold">₹{(agreementValue / 100000).toFixed(1)} Lakhs</span>
            </div>
            <input
              type="range"
              min={8000000}
              max={35000000}
              step={500000}
              value={agreementValue}
              onChange={e => setAgreementValue(Number(e.target.value))}
              className="w-full accent-gold bg-navy h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-muted mt-1">
              <span>₹80 Lakhs</span>
              <span>₹3.5 Crores</span>
            </div>
          </div>

          <div className="bg-navy/80 border border-gold/10 rounded-xl p-4 space-y-2 text-xs">
            <div className="flex justify-between text-text-muted">
              <span>Stamp Duty (6% Govt Charge)</span>
              <span className="font-mono text-warm-white">₹{stampDuty.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>Registration Fee</span>
              <span className="font-mono text-warm-white">₹{registrationFee.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>GST (5% Premium Housing)</span>
              <span className="font-mono text-warm-white">₹{gst.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>Legal & Documentation Processing</span>
              <span className="font-mono text-warm-white">₹{legalProcessing.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div className="bg-navy/80 border border-gold/20 rounded-xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-text-muted font-bold block mb-1">Total All-Inclusive Outlay</span>
            <div className="text-3xl font-serif text-gilded font-mono font-bold">
              ₹{totalAcquisitionCost.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-emerald-400 mt-1 block">Includes Agreement + Govt Taxes + Registration</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-text-muted bg-gold/5 p-3 rounded-lg border border-gold/10">
            <Shield size={16} className="text-gold flex-shrink-0" />
            <span>100% RERA Compliant transparent pricing with zero hidden charges.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
