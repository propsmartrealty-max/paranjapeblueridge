"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, TrendingDown } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

const inventoryData = [
  { id: 'promenade', name: 'Promenade Residences', config: '3 BHK', total: 120, available: 4, demand: 'High' },
  { id: 'altius', name: 'The Altius', config: '4 BHK', total: 80, available: 2, demand: 'Very High' },
  { id: 'ridge41', name: 'Ridge 41', config: '2 BHK', total: 200, available: 12, demand: 'Steady' },
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
      <section className="py-20 bg-black border-y border-gold/10 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-gold font-bold tracking-[6px] uppercase text-[10px]">Live Inventory Status</span>
              </div>
              <h2 className="text-5xl font-serif text-warm-white">Sovereign <span className="italic font-normal text-gilded">Flash-Lock</span></h2>
              <p className="text-text-light mt-4 max-w-xl">
                High-velocity sales phase active. Secure your configuration with a 48-hour sovereign hold before prices appreciate.
              </p>
            </div>
            <div className="bg-white/5 border border-gold/20 p-4 rounded-2xl flex items-center gap-4">
              <Clock className="text-gold" size={24} />
              <div>
                <span className="block text-[10px] text-text-light uppercase tracking-widest mb-1">Price Lock Expires In</span>
                <span className="text-2xl font-mono text-warm-white font-bold tracking-wider">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {inventoryData.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-gold/10 p-8 rounded-3xl relative overflow-hidden group hover:border-gold/30 transition-all"
              >
                {item.available <= 5 && (
                  <div className="absolute top-4 right-4 bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <TrendingDown size={12} /> Selling Fast
                  </div>
                )}
                
                <h3 className="text-2xl font-serif text-warm-white mb-2">{item.name}</h3>
                <span className="text-gold font-bold text-sm">{item.config} Premium Residences</span>
                
                <div className="mt-8 mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-text-light text-xs uppercase tracking-widest">Available Units</span>
                    <span className="text-4xl font-serif text-warm-white">{item.available}<span className="text-lg text-text-light">/{item.total}</span></span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.available / item.total) * 100}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={`h-full ${item.available <= 5 ? 'bg-red-500' : 'bg-gold'}`}
                    ></motion.div>
                  </div>
                </div>

                <button 
                  onClick={() => handleReserve(item.name)}
                  className="w-full flex items-center justify-center gap-2 bg-gold/10 hover:bg-gold text-gold hover:text-navy border border-gold/20 hover:border-gold py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all"
                >
                  <ShieldCheck size={16} />
                  Initiate Sovereign Hold
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialInterest={selectedUnit}
      />
    </>
  );
}
