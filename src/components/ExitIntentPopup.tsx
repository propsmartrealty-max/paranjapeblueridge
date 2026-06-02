"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { useExitIntent } from '@/hooks/useExitIntent';
import EnquiryModal from './EnquiryModal';
import { usePathname } from 'next/navigation';

export default function ExitIntentPopup() {
  const isExitIntentTriggered = useExitIntent(300); // 300ms delay
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname() || '';

  useEffect(() => {
    if (isExitIntentTriggered && !isModalOpen) {
      setIsVisible(true);
    }
  }, [isExitIntentTriggered, isModalOpen]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAction = () => {
    setIsVisible(false);
    setIsModalOpen(true);
  };

  // Skip rendering on small screens where mouseleave is less reliable or mobile exit intent isn't great
  // Actually, let's keep it but just in case, use css to hide on very small screens or handle mobile intent via fast scroll up
  // The hook relies on mouseleave so mobile is implicitly excluded mostly, but we can refine later.

  let headline = "Wait! Before you leave...";
  let subheadline = "Would you like to schedule a quick Virtual Tour of the township?";
  let buttonText = "Schedule Virtual Tour";
  let initialInterest = "Virtual Tour";

  if (pathname.includes('price')) {
    headline = "Looking for the best deal?";
    subheadline = "Get our exclusive early-bird pricing sent directly to your inbox.";
    buttonText = "Get Special Pricing";
    initialInterest = "Early Bird Pricing";
  } else if (pathname.includes('floor-plan') || pathname.includes('tower')) {
    headline = "Don't miss out on prime units!";
    subheadline = "Download the high-resolution floor plans and master plan before you go.";
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
              className="absolute inset-0 bg-navy/80 backdrop-blur-md"
              onClick={handleClose}
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-navy border border-gold/40 p-8 rounded-3xl shadow-[0_0_80px_rgba(212,168,83,0.2)] text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-gold-light to-gold"></div>
              
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-gold hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20">
                <Calendar className="text-gold" size={28} />
              </div>
              
              <h3 className="text-2xl font-serif text-warm-white mb-2">{headline}</h3>
              <p className="text-sm text-gold/80 mb-8">{subheadline}</p>

              <button 
                onClick={handleAction}
                className="w-full bg-gold text-navy font-bold py-4 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-gold/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {buttonText}
              </button>
              
              <button 
                onClick={handleClose}
                className="w-full mt-4 py-2 text-[10px] text-white/50 hover:text-white transition-colors uppercase tracking-widest"
              >
                No thanks, I'm just browsing
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
