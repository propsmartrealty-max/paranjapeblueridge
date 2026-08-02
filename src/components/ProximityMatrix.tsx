'use client';

import React from 'react';
import { MapPin, Navigation, Building2, GraduationCap, Hospital, Train, Car, Footprints } from 'lucide-react';

interface Landmark {
  category: 'IT Park' | 'Transit' | 'Education' | 'Healthcare' | 'Shopping';
  name: string;
  distance: string;
  driveTime: string;
  walkTime?: string;
  icon: any;
}

export default function ProximityMatrix() {
  const landmarks: Landmark[] = [
    { category: 'IT Park', name: 'Infosys Phase 1 Campus', distance: '1.2 KM', driveTime: '3 Mins', walkTime: '10 Mins', icon: Building2 },
    { category: 'IT Park', name: 'Wipro Technologies Phase 1', distance: '1.5 KM', driveTime: '4 Mins', walkTime: '12 Mins', icon: Building2 },
    { category: 'IT Park', name: 'TCS (Tata Consultancy Services)', distance: '1.8 KM', driveTime: '5 Mins', walkTime: '15 Mins', icon: Building2 },
    { category: 'IT Park', name: 'Embassy Tech Zone Phase 2', distance: '2.5 KM', driveTime: '6 Mins', icon: Building2 },
    { category: 'IT Park', name: 'Quadron Business Park', distance: '2.8 KM', driveTime: '7 Mins', icon: Building2 },
    { category: 'Transit', name: 'Pune Metro Line 3 Station (Hinjewadi)', distance: '800 M', driveTime: '2 Mins', walkTime: '7 Mins', icon: Train },
    { category: 'Transit', name: 'Mumbai-Bangalore Highway (NH-48)', distance: '3.2 KM', driveTime: '8 Mins', icon: Navigation },
    { category: 'Education', name: 'Blue Ridge Public School (ICSE)', distance: 'Inside Campus', driveTime: '0 Mins', walkTime: '2 Mins', icon: GraduationCap },
    { category: 'Education', name: 'Mahindra International School', distance: '2.1 KM', driveTime: '5 Mins', icon: GraduationCap },
    { category: 'Healthcare', name: 'Ruby Hall Clinic Hinjewadi', distance: '1.5 KM', driveTime: '4 Mins', icon: Hospital },
    { category: 'Healthcare', name: 'Sanjeevani Hospital', distance: '2.0 KM', driveTime: '5 Mins', icon: Hospital },
  ];

  return (
    <div className="bg-navy-light/70 border border-gold/20 rounded-2xl p-6 md:p-8 backdrop-blur-xl my-10 text-text">
      <div className="flex items-center justify-between border-b border-gold/20 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gold/10 rounded-xl text-gold border border-gold/30">
            <MapPin size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-serif text-warm-white">Hyper-Local Proximity & Commute Matrix</h3>
            <p className="text-xs text-text-muted">Verified travel distances from Paranjape Blue Ridge, Hinjewadi Phase 1</p>
          </div>
        </div>
        <span className="hidden sm:inline text-xs bg-emerald-500/10 text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
          Walk-to-Work SEZ Inside
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {landmarks.map((lm, i) => {
          const IconComp = lm.icon;
          return (
            <div key={i} className="bg-navy/80 border border-gold/10 hover:border-gold/30 transition-all rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-gold">
                  <IconComp size={18} />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted">{lm.category}</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">{lm.distance}</span>
              </div>

              <h4 className="text-sm font-semibold text-warm-white line-clamp-1">{lm.name}</h4>

              <div className="flex items-center gap-4 text-xs text-text-muted border-t border-gold/10 pt-2">
                <span className="flex items-center gap-1">
                  <Car size={12} className="text-gold" />
                  {lm.driveTime}
                </span>
                {lm.walkTime && (
                  <span className="flex items-center gap-1">
                    <Footprints size={12} className="text-emerald-400" />
                    {lm.walkTime}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
