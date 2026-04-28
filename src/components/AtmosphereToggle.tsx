"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useAtmosphere } from '@/context/AtmosphereContext';

export default function AtmosphereToggle() {
  const { atmosphere, toggleAtmosphere } = useAtmosphere();

  return (
    <button 
      onClick={toggleAtmosphere}
      className="relative flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1 w-16 h-8 hover:bg-white/10 transition-all overflow-hidden"
      title={`Switch to ${atmosphere === 'morning' ? 'Night' : 'Morning'} Atmosphere`}
    >
      <motion.div 
        animate={{ x: atmosphere === 'morning' ? 0 : 32 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="z-10 w-6 h-6 rounded-full bg-gold flex items-center justify-center text-navy shadow-lg"
      >
        {atmosphere === 'morning' ? <Sun size={14} /> : <Moon size={14} />}
      </motion.div>
      
      <div className="absolute inset-0 flex justify-between px-2 items-center opacity-30">
         <Sun size={12} className="text-gold" />
         <Moon size={12} className="text-gold" />
      </div>
    </button>
  );
}
