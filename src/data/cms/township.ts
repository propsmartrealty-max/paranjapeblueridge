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
