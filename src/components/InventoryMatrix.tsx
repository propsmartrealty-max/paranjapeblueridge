"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, TrendingDown, Flame, ArrowRight } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

const inventoryData = [
  { id: 'promenade', name: 'Promenade Residences', config: '3 & 4 BHK', total: 120, available: 4, demand: 'High', tower: '41 Storey Riverfront' },
  { id: 'altius', name: 'The Altius', config: '4 & 5 BHK', total: 80, available: 2, demand: 'Very High', tower: 'Golf Course Facing' },
  { id: 'ridge41', name: 'Ridges 41', config: '2 & 3 BHK', total: 200, available: 12, demand: 'Steady', tower: 'MiVAN Smart Homes' },
];

export default function InventoryMatrix() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('');
  const [timeLeft, setTimeLeft] = useState(48 * 60 * 60); // 48 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleReserve = (unitName: string) => {
    setSelectedUnit(unitName);
    setIsModalOpen(true);
  };

  return (
    <>
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialInterest={selectedUnit} />

      <section className="py-16 sm:py-24 relative overflow-hidden" id="inventory-status">
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="ultra-glass-card border border-gold/30 rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="gilded-pill text-[9px]">Live Inventory Status</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif text-warm-white font-bold mt-2">
                  Sovereign <span className="italic font-normal text-gilded">Flash-Lock</span>
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mt-3 max-w-xl leading-relaxed">
                  High-velocity allocation window. Lock in your preferred tower configuration with a 48-hour price freeze before quarterly revision.
                </p>
              </div>
              
              <div className="p-4 sm:p-5 bg-gradient-to-r from-gold/15 via-gold/10 to-gold/5 border border-gold/30 rounded-2xl sm:rounded-3xl flex items-center gap-4 shadow-md shrink-0">
                <div className="w-12 h-12 bg-gold/20 rounded-2xl flex items-center justify-center text-gold">
                  <Clock size={24} />
                </div>
                <div>
                  <span className="block text-[9px] text-text-muted uppercase tracking-widest font-semibold mb-0.5">Price Freeze Closes In</span>
                  <span className="text-xl sm:text-2xl font-mono text-gold font-bold tracking-wider">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {inventoryData.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="p-6 sm:p-8 bg-gradient-to-b from-white/90 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 border border-gold/25 rounded-3xl relative overflow-hidden group shadow-lg hover:shadow-2xl hover:border-gold/60 transition-all flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-gold-light to-gold"></div>

                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20">
                        {item.tower}
                      </span>
                      {item.available <= 5 && (
                        <span className="bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/25 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <Flame size={10} /> Fast Selling
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-serif text-warm-white font-bold mb-1">{item.name}</h3>
                    <span className="text-gold font-bold text-xs sm:text-sm">{item.config} Premium Residences</span>
                    
                    <div className="mt-6 mb-6 p-4 bg-gold/5 rounded-2xl border border-gold/15">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-text-muted text-[10px] uppercase tracking-wider font-semibold">Available Units</span>
                        <span className="text-2xl sm:text-3xl font-serif text-warm-white font-bold">
                          {item.available}
                          <span className="text-sm text-text-muted font-normal"> / {item.total}</span>
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gold/15 rounded-full overflow-hidden p-0.5">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(item.available / item.total) * 100}%` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className={`h-full rounded-full ${item.available <= 5 ? 'bg-gradient-to-r from-red-500 to-amber-500' : 'bg-gradient-to-r from-gold to-gold-light'}`}
                        ></motion.div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleReserve(`${item.name} (${item.config})`)}
                    className="w-full bg-gradient-to-r from-gold via-gold-light to-gold text-navy font-bold py-3.5 rounded-2xl text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg hover:shadow-gold/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Reserve Unit Hold</span>
                    <ArrowRight size={14} />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
