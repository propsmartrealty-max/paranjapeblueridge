"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, Box, Download, Sparkles } from 'lucide-react';
import EnquiryModal from '@/components/EnquiryModal';

const plans = [
  {
    id: '3bhk-1316',
    label: 'Promenade 3 BHK (1,316 sq ft)',
    name: 'Promenade 3 BHK River View Classic',
    area: '1,316 Sq. Ft.',
    image: '/assets/images/promenade-3bhk-1316.jpg',
    features: ['Direct Mula River Facing Balcony', 'Advanced MiVAN Monolithic Construction', 'Walk-to-Work IT SEZ Access']
  },
  {
    id: '4bhk-1633',
    label: 'Promenade 4 BHK (1,633 sq ft)',
    name: 'Promenade 4 BHK Riverfront Signature',
    area: '1,633 Sq. Ft.',
    image: '/assets/images/promenade-4bhk-1633.jpg',
    features: ['Dual Balcony System with River Vistas', 'Spacious Staff Quarters & Utility', '3-Side Open Architectural Cross-Ventilation']
  },
  {
    id: '4bhk-altius',
    label: 'The Altius 4 BHK (1,858 sq ft)',
    name: 'The Altius Royal Fairway Residence',
    area: '1,858 Sq. Ft.',
    image: '/assets/images/official/altius-4bhk.jpg',
    features: ['Controlled Access Biometric Elevator Foyer', 'Panoramic 9-Hole Golf Course & River Views', 'Imported Italian Marble Flooring']
  },
  {
    id: '5bhk-altius',
    label: 'The Altius 5 BHK (2,480 sq ft)',
    name: 'The Altius Sovereign Sky Penthouse',
    area: '2,480 Sq. Ft.',
    image: '/assets/images/official/altius-5bhk.jpg',
    features: ['11-Foot Clear Architectural Ceilings', 'Private Golf Club Terrace Deck', 'Dual Walk-In Wardrobes in Master Retreat']
  },
  {
    id: '2bhk-ridges41',
    label: 'Ridges 41 2 BHK (793 sq ft)',
    name: 'Ridges 41 Smart Living 2 BHK',
    area: '793 Sq. Ft.',
    image: '/assets/images/official/ridges41-2bhk.jpg',
    features: ['Ergonomic Work-from-Home Nook', '41-Storey High-Velocity MiVAN Superstructure', '400m from Infosys & Wipro Tech Gates']
  },
  {
    id: '3bhk-ridges41',
    label: 'Ridges 41 3 BHK (1,250 sq ft)',
    name: 'Ridges 41 Executive 3 BHK',
    area: '1,250 Sq. Ft.',
    image: '/assets/images/official/ridges41-3bhk.jpg',
    features: ['Expansive Living Span with Valley Panorama', 'Dedicated EV Rapid Charging Bay', '6-Level Integrated Automated Podium Parking']
  }
];

export default function InteractiveFloorPlans() {
  const [activeTab, setActiveTab] = useState(plans[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 bg-navy border-y border-gold/10 overflow-hidden relative">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Controls & Blueprint Specs */}
          <div className="w-full lg:w-5/12">
            <div className="flex items-center gap-2 text-gold font-bold tracking-[6px] uppercase text-[10px] mb-3">
              <Sparkles size={14} />
              Architectural Blueprints
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-warm-white leading-tight mb-8">
              Interactive <span className="italic font-normal text-gilded">Layouts</span>
            </h2>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setActiveTab(plan)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all border ${
                    activeTab.id === plan.id 
                    ? 'bg-gold text-navy border-gold shadow-lg shadow-gold/20 font-extrabold' 
                    : 'bg-navy-light/60 text-text-light border-gold/10 hover:border-gold/30 hover:text-warm-white'
                  }`}
                >
                  {plan.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 bg-navy-light/40 border border-gold/20 p-6 rounded-2xl backdrop-blur-md"
              >
                <div>
                  <h3 className="text-2xl font-serif text-warm-white mb-1">{activeTab.name}</h3>
                  <div className="flex items-center gap-2 text-gold text-sm font-bold font-mono">
                    <Ruler size={16} />
                    {activeTab.area} Carpet Area
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {activeTab.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-navy/80 rounded-xl border border-gold/10 group hover:border-gold/30 transition-all">
                      <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-all">
                        <Box size={14} />
                      </div>
                      <span className="text-xs text-text-light font-medium tracking-wide">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 bg-gold hover:bg-gold-light text-navy text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 btn-sheen"
                >
                  <Download size={16} />
                  Download Complete HD PDF Cost Sheet
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Floor Plan Visualizer */}
          <div className="w-full lg:w-7/12 relative group">
            <div className="absolute -inset-4 bg-gold/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gold/20"
              >
                <div className="relative w-full aspect-[16/10] min-h-[380px] flex items-center justify-center">
                  <img 
                    src={activeTab.image} 
                    alt={`Architectural Floor Plan layout for ${activeTab.name} - Paranjape Blue Ridge Hinjewadi`}
                    className="max-h-[420px] w-auto max-w-full object-contain mx-auto"
                    loading="eager"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialInterest={activeTab.name}
      />
    </section>
  );
}
