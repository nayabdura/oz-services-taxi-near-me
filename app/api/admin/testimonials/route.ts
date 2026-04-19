import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Testimonial } from '@/lib/models';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const items = await Testimonial.find().sort({ created_at: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    await connectDB();
    const item = await Testimonial.create(body);
    return NextResponse.json({ ...item.toObject(), id: item._id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add' }, { status: 500 });
  }
}
