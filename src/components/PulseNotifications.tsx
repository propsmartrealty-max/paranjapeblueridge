"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Eye, CheckCircle, TrendingUp } from 'lucide-react';

const generateEvents = () => [
  { icon: <Eye size={14} />, text: `${Math.floor(Math.random() * 15) + 5} people viewing Altius right now`, color: "text-blue-400" },
  { icon: <CheckCircle size={14} />, text: "New site visit request from Hinjewadi", color: "text-emerald-400" },
  { icon: <TrendingUp size={14} />, text: "Price appreciation alert: Ridges 41", color: "text-gold" },
  { icon: <Users size={14} />, text: `Only ${Math.floor(Math.random() * 3) + 1} units left in Promenade Elite`, color: "text-red-400" },
  { icon: <Eye size={14} />, text: "Visitor from London requested brochure", color: "text-purple-400" },
  { icon: <CheckCircle size={14} />, text: `Just secured: 3BHK Sovereign Hold (${Math.floor(Math.random() * 10) + 1} mins ago)`, color: "text-gold" }
];

export default function PulseNotifications() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [currentEvents, setCurrentEvents] = useState(generateEvents());

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 5000);

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => {
          const nextIndex = (prev + 1) % currentEvents.length;
          if (nextIndex === 0) {
            // Re-generate numbers for the next cycle
            setCurrentEvents(generateEvents());
          }
          return nextIndex;
        });
        setVisible(true);
      }, 1000);
    }, 12000);


    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-24 left-6 z-[80] pointer-events-none hidden md:block">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            className="bg-navy/80 backdrop-blur-2xl border border-white/10 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4"
          >
            <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center ${currentEvents[index].color}`}>
              {currentEvents[index].icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-text-light font-bold uppercase tracking-widest">Sovereign Pulse</span>
              <span className="text-xs text-warm-white font-medium">{currentEvents[index].text}</span>
            </div>
            {/* Blinking dot */}
            <div className="ml-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
