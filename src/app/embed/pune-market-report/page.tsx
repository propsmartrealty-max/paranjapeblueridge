export const runtime = 'edge';
import React from 'react';
import PuneMarketReport from '@/components/PuneMarketReport';

export const metadata = {
  title: 'Pune Real Estate Market Report Widget',
  description: 'Embeddable widget providing live insights into the Pune Real Estate Market.',
};

export default function PuneMarketReportEmbed() {
  return (
    <div className="w-full h-screen overflow-y-auto custom-scrollbar pb-10">
      {/* Remove the default top padding normally applied by Navbar */}
      <div className="-mt-20">
        <PuneMarketReport />
      </div>
    </div>
  );
}
