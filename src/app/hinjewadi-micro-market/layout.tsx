import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hinjewadi Phase 1 Micro-Market Guide | Investment & Connectivity Analysis",
  description: "Deep dive into Hinjewadi Phase 1 real estate. Analysis of capital appreciation, IT workforce depth, and the impact of Pune Metro Line 3 on property values.",
  alternates: {
    canonical: 'https://www.paranjapeblueridge.com/hinjewadi-micro-market',
  },
};

export default function MicroMarketLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
