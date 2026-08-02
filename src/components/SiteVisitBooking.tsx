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

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setBooked(true);
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
              className="w-full py-4 bg-gold hover:bg-gold-light text-navy font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Confirm Appointment Now
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
