import { NextRequest, NextResponse } from 'next/server';
import getDB from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const db = getDB();
    const testimonials = db.prepare('SELECT * FROM testimonials ORDER BY created_at DESC').all();
    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error('GET /api/admin/testimonials error:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const body = await req.json();
    const { id, published } = body;
    
    if (!id) return NextResponse.json({ error: 'ID is required.' }, { status: 400 });

    const db = getDB();
    db.prepare('UPDATE testimonials SET published = ? WHERE id = ?').run(published ? 1 : 0, id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PATCH /api/admin/testimonials error:', error);
    return NextResponse.json({ error: 'Failed to update testimonial.' }, { status: 500 });
  }
}
