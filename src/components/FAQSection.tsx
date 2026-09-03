"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is Paranjape Blue Ridge good for residential end-use and investment?",
      a: "Yes, Blue Ridge is Hinjewadi's flagship integrated 138-acre township with consistent high gross rental yields (4.8% - 5.6%) and healthy capital appreciation due to the on-site 3M+ sq. ft. IT/ITES SEZ, walk-to-work IT park gates (Infosys, Wipro, TCS), and the upcoming Hinjewadi Metro Line 3 station."
    },
    {
      q: "What configurations and starting prices are currently available?",
      a: "Verified ongoing offerings include 2 BHK Smart Homes in Ridges 41 starting from ₹97.60 L*, 3 & 4 BHK Riverfront Residences in Promenade starting from ₹1.65 Cr*, and 4 & 5 BHK Sky Mansions in The Altius starting from ₹1.80 Cr*."
    },
    {
      q: "What are the official MahaRERA registration numbers for Blue Ridge clusters?",
      a: "The active clusters are registered under: Promenade Residences: P52100055581 | The Altius Riverside: P52100078116 | Ridges 41: P52100000054. All statutory documents are verifiable on maharera.mahaonline.gov.in."
    },
    {
      q: "How far is Blue Ridge from Rajiv Gandhi Infotech Park & Hinjewadi Metro Line 3?",
      a: "Blue Ridge is located directly inside Hinjewadi Phase 1. The on-campus Blue Ridge SEZ is a 0-minute walk. Major tech corporate gates (Infosys, Wipro, Cognizant) are within 400 to 900 meters, and the Hinjewadi Phase 1 Metro Line 3 Station is just 800 meters away."
    },
    {
      q: "What lifestyle and educational amenities exist inside the township perimeter?",
      a: "Residents have on-site access to the operational ICSE-affiliated Blue Ridge Public School, 9-hole executive golf course & The Cliff clubhouse, private boat club & marina on the Mula River, Xion Mall high-street retail, tennis academies, polyclinics, and 24/7 multi-tier security."
    },
    {
      q: "Can NRIs invest in Paranjape Blue Ridge remotely?",
      a: "Yes. NRIs, PIOs, and OCIs can purchase property in Blue Ridge under standard FEMA guidelines without RBI approval. Paranjape provides a specialized NRI advisory desk handling virtual video walkthroughs, end-to-end digital documentation, and remote banking approvals with SBI, HDFC, and ICICI."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#FAF9F6] relative overflow-hidden">
      {/* FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="chapter-badge mb-4 mx-auto">
            <HelpCircle size={11} className="text-[#B88E3E]" />
            <span>09 • Customer FAQ & Advisory</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#070D1A] font-bold tracking-tight">
            Frequently Asked <span className="italic font-light text-gradient-champagne">Questions.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-sans">
            Clear answers to help you evaluate configurations, RERA compliance, rental yields, and possession timelines at Blue Ridge.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:border-[#B88E3E] transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50/70 transition-colors cursor-pointer bg-transparent border-none"
              >
                <span className="text-[#070D1A] font-serif font-bold text-base sm:text-lg pr-4">
                  {faq.q}
                </span>
                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#B88E3E] shrink-0">
                  {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 font-sans font-normal">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
