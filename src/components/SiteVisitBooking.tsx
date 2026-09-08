'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Car, Video, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function SiteVisitBooking() {
  const [visitType, setVisitType] = useState<'cab_pickup' | 'self_drive' | 'virtual'>('cab_pickup');
  
  // Generate next 10 available dates dynamically
  const dates = Array.from({ length: 10 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(dates[0].iso);
  const [selectedSlot, setSelectedSlot] = useState<string>('11:00 AM - 01:00 PM');
  const [pickupLocation, setPickupLocation] = useState<string>('Hinjewadi Phase 1 / Phase 2');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', preferredCluster: 'Promenade Residences' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const timeSlots = [
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
  ];

  const pickupOptions = [
    'Hinjewadi Phase 1 / Phase 2',
    'Wakad / Pimple Saudagar',
    'Baner / Balewadi High Street',
    'Aundh / University Circle',
    'Kothrud / Bavdhan',
    'Pune Airport (PNQ) / Viman Nagar',
    'Pune Railway Station'
  ];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const source = typeof window !== 'undefined' ? window.location.pathname : 'site_visit_booking';
      const utmData = typeof window !== 'undefined' ? localStorage.getItem('sovereign-utms') : null;
      const utms = utmData ? JSON.parse(utmData) : {};

      const intentDesc = visitType === 'cab_pickup'
        ? `In-Person Site Visit with Free Cab Pickup from [${pickupLocation}] on ${selectedDate} at ${selectedSlot}`
        : visitType === 'self_drive'
        ? `Self-Drive VIP Site Visit on ${selectedDate} at ${selectedSlot}`
        : `1-on-1 Virtual 3D Video Walkthrough on ${selectedDate} at ${selectedSlot}`;

      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        bhk: `${formData.preferredCluster} (VIP Site Visit)`,
        visitDate: selectedDate,
        visitTime: selectedSlot,
        intent: intentDesc,
        source: source,
        ...utms
      };

      try {
        await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn('API error, falling back to FormSubmit:', err);
        await fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: `🚗 [Paranjape Blue Ridge] VIP Site Visit: ${formData.name}`,
            ...payload
          })
        });
      }

      setIsBooked(true);
      // Redirect to thank-you page after brief confirmation
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/thank-you';
        }
      }, 1200);

    } catch (error) {
      console.error('Booking submission error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="site-visit" className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-slate-200 arch-section-divider">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="chapter-badge mb-4 mx-auto">
            <Car size={12} className="text-[#785415]" />
            <span>Complimentary VIP Site Experience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#070D1A] leading-tight">
            Schedule Your Private <br />
            <span className="italic font-light text-gradient-champagne">Township Inspection.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-700 font-sans font-medium mt-3">
            Experience the 138-acre sanctuary in person with our dedicated chauffeur pickup service, or request a 1-on-1 virtual interactive walkthrough.
          </p>
        </div>

        {/* Booking Card */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-10 shadow-md">
          {isBooked ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#070D1A]">
                VIP Visit Confirmed!
              </h3>
              <p className="text-sm text-slate-600 font-sans max-w-md mx-auto">
                Our Senior Relationship Manager is preparing your private presentation and route itinerary. Redirecting to your confirmation pass...
              </p>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-8">
              
              {/* Step 1: Choose Visit Format */}
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-[#785415] font-extrabold block mb-3">
                  1. Select Experience Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setVisitType('cab_pickup')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      visitType === 'cab_pickup'
                        ? 'border-[#785415] bg-amber-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Car size={18} className={visitType === 'cab_pickup' ? 'text-[#785415]' : 'text-slate-600'} />
                      <span className="text-sm font-serif font-bold text-[#070D1A]">Free AC Cab Pickup</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-sans">
                      Chauffeured sedan to & from your home/office
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitType('self_drive')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      visitType === 'self_drive'
                        ? 'border-[#785415] bg-amber-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={18} className={visitType === 'self_drive' ? 'text-[#785415]' : 'text-slate-600'} />
                      <span className="text-sm font-serif font-bold text-[#070D1A]">Self Drive Visit</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-sans">
                      Dedicated VIP parking pass & guided buggy tour
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitType('virtual')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      visitType === 'virtual'
                        ? 'border-[#785415] bg-amber-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Video size={18} className={visitType === 'virtual' ? 'text-[#785415]' : 'text-slate-600'} />
                      <span className="text-sm font-serif font-bold text-[#070D1A]">Virtual 3D Tour</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-sans">
                      1-on-1 screen share with 3D model suite walkthrough
                    </p>
                  </button>
                </div>
              </div>

              {/* Cab Pickup Location selector (if cab_pickup selected) */}
              {visitType === 'cab_pickup' && (
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#785415] font-bold block mb-2">
                    Select Pickup Region (Pune & PCMC)
                  </label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-amber-300 bg-white text-sm font-sans font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#785415]"
                  >
                    {pickupOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Step 2: Date Selector */}
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-[#785415] font-extrabold block mb-3">
                  2. Choose Preferred Date
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                  {dates.map((d) => (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => setSelectedDate(d.iso)}
                      className={`min-w-[76px] py-3 px-2 rounded-2xl border-2 text-center transition-all cursor-pointer shrink-0 ${
                        selectedDate === d.iso
                          ? 'border-[#785415] bg-[#785415] text-white shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="text-[10px] font-mono uppercase font-bold">{d.day}</div>
                      <div className="text-lg font-serif font-bold my-0.5">{d.date}</div>
                      <div className="text-[10px] font-mono uppercase font-medium">{d.month}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Time Slot Selector */}
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-[#785415] font-extrabold block mb-3">
                  3. Select Time Window
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 px-3 rounded-xl border-2 text-xs font-mono font-bold transition-all cursor-pointer text-center ${
                        selectedSlot === slot
                          ? 'border-[#785415] bg-amber-50 text-[#785415] shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Contact Details */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <label className="text-xs font-mono uppercase tracking-widest text-[#785415] font-extrabold block">
                  4. Visitor Information
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-sans focus:outline-none focus:border-[#785415] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Mobile Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-sans focus:outline-none focus:border-[#785415] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <select
                      value={formData.preferredCluster}
                      onChange={(e) => setFormData({ ...formData, preferredCluster: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-sans focus:outline-none focus:border-[#785415] focus:bg-white transition-all text-slate-800"
                    >
                      <option value="Promenade Residences">Promenade (3 & 4 BHK)</option>
                      <option value="The Altius Riverside">The Altius (Golf Facing)</option>
                      <option value="Ridges 41">Ridges 41 (Smart High-Rise)</option>
                      <option value="Master Township Tour">Entire 138-Acre Township</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-champagne py-4 px-8 rounded-full text-xs font-sans font-bold uppercase tracking-[0.16em] cursor-pointer shadow-md flex items-center justify-center gap-3 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Confirming VIP Reservation...</span>
                  ) : (
                    <>
                      <span>Confirm VIP Reservation & Get Pass</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-slate-500 font-sans">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  <span>Zero Spam Guarantee • Authorized Paranjape Sales Desk</span>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
