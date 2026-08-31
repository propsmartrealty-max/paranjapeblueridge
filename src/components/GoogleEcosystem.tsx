"use client";

import React from 'react';
import { MapPin, Star, ShieldCheck, ExternalLink, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Blue+Ridge,+Phase+1,+Rajiv+Gandhi+Infotech+Park,+Hinjawadi,+Maharashtra+411057/@18.5776944,73.7342787,1760m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bc2bbe4d114d579:0xfec1d303cfb8941a!8m2!3d18.5786825!4d73.7370331";

export default function GoogleEcosystem() {
  return (
    <section className="py-24 container" id="google-listing">
      <div className="flex items-center gap-3 text-gold font-bold tracking-[4px] uppercase text-xs mb-8 font-mono">
        <ShieldCheck size={16} className="text-emerald-500" />
        <span>Google Ecosystem & Enterprise Authority</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: GOOGLE BUSINESS PROFILE */}
        <div className="ultra-glass-card border border-gold/30 rounded-[2.5rem] p-8 sm:p-10 relative overflow-hidden group shadow-2xl hud-frame">
          <div className="luminous-line-gold absolute top-0 left-0 right-0 opacity-40"></div>
          <div className="absolute top-6 right-6">
            <div className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-2 font-mono">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>Verified Google Listing</span>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-serif text-warm-white mb-6 font-bold">Google <span className="italic font-normal text-gilded">Business Hub</span></h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-gold/5 border border-gold/20 rounded-2xl shadow-inner">
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold shrink-0 border border-gold/25 shadow-sm">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-warm-white font-bold mb-1 text-sm sm:text-base">Paranjape Blue Ridge Sovereign Sales Gallery</h4>
                <p className="text-xs text-text-muted leading-relaxed font-medium">Phase 1, Hinjewadi Rajiv Gandhi Infotech Park, Pune, Maharashtra 411057</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
               <div className="flex items-center gap-2">
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
                  </div>
                  <span className="text-2xl font-serif text-warm-white font-bold font-mono">4.8</span>
                  <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">(2,150+ Reviews)</span>
               </div>
               <span className="text-[9px] font-mono text-gold border border-gold/30 px-3 py-1 rounded-md bg-gold/10 font-bold">
                 Place ID: ChIJedUU0eS7wjsRGpS7wwPTwf4
               </span>
            </div>
            
            <div className="pt-2 grid grid-cols-2 gap-4">
               <a 
                href={GOOGLE_MAPS_URL} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gold/10 hover:bg-gold hover:text-navy text-warm-white py-3.5 sm:py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border border-gold/25"
               >
                 <MapPin size={15} />
                 <span>Directions</span>
               </a>
               <a 
                href={GOOGLE_MAPS_URL} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-gold via-gold-light to-gold text-navy py-3.5 sm:py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-xl hover:shadow-gold/30 btn-sheen"
               >
                 <ExternalLink size={15} />
                 <span>View on Maps</span>
               </a>
            </div>
          </div>
          
          {/* MAP EMBED */}
          <div className="mt-8 h-60 w-full rounded-2xl overflow-hidden border border-gold/25 relative shadow-inner">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.9324673824555!2d73.73468507612711!3d18.57708576744837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbc655555555%3A0xcab5d8a0f9f300b!2sBlue%20Ridge%20Township!5e0!3m2!1sen!2sin!4v1709825400000!5m2!1sen!2sin" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="Paranjape Blue Ridge Hinjewadi Google Maps Location"
             ></iframe>
          </div>
          <div className="luminous-line-gold absolute bottom-0 left-0 right-0 opacity-40"></div>
        </div>
        
        {/* RIGHT: GOOGLE PRODUCTS & INVENTORY */}
        <div className="flex flex-col gap-6">
           <div className="ultra-glass-card border border-gold/30 rounded-[2.5rem] p-8 sm:p-10 flex-grow shadow-2xl relative overflow-hidden hud-frame">
              <div className="luminous-line-gold absolute top-0 left-0 right-0 opacity-40"></div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl sm:text-4xl font-serif text-warm-white font-bold">Google <span className="italic font-normal text-gilded">Products Feed</span></h2>
                <Package className="text-gold" size={32} />
              </div>
              
              <div className="space-y-4">
                 {[
                   { name: 'Promenade Residences', price: '₹ 1.65 Cr*', badge: 'Riverfront Luxury' },
                   { name: 'The Altius Riverside', price: '₹ 1.80 Cr*', badge: 'Golf Facing' },
                   { name: 'Ridges 41 High-Rise', price: '₹ 97.60 L*', badge: 'MiVAN High-Rise' }
                 ].map((prod, i) => (
                   <motion.div 
                    key={i}
                    whileHover={{ x: 6 }}
                    className="p-5 bg-gold/5 border border-gold/20 rounded-2xl flex items-center justify-between group transition-all hover:border-gold/50 shadow-sm"
                   >
                     <div>
                        <span className="block text-[8px] text-gold uppercase tracking-widest font-bold mb-1 font-mono">{prod.badge}</span>
                        <h4 className="text-warm-white font-bold text-sm sm:text-base">{prod.name}</h4>
                     </div>
                     <div className="text-right">
                        <span className="block text-lg sm:text-xl font-serif text-gold font-bold font-mono">{prod.price}</span>
                        <span className="text-[8px] text-text-muted uppercase tracking-widest font-bold">Starting Price</span>
                     </div>
                   </motion.div>
                 ))}
              </div>
              
              <div className="mt-8 p-5 bg-gold/10 border border-gold/30 rounded-2xl shadow-inner">
                 <p className="text-[10px] text-warm-white leading-relaxed font-bold uppercase tracking-widest font-mono">
                   * All inventory is synced with Google Merchant Center & Real Estate Listing Schema for real-time indexing.
                 </p>
              </div>
              <div className="luminous-line-gold absolute bottom-0 left-0 right-0 opacity-40"></div>
           </div>
           
           {/* SEARCH ENGINE HARDENING STATUS */}
           <div className="ultra-glass-card border border-gold/30 rounded-2xl p-6 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] text-warm-white font-bold uppercase tracking-widest font-mono">Indexing Status: Google Real-Time WebSub Active</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                 {[...Array(6)].map((_, i) => (
                   <div key={i} className="h-2 bg-gold/20 rounded-full overflow-hidden p-0.5 border border-gold/25">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: i * 0.15 }}
                        className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
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
