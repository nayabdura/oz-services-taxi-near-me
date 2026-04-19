import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Pricing } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const pricing = await Pricing.find().sort({ sort_order: 1 });
    return NextResponse.json(pricing);
  } catch (error) {
    console.error('Pricing API error', error);
    return NextResponse.json({ error: 'Failed to fetch pricing' }, { status: 500 });
  }
}
