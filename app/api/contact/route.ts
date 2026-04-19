import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Contact } from '@/lib/models';
import { requireAdmin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectDB();
    const contact = await Contact.create({ ...body, status: 'unread' });
    return NextResponse.json({ ...contact.toObject(), id: contact._id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const contacts = await Contact.find().sort({ created_at: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
