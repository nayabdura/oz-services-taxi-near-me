import { NextRequest, NextResponse } from 'next/server';
import getDB from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = getDB();
    // Try by ID first, then by slug
    const blog = db.prepare('SELECT * FROM blogs WHERE id = ? OR slug = ?').get(id, id);
    if (!blog) return NextResponse.json({ error: 'Blog not found.' }, { status: 404 });
    return NextResponse.json({ blog });
  } catch (error) {
    console.error('GET /api/blogs/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const { title, slug, excerpt, content, category, image_url, meta_title, meta_description, published, featured, read_time } = body;

    const db = getDB();
    db.prepare(`
      UPDATE blogs SET
        title = ?, slug = ?, excerpt = ?, content = ?, category = ?,
        image_url = ?, meta_title = ?, meta_description = ?,
        published = ?, featured = ?, read_time = ?,
        updated_at = datetime('now')
      WHERE id = ?
    `).run(title, slug, excerpt || '', content || '', category || 'General', image_url || '', meta_title || title, meta_description || '', published ? 1 : 0, featured ? 1 : 0, read_time || 5, id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT /api/blogs/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update blog.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { id } = await params;
    const db = getDB();
    db.prepare('DELETE FROM blogs WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/blogs/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete blog.' }, { status: 500 });
  }
}
