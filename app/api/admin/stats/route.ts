import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { Blog, Booking, Contact } from '@/lib/models';

export async function GET(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    await connectDB();

    const blogsCount = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ published: 1 });
    const bookingsCount = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const contactsCount = await Contact.countDocuments();
    const unreadContacts = await Contact.countDocuments({ status: 'unread' });

    const recentBookings = await Booking.find().sort({ created_at: -1 }).limit(5);
    const recentContacts = await Contact.find().sort({ created_at: -1 }).limit(5);

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
