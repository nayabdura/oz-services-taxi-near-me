import { NextRequest, NextResponse } from 'next/server';
import getDB from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = getDB();
    const fleet = db.prepare('SELECT * FROM fleet ORDER BY sort_order ASC').all();

    return NextResponse.json(fleet);
  } catch (error) {
    console.error('Error fetching fleet admin:', error);
    return NextResponse.json({ error: 'Failed to fetch fleet' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { name, price, description, image_url, active, sort_order } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const db = getDB();
    const stmt = db.prepare(
      'INSERT INTO fleet (name, price, description, image_url, active, sort_order) VALUES (?, ?, ?, ?, ?, ?)'
    );

    const result = stmt.run(
      name,
      price || null,
      description || null,
      image_url || null,
      active !== undefined ? active : 1,
      sort_order || 0
    );

    const newCar = db.prepare('SELECT * FROM fleet WHERE id = ?').get(result.lastInsertRowid);

    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    console.error('Error creating fleet car:', error);
    return NextResponse.json({ error: 'Failed to create fleet car' }, { status: 500 });
  }
}
