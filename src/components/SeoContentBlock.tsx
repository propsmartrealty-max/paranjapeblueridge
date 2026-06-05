import { projects } from '@/data/master-data';
import { generatePseoUrls } from '@/data/seo-matrix';

const SITE_URL = 'https://www.paranjapeblueridge.com';

function getSiloFAQs(silo: string, title: string) {
  switch (silo) {
    case 'investor':
      return [
        { q: `Is ${title} a good investment in 2026?`, a: `Yes. Hinjewadi Phase 1 properties like Blue Ridge have appreciated 12% YoY. Rental yields are 4-5%, well above Pune's average of 2-3%.` },
        { q: 'What is the expected ROI at Blue Ridge Hinjewadi?', a: 'Blue Ridge has delivered consistent 12% annual capital appreciation over 3 years. Metro Line 3 is expected to add 15-20% premium on completion.' },
        { q: 'Is Blue Ridge suitable for NRI investment?', a: 'Yes. FEMA-compliant, MahaRERA registered, with professional property management available. NRI buyers can invest through standard NRE/NRO accounts.' },
        { q: 'What is the minimum investment at Blue Ridge?', a: 'The entry point is ₹97.60 L for a 2 BHK in Ridges 41. Premium 3 BHK units in Promenade start at ₹1.65 Cr.' },
      ];
    case 'corporate':
      return [
        { q: `How far is ${title} from major IT parks?`, a: 'Infosys Phase 1 is 1.2 KM, Wipro is 1.5 KM, TCS is 1.8 KM — all walkable. Blue Ridge SEZ is literally inside the township.' },
        { q: 'Is there a walk-to-work lifestyle at Blue Ridge?', a: 'Yes. Blue Ridge is the only 138-acre township in Hinjewadi Phase 1 where residents can walk to their office. The SEZ is inside the gates.' },
        { q: 'Are there work-from-home facilities at Blue Ridge?', a: 'Yes. Promenade Residences feature dedicated Work-from-Home Pods within the podium amenities.' },
        { q: 'What is the commute time from Blue Ridge to Hinjewadi IT Park?', a: 'Zero commute for Blue Ridge SEZ. Under 4 minutes drive to Infosys/Wipro campuses. Metro Line 3 will connect to city centre in 30 mins.' },
      ];
    case 'battleground':
      return [
        { q: `Blue Ridge vs ${title.split('vs')[1]?.trim() || 'competitors'} — which is better?`, a: 'Blue Ridge wins on ecosystem: 138 acres vs standalone buildings. Includes ICSE school, boat club, golf course, and SEZ — features competitors simply cannot replicate.' },
        { q: 'Is Blue Ridge ready for possession?', a: 'Yes — multiple clusters are ready/near-ready. Ridges 41 (Dec 2028) and Promenade (Sept 2029) are upcoming. Resale inventory in older towers is ready for immediate possession.' },
        { q: 'Which is better value: Blue Ridge or Life Republic?', a: 'Blue Ridge Phase 1 offers superior infrastructure maturity, a school inside, and riverfront access. Life Republic Phase 2-3 is further from IT hubs with less social infrastructure.' },
        { q: 'What makes Blue Ridge unique among Hinjewadi townships?', a: 'It is the only 138-acre self-contained township in Hinjewadi Phase 1 with a school, boat club, golf course, captive power station, and walk-to-work SEZ.' },
      ];
    case 'infrastructure':
    case 'infra-guide':
      return [
        { q: 'How will Metro Line 3 impact Blue Ridge property values?', a: 'The Hinjewadi-Shivajinagar Metro (23.3 km) station is 800m from Blue Ridge. Historical data shows 15-25% appreciation within 1 km of new metro stations.' },
        { q: 'When will Pune Metro Line 3 be operational near Blue Ridge?', a: 'The Hinjewadi-Balewadi section is expected by late 2027. Full corridor to Shivajinagar by 2029 — coinciding with Ridges 41 possession.' },
        { q: 'Is Blue Ridge connected to the Mumbai-Pune Expressway?', a: 'Yes — the expressway is 4.5 KM away (12 minutes). The Mahalunge-Ingale Bridge provides a direct arterial connection.' },
        { q: `What connectivity advantages does ${title} offer?`, a: 'Blue Ridge Phase 1 has direct access to NH48 (Pune-Mumbai), upcoming Metro Line 3, and is adjacent to Hinjewadi IT Park — the trifecta of connectivity.' },
      ];
    case 'price-list':
      return [
        { q: `What is the current price of ${title.split('Price')[0].trim()}?`, a: '2 BHK in Ridges 41 starts at ₹97.60 L. 3 BHK in Promenade starts at ₹1.65 Cr. 4 BHK Altius starts at ₹1.80 Cr. 5 BHK penthouses at ₹2.65 Cr. All prices subject to floor rise and GST.' },
        { q: 'What is the payment plan for Blue Ridge Hinjewadi?', a: 'Blue Ridge offers construction-linked payment plans. Typically: 10% on booking, 80% linked to construction milestones, 10% on possession. Home loans available from all major banks.' },
        { q: 'What is the all-inclusive cost at Blue Ridge?', a: 'All-inclusive cost includes base price, GST (5%), stamp duty (5%), registration (1%), maintenance deposit, and club membership. Contact the sales office for exact cost sheet.' },
        { q: 'Is the price negotiable at Blue Ridge Hinjewadi?', a: 'Blue Ridge is a premium branded township with fixed pricing. However, early-stage bookings and bulk purchases may qualify for preferential allotment. Contact our team for current offers.' },
      ];
    case 'floor-plan':
      return [
        { q: `What is the carpet area for ${title.split('Floor')[0].trim()} at Blue Ridge?`, a: '2 BHK: 793-970 sq ft | 3 BHK Promenade: 1,316 sq ft | 3 BHK Ridges 41: 1,250-1,275 sq ft | 4 BHK Altius: 1,858 sq ft | 5 BHK: 2,480+ sq ft. All carpet areas per RERA definition.' },
        { q: 'Does Blue Ridge use MiVAN construction for better carpet area?', a: 'Yes. Ridges 41 and Promenade use MiVAN aluminium formwork, resulting in superior wall accuracy and 3-5% more usable carpet area vs conventional construction.' },
        { q: 'How do I download the floor plan for Blue Ridge?', a: 'Request the official floor plan brochure through our enquiry form or WhatsApp +91-7744009295. We will dispatch the complete PDF with all unit configurations within 30 minutes.' },
        { q: 'Are the floor plans RERA compliant?', a: 'Yes. All unit plans at Blue Ridge are exactly as registered with MahaRERA. Promenade: P52100055581, Altius: P52100078116, Ridges 41: P52100000054.' },
      ];
    case 'site-visit':
      return [
        { q: 'How do I book a site visit to Blue Ridge Hinjewadi?', a: 'Call +91-20-67210000 or WhatsApp +91-7744009295 to schedule a private site visit. We offer weekday and weekend slots, including early morning visits for working professionals.' },
        { q: 'Is there a virtual tour available for Blue Ridge?', a: 'Yes. We offer a 360-degree virtual walkthrough of all completed towers, podium amenities, and the golf course. Request the virtual tour link through our enquiry form.' },
        { q: 'Where is the Blue Ridge sales office located?', a: 'Sales Gallery: Blue Ridge Township, Phase 1, Hinjewadi, Rajiv Gandhi Infotech Park, Pune - 411057. Open 9 AM to 8 PM, 7 days a week.' },
        { q: 'What should I bring for a site visit to Blue Ridge?', a: 'A government-issued photo ID is required. We recommend comfortable footwear for the township walk. Our team will provide refreshments and a comprehensive project brief during the visit.' },
      ];
    case 'amenities':
      return [
        { q: `What amenities are included in ${title}?`, a: 'Blue Ridge offers a 9-hole golf course, private boat club on Mula river, Blue Ridge Public School (ICSE), infinity pool, gymnasium, pet park, work-from-home pods, and 24/7 multi-tier security.' },
        { q: 'Does Blue Ridge Hinjewadi have a swimming pool?', a: 'Yes. Multiple clusters feature infinity pools and recreational swimming pools within the podium level. The Altius features a rooftop pool with river views.' },
        { q: 'Is Blue Ridge a gated community?', a: 'Yes. Blue Ridge is a fully gated 138-acre township with CCTV surveillance, video door phones, intercom systems, and 24/7 manned security checkpoints at all entry points.' },
        { q: 'Are pets allowed at Blue Ridge Hinjewadi?', a: 'Yes. Blue Ridge has a dedicated pet park within the township. Most residential towers are pet-friendly with separate pet entry/exit protocols.' },
      ];
    default:
      return [
        { q: `What amenities are available at ${title}?`, a: '9-hole golf course, private boat club on Mula river, Blue Ridge Public School (ICSE), pet park, gymnasium, infinity pool, and 24/7 security with multi-tier access control.' },
        { q: 'Are all Blue Ridge projects RERA registered?', a: 'Yes. Promenade: P52100055581, The Altius: P52100078116, Ridges 41: P52100000054. All MahaRERA certified.' },
        { q: 'What is the price range at Paranjape Blue Ridge Hinjewadi?', a: '2 BHK from ₹97.60 L (Ridges 41) | 3 BHK from ₹1.25 Cr | 4 BHK from ₹1.58 Cr | 5 BHK Penthouses at ₹2.65 Cr (The Altius).' },
        { q: 'Is Blue Ridge a good place to live for families?', a: 'Yes. The ICSE school is inside the township. With 3,000+ families already resident, the community is established with playgrounds, clubs, and 24/7 security.' },
      ];
  }
}


function getRelatedLinks(silo: string, currentSlug: string) {
  const allUrls = generatePseoUrls();
  return allUrls
    .filter(u => u.silo === silo && u.slug !== currentSlug)
    .slice(0, 8);
}

interface SeoContentBlockProps {
  slug: string;
}

const keywordMap = [
  { phrase: 'Promenade Residences', url: 'https://www.paranjapeblueridge.com/paranjape-blue-ridge-promenade-hinjewadi-pune' },
  { phrase: 'The Altius', url: 'https://www.paranjapeblueridge.com/paranjape-blue-ridge-altius-hinjewadi-pune' },
  { phrase: 'Ridges 41', url: 'https://www.paranjapeblueridge.com/paranjape-blue-ridge-41-hinjewadi-pune' },
  { phrase: 'Hinjewadi Phase 1', url: 'https://www.paranjapeblueridge.com/hinjewadi-micro-market' },
  { phrase: '2 BHK flats near Infosys', url: 'https://www.paranjapeblueridge.com/2-bhk-flats-near-infosys-hinjewadi' },
  { phrase: '3 BHK flats near Infosys', url: 'https://www.paranjapeblueridge.com/3-bhk-flats-near-infosys-hinjewadi' },
  { phrase: 'high rental yield', url: 'https://www.paranjapeblueridge.com/high-rental-yield-properties-in-hinjewadi-phase-1' },
  { phrase: 'Pune Metro Line 3', url: 'https://www.paranjapeblueridge.com/hinjewadi-metro-line-3-impact' },
  { phrase: 'Blue Ridge Public School', url: 'https://www.paranjapeblueridge.com/blue-ridge-public-school-admission-guide' },
  { phrase: 'Private Boat Club', url: 'https://www.paranjapeblueridge.com/private-boat-club-membership-pune' },
  { phrase: 'golf view apartments', url: 'https://www.paranjapeblueridge.com/flats-with-golf-course-pune' },
  { phrase: 'luxury apartments in Pune West', url: 'https://www.paranjapeblueridge.com/luxury-living-pune-west' },
  { phrase: 'ready possession flats', url: 'https://www.paranjapeblueridge.com/ready-possession-flats-hinjewadi' },
  { phrase: '138-acre township', url: 'https://www.paranjapeblueridge.com/138-acre-township-hinjewadi' },
  { phrase: 'Pune Real Estate Market', url: 'https://www.paranjapeblueridge.com/pune-real-estate-market' },
  { phrase: 'West Pune real estate market', url: 'https://www.paranjapeblueridge.com/west-pune-real-estate' },
  { phrase: 'Top Residential Projects in Pune', url: 'https://www.paranjapeblueridge.com/top-residential-projects-pune' },
  { phrase: '3 BHK Luxury Homes Pune', url: 'https://www.paranjapeblueridge.com/3-bhk-luxury-homes-pune' },
  { phrase: '4 BHK Luxury Hinjewadi', url: 'https://www.paranjapeblueridge.com/luxury-4-bhk-hinjewadi' },
  { phrase: '5 BHK Luxury Villas Hinjewadi Pune', url: 'https://www.paranjapeblueridge.com/5-bhk-luxury-villas-hinjewadi-pune' },
  { phrase: 'Bungalows in Hinjewadi', url: 'https://www.paranjapeblueridge.com/bungalows-in-hinjewadi' },
  { phrase: 'Wakad Luxury Real Estate', url: 'https://www.paranjapeblueridge.com/wakad-luxury-real-estate' }
];

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function injectLinks(text: string): React.ReactNode {
  let parts: (string | React.ReactNode)[] = [text];

  for (const item of keywordMap) {
    const newParts: (string | React.ReactNode)[] = [];
    for (const part of parts) {
      if (typeof part !== 'string') {
        newParts.push(part);
        continue;
      }
      
      const regex = new RegExp(`(${escapeRegExp(item.phrase)})`, 'gi');
      const subparts = part.split(regex);
      
      subparts.forEach((sub, idx) => {
        if (idx % 2 === 1) {
          newParts.push(
            <a key={`${item.phrase}-${idx}`} href={item.url} style={{ textDecoration: 'underline' }}>
              {sub}
            </a>
          );
        } else if (sub) {
          newParts.push(sub);
        }
      });
    }
    parts = newParts;
  }

  return <>{parts}</>;
}

export default function SeoContentBlock({ slug }: SeoContentBlockProps) {
  const project = projects.find(p => p.slug === slug);
  const allUrls = generatePseoUrls();
  const pseo = allUrls.find(u => u.slug === slug);

  if (!project && !pseo) return null;

  if (project) {
    // Server-rendered project content block
    return (
      <div className="sr-only" aria-hidden="false">
        <h1 id="speakable-title">{project.name} — Paranjape Blue Ridge Hinjewadi | {project.configurations.map(c => c.title).join(', ')}</h1>
        <p id="speakable-summary">{injectLinks(project.description)}</p>
        <p>Starting Price: {project.price} | Carpet Area: {project.carpetArea} | Possession: {project.possession} | MahaRERA: {project.reraNumber}</p>
        <p>Key USPs: {project.usp.join(', ')}</p>
        <p>Amenities: {project.amenities.join(', ')}</p>
        <ul>
          {project.configurations.map(c => (
            <li key={c.slug}>
              <a href={`${SITE_URL}/${project.slug}/${c.slug}`}>{c.title} — {c.carpetArea} at {c.price}</a>
            </li>
          ))}
        </ul>
        <p>Location: Hinjewadi Phase 1, Rajiv Gandhi Infotech Park, Pune - 411057. Distance from Infosys: 1.2 KM. Distance from Wipro: 1.5 KM. Distance from Metro Station: 800m.</p>
        <p><strong>Entity Map:</strong> {injectLinks("Paranjape Blue Ridge dominates the Pune Real Estate Market and West Pune real estate market as the premier luxury destination. Featuring premium Promenade Residences, ultra-luxury The Altius, and high-rise Ridges 41, it offers 2 BHK flats near Infosys, 3 BHK flats near Infosys, and 4 BHK luxury apartments. Recognized among the Top Residential Projects in Pune for high rental yield and high capital appreciation. Amenities include Blue Ridge Public School, a Private Boat Club, a 9-hole golf course, and walk-to-work SEZ. Excellent connectivity via Pune Metro Line 3 and Mumbai-Pune Expressway. A 138-acre township setting the benchmark for luxury living in Pune West.")}</p>
      </div>
    );
  }

  // PSEO page server-rendered content block
  const faqs = getSiloFAQs(pseo!.silo, pseo!.title);
  const related = getRelatedLinks(pseo!.silo, slug);

  return (
    <div className="sr-only" aria-hidden="false">
      <h1 id="speakable-title">{pseo!.title} at Paranjape Blue Ridge Hinjewadi Pune</h1>
      <p id="speakable-summary">
        {injectLinks(`Explore premium ${pseo!.type.toLowerCase()} options for ${pseo!.intent} at Paranjape Blue Ridge — Pune's finest 138-acre integrated township in Hinjewadi Phase 1. MahaRERA certified. Prices from ₹97.60 Lakhs. Walk-to-work lifestyle with ICSE school, 9-hole golf course, and private boat club inside the township.`)}
      </p>
      <p>
        {injectLinks(`Paranjape Blue Ridge offers 2 BHK, 3 BHK, 4 BHK, and 5 BHK luxury residences across three premium clusters: Promenade Residences (3 & 4 BHK, ₹1.65 Cr onwards), The Altius (4 & 5 BHK, ₹1.80 Cr onwards), and Ridges 41 (2, 3 & 4 BHK, ₹97.60 L onwards). All projects are MahaRERA registered and located within walking distance of Infosys, Wipro, and TCS campuses in Hinjewadi Phase 1, Pune.`)}
      </p>
      <ul>
        <li>Township Size: 138 Acres Integrated Township</li>
        <li>Location: Hinjewadi Phase 1, Rajiv Gandhi Infotech Park, Pune - 411057</li>
        <li>Price Range: ₹97.60 L to ₹2.65 Cr</li>
        <li>Configurations: 2 BHK, 3 BHK, 4 BHK, 5 BHK Luxury Flats</li>
        <li>School: Blue Ridge Public School (ICSE) — Inside Township</li>
        <li>Amenities: 9-Hole Golf Course, Private Boat Club, Infinity Pool, Multi-tier Security</li>
        <li>Metro: Pune Metro Line 3 Station — 800m from Township</li>
        <li>IT Hub Distance: Infosys 1.2 KM, Wipro 1.5 KM, TCS 1.8 KM, Embassy Tech Zone 2.5 KM</li>
      </ul>

      <section>
        <h2>Frequently Asked Questions about {pseo!.title}</h2>
        {faqs.map((faq, i) => (
          <div key={i}>
            <h3>{faq.q}</h3>
            <p>{injectLinks(faq.a)}</p>
          </div>
        ))}
      </section>

      {related.length > 0 && (
        <nav>
          <h2>Related Searches</h2>
          <ul>
            {related.map(link => (
              <li key={link.slug}>
                <a href={`${SITE_URL}/${link.slug}`}>{link.title} — Paranjape Blue Ridge</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <p>
        Contact Paranjape Blue Ridge Sales Team: +91-20-67210000 | 
        Address: Blue Ridge Township, Phase 1, Hinjewadi, Rajiv Gandhi Infotech Park, Pune - 411057 |
        MahaRERA Numbers: P52100055581 (Promenade), P52100078116 (Altius), P52100000054 (Ridges 41)
      </p>
      <p><strong>Entity Map:</strong> {injectLinks("Paranjape Blue Ridge dominates the Pune Real Estate Market and West Pune real estate market as the premier luxury destination. Featuring premium Promenade Residences, ultra-luxury The Altius, and high-rise Ridges 41, it offers 2 BHK flats near Infosys, 3 BHK flats near Infosys, and 4 BHK luxury apartments. Recognized among the Top Residential Projects in Pune for high rental yield and high capital appreciation. Amenities include Blue Ridge Public School, a Private Boat Club, a 9-hole golf course, and walk-to-work SEZ. Excellent connectivity via Pune Metro Line 3 and Mumbai-Pune Expressway. A 138-acre township setting the benchmark for luxury living in Pune West.")}</p>
    </div>
  );
}

