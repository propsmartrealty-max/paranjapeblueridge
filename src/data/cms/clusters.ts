export interface ClusterResidence {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  eyebrow: string;
  heroImage: string;
  gallery: string[];
  configurations: string;
  carpetAreaRange: string;
  isCarpetVerified: boolean;
  priceStarting: string;
  isPriceVerified: boolean;
  possessionTimeline: string;
  reraNumber: string;
  isReraVerified: boolean;
  towerDetails: {
    towers: string;
    storeys: number;
    structureType: string;
  };
  architecturalStory: string;
  conceptPoints: {
    title: string;
    description: string;
  }[];
  specifications: {
    category: string;
    details: string[];
  }[];
  clusterAmenities: string[];
  townshipAmenities: string[];
  floorPlans: {
    configTitle: string;
    bhkNumber: number;
    carpetArea: string;
    dimensions: string;
    planImage2D: string;
    downloadUrl: string;
  }[];
  inventoryPreview: {
    type: string;
    carpetArea: string;
    floorRange: string;
    viewOrientation: string;
    pricingStatus: string;
    status: string;
  }[];
  masterplanPosition: {
    zone: string;
    label: string;
    coordinates: { x: number; y: number };
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
    heroImage: "/assets/images/promenade-hero.png",
    gallery: [
      "/assets/images/promenade-hero.png",
      "/assets/images/official/promenade-about.jpg",
      "/assets/images/pscl-blue-ridge-promenade-canopy.webp",
      "/assets/images/official/promenade-g1.jpg",
      "/assets/images/official/promenade-g2.jpg",
      "/assets/images/official/promenade-g3.jpg",
      "/assets/images/official/promenade-g4.jpg",
      "/assets/images/pscl-blue-ridge-aerial-drone.webp"
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
    architecturalStory: "Designed around the philosophy of New Urbanism, Promenade Residences is conceived as a vertical riverfront sanctuary. Rising 41 storeys above Hinjewadi Phase 1, its staggered balconies and double-height sky lobbies frame panoramic vistas of the Mula River corridor, the championship golf course, and the 138-acre Blue Ridge master greens.",
    conceptPoints: [
      {
        title: "Double-Height Entrance Lobby & 3-Side Open Layout",
        description: "Monumental arrival experience leading into extensive residences configured with 3-side open geometry for maximum natural light and cross-ventilation."
      },
      {
        title: "Golf & River-Facing High-Rise Residences",
        description: "Direct panoramic elevations looking over the 9-hole executive golf course fairway and the tranquil Mula River promenade."
      },
      {
        title: "Two Walk-In Wardrobes & Master Suites",
        description: "Primary suites designed with dual walk-in dressing alcoves, private balconies, and monolithic formwork acoustic isolation."
      }
    ],
    specifications: [
      {
        category: "Flooring & Finishes",
        details: [
          "Polished glazed vitrified tiles for living, dining, bedrooms, kitchen & passage",
          "Glazed vitrified anti-skid tiles for sit-out balconies",
          "Vitrified tiles with full-body vanity counters in all toilets"
        ]
      },
      {
        category: "Kitchen & Reticulated Gas",
        details: [
          "Full body vitrified tiles for kitchen & utility platform with single bowl SS sink",
          "Modular kitchen setup with dedicated chimney exhaust provision",
          "Reticulated central piped gas system connection"
        ]
      },
      {
        category: "Doors, Windows & Bathrooms",
        details: [
          "Main flush door with dual-side designer laminate and biometric digital lock",
          "Pre-hung internal flush doors with dual-side laminate finish",
          "Heavy-gauge anodized aluminium sliding windows with mosquito net",
          "Vitrified dado tiles in toilets up to lintel level with toughened glass shower partitions"
        ]
      }
    ],
    clusterAmenities: [
      "Double-Height Grand Designer Entrance Lobby",
      "Rooftop Sky Lounge & Observatory Deck",
      "Private 25m Temperature-Controlled Lap Pool",
      "Executive Co-working Pods & Boardroom",
      "Private 24-Seater Mini Theatre",
      "Health Club with Steam, Sauna & Spa",
      "Children's Sensory Soft-Play Arena"
    ],
    townshipAmenities: [
      "9-Hole Executive Golf Course & The Cliff Clubhouse",
      "On-Campus 3M+ Sq. Ft. Blue Ridge IT / ITES SEZ",
      "Private Marina & Mula River Boat Club",
      "Blue Ridge Public School (ICSE Affiliated Campus)",
      "High Street Boulevard & Xion Mall Retail",
      "Swaniketan & Athashri Senior Living Communities",
      "Comprehensive Multi-Sport Athletic Complex & Tennis Courts",
      "24/7 Multi-Tier Township Security & Sovereign Surveillance"
    ],
    floorPlans: [
      {
        configTitle: "3 BHK Riverview Classic",
        bhkNumber: 3,
        carpetArea: "1,316 Sq. Ft.",
        dimensions: "Living: 22'x14' • Master: 15'x12'",
        planImage2D: "/assets/images/official/promenade-3bhk-plan2.jpg",
        downloadUrl: "#enquire"
      },
      {
        configTitle: "4 BHK Riverfront Signature",
        bhkNumber: 4,
        carpetArea: "1,633 Sq. Ft.",
        dimensions: "Living: 26'x15' • Master: 17'x13'",
        planImage2D: "/assets/images/official/promenade-4bhk-plan3.jpg",
        downloadUrl: "#enquire"
      },
      {
        configTitle: "4 BHK Royal Sky Mansion",
        bhkNumber: 4,
        carpetArea: "1,718 Sq. Ft.",
        dimensions: "Living: 28'x16' • Master: 18'x14'",
        planImage2D: "/assets/images/official/promenade-4bhk-plan3.jpg",
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
    tagline: "Ultra-Luxury 3 & 4 BHK Sky Residences & Golfview Suites",
    eyebrow: "Flagship Riverside Enclave • Overlooking the 9-Hole Greens",
    heroImage: "/assets/images/official/altius-elevation-2048.webp",
    gallery: [
      "/assets/images/official/altius-elevation-2048.webp",
      "/assets/images/official/altius-banner.jpg",
      "/assets/images/official/altius-about.jpg",
      "/assets/images/official/altius-g1.jpg",
      "/assets/images/official/altius-g2.jpg",
      "/assets/images/official/altius-g3.jpg",
      "/assets/images/official/altius-g4.jpg",
      "/assets/images/pscl-blue-ridge-golf.webp"
    ],
    configurations: "3 & 4 Bedroom Riverside Residences",
    carpetAreaRange: "1,550 – 2,100 Sq. Ft.",
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
        title: "Direct Golf & River Confluence",
        description: "Unrivaled dual aspect looking over the manicured fairway on one side and the meandering river on the other."
      },
      {
        title: "Exclusive Private Lift Access & Foyer",
        description: "Controlled access biometric elevators opening directly into your dedicated private reception foyer."
      },
      {
        title: "Grand 11-Foot Clear Architectural Ceilings",
        description: "Volumetric architectural grandeur amplifying natural light, airflow, and bespoke interior chandeliers."
      }
    ],
    specifications: [
      {
        category: "Grand Living & Foyers",
        details: [
          "Imported Italian marble flooring across living, dining, and entrance foyer",
          "11-foot floor-to-ceiling clear architectural heights",
          "Schüco German aluminum panoramic double-glazed acoustic glass systems"
        ]
      },
      {
        category: "Master Retreats & Dressers",
        details: [
          "Hardwood Burma teak engineered flooring in master suites",
          "His-and-Hers walk-in walk-through dressing rooms",
          "Kohler / Grohe luxury matte-black thermostatic bathroom fixtures"
        ]
      },
      {
        category: "Smart Automation & Utilities",
        details: [
          "Integrated KNX smart home lighting, climate, and curtain automation",
          "Dedicated service core with separate freight elevators and staff quarters",
          "Central VRV air conditioning conduits with zero outdoor unit clutter"
        ]
      }
    ],
    clusterAmenities: [
      "Private Golf Club Terrace & Cigar Lounge",
      "Infinity Edge Water Cascade & Horizon Pool",
      "Private Banquet Salon with Butler Pantry",
      "State-of-the-Art Technogym Fitness Suite",
      "Indoor Squash & Badminton Courts",
      "Bespoke Spa & Reflexology Garden Pathway"
    ],
    townshipAmenities: [
      "9-Hole Executive Golf Course & The Cliff Clubhouse",
      "On-Campus 3M+ Sq. Ft. Blue Ridge IT / ITES SEZ",
      "Private Marina & Mula River Boat Club",
      "Blue Ridge Public School (ICSE Affiliated Campus)",
      "High Street Boulevard & Xion Mall Retail",
      "Swaniketan & Athashri Senior Living Communities",
      "Comprehensive Multi-Sport Athletic Complex",
      "24/7 Multi-Tier Township Security & Sovereign Surveillance"
    ],
    floorPlans: [
      {
        configTitle: "3 BHK Riverside Sanctuary",
        bhkNumber: 3,
        carpetArea: "1,550 Sq. Ft.",
        dimensions: "Living: 24'x15' • Master: 16'x14'",
        planImage2D: "/assets/images/official/altius-4bhk.jpg",
        downloadUrl: "#enquire"
      },
      {
        configTitle: "4 BHK Royal Fairway Residence",
        bhkNumber: 4,
        carpetArea: "1,858 Sq. Ft.",
        dimensions: "Living: 28'x16' • Master: 18'x15'",
        planImage2D: "/assets/images/official/altius-5bhk.jpg",
        downloadUrl: "#enquire"
      }
    ],
    inventoryPreview: [
      { type: "3 BHK Riverside Sanctuary", carpetArea: "1,550 Sq. Ft.", floorRange: "Levels 05 to 18", viewOrientation: "Mula River & Fairway", pricingStatus: "₹1.80 Cr*", status: "Available" },
      { type: "4 BHK Fairway View", carpetArea: "1,858 Sq. Ft.", floorRange: "Levels 19 to 30", viewOrientation: "Golf Course Fairway", pricingStatus: "₹2.05 Cr*", status: "Available" },
      { type: "4 BHK Sky Residence", carpetArea: "2,100 Sq. Ft.", floorRange: "Levels 31 to 36", viewOrientation: "360° Dual Golf & River", pricingStatus: "₹2.25 Cr*", status: "Few Units Left" }
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
    eyebrow: "Walk-to-Work Technology Precinct • Smart 2 & 3 BHK Homes",
    heroImage: "/assets/images/official/ridges41-banner.jpg",
    gallery: [
      "/assets/images/official/ridges41-banner.jpg",
      "/assets/images/official/ridges41-about.jpg",
      "/assets/images/official/ridges41-g1.jpg",
      "/assets/images/official/ridges41-g2.jpg",
      "/assets/images/official/ridges41-g3.jpg",
      "/assets/images/official/ridges41-g4.jpg",
      "/assets/images/pscl-blue-ridge-sez.webp"
    ],
    configurations: "2 & 3 Bedroom Smart Residences",
    carpetAreaRange: "793 – 1,180 Sq. Ft.",
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
    architecturalStory: "Engineered specifically for ambitious IT executives and discerning homeowners. Ridges 41 combines high-velocity monolithic durability with intelligent ergonomic floorplans, dedicated work-from-home zones, and high rental yield capital efficiency in Hinjewadi Phase 1.",
    conceptPoints: [
      {
        title: "Optimum Ergonomic Efficiency",
        description: "Every square inch engineered with functional geometry — wide living spans, cross-ventilation, and dedicated home-office alcoves."
      },
      {
        title: "Walk-to-Work Proximity & High Rental Yield",
        description: "Just 400 meters from Infosys, Wipro, and TCS campuses, commanding the highest occupancy and rental yields in West Pune."
      },
      {
        title: "6-Level Integrated Podium Parking",
        description: "Covered, secure automated vehicular circulation ensuring vehicle-free podium gardens and children play areas."
      }
    ],
    specifications: [
      {
        category: "Living & Workspace",
        details: [
          "Polished glazed vitrified tile flooring across all rooms",
          "Dedicated ergonomic workstation nook pre-cabled with high-speed fiber internet",
          "Wide sliding windows for maximum daytime illumination and airflow"
        ]
      },
      {
        category: "Kitchen & Utility",
        details: [
          "Full body vitrified tile platform with single bowl SS sink",
          "Modular kitchen setup with chimney provision",
          "Piped reticulated LPG gas connection with gas leak safety detector"
        ]
      },
      {
        category: "Green Tech & Bathrooms",
        details: [
          "Solar water heating integration for master bathroom",
          "Vitrified dado tiles in toilets up to lintel level",
          "Rainwater harvesting and greywater recycling for podium landscape"
        ]
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
      "9-Hole Executive Golf Course & The Cliff Clubhouse",
      "On-Campus 3M+ Sq. Ft. Blue Ridge IT / ITES SEZ",
      "Private Marina & Mula River Boat Club",
      "Blue Ridge Public School (ICSE Affiliated Campus)",
      "High Street Boulevard & Xion Mall Retail",
      "Swaniketan & Athashri Senior Living Communities",
      "Comprehensive Multi-Sport Athletic Complex",
      "24/7 Multi-Tier Township Security & Sovereign Surveillance"
    ],
    floorPlans: [
      {
        configTitle: "2 BHK Smart Residence",
        bhkNumber: 2,
        carpetArea: "793 Sq. Ft.",
        dimensions: "Living: 18'x12' • Master: 13'x11'",
        planImage2D: "/assets/images/official/ridges41-2bhk.jpg",
        downloadUrl: "#enquire"
      },
      {
        configTitle: "3 BHK Signature Residence",
        bhkNumber: 3,
        carpetArea: "1,180 Sq. Ft.",
        dimensions: "Living: 22'x14' • Master: 15'x12'",
        planImage2D: "/assets/images/official/ridges41-3bhk.jpg",
        downloadUrl: "#enquire"
      }
    ],
    inventoryPreview: [
      { type: "2 BHK Compact Smart", carpetArea: "793 Sq. Ft.", floorRange: "Levels 05 to 20", viewOrientation: "Township Greens & Boulevard", pricingStatus: "₹97.60 L*", status: "Available" },
      { type: "2 BHK Executive", carpetArea: "970 Sq. Ft.", floorRange: "Levels 21 to 35", viewOrientation: "Unobstructed Valley View", pricingStatus: "₹1.15 Cr*", status: "Few Units Left" },
      { type: "3 BHK Signature", carpetArea: "1,180 Sq. Ft.", floorRange: "Levels 36 to 41", viewOrientation: "360° Tech Valley Skyline", pricingStatus: "₹1.35 Cr*", status: "Available" }
    ],
    masterplanPosition: {
      zone: "Central Tech Boulevard Precinct",
      label: "Ridges 41 Enclave",
      coordinates: { x: 45, y: 55 },
      nearbyKeyPoints: ["Infosys Phase 1 Gate (400m)", "Blue Ridge High Street (200m)", "Sports Complex (180m)"]
    }
  }
];
