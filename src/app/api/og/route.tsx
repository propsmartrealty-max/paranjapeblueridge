import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Paranjape Blue Ridge Township Hinjewadi';
      
    const hasIntent = searchParams.has('intent');
    const intent = hasIntent ? searchParams.get('intent') : 'Premium Luxury Apartments in Pune';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a192f', // Navy background
            backgroundImage: 'linear-gradient(to bottom right, #0a192f, #050b14)',
            color: '#f8f4e6', // Warm white text
            fontFamily: 'system-ui, sans-serif',
            position: 'relative',
            padding: '40px',
          }}
        >
          {/* Subtle gold accent border */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '20px',
              bottom: '20px',
              border: '2px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '24px',
            }}
          />

          {/* Branding */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                color: '#d4af37', // Gold
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: '4px',
                textTransform: 'uppercase',
              }}
            >
              Paranjape Blue Ridge
            </div>
          </div>

          {/* Dynamic Title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              textAlign: 'center',
              lineHeight: 1.1,
              marginBottom: '24px',
              maxWidth: '900px',
              backgroundClip: 'text',
              color: '#ffffff',
            }}
          >
            {title}
          </div>

          {/* Subtitle / Intent */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: '#d4af37',
              textAlign: 'center',
              maxWidth: '800px',
              marginBottom: '40px',
            }}
          >
            {intent}
          </div>

          {/* Footer Highlights */}
          <div
            style={{
              display: 'flex',
              gap: '30px',
              marginTop: 'auto',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '30px',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex', fontSize: 24, color: '#a0aec0' }}>
              ✦ 138-Acre Township
            </div>
            <div style={{ display: 'flex', fontSize: 24, color: '#a0aec0' }}>
              ✦ Walk-to-Work SEZ
            </div>
            <div style={{ display: 'flex', fontSize: 24, color: '#a0aec0' }}>
              ✦ 9-Hole Golf Course
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
