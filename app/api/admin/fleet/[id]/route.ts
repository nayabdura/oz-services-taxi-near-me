import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Fleet } from '@/lib/models';
import { requireAdmin } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    await connectDB();
    const car = await Fleet.findByIdAndUpdate(id, body, { new: true });
    if (!car) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ...car.toObject(), id: car._id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const car = await Fleet.findByIdAndDelete(id);
    if (!car) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete vehicle' }, { status: 500 });
  }
}
