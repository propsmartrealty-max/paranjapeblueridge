"use client";

import React from 'react';
import { Printer } from 'lucide-react';

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button onClick={handlePrint} className="flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:scale-105 transition-all">
        <Printer size={14} />
        Print Brochure
    </button>
  );
}
