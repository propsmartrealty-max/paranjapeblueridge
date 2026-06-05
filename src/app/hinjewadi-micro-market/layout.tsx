import React from 'react';
import JSONLD from "@/components/JSONLD";

export default function MicroMarketLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JSONLD pathname="/hinjewadi-micro-market" />
      {children}
    </>
  );
}


