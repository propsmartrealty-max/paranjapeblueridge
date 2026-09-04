export interface PseoUrl {
  slug: string;
  title: string;
  intent: string;
  type: string;
  silo: string;
  description?: string;
  heading?: string;
  location?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function optimizeTitleLength(title: string): string {
  if (title.length <= 68) return title;
  const parts = title.split(' | ');
  if (parts.length > 1) {
    const mainPart = parts[0];
    if (mainPart.length <= 68) return mainPart;
    return mainPart.slice(0, 65).trim() + '...';
  }
  return title.slice(0, 65).trim() + '...';
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HIGH-AUTHORITY CURATED PARANJAPE BLUE RIDGE HIGH-INTENT DATASET
// 100% Laser-Focused on Blue Ridge Township, Hinjewadi Phase 1, and West Pune
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const curatedPhrasesData: Array<{
  phrase: string;
  silo: string;
  type: string;
  description: string;
  location?: string;
}> = [
  // ─── 1. CORE BRAND & TOWNSHIP CLUSTERS ──────────────────────────────────────
  {
    phrase: "Paranjape Blue Ridge Hinjewadi Phase 1 Pune",
    silo: "branded",
    type: "Township Master",
    description: "Explore Paranjape Blue Ridge, Hinjewadi's iconic 138-acre integrated township in Phase 1 with 9-hole golf course, ICSE school, and luxury residences.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "Promenade Residences Paranjape Blue Ridge 3 and 4 BHK",
    silo: "clusters",
    type: "Promenade",
    description: "Official Promenade Residences at Blue Ridge Hinjewadi. Ultra-luxury 3 & 4 BHK riverfront apartments starting from ₹1.65 Cr. MahaRERA: P52100055581.",
    location: "Blue Ridge Promenade, Hinjewadi"
  },
  {
    phrase: "The Altius Riverside Paranjape Blue Ridge 3 and 4 BHK",
    silo: "clusters",
    type: "The Altius",
    description: "The Altius Riverside at Paranjape Blue Ridge Hinjewadi. 3 & 4 BHK luxury golf-facing residences from ₹1.55 Cr. MahaRERA: P52100078116.",
    location: "Blue Ridge Altius, Hinjewadi"
  },
  {
    phrase: "Ridges 41 Paranjape Blue Ridge 2 and 3 BHK Smart Homes",
    silo: "clusters",
    type: "Ridges 41",
    description: "Ridges 41 at Paranjape Blue Ridge Hinjewadi Phase 1. 41-storey monolithic MiVAN smart 2 & 3 BHK residences from ₹97.60 L. MahaRERA: P52100000054.",
    location: "Blue Ridge Ridges 41, Hinjewadi"
  },
  {
    phrase: "Paranjape Schemes Projects in Hinjewadi Pune",
    silo: "branded",
    type: "Developer Profile",
    description: "Discover all residential and township projects by Paranjape Schemes (Construction) Ltd in Hinjewadi Pune including Blue Ridge clusters.",
    location: "Hinjewadi, Pune"
  },
  {
    phrase: "Blue Ridge Hinjewadi Resale Flats and Inventory",
    silo: "transactions",
    type: "Resale",
    description: "Verified resale apartments and ready-to-move flats in Paranjape Blue Ridge Hinjewadi across Towers 1 to 26 and Orion.",
    location: "Blue Ridge Township, Hinjewadi"
  },
  {
    phrase: "Ready Possession Flats in Blue Ridge Hinjewadi",
    silo: "transactions",
    type: "Ready Possession",
    description: "Find ready possession 2 BHK, 3 BHK, and 4 BHK flats at Paranjape Blue Ridge Hinjewadi Phase 1 with OC and immediate fitout.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "Paranjape Blue Ridge Floor Plans and Layouts PDF",
    silo: "floor-plan",
    type: "Floor Plan",
    description: "Download official 2 BHK, 3 BHK, and 4 BHK architectural floor plans and carpet area layouts for Paranjape Blue Ridge.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "Paranjape Blue Ridge Price List and Cost Sheet 2026",
    silo: "price-list",
    type: "Price Sheet",
    description: "Complete all-inclusive price list, payment schedules, and stamp duty breakdown for Paranjape Blue Ridge Hinjewadi.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "Paranjape Blue Ridge Site Visit Booking and Sales Gallery",
    silo: "site-visit",
    type: "Site Visit",
    description: "Book an exclusive VIP site visit to Paranjape Blue Ridge Sales Gallery in Hinjewadi Phase 1. Sample flat tours available 7 days a week.",
    location: "Blue Ridge Sales Gallery, Hinjewadi"
  },

  // ─── 2. CONFIGURATION SEARCHES (2, 3, 4, 5 BHK) ────────────────────────────
  {
    phrase: "2 BHK Flats in Paranjape Blue Ridge Hinjewadi",
    silo: "clusters",
    type: "2 BHK",
    description: "Explore 2 BHK smart homes at Paranjape Blue Ridge Hinjewadi with carpet area 785 - 820 sq.ft. from ₹97.60 Lakhs.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "3 BHK Flats in Paranjape Blue Ridge Hinjewadi",
    silo: "clusters",
    type: "3 BHK",
    description: "Explore 3 BHK riverfront luxury apartments at Promenade Residences, Blue Ridge Hinjewadi with 1,316 sq.ft. carpet area.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "4 BHK Luxury Apartments in Blue Ridge Hinjewadi",
    silo: "clusters",
    type: "4 BHK",
    description: "Premium 4 BHK river and golf course facing residences at The Altius and Promenade, Paranjape Blue Ridge from ₹1.80 Cr.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "5 BHK Ultra Luxury Penthouses in Blue Ridge Hinjewadi",
    silo: "clusters",
    type: "5 BHK",
    description: "Exclusive 5 BHK penthouses and sky residences at The Altius Riverside, Paranjape Blue Ridge Hinjewadi with panoramic views.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "Duplex Apartments in Blue Ridge Hinjewadi",
    silo: "clusters",
    type: "Duplex",
    description: "Double-height luxury duplex residences at Paranjape Blue Ridge with private terraces and riverfront balconies.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "River Facing Flats in Hinjewadi Phase 1",
    silo: "amenities",
    type: "Riverfront",
    description: "Uninterrupted Mula river view 3 & 4 BHK residences at Paranjape Blue Ridge Promenade and The Altius Hinjewadi.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "Golf Course Facing Apartments in Pune West",
    silo: "amenities",
    type: "Golf Living",
    description: "Luxury apartments overlooking Pune's private 9-hole golf course inside the 138-acre Paranjape Blue Ridge township.",
    location: "Hinjewadi, Pune"
  },

  // ─── 3. TECH PARK & WALK-TO-WORK SEARCHES ──────────────────────────────────
  {
    phrase: "Flats near Infosys Hinjewadi Phase 1",
    silo: "corporate",
    type: "Walk-to-Work",
    description: "Walk-to-work residences located just 1.2 KM from Infosys Phase 1 campus at Paranjape Blue Ridge Hinjewadi.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "Flats near Wipro Technologies Hinjewadi",
    silo: "corporate",
    type: "Walk-to-Work",
    description: "Luxury 2, 3 & 4 BHK homes located minutes from Wipro Technologies circle at Paranjape Blue Ridge Hinjewadi.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "Flats near TCS Hinjewadi Rajiv Gandhi Infotech Park",
    silo: "corporate",
    type: "Walk-to-Work",
    description: "Walk-to-work residences near Tata Consultancy Services (TCS) Sahyadri Park Hinjewadi Phase 3 and Phase 1.",
    location: "Hinjewadi, Pune"
  },
  {
    phrase: "Flats near Cognizant and Tech Mahindra Hinjewadi",
    silo: "corporate",
    type: "Walk-to-Work",
    description: "Premium apartments near Cognizant and Tech Mahindra Hinjewadi at Paranjape Blue Ridge Integrated Township.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "Flats near Embassy TechZone Hinjewadi",
    silo: "corporate",
    type: "Walk-to-Work",
    description: "Convenient residential accommodation near Embassy TechZone Phase 2 Hinjewadi inside Paranjape Blue Ridge.",
    location: "Hinjewadi, Pune"
  },
  {
    phrase: "Flats near Qubix Business Park Hinjewadi Phase 1",
    silo: "corporate",
    type: "Walk-to-Work",
    description: "Homes near Qubix Business Park and Blue Ridge Special Economic Zone (SEZ) in Hinjewadi Phase 1.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "Walk to Work Flats in Rajiv Gandhi Infotech Park Pune",
    silo: "corporate",
    type: "Walk-to-Work",
    description: "True zero-commute walk-to-work lifestyle for 400,000+ IT professionals at Paranjape Blue Ridge Hinjewadi.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "Corporate Rentals in Blue Ridge Hinjewadi Phase 1",
    silo: "investor",
    type: "Corporate Rental",
    description: "High-demand corporate executive rentals and fully furnished apartments in Paranjape Blue Ridge Hinjewadi.",
    location: "Hinjewadi Phase 1, Pune"
  },

  // ─── 4. INFRASTRUCTURE & TRANSIT CATALYSTS ─────────────────────────────────
  {
    phrase: "Hinjewadi Metro Line 3 Connectivity to Blue Ridge",
    silo: "infrastructure",
    type: "Transit",
    description: "How Pune Metro Line 3 connects Paranjape Blue Ridge to Balewadi, Baner, and Shivajinagar. Station 800m from gate.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "Flats near Hinjewadi Phase 1 Metro Station",
    silo: "infrastructure",
    type: "Transit",
    description: "Invest in metro-connected 2, 3 & 4 BHK residences within 800m of upcoming Hinjewadi Metro Station at Blue Ridge.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "Mahalunge Hinjewadi Bridge Impact on Blue Ridge",
    silo: "infrastructure",
    type: "Corridor",
    description: "Direct bridge connectivity from Mahalunge & Balewadi High Street to Paranjape Blue Ridge Hinjewadi Phase 1.",
    location: "Hinjewadi - Mahalunge"
  },
  {
    phrase: "Mumbai Pune Expressway Access from Hinjewadi Phase 1",
    silo: "infrastructure",
    type: "Expressway",
    description: "Quick 10-minute access to Mumbai-Pune Expressway from Paranjape Blue Ridge via Wakad and Dehu Road bypass.",
    location: "Hinjewadi, Pune"
  },
  {
    phrase: "Mula River Rejuvenation and Promenade at Blue Ridge",
    silo: "infrastructure",
    type: "Eco Riverfront",
    description: "The environmental impact of Mula riverfront development and private marina boat club at Paranjape Blue Ridge.",
    location: "Hinjewadi Phase 1, Pune"
  },

  // ─── 5. TOWNSHIP LIFESTYLE & AMENITIES ─────────────────────────────────────
  {
    phrase: "Blue Ridge Public School ICSE Hinjewadi Admissions",
    silo: "amenities",
    type: "Education",
    description: "ICSE affiliated Blue Ridge Public School inside the 138-acre township campus. Admissions, infrastructure, and faculty.",
    location: "Blue Ridge Township, Hinjewadi"
  },
  {
    phrase: "9 Hole Professional Golf Course Blue Ridge Pune",
    silo: "amenities",
    type: "Golf Living",
    description: "Pune's premier 9-hole golf course located directly inside Paranjape Blue Ridge with professional academy and clubhouse.",
    location: "Blue Ridge Golf Course, Hinjewadi"
  },
  {
    phrase: "Private Boat Club and Marina at Paranjape Blue Ridge",
    silo: "amenities",
    type: "Boat Club",
    description: "Enjoy kayaking, boating, and waterfront leisure at Blue Ridge Boat Club situated on the banks of Mula River.",
    location: "Blue Ridge Boat Club, Hinjewadi"
  },
  {
    phrase: "Sports Arena and Clubhouses at Blue Ridge Hinjewadi",
    silo: "amenities",
    type: "Sports Infrastructure",
    description: "Olympic-sized swimming pools, tennis courts, squash courts, cricket grounds, and wellness spas at Blue Ridge.",
    location: "Blue Ridge Township, Hinjewadi"
  },
  {
    phrase: "Gated Community Security System at Blue Ridge Hinjewadi",
    silo: "amenities",
    type: "Township Security",
    description: "Multi-tiered 24x7 security, biometric access, CCTV surveillance, and dedicated township maintenance management.",
    location: "Blue Ridge Township, Hinjewadi"
  },
  {
    phrase: "Pet Friendly Apartments in Hinjewadi Pune",
    silo: "amenities",
    type: "Pet Friendly",
    description: "Open green trails, dedicated pet parks, and pet-friendly residential community at Paranjape Blue Ridge.",
    location: "Hinjewadi Phase 1, Pune"
  },

  // ─── 6. INVESTOR INTELLIGENCE & NRI DESK ───────────────────────────────────
  {
    phrase: "Rental Yield in Hinjewadi Phase 1 Real Estate",
    silo: "investor",
    type: "Rental Yield",
    description: "Detailed analysis of 4.8% to 5.2% gross rental yields at Paranjape Blue Ridge driven by IT park corporate rentals.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "Capital Appreciation Trends in Hinjewadi Phase 1",
    silo: "investor",
    type: "Capital Growth",
    description: "Historical 12.8% YoY property appreciation data and future projections for Paranjape Blue Ridge towers.",
    location: "Hinjewadi Phase 1, Pune"
  },
  {
    phrase: "NRI Real Estate Investment in Pune Hinjewadi",
    silo: "investor",
    type: "NRI Desk",
    description: "Complete guide for NRIs investing in Paranjape Blue Ridge: FEMA compliance, NRE/NRO accounts, and POA assistance.",
    location: "Global NRI Desk"
  },
  {
    phrase: "Buy Property in Pune from Dubai UAE NRI Desk",
    silo: "investor",
    type: "UAE NRI Desk",
    description: "Dedicated NRI desk for UAE & Gulf buyers investing in Paranjape Blue Ridge with direct currency conversion and virtual tours.",
    location: "Dubai - Pune Corridor"
  },
  {
    phrase: "Buy Property in Pune from USA and Canada NRI Desk",
    silo: "investor",
    type: "USA NRI Desk",
    description: "End-to-end legal, tax, and repatriation concierge for US and Canada based NRIs investing in Blue Ridge Hinjewadi.",
    location: "USA - Pune Corridor"
  },

  // ─── 7. COMPETITOR BATTLEGROUND COMPARISONS ────────────────────────────────
  {
    phrase: "Blue Ridge vs Life Republic Township Comparison",
    silo: "battleground",
    type: "Comparison",
    description: "In-depth comparison: Paranjape Blue Ridge Phase 1 vs Kolte Patil Life Republic Hinjewadi. Location, amenities, and connectivity.",
    location: "Hinjewadi Phase 1 vs Marunji"
  },
  {
    phrase: "Blue Ridge vs Megapolis Hinjewadi Phase 3",
    silo: "battleground",
    type: "Comparison",
    description: "Detailed comparison: Paranjape Blue Ridge Phase 1 vs Megapolis Phase 3. Rental yields, commute times, and resale values.",
    location: "Hinjewadi Phase 1 vs Phase 3"
  },
  {
    phrase: "Blue Ridge vs Godrej Hinjewadi Comparison",
    silo: "battleground",
    type: "Comparison",
    description: "Compare Paranjape Blue Ridge 138-acre ready ecosystem with Godrej residential developments in Hinjewadi Pune.",
    location: "Hinjewadi Phase 1"
  },
  {
    phrase: "Blue Ridge vs VTP Blue Waters Mahalunge",
    silo: "battleground",
    type: "Comparison",
    description: "Compare Paranjape Blue Ridge with VTP Blue Waters Mahalunge. Possession timelines, school inside campus, and golf course.",
    location: "Hinjewadi vs Mahalunge"
  },
  {
    phrase: "Best Integrated Township in Hinjewadi Pune",
    silo: "battleground",
    type: "Township Ranking",
    description: "Why Paranjape Blue Ridge is ranked as Pune's #1 integrated township for walk-to-work lifestyle and infrastructure.",
    location: "Hinjewadi Phase 1, Pune"
  },

  // ─── 8. WEST PUNE CORRIDOR CONNECTIVITY ────────────────────────────────────
  {
    phrase: "Flats near Baner and Balewadi High Street Pune",
    silo: "pune-dominance",
    type: "Corridor",
    description: "Just 10 minutes from Baner and Balewadi High Street: luxury living at Paranjape Blue Ridge Hinjewadi Phase 1.",
    location: "Baner - Balewadi Corridor"
  },
  {
    phrase: "Flats in Wakad near Hinjewadi Flyover",
    silo: "pune-dominance",
    type: "Corridor",
    description: "Experience superior integrated township amenities at Paranjape Blue Ridge just 5 minutes from Wakad bridge.",
    location: "Wakad - Hinjewadi"
  },
  {
    phrase: "Flats in Mahalunge near Godrej and VTP",
    silo: "pune-dominance",
    type: "Corridor",
    description: "Connected to Mahalunge via the new bridge: luxury 2, 3 & 4 BHK apartments at Paranjape Blue Ridge.",
    location: "Mahalunge - Hinjewadi"
  },
  {
    phrase: "Flats near Maan Road Hinjewadi",
    silo: "pune-dominance",
    type: "Corridor",
    description: "Residential properties on Maan Road with direct access to Rajiv Gandhi Infotech Park at Paranjape Blue Ridge.",
    location: "Maan Road, Hinjewadi"
  },
  {
    phrase: "MiVAN Construction Projects in Hinjewadi Phase 1",
    silo: "features",
    type: "Engineering",
    description: "Monolithic MiVAN RCC construction technology ensuring seismic resistance and smooth finishes at Paranjape Blue Ridge.",
    location: "Hinjewadi Phase 1, Pune"
  }
];

// Precompute sanitized, validated PSEO URLs
export const curatedPseoUrls: PseoUrl[] = curatedPhrasesData.map(item => {
  const slug = `${slugify(item.phrase)}-paranjape-schemes-blue-ridge-hinjewadi`;
  const rawTitle = `${item.phrase} | Paranjape Blue Ridge`;
  const title = optimizeTitleLength(rawTitle);
  const intent = `${item.phrase} — Official Insights & Inventory at Paranjape Blue Ridge Hinjewadi`;

  return {
    slug,
    title,
    intent,
    type: item.type,
    silo: item.silo,
    description: item.description,
    heading: item.phrase,
    location: item.location || 'Hinjewadi Phase 1, Pune'
  };
});

export function getPseoTotalCount(): number {
  return curatedPseoUrls.length;
}

export function generatePseoUrls(): PseoUrl[] {
  return curatedPseoUrls;
}

export function getPseoBySlug(slug: string): PseoUrl | undefined {
  return curatedPseoUrls.find(u => u.slug === slug);
}

export function getCuratedPseoLinks(count: number = 60): PseoUrl[] {
  return curatedPseoUrls.slice(0, count);
}

export function getPopularSearchSections() {
  return [
    { title: 'Tech Hub Proximity', links: curatedPseoUrls.filter(u => u.silo === 'corporate').slice(0, 8) },
    { title: 'Investor Intelligence', links: curatedPseoUrls.filter(u => u.silo === 'investor').slice(0, 8) },
    { title: 'Project Comparisons', links: curatedPseoUrls.filter(u => u.silo === 'battleground').slice(0, 8) },
    { title: 'Infra & Guides', links: curatedPseoUrls.filter(u => u.silo === 'infrastructure').slice(0, 8) },
    { title: 'Amenity & Lifestyle', links: curatedPseoUrls.filter(u => u.silo === 'amenities').slice(0, 8) },
    { title: 'Paranjape Schemes', links: curatedPseoUrls.filter(u => u.silo === 'branded' || u.silo === 'clusters').slice(0, 8) },
  ];
}

export function getRelatedPseoLinks(currentSlug: string, silo: string, count: number = 6): PseoUrl[] {
  const sameSilo = curatedPseoUrls.filter(u => u.silo === silo && u.slug !== currentSlug);
  const others = curatedPseoUrls.filter(u => u.silo !== silo && u.slug !== currentSlug);
  return [...sameSilo, ...others].slice(0, count);
}

export function getRegionPseoLinks(region: string, count: number = 100): PseoUrl[] {
  return curatedPseoUrls.filter(u => u.slug.includes(region) || u.title.toLowerCase().includes(region.replace(/-/g, ' '))).slice(0, count);
}

export function generatePseoChunk(chunkIndex: number, chunkSize: number = 1000): PseoUrl[] {
  const start = chunkIndex * chunkSize;
  const end = start + chunkSize;
  return curatedPseoUrls.slice(start, end);
}

export const longTailUrls: PseoUrl[] = curatedPseoUrls;
