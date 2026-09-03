export interface ClusterResidence {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  eyebrow: string;
  heroImage: string;
  gallery: string[];
  configurations: string; // e.g. "3 & 4 Bedroom Residences"
  carpetAreaRange: string; // e.g. "1,316 – 1,718 Sq. Ft."
  isCarpetVerified: boolean;
  priceStarting: string; // e.g. "₹1.65 Cr*" or "Available on Private Request"
  isPriceVerified: boolean;
  possessionTimeline: string; // e.g. "September 2029"
  reraNumber: string;
  isReraVerified: boolean;
  towerDetails: {
    towers: string;
    storeys: number | string;
    structureType: string;
  };
  architecturalStory: string;
  conceptPoints: { title: string; description: string }[];
  specifications: { category: string; details: string[] }[];
  clusterAmenities: string[];
  townshipAmenities: string[];
  floorPlans: {
    configTitle: string;
    bhkNumber: number;
    carpetArea: string;
    dimensions: string;
    planImage2D: string;
    planImage3D?: string;
    downloadUrl?: string;
  }[];
  inventoryPreview: {
    type: string;
    carpetArea: string;
    floorRange: string;
    viewOrientation: string;
    pricingStatus: string;
    status: 'Available' | 'Few Units Left' | 'Reserved' | 'Upon Request';
  }[];
  masterplanPosition: {
    zone: string;
    label: string;
    coordinates: { x: number; y: number }; // Percentage on SVG masterplan
    nearbyKeyPoints: string[];
  };
}

export const blueRidgeClusters: ClusterResidence[] = [
  {
    id: "promenade",
    slug: "promenade",
    name: "Promenade Residences",
    tagline: "The Benchmark of Riverfront High-Rise Living in Hinjewadi Phase 1",
    eyebrow: "41-Storey Iconic Towers • Mula Riverfront",
    heroImage: "/assets/images/promenade-hero.jpg",
    gallery: [
      "/assets/images/promenade-hero.jpg",
      "/assets/images/real-township-day.jpg",
      "/assets/images/promenade-3bhk-1316.jpg",
      "/assets/images/promenade-4bhk-1633.jpg"
    ],
    configurations: "3 & 4 Bedroom Residences",
    carpetAreaRange: "1,316 – 1,718 Sq. Ft.",
    isCarpetVerified: true,
    priceStarting: "₹1.65 Cr*",
    isPriceVerified: true,
    possessionTimeline: "September 2029",
    reraNumber: "P52100055581",
    isReraVerified: true,
    towerDetails: {
      towers: "Tower A & Tower B",
      storeys: 41,
      structureType: "Monolithic MiVAN Aluminium Formwork"
    },
    architecturalStory: "Designed around the philosophy of New Urbanism, Promenade Residences is conceived as a vertical riverfront sanctuary. Rising 41 storeys above Hinjewadi Phase 1, its staggered balconies and double-height sky lobbies frame panoramic vistas of the Mula River corridor and the 138-acre Blue Ridge greens.",
    conceptPoints: [
      {
        title: "Perpetual Riverfront Elevation",
        description: "Unobstructed orientations facing the scenic Mula River promenade and manicured township gardens."
      },
      {
        title: "Double-Height Deck Proportions",
        description: "Expansive outdoor terraces engineered to serve as private open-air sky lounges with composite acoustic decking."
      },
      {
        title: "Zero-Dead-Space MiVAN Layouts",
        description: "Cast-in-place structural precision delivering pure geometric carpet areas with no intrusive columns in living zones."
      }
    ],
    specifications: [
      {
        category: "Living & Dining",
        details: ["Imported polished vitrified slabs", "Heavy-gauge anodized aluminum acoustic sliding panels", "8-foot engineered wooden main door with digital smart lock"]
      },
      {
        category: "Master Suites",
        details: ["Laminated wooden flooring in primary suites", "Attached dressers with cross-ventilation orientation", "Pre-wired VRV / VRF air conditioning conduits"]
      },
      {
        category: "Kitchen & Utility",
        details: ["Parallel quartz counter setup", "Piped reticulated LPG gas connection", "Dedicated utility yard with washing machine & dishwasher provisions"]
      }
    ],
    clusterAmenities: [
      "Rooftop Sky Lounge & Observatory Deck",
      "Private 25m Temperature-Controlled Lap Pool",
      "Executive Co-working Pods & Boardroom",
      "Private 24-Seater Mini Theatre",
      "Health Club with Steam & Sauna",
      "Children's Sensory Soft-Play Arena"
    ],
    townshipAmenities: [
      "9-Hole Executive Golf Course & Driving Range",
      "Private Marina & Mula River Boat Club",
      "Blue Ridge Public School (ICSE Affiliated)",
      "High Street Boulevard Retail & Fine Dining",
      "Comprehensive Multi-Sport Athletic Complex",
      "24/7 Gated Multi-Tier Sovereign Surveillance"
    ],
    floorPlans: [
      {
        configTitle: "3 BHK Riverview Classic",
        bhkNumber: 3,
        carpetArea: "1,316 Sq. Ft.",
        dimensions: "Living: 22'x14' • Master: 15'x12'",
        planImage2D: "/assets/images/promenade-3bhk-1316.jpg",
        downloadUrl: "#enquire"
      },
      {
        configTitle: "4 BHK Riverfront Signature (Type 1)",
        bhkNumber: 4,
        carpetArea: "1,633 Sq. Ft.",
        dimensions: "Living: 26'x15' • Master: 17'x13'",
        planImage2D: "/assets/images/promenade-4bhk-1633.jpg",
        downloadUrl: "#enquire"
      },
      {
        configTitle: "4 BHK Royal Sky Mansion (Type 2)",
        bhkNumber: 4,
        carpetArea: "1,718 Sq. Ft.",
        dimensions: "Living: 28'x16' • Master: 18'x14'",
        planImage2D: "/assets/images/promenade-4bhk-1718.jpg",
        downloadUrl: "#enquire"
      }
    ],
    inventoryPreview: [
      { type: "3 BHK Riverview", carpetArea: "1,316 Sq. Ft.", floorRange: "Levels 12 to 24", viewOrientation: "Mula River & Promenade", pricingStatus: "₹1.65 Cr*", status: "Few Units Left" },
      { type: "3 BHK High Elevation", carpetArea: "1,316 Sq. Ft.", floorRange: "Levels 25 to 38", viewOrientation: "Pan-Township Skyline", pricingStatus: "₹1.72 Cr*", status: "Available" },
      { type: "4 BHK Signature", carpetArea: "1,633 Sq. Ft.", floorRange: "Levels 18 to 35", viewOrientation: "Dual River & Golf View", pricingStatus: "₹2.05 Cr*", status: "Available" },
      { type: "4 BHK Sky Duplex", carpetArea: "1,718 Sq. Ft.", floorRange: "Levels 36 to 41", viewOrientation: "360° Hinjewadi Valley", pricingStatus: "₹2.15 Cr*", status: "Few Units Left" }
    ],
    masterplanPosition: {
      zone: "Riverfront Promenade Precinct",
      label: "Promenade Enclave",
      coordinates: { x: 38, y: 32 },
      nearbyKeyPoints: ["Riverfront Promenade (0m)", "Marina & Boat Club (120m)", "Golf Course West Gate (250m)"]
    }
  },
  {
    id: "altius",
    slug: "altius",
    name: "The Altius",
    tagline: "Ultra-Luxury 4 & 5 BHK Sky Mansions & Golfview Penthouses",
    eyebrow: "Flagship Riverside Enclave • Overlooking the 9-Hole Greens",
    heroImage: "/assets/images/altius-hero.jpg",
    gallery: [
      "/assets/images/altius-hero.jpg",
      "/assets/images/real-township-day.jpg",
      "/assets/images/altius-hero.jpg"
    ],
    configurations: "4 & 5 Bedroom Sky Residences",
    carpetAreaRange: "1,858 – 2,480 Sq. Ft.",
    isCarpetVerified: true,
    priceStarting: "₹1.80 Cr*",
    isPriceVerified: true,
    possessionTimeline: "December 2027",
    reraNumber: "P52100078116",
    isReraVerified: true,
    towerDetails: {
      towers: "The Altius Riverside Tower",
      storeys: 36,
      structureType: "Advanced High-Strength RCC & Post-Tensioned Slabs"
    },
    architecturalStory: "The Altius represents the pinnacle of luxury residences in Pune West. Positioned directly between the tranquil Mula River and the emerald expanse of the 9-hole executive golf course, each home is treated as a detached vertical estate with private lift access, private foyers, and continuous ribbon glazing.",
    conceptPoints: [
      {
        title: "Direct Golf & Water Confluence",
        description: "Unrivaled dual aspect looking over the manicured fairway on one side and the meandering river on the other."
      },
      {
        title: "Exclusive Private Lift Access",
        description: "Controlled access biometric elevators opening directly into your dedicated private foyer."
      },
      {
        title: "Grand 11-Foot Clear Ceilings",
        description: "Volumetric architectural grandeur amplifying natural light, airflow, and bespoke interior chandeliers."
      }
    ],
    specifications: [
      {
        category: "Grand Living",
        details: ["Full Italian marble flooring across living, dining, and foyer", "11-foot floor-to-ceiling heights", "Schüco German aluminum panoramic glass systems"]
      },
      {
        category: "Master Retreats",
        details: ["Hardwood Burma teak flooring", "His-and-Hers walk-in walk-through dressing suites", "Kohler / Grohe luxury matte-black bathroom fittings"]
      },
      {
        category: "Smart Automation",
        details: ["Integrated KNX smart home lighting and climate automation", "Motorized curtain tracks", "Sovereign video security intercom linked to concierge"]
      }
    ],
    clusterAmenities: [
      "Private Golf Club Terrace & Cigar Lounge",
      "Infinity Edge Water Cascade",
      "Private Banquet Salon with Butler Pantry",
      "State-of-the-Art Technogym Fitness Suite",
      "Indoor Squash & Badminton Courts",
      "Bespoke Spa & Reflexology Pathway"
    ],
    townshipAmenities: [
      "9-Hole Executive Golf Course & Driving Range",
      "Private Marina & Mula River Boat Club",
      "Blue Ridge Public School (ICSE Affiliated)",
      "High Street Boulevard Retail & Fine Dining",
      "Comprehensive Multi-Sport Athletic Complex",
      "24/7 Gated Multi-Tier Sovereign Surveillance"
    ],
    floorPlans: [
      {
        configTitle: "4 BHK Royal Fairway Residence",
        bhkNumber: 4,
        carpetArea: "1,858 Sq. Ft.",
        dimensions: "Living: 28'x16' • Master: 18'x15'",
        planImage2D: "/assets/images/floor-plan-4bhk.png",
        downloadUrl: "#enquire"
      },
      {
        configTitle: "5 BHK Sovereign Sky Penthouse",
        bhkNumber: 5,
        carpetArea: "2,480 Sq. Ft.",
        dimensions: "Living: 34'x18' • Master: 20'x16'",
        planImage2D: "/assets/images/floor-plans/4bhk.png",
        downloadUrl: "#enquire"
      }
    ],
    inventoryPreview: [
      { type: "4 BHK Fairway View", carpetArea: "1,858 Sq. Ft.", floorRange: "Levels 10 to 20", viewOrientation: "Golf Course Fairway", pricingStatus: "₹1.80 Cr*", status: "Available" },
      { type: "4 BHK Riverview", carpetArea: "1,858 Sq. Ft.", floorRange: "Levels 21 to 32", viewOrientation: "Mula River Panorama", pricingStatus: "₹1.92 Cr*", status: "Few Units Left" },
      { type: "5 BHK Sky Penthouse", carpetArea: "2,480 Sq. Ft.", floorRange: "Levels 33 to 36", viewOrientation: "360° Dual Golf & River", pricingStatus: "Available on Private Request", status: "Upon Request" }
    ],
    masterplanPosition: {
      zone: "Fairway & Marina Confluence",
      label: "The Altius Enclave",
      coordinates: { x: 52, y: 44 },
      nearbyKeyPoints: ["Golf Clubhouse (60m)", "Marina Deck (150m)", "Hinjewadi IT Gate 1 (600m)"]
    }
  },
  {
    id: "ridges-41",
    slug: "ridges-41",
    name: "Ridges 41",
    tagline: "Modern 41-Storey Smart Residences for Global IT Professionals",
    eyebrow: "Walk-to-Work Technology Precinct • Smart 2 BHK Homes",
    heroImage: "/assets/images/ridges-hero.jpg",
    gallery: [
      "/assets/images/ridges-hero.jpg",
      "/assets/images/real-township-day.jpg",
      "/assets/images/ridges-hero.jpg"
    ],
    configurations: "2 Bedroom Smart Residences",
    carpetAreaRange: "793 – 970 Sq. Ft.",
    isCarpetVerified: true,
    priceStarting: "₹97.60 L*",
    isPriceVerified: true,
    possessionTimeline: "December 2028",
    reraNumber: "P52100000054",
    isReraVerified: true,
    towerDetails: {
      towers: "Ridges 41 Tower 1 & 2",
      storeys: 41,
      structureType: "Monolithic MiVAN High-Speed Formwork"
    },
    architecturalStory: "Engineered specifically for ambitious IT executives and discerning new-generation homeowners. Ridges 41 combines high-velocity construction durability with intelligent ergonomic floorplans, dedicated work-from-home zones, and high rental yield capital efficiency in Hinjewadi Phase 1.",
    conceptPoints: [
      {
        title: "Optimum Ergonomic Efficiency",
        description: "Every square inch engineered with functional geometry — wide living spans, cross-ventilation, and dedicated home-office alcoves."
      },
      {
        title: "Walk-to-Work Proximity",
        description: "Just 400 meters from Infosys, Wipro, and TCS campuses, commanding the highest occupancy and rental yield in West Pune."
      },
      {
        title: "6-Level Integrated Podium Parking",
        description: "Covered, secure automated vehicular circulation ensuring vehicle-free podium gardens and children play areas."
      }
    ],
    specifications: [
      {
        category: "Living & Workspace",
        details: ["High-durability glazed vitrified tile flooring", "Fiber-optic broadband pre-cabled in all rooms", "Dedicated ergonomic workstation nook"]
      },
      {
        category: "Bedrooms & Balcony",
        details: ["Large panoramic sliding windows for maximum daytime illumination", "Spacious covered sit-out balcony with safety railings"]
      },
      {
        category: "Green Tech",
        details: ["Solar water heating integration", "Rainwater harvesting and greywater recycling for landscaped gardens"]
      }
    ],
    clusterAmenities: [
      "Podium Level Zen Garden & Jogging Track",
      "High-Tech Fitness Studio & Aerobics Floor",
      "Co-Working Lounge with High-Speed WiFi",
      "Gaming Zone & Table Tennis Room",
      "Electric Vehicle (EV) Rapid Charging Stations",
      "Creche & Toddler Play Den"
    ],
    townshipAmenities: [
      "9-Hole Executive Golf Course & Driving Range",
      "Private Marina & Mula River Boat Club",
      "Blue Ridge Public School (ICSE Affiliated)",
      "High Street Boulevard Retail & Fine Dining",
      "Comprehensive Multi-Sport Athletic Complex",
      "24/7 Gated Multi-Tier Sovereign Surveillance"
    ],
    floorPlans: [
      {
        configTitle: "2 BHK Smart Living (Compact)",
        bhkNumber: 2,
        carpetArea: "793 Sq. Ft.",
        dimensions: "Living: 18'x12' • Master: 13'x11'",
        planImage2D: "/assets/images/floor-plans/2bhk.png",
        downloadUrl: "#enquire"
      },
      {
        configTitle: "2 BHK Executive Suite (Spacious)",
        bhkNumber: 2,
        carpetArea: "970 Sq. Ft.",
        dimensions: "Living: 20'x13' • Master: 14'x12'",
        planImage2D: "/assets/images/floor-plans/2bhk.png",
        downloadUrl: "#enquire"
      }
    ],
    inventoryPreview: [
      { type: "2 BHK Smart", carpetArea: "793 Sq. Ft.", floorRange: "Levels 5 to 18", viewOrientation: "Internal Podium Greens", pricingStatus: "₹97.60 L*", status: "Available" },
      { type: "2 BHK Smart Riverview", carpetArea: "793 Sq. Ft.", floorRange: "Levels 19 to 32", viewOrientation: "Mula River Horizon", pricingStatus: "₹1.04 Cr*", status: "Few Units Left" },
      { type: "2 BHK Executive Deck", carpetArea: "970 Sq. Ft.", floorRange: "Levels 12 to 38", viewOrientation: "Hinjewadi IT Skyline", pricingStatus: "₹1.15 Cr*", status: "Available" }
    ],
    masterplanPosition: {
      zone: "IT Park Transit Quadrant",
      label: "Ridges 41 Enclave",
      coordinates: { x: 68, y: 28 },
      nearbyKeyPoints: ["Infosys Gate 1 (350m)", "Metro Line 3 Station (800m)", "Blue Ridge High Street (180m)"]
    }
  }
];

export function getClusterBySlug(slug: string): ClusterResidence | undefined {
  return blueRidgeClusters.find(c => c.slug === slug || c.id === slug);
}
