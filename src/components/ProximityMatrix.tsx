'use client';

import React from 'react';
import { MapPin, Navigation, Building2, GraduationCap, Hospital, Train, Car, Footprints, Hotel, ShoppingBag, Waves, Flag } from 'lucide-react';

interface Landmark {
  category: 'IT Park' | 'Transit' | 'Education' | 'Healthcare' | 'Hotels' | 'Retail & Leisure';
  name: string;
  distance: string;
  driveTime: string;
  walkTime?: string;
  icon: any;
}

export default function ProximityMatrix() {
  const landmarks: Landmark[] = [
    { category: 'IT Park', name: 'Blue Ridge IT / ITES SEZ', distance: '0.0 KM', driveTime: '0 Mins', walkTime: '2 Mins', icon: Building2 },
    { category: 'IT Park', name: 'Infosys Phase 1 Campus', distance: '1.2 KM', driveTime: '3 Mins', walkTime: '10 Mins', icon: Building2 },
    { category: 'IT Park', name: 'Wipro Technologies Phase 1', distance: '1.5 KM', driveTime: '4 Mins', walkTime: '12 Mins', icon: Building2 },
    { category: 'IT Park', name: 'TCS (Tata Consultancy Services)', distance: '1.8 KM', driveTime: '5 Mins', walkTime: '15 Mins', icon: Building2 },
    { category: 'Transit', name: 'Pune Metro Line 3 Station', distance: '800 M', driveTime: '2 Mins', walkTime: '7 Mins', icon: Train },
    { category: 'Transit', name: 'Mumbai-Pune Expressway (NH-48)', distance: '3.2 KM', driveTime: '6 Mins', icon: Navigation },
    { category: 'Education', name: 'Blue Ridge Public School (ICSE)', distance: '0.6 KM', driveTime: '1 Min', walkTime: '3 Mins', icon: GraduationCap },
    { category: 'Education', name: 'Mercedes Benz International School', distance: '1.7 KM', driveTime: '4 Mins', icon: GraduationCap },
    { category: 'Healthcare', name: 'Ruby Hall Clinic Hinjawadi', distance: '3.1 KM', driveTime: '6 Mins', icon: Hospital },
    { category: 'Healthcare', name: 'Sanjeevani Hospital', distance: '3.9 KM', driveTime: '8 Mins', icon: Hospital },
    { category: 'Hotels', name: 'Hyatt Place Hinjawadi', distance: '2.1 KM', driveTime: '5 Mins', icon: Hotel },
    { category: 'Hotels', name: 'Vivanta Pune Hinjawadi', distance: '2.8 KM', driveTime: '6 Mins', icon: Hotel },
    { category: 'Retail & Leisure', name: 'Xion Mall & High Street', distance: '2.5 KM', driveTime: '5 Mins', icon: ShoppingBag },
    { category: 'Retail & Leisure', name: 'Blue Ridge 9-Hole Golf Course', distance: '0.5 KM', driveTime: '1 Min', walkTime: '4 Mins', icon: Flag },
    { category: 'Retail & Leisure', name: 'Blue Ridge Boat Club & Marina', distance: '0.0 KM', driveTime: '0 Mins', walkTime: '2 Mins', icon: Waves },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm my-10 text-[#070D1A]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 rounded-xl text-[#B88E3E] border border-amber-200">
            <MapPin size={22} />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-[#070D1A]">Official Commute & Proximity Matrix</h3>
            <p className="text-xs text-slate-500 font-sans">Verified travel distances from Paranjape Blue Ridge, Hinjewadi Phase 1</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs bg-amber-50 text-[#8F6A24] font-bold font-mono px-3.5 py-1.5 rounded-full border border-amber-200 self-start sm:self-auto">
          Walk-to-Work SEZ Inside
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {landmarks.map((lm, i) => {
          const IconComp = lm.icon;
          return (
            <div key={i} className="bg-slate-50/70 border border-slate-200 hover:border-[#B88E3E] transition-all rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-[#B88E3E]">
                  <IconComp size={16} />
                  <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-slate-500">{lm.category}</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#8F6A24] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80">{lm.distance}</span>
              </div>

              <h4 className="text-xs font-sans font-bold text-[#070D1A] line-clamp-1">{lm.name}</h4>

              <div className="flex items-center gap-4 text-xs font-sans text-slate-500 border-t border-slate-200/80 pt-2">
                <span className="flex items-center gap-1">
                  <Car size={13} className="text-[#B88E3E]" />
                  <span>{lm.driveTime}</span>
                </span>
                {lm.walkTime && (
                  <span className="flex items-center gap-1">
                    <Footprints size={13} className="text-emerald-600" />
                    <span className="text-emerald-700 font-medium">{lm.walkTime}</span>
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
