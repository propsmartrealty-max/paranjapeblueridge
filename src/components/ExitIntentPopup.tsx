"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { useExitIntent } from '@/hooks/useExitIntent';
import EnquiryModal from './EnquiryModal';
import { usePathname } from '@/hooks/useNav';

export default function ExitIntentPopup() {
  const isExitIntentTriggered = useExitIntent(300);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname() || '';

  useEffect(() => {
    // Never show exit-intent popup on mobile — exit-intent (mouseleave) doesn't work on
    // touch devices, and a fullscreen overlay on mobile violates Google's Intrusive
    // Interstitial policy which causes direct mobile ranking penalties.
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

    if (isExitIntentTriggered && !isModalOpen) {
      if (typeof window !== 'undefined') {
        const alreadyShown = sessionStorage.getItem('exit_popup_shown');
        if (!alreadyShown) {
          setIsVisible(true);
          sessionStorage.setItem('exit_popup_shown', 'true');
        }
      }
    }
  }, [isExitIntentTriggered, isModalOpen]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAction = () => {
    setIsVisible(false);
    setIsModalOpen(true);
  };

  let headline = "Wait! Before you leave...";
  let subheadline = "Would you like to schedule a private Virtual Tour of the township?";
  let buttonText = "Schedule Virtual Tour";
  let initialInterest = "Virtual Tour";

  if (pathname.includes('price')) {
    headline = "Looking for official price sheets?";
    subheadline = "Get the verified floor-wise cost breakdown sent directly to your WhatsApp.";
    buttonText = "Get Verified Price Sheet";
    initialInterest = "Price Sheet Request";
  } else if (pathname.includes('floor-plan') || pathname.includes('tower')) {
    headline = "Don't miss out on prime units!";
    subheadline = "Download high-resolution architectural floor plans and master plan before you go.";
    buttonText = "Download Floor Plans";
    initialInterest = "Master Plan & Floor Plans";
  }

  return (
    <>
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialInterest={initialInterest} />
      
      <AnimatePresence>
        {isVisible && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleClose}
            />
            
            <motion.div 
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              className="relative w-full max-w-md bg-white border border-slate-200 p-8 rounded-3xl shadow-2xl text-center overflow-hidden z-10"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#B88E3E]"></div>
              
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors p-1 cursor-pointer bg-transparent border-none"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-200 text-[#B88E3E]">
                <Calendar size={26} />
              </div>
              
              <h3 className="text-2xl font-serif text-[#070D1A] font-bold mb-2">{headline}</h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed font-sans">{subheadline}</p>

              <button 
                onClick={handleAction}
                className="w-full btn-champagne py-3.5 rounded-xl text-xs font-sans font-bold uppercase tracking-wider cursor-pointer border-none shadow-md"
              >
                {buttonText}
              </button>
              
              <button 
                onClick={handleClose}
                className="w-full mt-3 py-2 text-[10px] text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest cursor-pointer bg-transparent border-none font-mono"
              >
                No thanks, I will browse later
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
