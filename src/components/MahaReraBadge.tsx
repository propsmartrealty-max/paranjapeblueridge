'use client';

import React from 'react';
import { ShieldCheck, ExternalLink, Award } from 'lucide-react';

export default function MahaReraBadge() {
  const reraNumbers = [
    { name: 'Promenade Residences', rera: 'P52100055581' },
    { name: 'The Altius', rera: 'P52100078116' },
    { name: 'Ridges 41', rera: 'P52100000054' },
  ];

  return (
    <div className="bg-navy-light/60 border border-gold/30 rounded-2xl p-6 backdrop-blur-md shadow-xl my-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold/20 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gold/10 rounded-xl border border-gold/30 text-gold">
            <Award size={22} />
          </div>
          <div>
            <h4 className="text-lg font-serif text-warm-white flex items-center gap-2">
              MahaRERA Registered & Verified Township
              <ShieldCheck size={18} className="text-emerald-400 fill-emerald-400/20" />
            </h4>
            <p className="text-xs text-text-muted">100% Legal Title & Government Regulatory Compliance</p>
          </div>
        </div>

        <a
          href="https://maharera.mahaonline.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gold hover:underline flex items-center gap-1 font-semibold bg-gold/5 px-3 py-1.5 rounded-lg border border-gold/20"
        >
          Verify on Official MahaRERA Portal
          <ExternalLink size={12} />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {reraNumbers.map((item, idx) => (
          <div key={idx} className="bg-navy/80 border border-gold/10 rounded-xl p-3 flex flex-col justify-between">
            <span className="text-xs text-text-muted font-medium">{item.name}</span>
            <span className="text-sm font-bold text-gold font-mono tracking-wider mt-1">{item.rera}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
