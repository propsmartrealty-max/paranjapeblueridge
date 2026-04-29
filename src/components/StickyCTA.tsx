"use client";

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after 300px scroll
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div className={`fixed bottom-0 left-0 w-full z-[90] lg:hidden transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-navy/80 backdrop-blur-2xl border-t border-gold/30 p-4 flex gap-4">
          
          <a 
            href="tel:+917744009295"
            className="flex-1 flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-warm-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-all"
          >
            <Phone size={14} className="text-gold" />
            Call Now
          </a>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 flex items-center justify-center gap-3 bg-gold text-navy py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-gold/20 active:scale-95 transition-all"
          >
            <Calendar size={14} />
            Book Visit
          </button>

          <a 
            href="https://wa.me/919860500216?text=Hello%20PropSmart%20Realty%2C%0A%0AI%20am%20interested%20in%20*Paranjape%20Blue%20Ridge%20Township*%2C%20Hinjewadi%20Phase%201%2C%20Pune.%0A%0APlease%20share%20the%20following%3A%0A%E2%9C%85%20Available%20inventory%20%26%20floor%20plans%0A%E2%9C%85%20Updated%20price%20list%0A%E2%9C%85%20Site%20visit%20schedule%0A%0AKindly%20call%20me%20back%20at%20your%20earliest%20convenience.%0A%0AThank%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 flex items-center justify-center bg-emerald-500 text-white rounded-2xl active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
          >
            <MessageCircle size={20} />
          </a>

        </div>
      </div>
    </>
  );
}
