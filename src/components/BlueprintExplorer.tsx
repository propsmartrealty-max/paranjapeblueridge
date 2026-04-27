"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Download } from 'lucide-react';

interface BlueprintExplorerProps {
  projectId: string;
  projectName: string;
}

export default function BlueprintExplorer({ projectId, projectName }: BlueprintExplorerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePlan, setActivePlan] = useState('3BHK');

  const plans = {
    '2BHK': '/assets/images/unit-plan-3bhk.png', 
    '3BHK': '/assets/images/unit-plan-3bhk.png',
    '4BHK': '/assets/images/unit-plan-3bhk.png'
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-3 bg-white/5 hover:bg-gold/10 border border-white/10 hover:border-gold/30 px-8 py-4 rounded-full text-warm-white font-bold uppercase text-[10px] tracking-widest transition-all"
      >
        <Maximize2 size={14} className="text-gold" />
        Explore Blueprints
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-navy/95 backdrop-blur-2xl"
            ></motion.div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl bg-navy-light border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-[80vh]"
            >
              <div className="w-full md:w-64 border-r border-white/5 p-8 flex flex-col gap-6">
                <div>
                  <span className="text-gold font-bold text-[10px] uppercase tracking-widest">Architectural Layout</span>
                  <h3 className="text-xl font-serif text-warm-white mt-2">{projectName}</h3>
                </div>

                <div className="flex flex-col gap-3">
                  {Object.keys(plans).map(type => (
                    <button
                      key={type}
                      onClick={() => setActivePlan(type)}
                      className={`text-left px-6 py-4 rounded-xl text-xs font-bold tracking-widest transition-all ${
                        activePlan === type 
                        ? 'bg-gold text-navy shadow-lg shadow-gold/20' 
                        : 'bg-white/5 text-text-light hover:bg-white/10'
                      }`}
                    >
                      {type} CONFIG
                    </button>
                  ))}
                </div>

                <div className="mt-auto">
                    <a href="#" className="flex items-center justify-center gap-3 bg-white/5 p-4 rounded-xl text-[10px] font-bold text-gold uppercase tracking-widest hover:bg-gold/10 transition-all">
                        <Download size={14} />
                        Download PDF
                    </a>
                </div>
              </div>

              <div className="flex-1 relative bg-white/[0.02] p-6 md:p-12 flex items-center justify-center min-h-[50vh] md:min-h-0">
                 <button 
                   onClick={() => setIsOpen(false)}
                   className="absolute top-8 right-8 text-text-light hover:text-warm-white transition-colors"
                 >
                    <X size={24} />
                 </button>

                 <motion.img 
                   key={activePlan}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   src={plans[activePlan as keyof typeof plans]}
                   alt={`Paranjape Blue Ridge ${projectName} ${activePlan} Official Floor Plan Layout`}
                   className="max-w-full max-h-full object-contain drop-shadow-2xl"
                 />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
