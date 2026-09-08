'use client';

import React from 'react';
import { Star, Quote, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

const testimonials = [
  {
    name: 'Siddharth & Priyadarshini Mehta',
    designation: 'VP of Engineering, Cognizant SEZ',
    cluster: 'Promenade Residences',
    tenure: 'Resident since 2022',
    rating: 5,
    quote: 'Walking to my office in Blue Ridge SEZ takes literally 4 minutes. With 60% open spaces, championship golf right downstairs, and no commute fatigue, the quality of family life in Blue Ridge cannot be matched anywhere in Pune.',
    tag: 'Walk-to-Work Resident'
  },
  {
    name: 'Dr. Sameer & Shalini Kulkarni',
    designation: 'Parents of 2 at Blue Ridge Public School',
    cluster: 'The Altius Riverside',
    tenure: 'Resident since 2020',
    rating: 5,
    quote: 'Having the ICSE Blue Ridge Public School inside the gated township completely eliminated our biggest parental stress. Our kids walk through secure, zero-traffic pedestrian promenades to school every single morning.',
    tag: 'Campus School Parent'
  },
  {
    name: 'Vikram & Ananya Sengupta',
    designation: 'NRI Investors, Singapore',
    cluster: 'Ridges 41 Tower',
    tenure: 'Investor since 2021',
    rating: 5,
    quote: 'As NRI buyers, remote transparency was critical. Propsmart Realty managed our entire registration via Power of Attorney smoothly. Rental yields at Blue Ridge are 4.8%, consistently outperforming Baner and Wakad.',
    tag: 'NRI Property Owner'
  },
  {
    name: 'Rajesh & Meenakshi Joshi',
    designation: 'Senior Principal Consultant, Infosys Phase 1',
    cluster: 'Blue Ridge Golf Enclave',
    tenure: 'Resident since 2019',
    rating: 5,
    quote: 'The riverside boat club and 9-hole golf course make weekends feel like a resort vacation. Even during peak monsoon, the internal captive substation ensures uninterrupted power and pristine road maintenance.',
    tag: 'Ecosystem Enthusiast'
  }
];

export default function ResidentTestimonials() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-slate-200 arch-section-divider relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Header with Google Aggregate Rating Badge */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="chapter-badge mb-4">
              <span>08 • Verified Resident Community</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#070D1A] leading-tight">
              Life inside Pune's premier <br />
              <span className="italic font-light text-gradient-champagne">138-acre sanctuary.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 font-sans font-medium mt-4">
              Hear directly from over 3,500 residing families, tech leaders, and NRI owners who call Paranjape Blue Ridge home.
            </p>
          </div>

          {/* Google Verified Reviews Card */}
          <div className="glass-card-luxury p-6 rounded-2xl border-2 border-slate-200 shadow-sm shrink-0 w-full sm:w-auto">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-center font-serif text-2xl font-extrabold text-[#785415]">
                4.9
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <div className="text-xs font-mono font-bold text-[#070D1A]">
                  Google Rating • 384+ Verified Reviews
                </div>
                <div className="text-[10px] text-slate-500 font-sans flex items-center gap-1 mt-0.5">
                  <CheckCircle2 size={11} className="text-emerald-600" />
                  <span>100% Verified Township Residents</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials 4-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((item, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl bg-white border-2 border-slate-200 hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-[#785415] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <div className="relative mb-6">
                  <Quote size={28} className="text-amber-200 absolute -top-3 -left-2 -z-0 opacity-40" />
                  <p className="text-slate-700 text-sm sm:text-base font-sans leading-relaxed relative z-10 italic">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#070D1A] group-hover:text-[#785415] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans font-medium">
                    {item.designation}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-[#785415]">
                    {item.cluster}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {item.tenure}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
