"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Maximize2, Ruler, Box } from 'lucide-react';

const plans = [
  {
    id: '2bhk',
    label: '2 BHK',
    name: 'Sovereign 2BHK Elite',
    area: '850 - 950 Sq. Ft.',
    image: '/assets/images/floor-plans/2bhk.png',
    features: ['River Facing Balcony', 'Spacious Living', 'Master Suite']
  },
  {
    id: '3bhk',
    label: '3 BHK',
    name: 'Sovereign 3BHK Grand',
    area: '1250 - 1450 Sq. Ft.',
    image: '/assets/images/floor-plans/3bhk.png',
    features: ['Wrap-around Balcony', 'Servant Quarter', 'Premium Finishes']
  },
  {
    id: '4bhk',
    label: '4 BHK',
    name: 'Sovereign 4BHK Presidential',
    area: '1850 - 2200 Sq. Ft.',
    image: '/assets/images/floor-plans/4bhk.png',
    features: ['Private Foyer', 'Home Theater Room', 'Sky Deck']
  }
];

export default function InteractiveFloorPlans() {
  const [activeTab, setActiveTab] = useState(plans[0]);

  return (
    <section className="py-24 bg-navy border-y border-white/5 overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Side: Controls & Info */}
          <div className="w-full lg:w-1/3">
            <span className="text-gold font-bold tracking-[6px] uppercase text-[10px] block mb-4">Architectural Blueprint</span>
            <h2 className="text-5xl font-serif text-warm-white leading-tight mb-8">
              Interactive <span className="italic font-normal text-gold text-4xl">Layouts</span>
            </h2>
            
            <div className="flex flex-wrap gap-2 mb-10">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setActiveTab(plan)}
                  className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all border ${
                    activeTab.id === plan.id 
                    ? 'bg-gold text-navy border-gold shadow-lg shadow-gold/20' 
                    : 'bg-white/5 text-text-light border-white/10 hover:border-gold/50'
                  }`}
                >
                  {plan.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-serif text-warm-white mb-2">{activeTab.name}</h3>
                  <div className="flex items-center gap-2 text-gold text-sm font-bold">
                    <Ruler size={16} />
                    {activeTab.area}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {activeTab.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-navy-light rounded-2xl border border-white/5 group hover:border-gold/30 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-all">
                        <Box size={14} />
                      </div>
                      <span className="text-xs text-text-light font-bold uppercase tracking-widest">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-warm-white text-[10px] font-bold uppercase tracking-[4px] hover:bg-gold hover:text-navy hover:border-gold transition-all">
                  Download Full Technical Specifications
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Floor Plan Visualizer */}
          <div className="w-full lg:w-2/3 relative group">
            <div className="absolute -inset-4 bg-gold/5 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl overflow-hidden border border-white/10"
              >
                <div className="relative w-full aspect-[16/10] min-h-[400px]">
                  <Image 
                    src={activeTab.image} 
                    alt={activeTab.name}
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
                
                {/* Floating Overlay Controls */}
                <div className="absolute bottom-8 right-8 flex gap-2">
                   <button className="p-4 bg-navy/90 text-gold rounded-2xl backdrop-blur-md hover:bg-gold hover:text-navy transition-all border border-gold/30">
                      <Maximize2 size={18} />
                   </button>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Architectural Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #D4A853 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
