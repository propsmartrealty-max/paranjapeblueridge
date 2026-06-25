import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic params
    const title = searchParams.get('title') || 'Paranjape Blue Ridge';
    
    // We allow mapping from 'config', 'intent', or 'subtitle' to be flexible with existing usage
    const subtitle = searchParams.get('subtitle') || searchParams.get('config') || searchParams.get('intent') || '138-Acre Integrated Township in Hinjewadi, Pune';
    const highlight = searchParams.get('highlight'); // e.g., "Starting ₹1.2 Cr"
    const type = searchParams.get('type') || 'Sovereign Portal'; // 'Project', 'Insight', 'Floor Plan'

    // The dark architectural background gradient
    const background = 'linear-gradient(135deg, #0a192f 0%, #060d1a 100%)';
    const goldAccent = '#D4AF37'; // the text-gold color from Tailwind

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
            color: '#FDFBF7', // warm-white
            border: `6px solid rgba(212, 175, 55, 0.4)`, // subtle gold border
          }}
        >
          {/* Top Row: Brand & Type Badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', letterSpacing: '3px', color: goldAccent, textTransform: 'uppercase', fontSize: 32, fontWeight: 800 }}>
              Paranjape Schemes
            </div>
            
            <div
              style={{
                padding: '10px 24px',
                background: 'rgba(212, 175, 55, 0.1)',
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

          {/* Middle Row: Titles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '950px' }}>
            <div
              style={{
                fontSize: title.length > 50 ? 60 : 76,
                fontWeight: 800,
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 34,
                color: 'rgba(253, 251, 247, 0.8)',
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
            ) : (
              <div style={{ display: 'flex', fontSize: 24, color: 'rgba(253, 251, 247, 0.6)', gap: '20px' }}>
                 <span>✦ 138-Acre Township</span>
                 <span>✦ SEZ Walk-to-Work</span>
              </div> 
            )}
            
            <div style={{ fontSize: 28, color: 'rgba(253, 251, 247, 0.5)', letterSpacing: '2px', fontWeight: 600 }}>
              www.paranjapeblueridge.com
            </div>
          </div>
          
          {/* Architectural Lines overlay */}
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: '400px', height: '400px', borderTopLeftRadius: '100%', borderTop: `2px solid rgba(212, 175, 55, 0.2)`, borderLeft: `2px solid rgba(212, 175, 55, 0.2)`, zIndex: -1 }} />
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: '300px', height: '300px', borderTopLeftRadius: '100%', borderTop: `2px solid rgba(212, 175, 55, 0.3)`, borderLeft: `2px solid rgba(212, 175, 55, 0.3)`, zIndex: -1 }} />
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: '200px', height: '200px', borderTopLeftRadius: '100%', borderTop: `2px solid rgba(212, 175, 55, 0.4)`, borderLeft: `2px solid rgba(212, 175, 55, 0.4)`, zIndex: -1 }} />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error('Failed to generate OG image', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
