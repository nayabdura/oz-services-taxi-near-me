import { NextRequest, NextResponse } from 'next/server';
import getDB from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { sendBookingConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email';

export async function GET(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    const db = getDB();
    const bookings = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC').all();
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('GET /api/bookings error:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, pickup, dropoff, date, time, service_type, passengers, notes } = body;

    if (!name || !email || !pickup || !dropoff) {
      return NextResponse.json({ error: 'Name, email, pickup, and dropoff are required.' }, { status: 400 });
    }

    const db = getDB();
    const result = db.prepare(`
      INSERT INTO bookings (name, email, phone, pickup, dropoff, date, time, service_type, passengers, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      name, email, phone || '', pickup, dropoff,
      date || '', time || '', service_type || 'standard',
      passengers || 1, notes || ''
    );

    const bookingId = result.lastInsertRowid;
    const bookingData = { name, email, phone: phone || '', pickup, dropoff, date: date || '', time: time || '', service_type: service_type || 'standard', passengers: passengers || 1, notes: notes || '', bookingId };

    // Send emails in background (don't block response)
    Promise.allSettled([
      sendBookingConfirmationEmail(bookingData),
      sendAdminNotificationEmail(bookingData),
    ]).catch(console.error);

    return NextResponse.json({ success: true, bookingId }, { status: 201 });
  } catch (error) {
    console.error('POST /api/bookings error:', error);
    return NextResponse.json({ error: 'Failed to create booking.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    const { id, status } = await req.json();
    if (!id || !status) return NextResponse.json({ error: 'id and status are required.' }, { status: 400 });
    const db = getDB();
    db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PATCH /api/bookings error:', error);
    return NextResponse.json({ error: 'Failed to update booking.' }, { status: 500 });
  }
}
