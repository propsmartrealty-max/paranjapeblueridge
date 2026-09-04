'use client';

import React, { useState } from 'react';
import { Check, X, Trophy, ShieldCheck, Zap } from 'lucide-react';

interface Competitor {
  id: string;
  name: string;
  location: string;
  townshipSize: string;
  sezInside: boolean;
  golfCourse: boolean;
  boatClub: boolean;
  schoolInside: boolean;
  metroDistance: string;
  constructionTech: string;
}

const COMPETITORS: Competitor[] = [
  {
    id: 'blue-ridge',
    name: 'Paranjape Blue Ridge',
    location: 'Hinjewadi Phase 1',
    townshipSize: '138 Acres (Mega Township)',
    sezInside: true,
    golfCourse: true,
    boatClub: true,
    schoolInside: true,
    metroDistance: '800 Meters (7 Min Walk)',
    constructionTech: 'Advanced MiVAN Monolithic'
  },
  {
    id: 'vtp-blue-waters',
    name: 'VTP Blue Waters',
    location: 'Mahalunge-Hinjewadi',
    townshipSize: '100+ Acres',
    sezInside: false,
    golfCourse: false,
    boatClub: false,
    schoolInside: false,
    metroDistance: '3.5 KM',
    constructionTech: 'Standard Aluminium Formwork'
  },
  {
    id: 'life-republic',
    name: 'Life Republic (Kolte Patil)',
    location: 'Marunji-Hinjewadi',
    townshipSize: '400 Acres',
    sezInside: false,
    golfCourse: false,
    boatClub: false,
    schoolInside: true,
    metroDistance: '4.2 KM',
    constructionTech: 'Conventional / RCC'
  },
  {
    id: 'megapolis',
    name: 'Megapolis Hinjewadi',
    location: 'Hinjewadi Phase 3',
    townshipSize: '150 Acres',
    sezInside: false,
    golfCourse: false,
    boatClub: false,
    schoolInside: true,
    metroDistance: '6.0 KM',
    constructionTech: 'Pre-cast / RCC'
  }
];

export default function CompetitorComparison() {
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string>('vtp-blue-waters');
  const blueRidge = COMPETITORS[0];
  const selectedCompetitor = COMPETITORS.find(c => c.id === selectedCompetitorId) || COMPETITORS[1];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm my-8 text-[#070D1A]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[#B88E3E]">
            <Trophy size={22} />
          </div>
          <div>
            <h4 className="text-xl font-serif text-[#070D1A] font-bold flex items-center gap-2">
              Integrated Township Comparison Matrix
              <ShieldCheck size={18} className="text-[#B88E3E]" />
            </h4>
            <p className="text-xs text-slate-500 font-sans">Side-by-side technical benchmark of West Pune mega-developments</p>
          </div>
        </div>

        {/* Competitor Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold font-sans">Compare Vs:</span>
          <select
            value={selectedCompetitorId}
            onChange={e => setSelectedCompetitorId(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-[#070D1A] font-bold text-xs rounded-xl p-2.5 outline-none cursor-pointer hover:border-[#B88E3E]"
          >
            {COMPETITORS.slice(1).map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.location})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse font-sans">
          <thead>
            <tr className="border-b border-slate-200 text-[#070D1A] font-serif">
              <th className="p-3 w-1/3 text-slate-500 font-sans uppercase tracking-wider text-[10px]">Decision Factor</th>
              <th className="p-3 w-1/3 bg-amber-50 text-[#8F6A24] font-bold rounded-t-xl border-x border-amber-200">
                🏆 {blueRidge.name}
              </th>
              <th className="p-3 w-1/3 text-slate-700 font-semibold">
                {selectedCompetitor.name}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            <tr>
              <td className="p-3 font-semibold text-slate-500">Location & Hub</td>
              <td className="p-3 bg-amber-50/40 font-bold text-emerald-700 border-x border-amber-200/50">{blueRidge.location}</td>
              <td className="p-3 text-slate-700">{selectedCompetitor.location}</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-500">Township Scale</td>
              <td className="p-3 bg-amber-50/40 font-bold text-[#070D1A] border-x border-amber-200/50">{blueRidge.townshipSize}</td>
              <td className="p-3 text-slate-700">{selectedCompetitor.townshipSize}</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-500">Walk-to-Work IT SEZ Inside</td>
              <td className="p-3 bg-amber-50/40 font-bold text-emerald-700 flex items-center gap-1 border-x border-amber-200/50">
                <Check size={16} className="text-emerald-600 shrink-0" /> Yes (Cognizant, Accenture, LTTS in SEZ)
              </td>
              <td className="p-3 text-slate-700">
                <div className="flex items-center gap-1">
                  {selectedCompetitor.sezInside ? <Check size={16} className="text-emerald-600 shrink-0" /> : <X size={16} className="text-red-500 shrink-0" />}
                  <span>{selectedCompetitor.sezInside ? 'Yes' : 'No (External Commute)'}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-500">Private 9-Hole Golf Course</td>
              <td className="p-3 bg-amber-50/40 font-bold text-emerald-700 border-x border-amber-200/50">
                <div className="flex items-center gap-1">
                  <Check size={16} className="text-emerald-600 shrink-0" /> Yes (Fully Operational)
                </div>
              </td>
              <td className="p-3 text-slate-700">
                <div className="flex items-center gap-1">
                  {selectedCompetitor.golfCourse ? <Check size={16} className="text-emerald-600 shrink-0" /> : <X size={16} className="text-red-500 shrink-0" />}
                  <span>{selectedCompetitor.golfCourse ? 'Yes' : 'No'}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-500">Private Boat Club & Marina</td>
              <td className="p-3 bg-amber-50/40 font-bold text-emerald-700 border-x border-amber-200/50">
                <div className="flex items-center gap-1">
                  <Check size={16} className="text-emerald-600 shrink-0" /> Yes (Mula Riverfront Marina)
                </div>
              </td>
              <td className="p-3 text-slate-700">
                <div className="flex items-center gap-1">
                  {selectedCompetitor.boatClub ? <Check size={16} className="text-emerald-600 shrink-0" /> : <X size={16} className="text-red-500 shrink-0" />}
                  <span>{selectedCompetitor.boatClub ? 'Yes' : 'No'}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-500">ICSE School Inside Gates</td>
              <td className="p-3 bg-amber-50/40 font-bold text-emerald-700 border-x border-amber-200/50">
                <div className="flex items-center gap-1">
                  <Check size={16} className="text-emerald-600 shrink-0" /> Yes (Blue Ridge Public School)
                </div>
              </td>
              <td className="p-3 text-slate-700">
                <div className="flex items-center gap-1">
                  {selectedCompetitor.schoolInside ? <Check size={16} className="text-emerald-600 shrink-0" /> : <X size={16} className="text-red-500 shrink-0" />}
                  <span>{selectedCompetitor.schoolInside ? 'Yes' : 'No'}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-500">Metro Line 3 Distance</td>
              <td className="p-3 bg-amber-50/40 font-bold text-emerald-700 border-x border-amber-200/50">{blueRidge.metroDistance}</td>
              <td className="p-3 text-slate-700">{selectedCompetitor.metroDistance}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
