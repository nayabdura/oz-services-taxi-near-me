import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Fleet } from '@/lib/models';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const fleet = await Fleet.find().sort({ sort_order: 1 });
    return NextResponse.json(fleet);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch fleet' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    await connectDB();
    const car = await Fleet.create(body);
    return NextResponse.json({ ...car.toObject(), id: car._id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add vehicle' }, { status: 500 });
  }
}
