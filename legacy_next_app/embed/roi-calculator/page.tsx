export const runtime = 'edge';
import React from 'react';
import RoiCalculator from '@/components/RoiCalculator';

export const metadata = {
  title: 'Pune Real Estate ROI Calculator Widget',
  description: 'Embeddable widget providing live ROI calculations for Hinjewadi properties.',
};

export default function RoiCalculatorEmbed() {
  return (
    <div className="w-full h-screen overflow-y-auto custom-scrollbar pb-10 bg-navy p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <RoiCalculator title="Pune Tech Corridor" />
      </div>
    </div>
  );
}
