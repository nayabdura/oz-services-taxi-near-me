import { NextRequest, NextResponse } from 'next/server';
import getDB from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

// Admin stats for dashboard
export async function GET(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const db = getDB();

    const blogsCount = (db.prepare('SELECT COUNT(*) as count FROM blogs').get() as { count: number }).count;
    const publishedBlogs = (db.prepare('SELECT COUNT(*) as count FROM blogs WHERE published = 1').get() as { count: number }).count;
    const bookingsCount = (db.prepare('SELECT COUNT(*) as count FROM bookings').get() as { count: number }).count;
    const pendingBookings = (db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'").get() as { count: number }).count;
    const contactsCount = (db.prepare('SELECT COUNT(*) as count FROM contacts').get() as { count: number }).count;
    const unreadContacts = (db.prepare("SELECT COUNT(*) as count FROM contacts WHERE status = 'unread'").get() as { count: number }).count;

    const recentBookings = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC LIMIT 5').all();
    const recentContacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5').all();

    return NextResponse.json({
      stats: { blogsCount, publishedBlogs, bookingsCount, pendingBookings, contactsCount, unreadContacts },
      recentBookings,
      recentContacts,
    });
  } catch (error) {
    console.error('GET /api/admin/stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats.' }, { status: 500 });
  }
}
