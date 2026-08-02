'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ContextualWhatsappCTAProps {
  title?: string;
  intent?: string;
  silo?: string;
}

export default function ContextualWhatsappCTA({ 
  title = 'Paranjape Blue Ridge', 
  intent = 'Luxury Property', 
  silo = 'default' 
}: ContextualWhatsappCTAProps) {
  const getCustomMessage = () => {
    if (silo === 'nri') return `Hi, I am an NRI buyer interested in remote booking & legal advisory for ${title} at Paranjape Blue Ridge.`;
    if (silo === 'duplex-simplex') return `Hi, I am interested in viewing available Duplex & Simplex floor plans and pricing for ${title} at Blue Ridge Hinjewadi.`;
    if (silo === 'pune-micro-market') return `Hi, I would like to receive the latest market report and pricing for ${title} at Paranjape Blue Ridge.`;
    if (silo === 'investor') return `Hi, please send me the rental yield metrics and cost sheet for ${title} at Blue Ridge Hinjewadi.`;
    
    return `Hi, I am interested in ${intent} at Paranjape Blue Ridge Hinjewadi. Please share floor plans, pricing, and site visit options.`;
  };

  const encodedMsg = encodeURIComponent(getCustomMessage());
  const whatsappUrl = `https://wa.me/917744009295?text=${encodedMsg}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Blue Ridge Sales Team on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border border-emerald-400/30 group"
    >
      <div className="relative">
        <MessageCircle size={22} className="text-white fill-current" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
        </span>
      </div>
      <span className="hidden sm:inline text-sm font-semibold tracking-wide">
        Chat on WhatsApp
      </span>
    </a>
  );
}
