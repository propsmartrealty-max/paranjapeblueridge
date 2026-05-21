import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get('title') || 'Paranjape Blue Ridge';
  const price = searchParams.get('price') || '';
  const config = searchParams.get('config') || '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1a2e 50%, #0a1525 100%)',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 70% 40%, rgba(200,160,80,0.12) 0%, transparent 60%)',
          }}
        />

        {/* Gold border top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, #c8a050 30%, #e8c57a 50%, #c8a050 70%, transparent 100%)',
          }}
        />

        {/* MahaRERA ribbon */}
        <div
          style={{
            position: 'absolute',
            top: '28px',
            right: '48px',
            background: 'rgba(200,160,80,0.12)',
            border: '1px solid rgba(200,160,80,0.3)',
            borderRadius: '100px',
            padding: '6px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#4ade80',
            }}
          />
          <span style={{ color: '#c8a050', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' }}>
            MahaRERA Certified
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            padding: '0 80px',
          }}
        >
          {/* Label */}
          <div
            style={{
              color: '#c8a050',
              fontSize: '12px',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Paranjape Blue Ridge · Hinjewadi Phase 1 · Pune
          </div>

          {/* Title */}
          <div
            style={{
              color: '#f0e8d8',
              fontSize: title.length > 30 ? '52px' : '62px',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '24px',
              maxWidth: '800px',
            }}
          >
            {title}
          </div>

          {/* Badges row */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {price && (
              <div
                style={{
                  background: 'rgba(200,160,80,0.15)',
                  border: '1px solid rgba(200,160,80,0.4)',
                  borderRadius: '12px',
                  padding: '10px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: '#c8a050', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' }}>
                  Starting Price
                </span>
                <span style={{ color: '#f0e8d8', fontSize: '28px', fontWeight: 700, marginTop: '4px' }}>
                  ₹ {price}
                </span>
              </div>
            )}
            {config && (
              <div
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '10px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: '#8fa8c0', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' }}>
                  Configuration
                </span>
                <span style={{ color: '#f0e8d8', fontSize: '20px', fontWeight: 600, marginTop: '4px' }}>
                  {config}
                </span>
              </div>
            )}
            <div
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '10px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ color: '#8fa8c0', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' }}>
                Township
              </span>
              <span style={{ color: '#f0e8d8', fontSize: '20px', fontWeight: 600, marginTop: '4px' }}>
                138 Acres
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(200,160,80,0.2)',
            padding: '20px 80px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#8fa8c0', fontSize: '14px', letterSpacing: '2px' }}>
            paranjapeblueridge.com
          </span>
          <span style={{ color: '#8fa8c0', fontSize: '13px' }}>
            9-Hole Golf Course · Private Boat Club · ICSE School
          </span>
        </div>

        {/* Gold bottom border */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, #c8a050 30%, #e8c57a 50%, #c8a050 70%, transparent 100%)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
