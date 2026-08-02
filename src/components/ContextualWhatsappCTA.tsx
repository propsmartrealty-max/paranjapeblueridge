'use client';

import React from 'react';

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
      aria-label="Contact Paranjape Blue Ridge Sales Team on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-5 py-3.5 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-300 transform hover:scale-105 border border-white/30 group"
    >
      <div className="relative flex items-center justify-center">
        {/* Official High-Resolution Vector WhatsApp Logo */}
        <svg
          className="w-6 h-6 fill-current drop-shadow"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.197 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-100"></span>
        </span>
      </div>
      <span className="hidden sm:inline text-sm font-semibold tracking-wide text-white">
        Chat on WhatsApp
      </span>
    </a>
  );
}
