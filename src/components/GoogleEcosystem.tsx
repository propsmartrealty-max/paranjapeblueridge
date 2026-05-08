"use client";

import React from 'react';
import { MapPin, Star, ShieldCheck, ExternalLink, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GoogleEcosystem() {
  return (
    <section className="py-32 container" id="google-listing">
      <div className="flex items-center gap-4 text-gold font-bold tracking-[6px] uppercase text-[10px] mb-8">
        <ShieldCheck size={14} />
        Google Ecosystem Integration
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT: GOOGLE BUSINESS PROFILE SIMULATION */}
        <div className="bg-navy-light/30 border border-white/5 rounded-[3rem] p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8">
            <div className="bg-emerald-500/10 text-emerald-500 text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              Verified Listing
            </div>
          </div>
          
          <h2 className="text-4xl font-serif text-warm-white mb-6">Google <span className="italic font-normal text-gold">Business Hub</span></h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-navy/50 border border-white/5 rounded-2xl">
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-warm-white font-bold mb-1">Paranjape Blue Ridge Sovereign Sales Gallery</h4>
                <p className="text-xs text-text-light leading-relaxed">Phase 1, Hinjewadi, Rajiv Gandhi Infotech Park, Pune, Maharashtra 411057</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-2">
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <span className="text-2xl font-serif text-warm-white">4.8</span>
                  <span className="text-[10px] text-text-light uppercase tracking-widest">(2,150+ Reviews)</span>
               </div>
            </div>
            
            <div className="pt-8 grid grid-cols-2 gap-4">
               <a 
                href="https://maps.app.goo.gl/3m1R1Y1X1B1V1C1D1" 
                target="_blank" 
                className="flex items-center justify-center gap-3 bg-white/5 hover:bg-gold hover:text-navy text-warm-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border border-white/10"
               >
                 <MapPin size={16} />
                 Directions
               </a>
               <a 
                href="#" 
                className="flex items-center justify-center gap-3 bg-gold text-navy py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-xl shadow-gold/20"
               >
                 <ExternalLink size={16} />
                 View Listing
               </a>
            </div>
          </div>
          
          {/* MAP EMBED (Simulated with aesthetic placeholder or real iframe if allowed) */}
          <div className="mt-10 h-64 w-full rounded-3xl overflow-hidden border border-white/5 relative">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3782.3!2d73.738!3d18.591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb95f32a8187%3A0x67399f99238e8!2sBlue%20Ridge%20Township!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin" 
               width="100%" 
               height="100%" 
               style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.6) contrast(1.2)' }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
          </div>
        </div>
        
        {/* RIGHT: GOOGLE PRODUCTS SIMULATION */}
        <div className="flex flex-col gap-8">
           <div className="bg-navy-light/30 border border-white/5 rounded-[3rem] p-10 flex-grow">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-4xl font-serif text-warm-white">Google <span className="italic font-normal text-gold">Products</span></h2>
                <Package className="text-gold" size={32} />
              </div>
              
              <div className="space-y-4">
                 {[
                   { name: 'Promenade Residences', price: '₹ 1.65 Cr*', badge: 'High Intensity' },
                   { name: 'The Altius Riverside', price: '₹ 1.80 Cr*', badge: 'Golf Facing' },
                   { name: 'Ridges 41 High-Rise', price: '₹ 97.60 L*', badge: 'New Launch' }
                 ].map((prod, i) => (
                   <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="p-6 bg-navy/50 border border-white/5 rounded-2xl flex items-center justify-between group"
                   >
                     <div>
                        <span className="block text-[8px] text-gold uppercase tracking-widest mb-1">{prod.badge}</span>
                        <h4 className="text-warm-white font-bold">{prod.name}</h4>
                     </div>
                     <div className="text-right">
                        <span className="block text-xl font-serif text-gold">{prod.price}</span>
                        <span className="text-[8px] text-text-light uppercase tracking-widest">Starting Price</span>
                     </div>
                   </motion.div>
                 ))}
              </div>
              
              <div className="mt-10 p-6 bg-gold/5 border border-gold/20 rounded-2xl">
                 <p className="text-[10px] text-gold/80 leading-relaxed font-medium uppercase tracking-widest">
                   *All inventory is synced with Google Merchant Center & Real Estate Listing Schema for real-time indexing.
                 </p>
              </div>
           </div>
           
           {/* SEARCH ENGINE HARDENING STATUS */}
           <div className="bg-navy-light/30 border border-white/5 rounded-[3rem] p-8">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-2 h-2 bg-gold rounded-full"></div>
                 <span className="text-[10px] text-warm-white font-bold uppercase tracking-widest">Indexing Status: High Frequency</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                 {[...Array(12)].map((_, i) => (
                   <div key={i} className="h-1 bg-gold/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-gold"
                      ></motion.div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
