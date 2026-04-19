import { NextRequest, NextResponse } from 'next/server';
import getDB from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { id } = await params;
    const db = getDB();
    db.prepare('DELETE FROM testimonials WHERE id = ?').run(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/admin/testimonials/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial.' }, { status: 500 });
  }
}
