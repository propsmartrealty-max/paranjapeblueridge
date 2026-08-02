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
    <div className="bg-navy-light/60 border border-gold/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-xl my-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold/20 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gold/10 rounded-xl border border-gold/30 text-gold">
            <Trophy size={22} />
          </div>
          <div>
            <h4 className="text-xl font-serif text-warm-white flex items-center gap-2">
              Integrated Township Comparison Matrix
              <ShieldCheck size={18} className="text-gold" />
            </h4>
            <p className="text-xs text-text-muted">Side-by-side technical benchmark of West Pune mega-developments</p>
          </div>
        </div>

        {/* Competitor Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted font-semibold">Compare Vs:</span>
          <select
            value={selectedCompetitorId}
            onChange={e => setSelectedCompetitorId(e.target.value)}
            className="bg-navy/90 border border-gold/20 text-gold font-bold text-xs rounded-xl p-2.5 outline-none cursor-pointer"
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
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gold/20 text-warm-white font-serif">
              <th className="p-3 w-1/3 text-text-muted font-sans uppercase tracking-wider text-[10px]">Decision Factor</th>
              <th className="p-3 w-1/3 bg-gold/10 text-gold font-bold rounded-t-xl">
                🏆 {blueRidge.name}
              </th>
              <th className="p-3 w-1/3 text-text-light">
                {selectedCompetitor.name}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10 font-sans">
            <tr>
              <td className="p-3 font-semibold text-text-muted">Location & Hub</td>
              <td className="p-3 bg-gold/5 font-bold text-emerald-400">{blueRidge.location}</td>
              <td className="p-3 text-text-light">{selectedCompetitor.location}</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-text-muted">Township Scale</td>
              <td className="p-3 bg-gold/5 font-bold text-warm-white">{blueRidge.townshipSize}</td>
              <td className="p-3 text-text-light">{selectedCompetitor.townshipSize}</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-text-muted">Walk-to-Work IT SEZ Inside</td>
              <td className="p-3 bg-gold/5 font-bold text-emerald-400 flex items-center gap-1">
                <Check size={16} className="text-emerald-400" /> Yes (Infosys, TCS inside)
              </td>
              <td className="p-3 text-text-light flex items-center gap-1">
                {selectedCompetitor.sezInside ? <Check size={16} /> : <X size={16} className="text-red-400" />}
                {selectedCompetitor.sezInside ? 'Yes' : 'No (External Traffic)'}
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-text-muted">Private 9-Hole Golf Course</td>
              <td className="p-3 bg-gold/5 font-bold text-emerald-400 flex items-center gap-1">
                <Check size={16} className="text-emerald-400" /> Yes (Operational)
              </td>
              <td className="p-3 text-text-light flex items-center gap-1">
                {selectedCompetitor.golfCourse ? <Check size={16} /> : <X size={16} className="text-red-400" />}
                {selectedCompetitor.golfCourse ? 'Yes' : 'No'}
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-text-muted">Private Boat Club & Marina</td>
              <td className="p-3 bg-gold/5 font-bold text-emerald-400 flex items-center gap-1">
                <Check size={16} className="text-emerald-400" /> Yes (Mula Riverfront)
              </td>
              <td className="p-3 text-text-light flex items-center gap-1">
                {selectedCompetitor.boatClub ? <Check size={16} /> : <X size={16} className="text-red-400" />}
                {selectedCompetitor.boatClub ? 'Yes' : 'No'}
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-text-muted">ICSE School Inside Gates</td>
              <td className="p-3 bg-gold/5 font-bold text-emerald-400 flex items-center gap-1">
                <Check size={16} className="text-emerald-400" /> Yes (Blue Ridge Public)
              </td>
              <td className="p-3 text-text-light flex items-center gap-1">
                {selectedCompetitor.schoolInside ? <Check size={16} /> : <X size={16} className="text-red-400" />}
                {selectedCompetitor.schoolInside ? 'Yes' : 'No'}
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-text-muted">Metro Line 3 Distance</td>
              <td className="p-3 bg-gold/5 font-bold text-emerald-400">{blueRidge.metroDistance}</td>
              <td className="p-3 text-text-light">{selectedCompetitor.metroDistance}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
