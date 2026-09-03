export interface CompletedProject {
  id: string;
  slug: string;
  name: string;
  location: string;
  category: 'Township' | 'Luxury Residences' | 'Commercial / Mixed-Use' | 'Senior Living';
  completionYear: string;
  configuration: string;
  totalAcresOrUnits: string;
  heroImage: string;
  legacyStory: string;
  architectureHighlights: string[];
  communityVibe: string;
  locationContext: string;
  legacyStatus: 'Completed & Delivered' | 'Operational Landmark';
  gallery: string[];
  relatedSearchKeywords: string[];
}

export const completedParanjapeProjects: CompletedProject[] = [
  {
    id: "blue-ridge-heritage",
    slug: "blue-ridge-residential-towers-1-24",
    name: "Blue Ridge Classic Towers (1 to 24)",
    location: "Hinjewadi Phase 1, Pune",
    category: "Township",
    completionYear: "Phase-wise 2012 – 2022",
    configuration: "1, 2, 3 & 4 BHK Apartments & Duplexes",
    totalAcresOrUnits: "138-Acre Township • 3,500+ Delivered Homes",
    heroImage: "/assets/images/real-township-day.jpg",
    legacyStory: "The foundation of modern integrated township living in Maharashtra. Conceptualized as Pune's first comprehensive walk-to-work IT township, the initial 24 residential towers of Blue Ridge revolutionized living standards for global technology leaders in Hinjewadi.",
    architectureHighlights: [
      "Pioneered riverfront high-rise residential engineering in West Pune",
      "Seamless integration with 9-hole golf course and river promenade",
      "Dedicated multi-tier clubhouse complexes and landscaped courtyards"
    ],
    communityVibe: "A thriving, multi-cultural global community of 3,500+ families representing top IT corporations, entrepreneurs, and academicians.",
    locationContext: "Positioned directly adjacent to Rajiv Gandhi Infotech Park Phase 1, adjacent to the upcoming Hinjewadi Metro Line 3.",
    legacyStatus: "Completed & Delivered",
    gallery: [
      "/assets/images/real-township-day.jpg",
      "/assets/images/township-day.jpg"
    ],
    relatedSearchKeywords: [
      "Blue Ridge Hinjewadi resale flats",
      "Blue Ridge Hinjewadi ready possession",
      "Paranjape Schemes Blue Ridge completed towers",
      "Flats in Hinjewadi Phase 1 near Infosys"
    ]
  },
  {
    id: "forest-trails",
    slug: "paranjape-forest-trails-bhugaon",
    name: "Forest Trails",
    location: "Bhugaon, Pune (Near Kothrud & Bavdhan)",
    category: "Township",
    completionYear: "2018 – Ongoing Extensions",
    configuration: "Bungalows, Luxury Villas & Nature Towers",
    totalAcresOrUnits: "170 Acres • Over 2,000 Delivered Residences",
    heroImage: "/assets/images/real-township-day.jpg",
    legacyStory: "Spread across 170 tranquil acres amidst the Western Ghats, Forest Trails is Paranjape's monumental nature township featuring an operational equestrian club, lifestyle lakes, and the Cliff ICSE school.",
    architectureHighlights: [
      "Environment-sensitive master planning preserving natural hill contours",
      "Pune's only integrated residential equestrian center and stables",
      "Terraced villas with panoramic valley and Sahyadri views"
    ],
    communityVibe: "An elite sanctuary for nature lovers, doctors, senior corporate executives, and artists seeking resort-like living minutes from Kothrud.",
    locationContext: "Bhugaon corridor, 10 minutes from Chandani Chowk and Kothrud.",
    legacyStatus: "Operational Landmark",
    gallery: [
      "/assets/images/real-township-day.jpg"
    ],
    relatedSearchKeywords: [
      "Forest Trails Bhugaon resale villas",
      "Paranjape Schemes townships in Pune",
      "Luxury bungalows near Kothrud Pune"
    ]
  }
];

export function getCompletedProjectBySlug(slug: string): CompletedProject | undefined {
  return completedParanjapeProjects.find(p => p.slug === slug || p.id === slug);
}
