import { NextRequest, NextResponse } from 'next/server';
import getDB from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const db = getDB();
    const pricing = db.prepare('SELECT * FROM pricing ORDER BY sort_order ASC').all();
    return NextResponse.json({ pricing });
  } catch (error) {
    console.error('GET /api/pricing error:', error);
    return NextResponse.json({ error: 'Failed to fetch pricing.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const body = await req.json();
    const { name, price, unit, description, features, popular, sort_order } = body;

    if (!name || !price) return NextResponse.json({ error: 'Name and price are required.' }, { status: 400 });

    const db = getDB();
    const result = db.prepare(`
      INSERT INTO pricing (name, price, unit, description, features, popular, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(name, price, unit || 'per ride', description || '', JSON.stringify(features || []), popular ? 1 : 0, sort_order || 0);

    return NextResponse.json({ success: true, id: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    console.error('POST /api/pricing error:', error);
    return NextResponse.json({ error: 'Failed to create pricing.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const body = await req.json();
    const { id, name, price, unit, description, features, popular, sort_order } = body;
    if (!id) return NextResponse.json({ error: 'ID is required.' }, { status: 400 });

    const db = getDB();
    db.prepare(`
      UPDATE pricing SET name=?, price=?, unit=?, description=?, features=?, popular=?, sort_order=? WHERE id=?
    `).run(name, price, unit, description, JSON.stringify(features || []), popular ? 1 : 0, sort_order || 0, id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT /api/pricing error:', error);
    return NextResponse.json({ error: 'Failed to update pricing.' }, { status: 500 });
  }
}
