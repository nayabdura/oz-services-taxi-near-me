import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Booking } from '@/lib/models';
import { requireAdmin } from '@/lib/auth';

// Public can POST a booking, only Admin can GET/PUT/DELETE
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectDB();
    const booking = await Booking.create(body);
    return NextResponse.json({ ...booking.toObject(), id: booking._id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const bookings = await Booking.find().sort({ created_at: -1 });
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
