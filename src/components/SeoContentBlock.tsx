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

export default function SeoContentBlock({ slug }: SeoContentBlockProps) {
  const project = projects.find(p => p.slug === slug);
  const allUrls = generatePseoUrls();
  const pseo = allUrls.find(u => u.slug === slug);

  if (!project && !pseo) return null;

  if (project) {
    // Server-rendered project content block
    return (
      <div
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          borderWidth: 0,
        }}
        aria-hidden="false"
      >
        <h1>{project.name} — Paranjape Blue Ridge Hinjewadi | {project.configurations.map(c => c.title).join(', ')}</h1>
        <p>{project.description}</p>
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
      </div>
    );
  }

  // PSEO page server-rendered content block
  const faqs = getSiloFAQs(pseo!.silo, pseo!.title);
  const related = getRelatedLinks(pseo!.silo, slug);

  return (
    <div
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        whiteSpace: 'nowrap',
        borderWidth: 0,
      }}
      aria-hidden="false"
    >
      <h1>{pseo!.title} at Paranjape Blue Ridge Hinjewadi Pune</h1>
      <p>
        Explore premium {pseo!.type.toLowerCase()} options for {pseo!.intent} at Paranjape Blue Ridge — 
        Pune&apos;s finest 138-acre integrated township in Hinjewadi Phase 1. 
        MahaRERA certified. Prices from ₹97.60 Lakhs. Walk-to-work lifestyle with ICSE school, 
        9-hole golf course, and private boat club inside the township.
      </p>
      <p>
        Paranjape Blue Ridge offers 2 BHK, 3 BHK, 4 BHK, and 5 BHK luxury residences across three premium clusters: 
        Promenade Residences (3 &amp; 4 BHK, ₹1.65 Cr onwards), The Altius (4 &amp; 5 BHK, ₹1.80 Cr onwards), 
        and Ridges 41 (2, 3 &amp; 4 BHK, ₹97.60 L onwards). All projects are MahaRERA registered and 
        located within walking distance of Infosys, Wipro, and TCS campuses in Hinjewadi Phase 1, Pune.
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
            <p>{faq.a}</p>
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
    </div>
  );
}
