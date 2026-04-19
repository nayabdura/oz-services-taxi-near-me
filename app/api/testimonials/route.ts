import { NextRequest, NextResponse } from 'next/server';
import getDB from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const db = getDB();
    const testimonials = db.prepare('SELECT * FROM testimonials WHERE published = 1 ORDER BY created_at DESC').all();
    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error('GET /api/testimonials error:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const body = await req.json();
    const { name, location, rating, message, avatar, published } = body;
    if (!name || !message) return NextResponse.json({ error: 'Name and message are required.' }, { status: 400 });

    const db = getDB();
    const result = db.prepare(`
      INSERT INTO testimonials (name, location, rating, message, avatar, published)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, location || '', rating || 5, message, avatar || '', published ? 1 : 0);

    return NextResponse.json({ success: true, id: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    console.error('POST /api/testimonials error:', error);
    return NextResponse.json({ error: 'Failed to create testimonial.' }, { status: 500 });
  }
}
