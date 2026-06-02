"use client";

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname() || '';

  useEffect(() => {
    // Only show on desktop, StickyCTA handles mobile
    const checkVisibility = () => {
      if (window.innerWidth >= 1024) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    checkVisibility();
    window.addEventListener('resize', checkVisibility);
    
    // Auto-expand after 5 seconds on high-intent pages
    let timer: NodeJS.Timeout;
    if (pathname.includes('buy-flat') || pathname.includes('resale') || pathname.includes('price')) {
      timer = setTimeout(() => {
        setIsExpanded(true);
      }, 5000);
    }
    
    return () => {
      window.removeEventListener('resize', checkVisibility);
      if (timer) clearTimeout(timer);
    };
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-col items-end gap-4 animate-in fade-in slide-in-from-bottom duration-500">
      
      {isExpanded && (
        <div className="bg-white text-navy p-4 rounded-2xl rounded-br-none shadow-[0_10px_40px_rgba(0,0,0,0.2)] max-w-[280px] animate-in zoom-in-95 origin-bottom-right duration-300">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-wider text-navy/60">Sales Team Online</span>
            </div>
            <button onClick={() => setIsExpanded(false)} className="text-navy/40 hover:text-navy">
              <X size={14} />
            </button>
          </div>
          <p className="text-sm font-medium">Hi there! Looking for the latest pricing or inventory for Blue Ridge? Chat with us now.</p>
        </div>
      )}

      <a 
        href="https://wa.me/917744009295?text=Hello%2C%0A%0AI%20am%20interested%20in%20*Paranjape%20Blue%20Ridge%20Township*%2C%20Hinjewadi%20Phase%201%2C%20Pune.%0A%0APlease%20share%20the%20following%3A%0A%E2%9C%85%20Available%20inventory%20%26%20floor%20plans%0A%E2%9C%85%20Updated%20price%20list%0A%E2%9C%85%20Site%20visit%20schedule%0A%0AKindly%20call%20me%20back%20at%20your%20earliest%20convenience.%0A%0AThank%20you."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => !isExpanded && setIsExpanded(true)}
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
      
    </div>
  );
}
