import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Booking } from '@/lib/models';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    await connectDB();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const upcomingBookings = await Booking.find({
      date: tomorrowStr,
      status: { $in: ['pending', 'confirmed'] }
    }).sort({ time: 1 });

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
          </div>
        `,
      });
      sent++;
    }

    return NextResponse.json({ success: true, reminders_sent: sent, date: tomorrowStr });
  } catch (err) {
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 });
  }
}
