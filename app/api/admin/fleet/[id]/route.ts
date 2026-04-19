import { NextRequest, NextResponse } from 'next/server';
import getDB from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // In Next.js 15 app router, params is a Promise
) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const p = await params;
    const id = p.id;
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const body = await req.json();
    const { name, price, description, image_url, active, sort_order } = body;

    const db = getDB();
    const existing = db.prepare('SELECT * FROM fleet WHERE id = ?').get(id);

    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const stmt = db.prepare(
      'UPDATE fleet SET name = ?, price = ?, description = ?, image_url = ?, active = ?, sort_order = ? WHERE id = ?'
    );

    stmt.run(
      name !== undefined ? name : (existing as any).name,
      price !== undefined ? price : (existing as any).price,
      description !== undefined ? description : (existing as any).description,
      image_url !== undefined ? image_url : (existing as any).image_url,
      active !== undefined ? active : (existing as any).active,
      sort_order !== undefined ? sort_order : (existing as any).sort_order,
      id
    );

    const updated = db.prepare('SELECT * FROM fleet WHERE id = ?').get(id);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating fleet car:', error);
    return NextResponse.json({ error: 'Failed to update fleet car' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const p = await params;
    const id = p.id;
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const db = getDB();
    db.prepare('DELETE FROM fleet WHERE id = ?').run(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting fleet car:', error);
    return NextResponse.json({ error: 'Failed to delete fleet car' }, { status: 500 });
  }
}
