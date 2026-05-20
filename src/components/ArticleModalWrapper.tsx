"use client";

import React, { useState, useEffect } from 'react';
import EnquiryModal from './EnquiryModal';

export default function ArticleModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <EnquiryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="mt-16 p-8 sm:p-12 bg-gold/5 border border-gold/20 rounded-[2rem] text-center">
        <h3 className="text-2xl sm:text-3xl font-serif text-warm-white mb-4">
          Interested in <span className="italic text-gilded">Blue Ridge</span>?
        </h3>
        <p className="text-text-light mb-8 max-w-lg mx-auto">
          Get exclusive pricing, floor plans, and schedule a private site visit to Paranjape Blue Ridge Hinjewadi.
        </p>
        <button
          onClick={() => setIsOpen(isOpen => !isOpen)}
          className="bg-gold text-navy px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl gold-glow"
        >
          Request Details Now
        </button>
      </div>
    </>
  );
}
