"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { projects } from '@/data/master-data';

export default function SovereignAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Welcome to the Sovereign Concierge. How may I assist you with Paranjape Blue Ridge today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Mock AI Logic (Ready for Gemini API integration)
    setTimeout(() => {
      let response = "I'm analyzing your request within the Sovereign database... For specific inventory details, I recommend booking a priority site visit.";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes('altius')) {
        const p = projects.find(x => x.id === 'altius');
        response = `The Altius offers ${p?.carpetArea} configurations starting from ${p?.price}. It's currently ${p?.possession}. Would you like to see the floor plan?`;
      } else if (lower.includes('promenade')) {
        const p = projects.find(x => x.id === 'promenade');
        response = `Promenade Residences feature ultra-luxury ${p?.carpetArea} flats. Possession is slated for ${p?.possession}. It's Hinjewadi's most elite address.`;
      } else if (lower.includes('price') || lower.includes('cost')) {
        response = "Blue Ridge inventory starts from ₹80 Lakhs and goes up to ₹2.5 Crores for premium 4BHK Sky Villas. Which configuration fits your budget?";
      }

      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-gold text-navy rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all group gold-glow"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">1</span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-[100] w-[90vw] md:w-[400px] h-[600px] bg-black border border-gold/30 rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-black border-b border-gold/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="text-warm-white font-serif text-lg leading-tight">Sovereign <span className="italic font-normal text-gilded">Concierge</span></h3>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Active Intelligence</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-gold text-navy font-medium rounded-tr-none' 
                    : 'bg-white/5 text-text-light border border-white/10 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1">
                      <div className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                   </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-6 bg-black border-t border-gold/10">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about floor plans, pricing..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm text-warm-white focus:border-gold outline-none transition-all"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 p-3 bg-gold text-navy rounded-xl hover:scale-105 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-[8px] text-text-light/50 uppercase tracking-[2px]">
                <Sparkles size={10} />
                Powered by Sovereign AI
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
