"use client";

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { usePathname } from '@/hooks/useNav';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname() || '';

  useEffect(() => {
    // Only visible on desktop (lg+). On mobile the StickyCTA bar handles WhatsApp.
    const isDesktop = () => window.innerWidth >= 1024;

    const checkVisibility = () => {
      setIsVisible(isDesktop());
      // Collapse card if resized to mobile
      if (!isDesktop()) setIsExpanded(false);
    };

    checkVisibility();
    window.addEventListener('resize', checkVisibility);

    // Auto-expand chat card on desktop only — never on mobile (Google Interstitial penalty)
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isDesktop()) {
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

  // Generate a highly contextual WhatsApp message based on the page the user is currently on
  let contextSnippet = "Paranjape Blue Ridge Township, Hinjewadi Phase 1, Pune";
  if (typeof window !== 'undefined' && window.location.pathname !== '/') {
    // Attempt to make the slug human readable
    const path = window.location.pathname.replace(/^\//, '').replace(/-/g, ' ');
    contextSnippet = `the '${path}' property at Paranjape Blue Ridge`;
  }

  const defaultMessage = `Hello, I am looking at ${contextSnippet} on your website right now.\n\nPlease share:\n- Available inventory & floor plans\n- Updated price list\n- Site visit schedule`;

  const whatsappUrl = `https://wa.me/917744009295?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[90] hidden lg:flex flex-col items-end gap-3 font-sans">
      
      {/* Luxury Expandable Chat Card */}
      {isExpanded && (
        <div className="bg-white border-2 border-slate-200 text-[#070D1A] p-5 rounded-2xl rounded-br-none shadow-2xl max-w-[310px] animate-in zoom-in-95 origin-bottom-right duration-300">
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#785415]">Blue Ridge Sales Desk</span>
            </div>
            <button
              aria-label="Close Chat"
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-[#070D1A] transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center -mr-1"
            >
              <X size={15} />
            </button>
          </div>

          <p className="text-xs text-slate-700 font-medium leading-relaxed mb-4">
            Looking for exclusive pricing or 3D floor plans for <strong className="text-[#070D1A] font-bold">Paranjape Blue Ridge</strong>? Chat with our relationship manager on WhatsApp now.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all transform hover:scale-[1.02]"
          >
            <span>Start WhatsApp Chat</span>
            <Send size={14} />
          </a>
          <span className="text-[10px] text-slate-500 font-medium text-center block mt-2">⚡ Typical response time: ~2 minutes</span>
        </div>
      )}

      {/* Official WhatsApp Floating Trigger Button with Ripple Rings */}
      <div className="relative group">
        {/* Animated Double Ripple Pulse Rings */}
        <span className="absolute -inset-2 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none"></span>
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/60 blur-sm pointer-events-none"></span>

        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsExpanded(prev => !prev)}
          className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.5)] border-2 border-white/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Chat on WhatsApp with Paranjape Blue Ridge Sales Team"
        >
          {/* Official High-Resolution Vector WhatsApp Logo */}
          <svg
            className="w-8 h-8 fill-current drop-shadow-md"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.197 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
      
    </div>
  );
}
