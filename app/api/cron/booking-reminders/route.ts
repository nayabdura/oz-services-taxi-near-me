import { NextResponse } from 'next/server';
import getDB from '@/lib/db';

// Vercel Cron Job route — runs every day at 8am EST
// Configure in vercel.json: { "crons": [{ "path": "/api/cron/booking-reminders", "schedule": "0 13 * * *" }] }
export async function GET(request: Request) {
  // Verify it's a legitimate Vercel cron call
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const db = getDB();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    // Get all confirmed bookings for tomorrow
    const upcomingBookings = db.prepare(
      `SELECT * FROM bookings WHERE date = ? AND status IN ('pending', 'confirmed') ORDER BY time ASC`
    ).all(tomorrowStr) as Array<{
      id: number; name: string; email: string; phone: string;
      pickup: string; dropoff: string; date: string; time: string;
      service_type: string; passengers: number;
    }>;

    const { sendEmail } = await import('@/lib/email');

    let sent = 0;
    for (const booking of upcomingBookings) {
      await sendEmail({
        to: booking.email,
        subject: `Reminder: Your Oz Services Taxi Tomorrow at ${booking.time}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 32px; background: #F8FAFC; border-radius: 12px;">
            <h2 style="color: #0F172A; margin: 0 0 16px;">📅 Ride Reminder — Tomorrow!</h2>
            <p style="color: #475569; margin: 0 0 20px;">Hi <strong>${booking.name}</strong>, this is a friendly reminder about your upcoming Oz Services taxi ride.</p>
            <div style="background: white; border: 1px solid #E2E8F0; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
              <p style="margin: 0 0 8px; color: #64748B; font-size: 13px;">📍 Pickup: <strong style="color:#0F172A;">${booking.pickup}</strong></p>
              <p style="margin: 0 0 8px; color: #64748B; font-size: 13px;">📍 Drop-off: <strong style="color:#0F172A;">${booking.dropoff}</strong></p>
              <p style="margin: 0; color: #64748B; font-size: 13px;">🕐 Time: <strong style="color:#2563EB;">${booking.date} at ${booking.time}</strong></p>
            </div>
            <p style="color: #475569; font-size: 14px;">Your driver will call you before arriving. For changes, call us: <a href="tel:${process.env.NEXT_PUBLIC_PHONE}" style="color: #2563EB;">${process.env.NEXT_PUBLIC_PHONE}</a></p>
          </div>
        `,
      });
      sent++;
    }

    console.log(`[Cron] Sent ${sent} booking reminder(s) for ${tomorrowStr}`);
    return NextResponse.json({ success: true, reminders_sent: sent, date: tomorrowStr });
  } catch (err) {
    console.error('[Cron] booking-reminders failed:', err);
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 });
  }
}
