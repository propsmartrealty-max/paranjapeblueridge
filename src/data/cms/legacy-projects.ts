export interface CompletedProject {
  id: string;
  slug: string;
  name: string;
  location: string;
  category: 'Township' | 'Luxury Residences' | 'Commercial / Mixed-Use' | 'Senior Living' | 'Inclusive Housing';
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
    name: "Paranjape Blue Ridge Classic Towers (1 to 24)",
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
      "Paranjape Blue Ridge Hinjewadi resale flats",
      "Paranjape Blue Ridge Hinjewadi ready possession",
      "Paranjape Schemes Blue Ridge completed towers",
      "Flats in Hinjewadi Phase 1 near Infosys"
    ]
  },
  {
    id: "forest-trails",
    slug: "paranjape-forest-trails-bhugaon",
    name: "Paranjape Forest Trails",
    location: "Bhugaon, Pune (Near Kothrud & Bavdhan)",
    category: "Township",
    completionYear: "2018 – Ongoing Extensions",
    configuration: "Bungalows, Luxury Villas & Nature Towers",
    totalAcresOrUnits: "170 Acres • Over 2,000 Delivered Residences",
    heroImage: "/assets/images/real-township-day.jpg",
    legacyStory: "Spread across 170 tranquil acres amidst the Western Ghats, Forest Trails is Paranjape Schemes' monumental nature township featuring an operational equestrian club, lifestyle lakes, and the Cliff ICSE school.",
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
  },
  {
    id: "athashri-pune",
    slug: "paranjape-athashri-senior-living",
    name: "Paranjape Athashri Senior Living",
    location: "Bavdhan, Baner, Hinjewadi & Hadapsar, Pune",
    category: "Senior Living",
    completionYear: "Multiple Phases • 2003 to Present",
    configuration: "1 & 2 BHK Senior-Friendly Residences",
    totalAcresOrUnits: "10+ Campuses • Over 3,000 Happy Senior Residents",
    heroImage: "/assets/images/real-township-day.jpg",
    legacyStory: "India's pioneer in senior citizen housing. Created with empathy, dignity, and specialized geriatric healthcare support, Athashri gives senior citizens an active, engaged, and secure post-retirement community.",
    architectureHighlights: [
      "Zero-barrier architecture with wheelchair accessibility throughout",
      "Emergency response switches and grab rails in all bathrooms",
      "On-campus geriatric nursing, doctor on-call, and diet-specific dining"
    ],
    communityVibe: "A loving, intellectually stimulating haven where senior citizens celebrate life festivals, cultural events, and lifelong friendships.",
    locationContext: "Multiple prime hubs across Pune West and East.",
    legacyStatus: "Operational Landmark",
    gallery: [
      "/assets/images/real-township-day.jpg"
    ],
    relatedSearchKeywords: [
      "Paranjape Athashri senior living Pune",
      "Senior citizen homes in Hinjewadi and Baner",
      "Paranjape Schemes retirement communities"
    ]
  },
  {
    id: "trident-towers",
    slug: "paranjape-trident-towers-wakad",
    name: "Paranjape Trident Towers",
    location: "Wakad, Pune (Adjacent to Hinjewadi Flyover)",
    category: "Luxury Residences",
    completionYear: "2023",
    configuration: "2 & 3 BHK Contemporary High-Rise Flats",
    totalAcresOrUnits: "4 Towers • 450+ Luxury Residences",
    heroImage: "/assets/images/real-township-day.jpg",
    legacyStory: "A towering architectural statement in Wakad, Trident Towers bridges the vibrant commercial energy of Hinjewadi Phase 1 with the urban lifestyle of Baner and Balewadi High Street.",
    architectureHighlights: [
      "Striking triple-tower geometric facade with expansive deck balconies",
      "Rooftop infinity edge sky amenities and fitness pavilions",
      "Podium level children's recreational park and banquet hall"
    ],
    communityVibe: "Fast-paced, vibrant executive community popular with leadership teams from Hinjewadi Phase 1 & 2.",
    locationContext: "Prime Wakad junction, 3 minutes from Blue Ridge Hinjewadi.",
    legacyStatus: "Completed & Delivered",
    gallery: [
      "/assets/images/real-township-day.jpg"
    ],
    relatedSearchKeywords: [
      "Paranjape Trident Towers Wakad",
      "Flats in Wakad near Hinjewadi flyover",
      "Paranjape Schemes projects in Wakad"
    ]
  },
  {
    id: "highgardens",
    slug: "paranjape-highgardens-hinjewadi",
    name: "Paranjape Highgardens",
    location: "Hinjewadi Phase 1, Pune",
    category: "Luxury Residences",
    completionYear: "2024",
    configuration: "1 & 2 BHK Smart Boutique Homes",
    totalAcresOrUnits: "High-Rise Tower • 350+ Residences",
    heroImage: "/assets/images/real-township-day.jpg",
    legacyStory: "Engineered specifically for ambitious young tech innovators and IT couples working in Rajiv Gandhi Infotech Park. Smart ergonomic layouts packed with resort amenities.",
    architectureHighlights: [
      "Compact luxury spaces with zero wasted square footage",
      "High-speed digital co-working lounges and sky deck cafes",
      "Pedestrian proximity to Wipro and Infosys Phase 1 campuses"
    ],
    communityVibe: "Dynamic young professionals, startup engineers, and corporate consultants.",
    locationContext: "Hinjewadi Phase 1 IT corridor.",
    legacyStatus: "Completed & Delivered",
    gallery: [
      "/assets/images/real-township-day.jpg"
    ],
    relatedSearchKeywords: [
      "Paranjape Highgardens Hinjewadi Phase 1",
      "1 BHK 2 BHK flats in Hinjewadi Phase 1",
      "Paranjape Schemes compact homes"
    ]
  },
  {
    id: "swaniketan",
    slug: "paranjape-swaniketan-pune",
    name: "Paranjape Swaniketan",
    location: "Bhugaon, Pune",
    category: "Inclusive Housing",
    completionYear: "2022",
    configuration: "Special Needs Supported Living Homes",
    totalAcresOrUnits: "Dedicated Community Campus",
    heroImage: "/assets/images/real-township-day.jpg",
    legacyStory: "A humanitarian milestone in Indian real estate. India's first residential community tailored for adults with intellectual disabilities, providing lifelong assisted living, therapy, and creative empowerment.",
    architectureHighlights: [
      "Sensory-friendly architectural acoustics and natural lighting",
      "Vocational workshops, speech therapy centers, and sensory gardens",
      "24/7 dedicated medical caretakers and psychological counseling"
    ],
    communityVibe: "A compassionate, deeply supportive environment giving parents peace of mind about their children's dignified future.",
    locationContext: "Set within the serene greens of Forest Trails Bhugaon.",
    legacyStatus: "Operational Landmark",
    gallery: [
      "/assets/images/real-township-day.jpg"
    ],
    relatedSearchKeywords: [
      "Paranjape Swaniketan special needs Pune",
      "Inclusive housing projects Paranjape Schemes",
      "Assisted living communities in Pune"
    ]
  }
];

export function getCompletedProjectBySlug(slug: string): CompletedProject | undefined {
  return completedParanjapeProjects.find(p => p.slug === slug || p.id === slug);
}
