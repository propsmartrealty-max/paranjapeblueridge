import React from 'react';
import { TrendingUp, BarChart3, Building2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PuneMarketReport() {
  return (
    <section className="py-20 border-t border-gold/10 relative overflow-hidden bg-navy-light/30">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none"></div>
      
      <div className="container relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-gold font-bold tracking-[4px] uppercase text-[10px] block mb-4 flex items-center justify-center gap-2">
            <BarChart3 size={14} /> Official Market Report
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-warm-white mb-6">Pune Real Estate <span className="italic font-normal text-gilded">Market Dominance</span></h2>
          <p className="text-text-light leading-relaxed">
            Paranjape Blue Ridge stands as the premier integrated township, dominating the Pune Real Estate Market and setting the absolute benchmark for West Pune luxury living. Our unparalleled scale, world-class amenities, and strategic Hinjewadi Phase 1 location capture the highest rental yields and capital appreciation in the city.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:border-gold/30 transition-all group"
          >
            <TrendingUp className="text-gold mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-4xl font-serif text-warm-white mb-2">12-15%</h3>
            <p className="text-xs text-gold uppercase tracking-widest font-bold mb-4">Capital Appreciation</p>
            <p className="text-sm text-text-light leading-relaxed">
              Townships like Paranjape Blue Ridge consistently outperform standalone buildings, offering premium capital appreciation due to limited land supply in Phase 1.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:border-gold/30 transition-all group"
          >
            <Building2 className="text-gold mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-4xl font-serif text-warm-white mb-2">4.5-6%</h3>
            <p className="text-xs text-gold uppercase tracking-widest font-bold mb-4">High Rental Yields</p>
            <p className="text-sm text-text-light leading-relaxed">
              With 1.5 Lac+ tech employees in Rajiv Gandhi Infotech Park, premium 2 & 3 BHK flats command Pune's highest rental returns with zero-vacancy trends.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:border-gold/30 transition-all group"
          >
            <MapPin className="text-gold mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-4xl font-serif text-warm-white mb-2">Line 3</h3>
            <p className="text-xs text-gold uppercase tracking-widest font-bold mb-4">Metro Integration</p>
            <p className="text-sm text-text-light leading-relaxed">
              The upcoming Pune Metro Line 3 will seamlessly connect Hinjewadi Phase 1 to central Pune, ensuring future-proof connectivity and massive value unlocks.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
