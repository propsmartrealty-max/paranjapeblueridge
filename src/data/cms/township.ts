export interface TownshipPillar {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  description: string;
  iconName: string;
  image: string;
  highlights: string[];
}

export interface BlueRidgeSezDetails {
  name: string;
  designation: string;
  totalSpace: string;
  workforceCount: string;
  certification: string;
  occupancyStatus: string;
  overview: string;
  tenants: string[];
  keyAdvantages: { title: string; desc: string }[];
  impactOnResidents: string;
}

export const blueRidgeSezData: BlueRidgeSezDetails = {
  name: "Blue Ridge Special Economic Zone (SEZ)",
  designation: "Multi-Client IT / ITES Special Economic Zone",
  totalSpace: "3+ Million Sq. Ft. Grade-A Tech Workspace",
  workforceCount: "35,000+ IT Professionals Working On-Campus",
  certification: "LEED Gold Certified Sustainable Green Buildings",
  occupancyStatus: "Fully Operational Global Enterprise Hub",
  overview: "An integral cornerstone of the 138-acre masterplan, the Blue Ridge IT/ITES SEZ integrates world-class commercial infrastructure directly alongside premium residential enclaves. Designed to international commercial standards, it enables a true 0-minute commute and powers unmatched residential rental yields in West Pune.",
  tenants: [
    "Cognizant Technology Solutions",
    "Accenture Solutions",
    "L&T Technology Services (LTTS)",
    "Persistent Systems",
    "Cisco Systems Ecosystem",
    "Tata Technologies Partners",
    "Global IT & Engineering Consultancies"
  ],
  keyAdvantages: [
    {
      title: "Zero-Minute Commute ('Walk to Work')",
      desc: "Residents literally walk 2 to 5 minutes through landscaped avenues to reach world-class offices, eliminating vehicular traffic stress completely."
    },
    {
      title: "Guaranteed High Rental Demand & Yields",
      desc: "With 35,000+ senior engineers, project managers, and directors working inside the township SEZ, rental occupancy stays consistently above 98% with 4.8% - 5.6% yields."
    },
    {
      title: "LEED Gold Certified Smart Infrastructure",
      desc: "Intelligent building management systems (IBMS), 100% treated water recycling, energy-efficient HVAC, and multi-tier perimeter biometric security."
    },
    {
      title: "Complete Campus Amenities",
      desc: "Dedicated food courts, international cafes, multi-level car parking, executive fitness clubs, on-site banking, and ATM facilities."
    }
  ],
  impactOnResidents: "The SEZ transforms Blue Ridge from a mere residential enclave into a self-sustaining, recession-resistant micro-economy where work, family, education, and leisure converge without stepping foot outside the gates."
};

export const townshipMasterData = {
  name: "Paranjape Blue Ridge",
  location: "Hinjewadi Phase 1, Rajiv Gandhi Infotech Park, Pune 411057",
  tagline: "A City Within. A World Apart.",
  scale: "138 Masterplanned Acres",
  totalFamilies: "3,500+ Families Residing",
  natureRatio: "Over 60% Open Greens, Fairways & Water Bodies",
  riverFrontage: "Over 1.5 km of Scenic Mula River Promenade",
  developer: "Paranjape Schemes (Construction) Ltd.",
  pillars: [
    {
      id: "sez",
      title: "Blue Ridge IT / ITES SEZ",
      subtitle: "3M+ Sq. Ft. Integrated Grade-A IT Park",
      metric: "35,000+",
      metricLabel: "Daily Tech Workforce",
      description: "An operational Special Economic Zone inside the township hosting Fortune 500 tech leaders including Cognizant, Accenture, and LTTS, delivering a genuine walk-to-work lifestyle.",
      iconName: "Building2",
      image: "/assets/images/real-township-day.jpg",
      highlights: [
        "Home to global technology MNCs and 35,000+ IT professionals",
        "0-minute pedestrian commute from Blue Ridge residential clusters",
        "Drives premium rental yield of 4.8% to 5.6% year-round"
      ]
    },
    {
      id: "golf",
      title: "9-Hole Executive Golf Course",
      subtitle: "Championship Greens in Your Backyard",
      metric: "9-Hole",
      metricLabel: "Executive Layout",
      description: "Pune's only integrated township with an operational 9-hole executive golf course, professional putting green, and dedicated driving bays designed to international standards.",
      iconName: "Trees",
      image: "/assets/images/real-township-day.jpg",
      highlights: [
        "Professional coaching academy with certified PGA instructors",
        "Fully equipped clubhouse with pro shop and golf lounge",
        "Fairway-facing outdoor dining terrace overlooking lush greens"
      ]
    },
    {
      id: "marina",
      title: "Private Marina & Boat Club",
      subtitle: "Unrivaled Riverfront Leisure on Mula River",
      metric: "1.5 km",
      metricLabel: "Active River Promenade",
      description: "Exclusive nautical access with private boat docking slips, paddle boating, kayaking, and sunset riverside boardwalk pavilions.",
      iconName: "Waves",
      image: "/assets/images/real-township-day.jpg",
      highlights: [
        "Operational kayak and rowing fleet for residents",
        "Riverside amphitheatres and sunset contemplation decks",
        "Continuous pedestrianized eco-jogging and cycling tracks"
      ]
    },
    {
      id: "education",
      title: "Blue Ridge Public School",
      subtitle: "Premier ICSE Education Inside the Gates",
      metric: "ICSE",
      metricLabel: "Affiliated Campus",
      description: "A prestigious, fully operational co-educational ICSE school located right inside the township gates, eliminating morning school transit stress for parents and children.",
      iconName: "GraduationCap",
      image: "/assets/images/real-township-day.jpg",
      highlights: [
        "Modern STEM robotics labs and digital smart classrooms",
        "Olympic-sized athletic sports ground and swimming training pool",
        "Zero commute distance for resident children"
      ]
    },
    {
      id: "transit",
      title: "Walk-to-Work Tech Ecosystem & Metro Line 3",
      subtitle: "Zero Carbon Transit to Pune's Leading IT Conglomerates",
      metric: "800m",
      metricLabel: "To Metro Station",
      description: "Direct walk-to-work pedestrian gates to Infosys, Wipro, TCS, Cognizant, and the upcoming Hinjewadi Phase 1 Metro Line 3 Station, connecting directly to Shivajinagar.",
      iconName: "Train",
      image: "/assets/images/real-township-day.jpg",
      highlights: [
        "5 to 10 minute walk to Rajiv Gandhi Infotech Park Gate 1",
        "Rapid 20-minute transit to Central Pune via Metro Line 3",
        "Direct connection to Baner & Balewadi via the new Mahalunge Bridge"
      ]
    },
    {
      id: "lifestyle",
      title: "High Street Retail & Multi-Clubhouses",
      subtitle: "Every Daily Need Within Walking Reach",
      metric: "3+",
      metricLabel: "Clubhouse Complexes",
      description: "Sprawling leisure clubhouses with indoor sports, squash courts, temperature-controlled pools, multi-cuisine restaurants, supermarkets, and polyclinics.",
      iconName: "Building2",
      image: "/assets/images/real-township-day.jpg",
      highlights: [
        "Multiple fitness suites, badminton courts & tennis academies",
        "Everyday convenience: supermarkets, pharmacies, cafes & salons",
        "Comprehensive 24/7 primary healthcare polyclinic inside township"
      ]
    }
  ] as TownshipPillar[]
};
