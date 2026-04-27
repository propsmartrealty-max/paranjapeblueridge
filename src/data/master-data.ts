export interface Project {
  id: string;
  name: string;
  tagline: string;
  taglineMr: string;
  description: string;
  descriptionMr: string;
  carpetArea: string;
  price: string;
  storeys: number;
  possession: string;
  usp: string[];
  specs: {
    title: string;
    items: string[];
  }[];
  amenities: string[];
}

export const projects: Project[] = [
  {
    id: "promenade",
    name: "Promenade Residences",
    tagline: "New Urbanism Landmark Hinjewadi Phase 1",
    taglineMr: "न्यू अर्बनिझम लँडमार्क हिंजवडी फेज १",
    description: "Designed on the principles of New Urbanism, Promenade at Paranjape Blue Ridge Phase 1 features the first 41-storey river-facing residences in Hinjewadi. These high-rise luxury towers are the perfect choice for IT professionals at Infosys and Wipro looking for 3 BHK and 4 BHK flats near Rajiv Gandhi Infotech Park.",
    descriptionMr: "न्यू अर्बनिझमच्या तत्त्वांवर आधारित, परंजपे ब्लू रिज फेज १ मधील प्रॉमनेडमध्ये हिंजवडीतील पहिले ४१ मजली नदीभिमुख निवासस्थान आहे. इन्फोसिस आणि विप्रोमधील आयटी व्यावसायिकांसाठी हे लक्झरी टॉवर्स ३ बीएचके आणि ४ बीएचके फ्लॅट्ससाठी सर्वोत्तम पर्याय आहेत.",
    carpetArea: "1,317 - 1,716 Sq. Ft.",
    price: "₹ 1.65 Cr onwards",
    storeys: 41,
    possession: "Sept 2029",
    usp: ["River-facing Balconies", "Double-height Podium", "Tallest Towers in Hinjewadi Phase 1"],
    specs: [
      { title: "Flooring", items: ["Polished Glazed Vitrified Tiles", "Anti-skid Ceramic for Decks"] },
      { title: "Structure", items: ["MiVAN Aluminium Formwork", "Earthquake Resistant RCC"] }
    ],
    amenities: ["Podium Garden", "Work-from-Home Pods", "Private Mini Theatre", "Infinity Pool"]
  },
  {
    id: "altius",
    name: "The Altius",
    tagline: "Ultra-Luxury 4 & 5 BHK Riverside Residences",
    taglineMr: "अल्ट्रा-लक्झरी ४ आणि ५ बीएचके रिव्हरसाईड निवास",
    description: "The crown jewel of Blue Ridge luxury. The Altius offers iconic riverfront residences with a professional 9-hole golf course as your backyard. These premium 4 BHK and 5 BHK apartments are designed for the elite seeking a signature lifestyle in Pune's most successful integrated township.",
    descriptionMr: "ब्लू रिज लक्झरीचा मुकुट मणी. अल्टियस आपल्या घराच्या बागेत ९-होल प्रोफेशनल गोल्फ कोर्ससह आयकॉनिक रिव्हरफ्रंट निवासस्थान प्रदान करते. हे प्रीमियम ४ बीएचके आणि ५ बीएचके अपार्टमेंट्स पुण्यातील सर्वात यशस्वी टाऊनशिपमध्ये राहू इच्छिणाऱ्या उच्चभ्रू लोकांसाठी आहेत.",
    carpetArea: "1,858 - 2,480+ Sq. Ft.",
    price: "₹ 1.80 Cr onwards",
    storeys: 36,
    possession: "Ready / Near Ready",
    usp: ["Golf-course Facing", "Private Lift Lobby", "Exclusive Riverside Vistas"],
    specs: [
        { title: "Internal", items: ["Velvet Paint Finish", "Modular Kitchen with Chimney"] }
    ],
    amenities: ["Exclusive Clubhouse", "Golf Access", "Sky Lounge", "Concierge Service"]
  },
  {
    id: "ridge41",
    name: "Ridges 41",
    tagline: "High-Rise 2, 3 & 4 BHK Living",
    taglineMr: "हाय-राईज २, ३ आणि ४ बीएचके लिविंग",
    description: "Part of the prestigious Ridges cluster at Blue Ridge Hinjewadi, Ridges 41 utilizes advanced MiVAN technology to offer modern 2, 3, and 4 BHK residences. Featuring 6 levels of dedicated parking, it's the ideal investment for those seeking high rental yields near Hinjewadi Phase 1 and 2.",
    descriptionMr: "ब्लू रिज हिंजवडीतील प्रतिष्ठित रिजेस क्लस्टरचा भाग, रिजेस ४१ प्रगत मिवान तंत्रज्ञानाचा वापर करून आधुनिक २, ३ आणि ४ बीएचके निवासस्थान प्रदान करते. ६ स्तरांच्या समर्पित पार्किंगसह, हिंजवडी फेज १ आणि २ जवळ उच्च भाड्याने मिळकत शोधणाऱ्यांसाठी हे एक आदर्श गुंतवणूक आहे.",
    carpetArea: "970 - 1,550 Sq. Ft.",
    price: "₹ 97.60 L onwards",
    storeys: 41,
    possession: "Dec 2028",
    usp: ["MiVAN Construction", "6-Level Parking", "Integrated High-Rise Amenities"],
    specs: [
        { title: "Tech", items: ["1 KVA Dedicated DG Backup", "Solar Water Provision"] }
    ],
    amenities: ["Recreational Podium", "Multipurpose Hall", "Gymnasium", "Kids Play Area"]
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

export const blogs = [
  {
    title: "Why Blue Ridge Hinjewadi is the Best Investment in 2026",
    date: "April 2026",
    excerpt: "Exploring the high rental yields and appreciation at Blue Ridge vs other townships in Pune.",
    category: "Market Analysis"
  },
  {
    title: "Living the 138-Acre Grand Life at Paranjape Blue Ridge",
    date: "March 2026",
    excerpt: "A deep dive into the self-sufficient ecosystem with school, office, and sports facilities.",
    category: "Township Lifestyle"
  },
  {
    title: "The Ridges 41: A New Benchmark for High-Rise Living",
    date: "May 2026",
    excerpt: "Technical analysis of the 41-storey marvel and its high-velocity construction.",
    category: "New Launch"
  }
];
