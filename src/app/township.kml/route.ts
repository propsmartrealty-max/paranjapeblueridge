export const runtime = 'edge';

export async function GET() {
  const kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Paranjape Blue Ridge 138-Acre Integrated Township, Hinjewadi Phase 1, Pune</name>
    <description>Official Geographic Boundaries and Placemarks for Paranjape Blue Ridge Township, Pune, Maharashtra, India.</description>
    
    <!-- Township Placemark -->
    <Placemark>
      <name>Paranjape Blue Ridge Sovereign Sales Gallery and Township</name>
      <description>138-Acre Integrated Township with 9-Hole Golf Course, Boat Club, and ICSE School in Hinjewadi Phase 1, Pune.</description>
      <Point>
        <coordinates>73.7370331,18.5786825,560</coordinates>
      </Point>
    </Placemark>

    <!-- Promenade Residences -->
    <Placemark>
      <name>Promenade Residences - Paranjape Blue Ridge</name>
      <description>Hinjewadi's Tallest Riverfront Residential Tower - Luxury 2, 3 and 4 BHK Apartments (MahaRERA: P52100055581)</description>
      <Point>
        <coordinates>73.7365000,18.5791000,560</coordinates>
      </Point>
    </Placemark>

    <!-- The Altius -->
    <Placemark>
      <name>The Altius - Ultra-Luxury Waterfront Residences</name>
      <description>Exclusive 4 and 5 BHK River-Facing Suites with Golf Course Views (MahaRERA: P52100000054)</description>
      <Point>
        <coordinates>73.7378000,18.5798000,560</coordinates>
      </Point>
    </Placemark>

    <!-- Ridges 41 -->
    <Placemark>
      <name>Ridges 41 - 41-Storey MiVAN High-Rise</name>
      <description>41-Storey Monolithic MiVAN Smart Homes in Hinjewadi Phase 1 (MahaRERA: P52100000054)</description>
      <Point>
        <coordinates>73.7358000,18.5779000,560</coordinates>
      </Point>
    </Placemark>

    <!-- Blue Ridge Public School -->
    <Placemark>
      <name>Blue Ridge Public School (ICSE)</name>
      <description>In-Campus ICSE-Affiliated School providing vehicular-segregated walk-to-school safety for township residents.</description>
      <Point>
        <coordinates>73.7382000,18.5781000,560</coordinates>
      </Point>
    </Placemark>

    <!-- Blue Ridge Boat Club -->
    <Placemark>
      <name>Blue Ridge Boat Club on Mula River</name>
      <description>Pune's premier private riverfront boat club offering kayaking, rowing, and riverside dining.</description>
      <Point>
        <coordinates>73.7389000,18.5805000,555</coordinates>
      </Point>
    </Placemark>

    <!-- Executive Golf Course -->
    <Placemark>
      <name>Blue Ridge 9-Hole Executive Golf Course</name>
      <description>Private 9-hole golf course and floodlit driving range integrated within the township.</description>
      <Point>
        <coordinates>73.7360000,18.5768000,560</coordinates>
      </Point>
    </Placemark>

    <!-- Pune Metro Line 3 Gateway Station -->
    <Placemark>
      <name>Pune Metro Line 3 - Hinjewadi Gateway Station</name>
      <description>Upcoming elevated metro station 800m from Blue Ridge connecting directly to Shivajinagar CBD in 32 minutes.</description>
      <Point>
        <coordinates>73.7410000,18.5820000,565</coordinates>
      </Point>
    </Placemark>
  </Document>
</kml>`;

  return new Response(kml, {
    headers: {
      'Content-Type': 'application/vnd.google-earth.kml+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate',
    },
  });
}
