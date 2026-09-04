"use client";

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Calendar, Download } from 'lucide-react';
import EnquiryModal from './EnquiryModal';
import { usePathname } from '@/hooks/useNav';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname() || '';

  useEffect(() => {
    const handleScroll = () => {
      // Show after 150px scroll (reduced from 300px for earlier CTA visibility)
      setIsVisible(window.scrollY > 150);
    };

    // passive: true allows browser to scroll on GPU thread without waiting for JS
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic Lead Magnet Logic based on URL context
  let ctaText = "Book Visit";
  let ctaIcon = <Calendar size={14} />;
  let initialInterest = "";

  if (pathname.includes('tower')) {
    ctaText = "Get Floor Plans";
    ctaIcon = <Download size={14} />;
    initialInterest = "Floor Plans";
  } else if (pathname.includes('vs') || pathname.includes('comparison')) {
    ctaText = "Get Price List";
    ctaIcon = <Download size={14} />;
    initialInterest = "Price List Comparison";
  } else if (pathname.includes('buy-flat') || pathname.includes('resale')) {
    ctaText = "View Inventory";
    initialInterest = "Ready Inventory";
  } else if (pathname.includes('rent')) {
    ctaText = "View Rentals";
    initialInterest = "Corporate Rentals";
  }

  return (
    <>
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialInterest={initialInterest} />
      
      <div className={`fixed bottom-0 left-0 w-full z-[90] lg:hidden transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="bg-white/95 backdrop-blur-2xl border-t border-slate-200 p-3.5 flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]" style={{ paddingBottom: 'calc(0.875rem + env(safe-area-inset-bottom, 0px))' }}>
          
          <a 
            href="tel:+917744009295"
            aria-label="Call Sales Team"
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 border border-slate-300 text-[#070D1A] min-h-[48px] py-3 rounded-2xl text-xs font-bold uppercase tracking-widest active:scale-95 transition-all shadow-sm no-underline"
          >
            <Phone size={16} className="text-[#785415]" />
            <span>Call Now</span>
          </a>

          <button 
            onClick={() => setIsModalOpen(true)}
            aria-label={ctaText}
            className="flex-1 flex items-center justify-center gap-2 btn-champagne text-white min-h-[48px] py-3 rounded-2xl text-xs font-bold uppercase tracking-widest cursor-pointer active:scale-95 transition-all font-sans border-none shadow-md"
          >
            {ctaIcon}
            <span>{ctaText}</span>
          </button>

          <a 
            href="https://wa.me/917744009295?text=Hello%2C%0A%0AI%20am%20interested%20in%20*Paranjape%20Blue%20Ridge%20Township*%2C%20Hinjewadi%20Phase%201%2C%20Pune.%0A%0APlease%20share%20the%20following%3A%0A%E2%9C%85%20Available%20inventory%20%26%20floor%20plans%0A%E2%9C%85%20Updated%20price%20list%0A%E2%9C%85%20Site%20visit%20schedule%0A%0AKindly%20call%20me%20back%20at%20your%20earliest%20convenience.%0A%0AThank%20you."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="w-12 min-h-[48px] flex items-center justify-center bg-emerald-600 text-white rounded-2xl active:scale-95 transition-all shadow-md"
          >
            <MessageCircle size={20} />
          </a>

        </div>
      </div>
    </>
  );
}
