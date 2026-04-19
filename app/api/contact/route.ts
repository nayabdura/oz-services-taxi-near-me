import { NextRequest, NextResponse } from 'next/server';
import getDB from '@/lib/db';
import { sendEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const db = getDB();
    db.prepare(`
      INSERT INTO contacts (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, email, phone || '', subject || 'General Inquiry', message);

    // Send email notification to Admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@ozservices.com.au',
      subject: `New Contact Form Submission: ${subject || 'General Inquiry'}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true, message: 'Message received. We will contact you shortly.' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/contact error:', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { requireAdmin } = await import('@/lib/auth');
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const db = getDB();
    const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('GET /api/contact error:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts.' }, { status: 500 });
  }
}
