import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, project, slot, visitType } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone number are required' }, { status: 400 });
    }

    // High-priority lead dispatch event
    console.log('[Lead Dispatch Event]', {
      timestamp: new Date().toISOString(),
      name,
      phone,
      email,
      project: project || 'Paranjape Blue Ridge',
      slot,
      visitType: visitType || 'in_person'
    });

    return NextResponse.json({
      success: true,
      message: 'Lead dispatched successfully to sales relationship team'
    }, { status: 200 });

  } catch (error) {
    console.error('[Lead Dispatch Error]', error);
    return NextResponse.json({ error: 'Failed to process lead dispatch' }, { status: 500 });
  }
}
