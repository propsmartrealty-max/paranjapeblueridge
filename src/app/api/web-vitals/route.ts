import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const text = await req.text();
    if (!text) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    
    const body = JSON.parse(text);
    
    // In a production environment, this would be piped into BigQuery, Datadog,
    // or Vercel Analytics via an ingest pipeline.
    // For now, we'll log it on the edge for monitoring purposes.
    console.log('[Web Vitals]', body);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[Web Vitals Error]', error);
    return NextResponse.json({ error: 'Failed to ingest web vitals' }, { status: 500 });
  }
}
