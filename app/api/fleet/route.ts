import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Fleet } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const fleet = await Fleet.find({ active: 1 }).sort({ sort_order: 1 });
    return NextResponse.json(fleet);
  } catch (error) {
    console.error('Fleet API error', error);
    return NextResponse.json({ error: 'Failed to fetch fleet' }, { status: 500 });
  }
}
