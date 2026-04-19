import { NextRequest, NextResponse } from 'next/server';
import getDB from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const db = getDB();
    const { searchParams } = new URL(req.url);
    const published = searchParams.get('published');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = 'SELECT id, title, slug, excerpt, category, image_url, author, published, featured, read_time, created_at FROM blogs WHERE 1=1';
    const params: (string | number)[] = [];

    if (published === 'true') { query += ' AND published = 1'; }
    if (category && category !== 'All') { query += ' AND category = ?'; params.push(category); }
    query += ' ORDER BY created_at DESC LIMIT ?';
    params.push(limit);

    const blogs = db.prepare(query).all(...params);
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error('GET /api/blogs error:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const body = await req.json();
    const { title, slug, excerpt, content, category, image_url, meta_title, meta_description, published, featured, read_time } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required.' }, { status: 400 });
    }

    const db = getDB();
    const result = db.prepare(`
      INSERT INTO blogs (title, slug, excerpt, content, category, image_url, meta_title, meta_description, published, featured, read_time, author)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, slug, excerpt || '', content || '', category || 'General', image_url || '', meta_title || title, meta_description || excerpt || '', published ? 1 : 0, featured ? 1 : 0, read_time || 5, admin.name);

    return NextResponse.json({ success: true, id: result.lastInsertRowid }, { status: 201 });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json({ error: 'A blog with this slug already exists.' }, { status: 409 });
    }
    console.error('POST /api/blogs error:', error);
    return NextResponse.json({ error: 'Failed to create blog.' }, { status: 500 });
  }
}
