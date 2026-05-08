export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  taglineMr: string;
  description: string;
  descriptionMr: string;
  carpetArea: string;
  price: string;
  priceValue: number;
  storeys: number;
  possession: string;
  reraNumber: string;
  geo: { latitude: number; longitude: number };
  usp: string[];
  specs: {
    title: string;
    items: string[];
  }[];
  amenities: string[];
  configurations: {
    slug: string;
    title: string;
    titleMr: string;
    carpetArea?: string;
    price?: string;
    priceValue?: number;
    numberOfRooms?: number;
    floorSizeSqFt?: number;
    image?: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "promenade",
    slug: "paranjape-blue-ridge-promenade-hinjewadi-pune",
    name: "Promenade Residences",
    tagline: "New Urbanism Landmark Hinjewadi Phase 1",
    taglineMr: "न्यू अर्बनिझम लँडमार्क हिंजवडी फेज १",
    description: "Designed on the principles of New Urbanism, Promenade at Paranjape Blue Ridge Phase 1 features the first 41-storey river-facing residences in Hinjewadi. These high-rise luxury towers are the perfect choice for IT professionals at Infosys and Wipro looking for 3 BHK and 4 BHK flats near Rajiv Gandhi Infotech Park.",
    descriptionMr: "न्यू अर्बनिझमच्या तत्त्वांवर आधारित, परंजपे ब्लू रिज फेज १ मधील प्रॉमनेडमध्ये हिंजवडीतील पहिले ४१ मजली नदीभिमुख निवासस्थान आहे. इन्फोसिस आणि विप्रोमधील आयटी व्यावसायिकांसाठी हे लक्झरी टॉवर्स ३ बीएचके आणि ४ बीएचके फ्लॅट्ससाठी सर्वोत्तम पर्याय आहेत.",
    carpetArea: "1,316 - 1,718 Sq. Ft.",
    price: "₹ 1.65 Cr onwards",
    priceValue: 16500000,
    storeys: 41,
    possession: "Sept 2029",
    reraNumber: "P52100055581",
    geo: { latitude: 18.5912, longitude: 73.7381 },
    usp: ["River-facing Balconies", "Double-height Podium", "Tallest Towers in Hinjewadi Phase 1"],
    specs: [
      { title: "Flooring", items: ["Polished Glazed Vitrified Tiles", "Anti-skid Ceramic for Decks"] },
      { title: "Structure", items: ["MiVAN Aluminium Formwork", "Earthquake Resistant RCC"] }
    ],
    amenities: ["Podium Garden", "Work-from-Home Pods", "Private Mini Theatre", "Infinity Pool"],
    configurations: [
      { slug: "3-bhk-flats-1316", title: "3 BHK Luxury Flats", titleMr: "३ बीएचके लक्झरी फ्लॅट्स", carpetArea: "1,316 Sq. Ft.", price: "₹ 1.65 Cr*", priceValue: 16500000, numberOfRooms: 3, floorSizeSqFt: 1316, image: "/assets/images/promenade-3bhk-1316.jpg" },
      { slug: "4-bhk-flats-1633", title: "4 BHK Premium Flats (Type 1)", titleMr: "४ बीएचके प्रीमियम फ्लॅट्स", carpetArea: "1,633 Sq. Ft.", price: "₹ 2.05 Cr*", priceValue: 20500000, numberOfRooms: 4, floorSizeSqFt: 1633, image: "/assets/images/promenade-4bhk-1633.jpg" },
      { slug: "4-bhk-flats-1718", title: "4 BHK Premium Flats (Type 2)", titleMr: "४ बीएचके प्रीमियम फ्लॅट्स", carpetArea: "1,718 Sq. Ft.", price: "₹ 2.15 Cr*", priceValue: 21500000, numberOfRooms: 4, floorSizeSqFt: 1718, image: "/assets/images/promenade-4bhk-1718.jpg" }
    ]
  },
  {
    id: "altius",
    slug: "paranjape-blue-ridge-altius-hinjewadi-pune",
    name: "The Altius",
    tagline: "Ultra-Luxury 4 & 5 BHK Riverside Residences",
    taglineMr: "अल्ट्रा-लक्झरी ४ आणि ५ बीएचके रिव्हरसाईड निवास",
    description: "The crown jewel of Blue Ridge luxury. The Altius offers iconic riverfront residences with a professional 9-hole golf course as your backyard. These premium 4 BHK and 5 BHK apartments are designed for the elite seeking a signature lifestyle in Pune's most successful integrated township.",
    descriptionMr: "ब्लू रिज लक्झरीचा मुकुट मणी. अल्टियस आपल्या घराच्या बागेत ९-होल प्रोफेशनल गोल्फ कोर्ससह आयकॉनिक रिव्हरफ्रंट निवासस्थान प्रदान करते. हे प्रीमियम ४ बीएचके आणि ५ बीएचके अपार्टमेंट्स पुण्यातील सर्वात यशस्वी टाऊनशिपमध्ये राहू इच्छिणाऱ्या उच्चभ्रू लोकांसाठी आहेत.",
    carpetArea: "1,858 - 2,480+ Sq. Ft.",
    price: "₹ 1.80 Cr onwards",
    priceValue: 18000000,
    storeys: 36,
    possession: "Ready / Near Ready",
    reraNumber: "P52100078116",
    geo: { latitude: 18.5905, longitude: 73.7375 },
    usp: ["Golf-course Facing", "Private Lift Lobby", "Exclusive Riverside Vistas"],
    specs: [
        { title: "Internal", items: ["Velvet Paint Finish", "Modular Kitchen with Chimney"] }
    ],
    amenities: ["Exclusive Clubhouse", "Golf Access", "Sky Lounge", "Concierge Service"],
    configurations: [
      { slug: "4-bhk-flats", title: "4 BHK Riverside Flats", titleMr: "४ बीएचके रिव्हरसाईड फ्लॅट्स", carpetArea: "1,858 Sq. Ft.", price: "₹ 1.80 Cr*", priceValue: 18000000, numberOfRooms: 4, floorSizeSqFt: 1858, image: "/assets/images/floor-plan-4bhk.png" },
      { slug: "5-bhk-flats", title: "5 BHK Ultra-Luxury Penthouses", titleMr: "५ बीएचके अल्ट्रा-लक्झरी पेंटहाऊस", carpetArea: "2,480 Sq. Ft.", price: "₹ 2.65 Cr*", priceValue: 26500000, numberOfRooms: 5, floorSizeSqFt: 2480, image: "/assets/images/unit-plan-3bhk.png" }
    ]
  },
  {
    id: "ridge41",
    slug: "paranjape-blue-ridge-41-hinjewadi-pune",
    name: "Ridges 41",
    tagline: "High-Rise 2, 3 & 4 BHK Living",
    taglineMr: "हाय-राईज २, ३ आणि ४ बीएचके लिविंग",
    description: "Part of the prestigious Ridges cluster at Blue Ridge Hinjewadi, Ridges 41 utilizes advanced MiVAN technology to offer modern 2, 3, and 4 BHK residences. Featuring 6 levels of dedicated parking, it's the ideal investment for those seeking high rental yields near Hinjewadi Phase 1 and 2.",
    descriptionMr: "ब्लू रिज हिंजवडीतील प्रतिष्ठित रिजेस क्लस्टरचा भाग, रिजेस ४१ प्रगत मिवान तंत्रज्ञानाचा वापर करून आधुनिक २, ३ आणि ४ बीएचके निवासस्थान प्रदान करते. ६ स्तरांच्या समर्पित पार्किंगसह, हिंजवडी फेज १ आणि २ जवळ उच्च भाड्याने मिळकत शोधणाऱ्यांसाठी हे एक आदर्श गुंतवणूक आहे.",
    carpetArea: "793 - 1,613 Sq. Ft.",
    price: "₹ 97.60 L onwards",
    priceValue: 9760000,
    storeys: 41,
    possession: "Dec 2028",
    reraNumber: "P52100000054",
    geo: { latitude: 18.5920, longitude: 73.7390 },
    usp: ["MiVAN Construction", "6-Level Parking", "Integrated High-Rise Amenities"],
    specs: [
        { title: "Tech", items: ["1 KVA Dedicated DG Backup", "Solar Water Provision"] }
    ],
    amenities: ["Recreational Podium", "Multipurpose Hall", "Gymnasium", "Kids Play Area"],
    configurations: [
      { slug: "2-bhk-flats", title: "2 BHK Smart Homes", titleMr: "२ बीएचके स्मार्ट होम्स", carpetArea: "793 - 970 Sq. Ft.", price: "₹ 97.60 L*", priceValue: 9760000, numberOfRooms: 2, floorSizeSqFt: 793, image: "/assets/images/unit-plan-3bhk.png" },
      { slug: "3-bhk-flats", title: "3 BHK Premium Flats", titleMr: "३ बीएचके प्रीमियम फ्लॅट्स", carpetArea: "1,250 - 1,275 Sq. Ft.", price: "₹ 1.25 Cr*", priceValue: 12500000, numberOfRooms: 3, floorSizeSqFt: 1250, image: "/assets/images/floor-plan-3bhk.png" },
      { slug: "4-bhk-flats", title: "4 BHK Spacious Homes", titleMr: "४ बीएचके प्रशस्त घरे", carpetArea: "1,592 - 1,613 Sq. Ft.", price: "₹ 1.58 Cr*", priceValue: 15800000, numberOfRooms: 4, floorSizeSqFt: 1592, image: "/assets/images/floor-plan-4bhk.png" }
    ]
  }
];

export const corporateMatrix = [
  { company: "Infosys Hinjewadi", distance: "1.2 KM", time: "4 Mins", hub: "Phase 1" },
  { company: "Wipro Technologies", distance: "1.5 KM", time: "5 Mins", hub: "Phase 1" },
  { company: "TCS / Tata Tech", distance: "1.8 KM", time: "6 Mins", hub: "Phase 1" },
  { company: "Cognizant / Accenture", distance: "2.1 KM", time: "7 Mins", hub: "Phase 1" },
  { company: "Embassy Tech Zone", distance: "2.5 KM", time: "8 Mins", hub: "Phase 1" },
  { company: "Quadron Business Park", distance: "2.8 KM", time: "9 Mins", hub: "Phase 2" },
  { company: "Qubix IT Park", distance: "1.1 KM", time: "3 Mins", hub: "Phase 1" },
  { company: "Blue Ridge SEZ", distance: "0.2 KM", time: "1 Min", hub: "Inside" },
  { company: "Hinjewadi Metro Station", distance: "0.8 KM", time: "2 Mins", hub: "Transit" },
  { company: "Mumbai-Pune Expressway", distance: "4.5 KM", time: "12 Mins", hub: "Arterial" }
];

export const townshipData = {
  totalArea: "138 Acres Integrated Township",
  families: "3,000+ Happy Families",
  amenities: [
    { title: "Blue Ridge Public School", description: "Top-tier ICSE education within the township.", icon: "School" },
    { title: "Blue Ridge Boat Club", description: "Pune's first private boat club on the Mula river.", icon: "Ship" },
    { title: "9-Hole Golf Course", description: "Professional grade golf view apartments for residents.", icon: "Flag" },
    { title: "Power Substation", description: "Captive 220/22KVA substation ensuring 100% supply.", icon: "Zap" },
    { title: "Water Treatment", description: "Captive WTP and STP with zero-discharge policy.", icon: "Droplets" }
  ],
  marketAnalysis: {
    itProfessionals: "800+ Companies (Infosys, Wipro, TCS, Accenture, Cognizant)",
    metroStatus: "Pune Metro Line 3 - Connecting Hinjewadi to Shivaji Nagar",
    appreciation: "High Capital Appreciation & Resale Value",
    rentalYield: "4-5% (Best Rental Property in Hinjewadi)"
  }
};

export interface Article {
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  content: string[];
}

export const articles: Article[] = [
  {
    slug: "why-blue-ridge-hinjewadi-best-investment-2026",
    title: "Why Blue Ridge Hinjewadi is the Best Investment in 2026",
    date: "April 2026",
    dateISO: "2026-04-15T10:00:00+05:30",
    excerpt: "Exploring the high rental yields and appreciation at Blue Ridge vs other townships in Pune.",
    category: "Market Analysis",
    author: "Sovereign Research Desk",
    image: "/assets/images/township-investment-aerial.png",
    content: [
      "Hinjewadi Phase 1 continues to be the epicentre of Pune's IT-driven real estate boom in 2026. With over 800 multinational companies operating within a 5-kilometre radius, the demand for premium residential properties has never been higher. At the heart of this micro-market lies Paranjape Blue Ridge — a 138-acre integrated township that has consistently outperformed its peers in both capital appreciation and rental yields.",
      "According to market data from Q1 2026, properties within Blue Ridge have appreciated by an average of 12% year-over-year, significantly outpacing the broader Pune market average of 7-8%. The township's unique positioning — offering a walk-to-work lifestyle for professionals at Infosys, Wipro, TCS, and Cognizant — creates a structural demand floor that insulates it from cyclical downturns.",
      "Rental yields at Blue Ridge currently average 4-5% annually, making it one of the highest-yielding residential assets in western Pune. A fully furnished 2 BHK in the Ridges cluster commands monthly rentals of ₹22,000-28,000, while premium 3 BHK units in newer towers fetch ₹35,000-45,000. For NRI investors seeking stable, INR-denominated returns, this profile is exceptionally attractive.",
      "The upcoming Pune Metro Line 3 — connecting Hinjewadi to Shivaji Nagar via Civil Court — is expected to further boost property values by 15-20% upon completion. The proposed metro station is located within 800 metres of Blue Ridge, ensuring that residents gain direct rapid transit access to Pune's city centre without the daily commute congestion that currently plagues the Hinjewadi-Wakad corridor.",
      "When compared to competing townships like Kolte-Patil Life Republic (Phase 2-3 location, limited social infrastructure) and VTP Blue Waters (standalone project, no integrated ecosystem), Blue Ridge's value proposition is clear: a ready, fully operational ecosystem with a school, boat club, golf course, SEZ, and captive power substation — all within the township gates.",
      "For investors evaluating Hinjewadi real estate in 2026, the data is unequivocal: Blue Ridge offers the optimal combination of location, infrastructure maturity, rental demand, and long-term appreciation potential. The new Ridges 41 towers, with prices starting at ₹97.60 lakhs for 2 BHK configurations, represent a particularly compelling entry point for first-time investors."
    ]
  },
  {
    slug: "living-138-acre-grand-life-paranjape-blue-ridge",
    title: "Living the 138-Acre Grand Life at Paranjape Blue Ridge",
    date: "March 2026",
    dateISO: "2026-03-20T10:00:00+05:30",
    excerpt: "A deep dive into the self-sufficient ecosystem with school, office, and sports facilities.",
    category: "Township Lifestyle",
    author: "Sovereign Research Desk",
    image: "/assets/images/township-aerial-night.jpg",
    content: [
      "Paranjape Blue Ridge is not merely a residential project — it is a self-sufficient micro-city spread across 138 acres of prime Hinjewadi Phase 1 real estate. For the 3,000+ families who call it home, the township represents a paradigm shift in how urban living is experienced in Pune.",
      "At the educational core lies the Blue Ridge Public School, an ICSE-affiliated institution that eliminates the morning school-run entirely. Parents walk their children to school within the township gates, saving an estimated 45 minutes of daily commute time. The school's academic reputation has made it one of the most sought-after institutions in western Pune.",
      "Recreation at Blue Ridge operates on a scale that standalone projects simply cannot replicate. The professional 9-hole golf course — the only one within a residential township in Hinjewadi — transforms evening leisure into a premium sporting experience. The Blue Ridge Boat Club, Pune's first private boat club on the Mula river, offers kayaking, rowing, and riverside dining experiences within minutes of residents' front doors.",
      "The township's infrastructure backbone is equally impressive. A captive 220/22 KVA power substation ensures 100% electricity supply independent of MSEDCL outages. A dedicated water treatment plant (WTP) and sewage treatment plant (STP) with a zero-discharge policy guarantee clean water supply and environmental compliance.",
      "For IT professionals, the walk-to-work lifestyle is Blue Ridge's defining advantage. The Blue Ridge SEZ — a commercial technology park within the township — hosts offices that are literally a 2-minute walk from residential towers. Beyond the SEZ, Infosys Phase 1 campus is 1.2 km away, Wipro Technologies is 1.5 km, and TCS/Tata Technologies is 1.8 km. This proximity translates to zero fuel costs, minimal commute stress, and a genuine work-life balance.",
      "The township's multi-tier security architecture — featuring CCTV surveillance, video door phones, intercom systems, and 24/7 manned checkpoints — ensures that the community remains safe and exclusive. Combined with landscaped podium gardens, jogging tracks, and a fully equipped gymnasium, Blue Ridge delivers a lifestyle that transcends the conventional apartment living experience."
    ]
  },
  {
    slug: "ridges-41-new-benchmark-high-rise-living-hinjewadi",
    title: "The Ridges 41: A New Benchmark for High-Rise Living in Hinjewadi",
    date: "May 2026",
    dateISO: "2026-05-01T10:00:00+05:30",
    excerpt: "Technical analysis of the 41-storey marvel and its MiVAN construction technology.",
    category: "New Launch",
    author: "Sovereign Research Desk",
    image: "/assets/images/ridges41-luxury-tower.png",
    content: [
      "The Ridges 41 at Paranjape Blue Ridge represents a technical and architectural milestone for Hinjewadi Phase 1. Standing at 41 storeys, these towers are among the tallest residential structures in the micro-market, offering panoramic views of the Mula river valley and the surrounding Sahyadri foothills.",
      "What distinguishes Ridges 41 from conventional high-rises is its construction methodology. Paranjape Schemes has deployed MiVAN (Malaysia-Vietnam) aluminium formwork technology — a system that enables casting of walls and slabs in a single pour, resulting in monolithic concrete structures with superior earthquake resistance and dimensional accuracy.",
      "The structural advantages of MiVAN are significant: walls are perfectly plumb and true, reducing the need for thick plastering and resulting in a net carpet area gain of 3-5% compared to conventional construction. For buyers, this translates to more usable space per square foot paid — a tangible cost advantage at the ₹9,600-12,500 per sq. ft. price band.",
      "Ridges 41 offers 2, 3, and 4 BHK configurations ranging from 793 to 1,613 sq. ft. carpet area. The 2 BHK Smart Homes, starting at ₹97.60 lakhs, are positioned as entry-level investments targeting young IT professionals. The 3 BHK and 4 BHK units cater to upgraders and established families seeking the full Blue Ridge township experience.",
      "A standout feature is the 6-level dedicated parking podium — eliminating the surface parking sprawl that plagues most high-rises and freeing up ground-level space for landscaped gardens and recreational amenities. Each tower features high-speed elevators, 1 KVA dedicated DG backup per flat, and solar water heating provision.",
      "With possession scheduled for December 2028, Ridges 41 is attracting significant pre-launch interest from both end-users and investors. The project's MahaRERA registration (P52100000054) provides regulatory transparency, while the Blue Ridge brand's 15-year track record of delivery offers buyer confidence that few new-launch projects in Hinjewadi can match."
    ]
  },
  {
    slug: "hinjewadi-metro-line-3-impact-blue-ridge-property",
    title: "Hinjewadi Metro Line 3: Impact on Blue Ridge Property Values",
    date: "April 2026",
    dateISO: "2026-04-28T10:00:00+05:30",
    excerpt: "How the upcoming Pune Metro Line 3 will transform Hinjewadi real estate values and connectivity.",
    category: "Infrastructure",
    author: "Sovereign Research Desk",
    image: "/assets/images/hinjewadi-metro-modern.png",
    content: [
      "The Pune Metro Line 3 — officially designated as the Hinjewadi-Shivajinagar corridor — is set to be the single most transformative infrastructure project for western Pune's real estate market. For residents and investors at Paranjape Blue Ridge, this development carries profound implications for property values, rental demand, and lifestyle convenience.",
      "The 23.3-kilometre elevated metro corridor will connect Hinjewadi Phase 1 to Shivajinagar (Pune's central business district) via 23 stations, with an estimated end-to-end travel time of 30 minutes. The nearest proposed station to Blue Ridge is approximately 800 metres from the township entrance — well within walking distance.",
      "Historical data from other Indian cities shows that metro connectivity typically triggers a 15-25% appreciation in property values within a 1-kilometre radius of stations within the first 2 years of operation. For Blue Ridge, which already commands premium pricing due to its location and amenities, the metro is expected to further consolidate its position as the most liquid real estate asset in Hinjewadi.",
      "The metro will also unlock new tenant demographics for Blue Ridge investors. Currently, rental demand is primarily driven by IT professionals working in Hinjewadi Phase 1-3. With metro access, professionals working in Aundh, Baner, and central Pune will also find Blue Ridge viable — effectively doubling the addressable tenant pool.",
      "Construction is currently underway, with the Maharashtra Metro Rail Corporation (Maha-Metro) targeting completion of the Hinjewadi-Balewadi section by late 2027. The full corridor to Shivajinagar is expected to be operational by 2029, coinciding closely with the possession timeline for new projects like Ridges 41.",
      "For prospective buyers considering Blue Ridge in 2026, the metro timeline presents a strategic window: current prices have not yet fully factored in the metro premium, but they will once physical station construction becomes visible. This 12-18 month period represents the optimal entry point for capital appreciation seekers."
    ]
  },
  {
    slug: "blue-ridge-public-school-admission-facilities-guide",
    title: "Blue Ridge Public School: Complete Admission & Facilities Guide 2026",
    date: "February 2026",
    dateISO: "2026-02-10T10:00:00+05:30",
    excerpt: "Everything parents need to know about admissions, curriculum, and facilities at Blue Ridge Public School.",
    category: "Education",
    author: "Sovereign Research Desk",
    image: "/assets/images/school-exterior.jpg",
    content: [
      "Blue Ridge Public School, located within the Paranjape Blue Ridge township in Hinjewadi Phase 1, is one of western Pune's premier ICSE-affiliated educational institutions. For families considering Blue Ridge as their home, the school's presence within the township gates is often the decisive factor in their purchase decision.",
      "The school follows the ICSE (Indian Certificate of Secondary Education) curriculum, recognized for its comprehensive approach to academics, emphasizing analytical thinking, English proficiency, and holistic development. Classes are conducted from pre-primary through Class 10, with plans for ISC (Class 11-12) expansion.",
      "Facilities at Blue Ridge Public School include modern, air-conditioned classrooms equipped with smart boards and digital learning tools. The campus features dedicated science and computer laboratories, a well-stocked library, an indoor sports hall, and outdoor playing fields for cricket, football, and athletics.",
      "For township residents, the school offers a unique lifestyle advantage: children walk to school within the secure, gated community. This eliminates the daily school-bus commute that typically consumes 45-60 minutes for Hinjewadi families sending children to schools in Wakad, Baner, or Aundh. The time saved translates directly into better study hours, more family time, and reduced transportation costs.",
      "Admissions for the 2026-27 academic year follow a structured process: registration typically opens in October-November of the preceding year, followed by an interaction round for the child and parents. Priority is given to Blue Ridge township residents, followed by Hinjewadi Phase 1 residents, and then external applicants based on available capacity.",
      "The school's commitment to extracurricular development is reflected in its active clubs and societies — including robotics, debate, music, and art — as well as inter-school sports competitions. Annual fees are competitive with other premium ICSE schools in Pune, and the convenience of having a top-tier school within walking distance adds significant intangible value to the Blue Ridge living experience."
    ]
  }
];

// Legacy alias for backward compatibility
export const blogs = articles.map(a => ({
  title: a.title,
  date: a.date,
  excerpt: a.excerpt,
  category: a.category,
}));

