import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic params
    const title = searchParams.get('title') || 'Paranjape Blue Ridge';
    const subtitle = searchParams.get('subtitle') || searchParams.get('config') || searchParams.get('intent') || '138-Acre Integrated Township in Hinjewadi Phase 1, Pune';
    const highlight = searchParams.get('highlight'); // e.g., "Starting ₹1.2 Cr"
    const type = searchParams.get('type') || 'Sovereign Portal'; // 'Project', 'Insight', 'Floor Plan', 'Market Data'
    const isNri = searchParams.get('nri') === 'true';
    const roiData = searchParams.get('roi'); // e.g. "9.8%"
    const appreciationData = searchParams.get('appreciation'); // e.g. "12%"

    // Deep Midnight Luxury Palette
    const background = 'linear-gradient(135deg, #040a14 0%, #0d1f38 100%)';
    const goldAccent = '#dfb15b';
    const emeraldAccent = '#10b981';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            background: background,
            padding: '60px',
            fontFamily: 'system-ui, sans-serif',
            color: '#f8fafc',
            border: `6px solid rgba(223, 177, 91, 0.4)`,
          }}
        >
          {/* Top Row: Brand & Type Badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', letterSpacing: '3px', color: goldAccent, textTransform: 'uppercase', fontSize: 32, fontWeight: 800 }}>
              Paranjape Schemes
            </div>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {isNri && (
                <div
                  style={{
                    padding: '10px 20px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: `1px solid ${emeraldAccent}`,
                    borderRadius: '50px',
                    color: emeraldAccent,
                    fontSize: 20,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                  }}
                >
                  🌐 NRI Global Desk
                </div>
              )}
              <div
                style={{
                  padding: '10px 24px',
                  background: 'rgba(223, 177, 91, 0.1)',
                  border: `1px solid ${goldAccent}`,
                  borderRadius: '50px',
                  color: goldAccent,
                  fontSize: 22,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                }}
              >
                {type}
              </div>
            </div>
          </div>

          {/* Middle Row: Titles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '950px' }}>
            <div
              style={{
                fontSize: title.length > 50 ? 56 : 72,
                fontWeight: 800,
                lineHeight: 1.1,
                margin: 0,
                color: '#ffffff',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 32,
                color: 'rgba(248, 250, 252, 0.85)',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Bottom Row: Highlight & Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end' }}>
            {highlight ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '4px', background: goldAccent }} />
                <span style={{ fontSize: 42, color: goldAccent, fontWeight: 700 }}>
                  {highlight}
                </span>
              </div>
            ) : type === 'Market Data' ? (
              <div style={{ display: 'flex', fontSize: 32, color: 'rgba(248, 250, 252, 0.9)', gap: '40px' }}>
                 <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 16, color: 'rgba(248, 250, 252, 0.5)', textTransform: 'uppercase', letterSpacing: '2px' }}>Avg Rental Yield</span>
                    <span style={{ color: emeraldAccent, fontWeight: 700, fontSize: 48 }}>{roiData || '4.5%'}</span>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 16, color: 'rgba(248, 250, 252, 0.5)', textTransform: 'uppercase', letterSpacing: '2px' }}>YOY Appreciation</span>
                    <span style={{ color: goldAccent, fontWeight: 700, fontSize: 48 }}>{appreciationData || '11.2%'}</span>
                 </div>
              </div> 
            ) : (
              <div style={{ display: 'flex', fontSize: 24, color: 'rgba(248, 250, 252, 0.7)', gap: '20px' }}>
                 <span style={{ color: emeraldAccent }}>✦ 138-Acre Township</span>
                 <span style={{ color: goldAccent }}>✦ Walk-to-Work SEZ</span>
                 <span>✦ Golf Course</span>
              </div> 
            )}
            
            <div style={{ fontSize: 28, color: 'rgba(248, 250, 252, 0.5)', letterSpacing: '2px', fontWeight: 600 }}>
              paranjapeblueridge.com
            </div>
          </div>
          
          {/* Architectural Overlay Circles */}
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: '400px', height: '400px', borderTopLeftRadius: '100%', borderTop: `2px solid rgba(223, 177, 91, 0.2)`, borderLeft: `2px solid rgba(223, 177, 91, 0.2)`, zIndex: -1 }} />
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: '300px', height: '300px', borderTopLeftRadius: '100%', borderTop: `2px solid rgba(223, 177, 91, 0.3)`, borderLeft: `2px solid rgba(223, 177, 91, 0.3)`, zIndex: -1 }} />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
          'Cloudflare-CDN-Cache-Control': 'max-age=604800, stale-while-revalidate=86400',
          'Cache-Tag': 'blueridge-og,blueridge-images',
          'X-Content-Type-Options': 'nosniff',
        },
      }
    );
  } catch (e: any) {
    console.error('Failed to generate OG image', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
