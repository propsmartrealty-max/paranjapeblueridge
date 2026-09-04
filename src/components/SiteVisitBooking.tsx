'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Video, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export default function SiteVisitBooking() {
  const [visitType, setVisitType] = useState<'in_person' | 'virtual'>('in_person');
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-05');
  const [selectedSlot, setSelectedSlot] = useState<string>('11:00 AM - 01:00 PM');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [booked, setBooked] = useState(false);

  const timeSlots = [
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    setIsSubmitting(true);
    try {
      const source = typeof window !== 'undefined' ? window.location.pathname : 'site_visit_booking';
      const utmData = typeof window !== 'undefined' ? localStorage.getItem('sovereign-utms') : null;
      const utms = utmData ? JSON.parse(utmData) : {};

      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        bhk: 'VIP Site Visit Booking',
        visitDate: selectedDate,
        visitTime: selectedSlot,
        intent: `${visitType === 'in_person' ? 'In-Person Visit' : 'Virtual Walkthrough'} on ${selectedDate} at ${selectedSlot}`,
        source: source,
        ...utms
      };

      try {
        const response = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error(`Edge API status: ${response.status}`);
        }
      } catch (apiErr) {
        console.warn("Edge API unavailable, activating direct FormSubmit dispatch to propsmartrealty@gmail.com:", apiErr);
        await fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: `💎 [Paranjape Blue Ridge] New Site Visit: ${formData.name} (${selectedDate})`,
            _template: 'table',
            _captcha: 'false',
            Project: 'Paranjape Blue Ridge, Hinjewadi Phase 1, Pune',
            Name: formData.name,
            Phone: formData.phone,
            Email: formData.email || 'Not Provided',
            Visit_Type: visitType === 'in_person' ? 'In-Person Tour' : 'Virtual 3D Walkthrough',
            Preferred_Date: selectedDate,
            Preferred_Slot: selectedSlot,
            Source: source,
          }),
        }).catch(err => console.error("Client fallback error:", err));
      }

    } catch (error) {
      console.error("Lead submission failed:", error);
    } finally {
      setIsSubmitting(false);
      setBooked(true);
    }
  };

  return (
    <div className="bg-navy-light/60 border border-gold/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-xl my-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold/20 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gold/10 rounded-xl border border-gold/30 text-gold">
            <Calendar size={22} />
          </div>
          <div>
            <h4 className="text-xl font-serif text-warm-white">Schedule Private Site Visit & 3D Walkthrough</h4>
            <p className="text-xs text-text-muted">Choose your preferred date and time slot for VIP access at Hinjewadi Phase 1</p>
          </div>
        </div>

        {/* Visit Type Toggle */}
        <div className="flex items-center gap-1.5 bg-navy/80 p-1.5 rounded-xl border border-gold/20">
          <button
            onClick={() => setVisitType('in_person')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              visitType === 'in_person' ? 'bg-gold text-navy font-bold' : 'text-text-muted hover:text-warm-white'
            }`}
          >
            <MapPin size={14} />
            In-Person Visit
          </button>
          <button
            onClick={() => setVisitType('virtual')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              visitType === 'virtual' ? 'bg-gold text-navy font-bold' : 'text-text-muted hover:text-warm-white'
            }`}
          >
            <Video size={14} />
            Live 3D Virtual Tour
          </button>
        </div>
      </div>

      {booked ? (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={32} />
          </div>
          <h4 className="text-2xl font-serif text-warm-white">Site Visit Confirmed!</h4>
          <p className="text-sm text-text-light max-w-md mx-auto">
            Your {visitType === 'in_person' ? 'In-Person Tour' : 'Virtual Walkthrough'} is scheduled for{' '}
            <strong className="text-gold">{selectedDate}</strong> at <strong className="text-gold">{selectedSlot}</strong>.
            Our relationship manager will contact you on {formData.phone}.
          </p>
        </div>
      ) : (
        <form onSubmit={handleBooking} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-text-muted block mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                min="2026-08-03"
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full bg-navy/80 border border-gold/20 rounded-xl p-3 text-warm-white focus:border-gold outline-none text-sm font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-text-muted block mb-2">Select Time Slot</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {timeSlots.map((slot, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-xl text-xs flex items-center justify-between border transition-all ${
                      selectedSlot === slot
                        ? 'bg-gold/10 border-gold text-gold font-bold'
                        : 'bg-navy/60 border-gold/10 text-text-muted hover:border-gold/30'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {slot}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-navy/80 border border-gold/20 rounded-xl p-3 text-warm-white focus:border-gold outline-none text-sm"
              />
              <input
                type="tel"
                required
                placeholder="10-Digit Mobile Number"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-navy/80 border border-gold/20 rounded-xl p-3 text-warm-white focus:border-gold outline-none text-sm"
              />
              <input
                type="email"
                placeholder="Email Address (Optional)"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-navy/80 border border-gold/20 rounded-xl p-3 text-warm-white focus:border-gold outline-none text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gold/50 text-navy/50 cursor-not-allowed' : 'bg-gold hover:bg-gold-light text-navy'}`}
            >
              {isSubmitting ? 'Confirming...' : 'Confirm Appointment Now'}
              {!isSubmitting && <ArrowRight size={16} />}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
