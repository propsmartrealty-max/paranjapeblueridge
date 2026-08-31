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
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={handleClose}
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md ultra-glass-card border border-gold/30 p-8 rounded-[2.5rem] shadow-2xl text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold via-gold-light to-gold"></div>
              
              <button 
                onClick={handleClose}
                className="absolute top-5 right-5 text-gold hover:text-warm-white transition-colors p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5 border border-gold/25 text-gold">
                <Calendar size={28} />
              </div>
              
              <h3 className="text-2xl font-serif text-warm-white font-bold mb-2">{headline}</h3>
              <p className="text-xs sm:text-sm text-text-muted mb-8 leading-relaxed">{subheadline}</p>

              <button 
                onClick={handleAction}
                className="w-full bg-gradient-to-r from-gold via-gold-light to-gold text-navy font-bold py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl hover:shadow-gold/30 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {buttonText}
              </button>
              
              <button 
                onClick={handleClose}
                className="w-full mt-4 py-2 text-[10px] text-text-muted hover:text-warm-white transition-colors uppercase tracking-widest"
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
