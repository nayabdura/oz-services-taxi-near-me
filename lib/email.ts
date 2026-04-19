import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const ADMIN = process.env.ADMIN_EMAIL_NOTIFY || 'Ozaseel1978@gmail.com';

// ─── Booking Confirmation Email ───────────────────────────────────────────────
export const sendBookingConfirmationEmail = async (booking: {
  name: string; email: string; phone: string;
  pickup: string; dropoff: string; date: string; time: string;
  service_type: string; passengers: number; notes?: string;
  bookingId: number | bigint;
}) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>Booking Confirmation</title></head>
    <body style="font-family: Inter, Arial, sans-serif; background: #F8FAFC; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 40px auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0;">
        <!-- Header -->
        <div style="background: #0F172A; padding: 32px; text-align: center;">
          <div style="display: inline-block; background: #2563EB; color: white; font-weight: 900; font-size: 22px; padding: 10px 20px; border-radius: 8px; letter-spacing: 2px;">OZ SERVICES</div>
          <p style="color: #94A3B8; margin: 12px 0 0; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">Nationwide Taxi Network</p>
        </div>
        <!-- Body -->
        <div style="padding: 40px 32px;">
          <h1 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #0F172A;">Booking Confirmed! ✓</h1>
          <p style="color: #475569; margin: 0 0 28px; font-size: 16px;">Hi ${booking.name}, your taxi ride has been confirmed. Reference: <strong>#${booking.bookingId}</strong></p>

          <div style="background: #F1F5F9; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding: 8px 0; color: #64748B; font-size: 13px; width: 140px;">Pickup</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${booking.pickup}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B; font-size: 13px;">Drop-off</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${booking.dropoff}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B; font-size: 13px;">Date & Time</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${booking.date} at ${booking.time}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B; font-size: 13px;">Service</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; text-transform: capitalize;">${booking.service_type}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B; font-size: 13px;">Passengers</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${booking.passengers}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B; font-size: 13px;">Contact</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${booking.phone}</td></tr>
              ${booking.notes ? `<tr><td style="padding: 8px 0; color: #64748B; font-size: 13px;">Notes</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${booking.notes}</td></tr>` : ''}
            </table>
          </div>

          <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
            <p style="margin: 0; color: #1D4ED8; font-size: 14px; font-weight: 600;">📞 Your driver will call you before pickup. For any changes, call us directly at ${process.env.NEXT_PUBLIC_PHONE || '+14077938143'}</p>
          </div>

          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/booking" style="display: inline-block; background: #2563EB; color: white; font-weight: 700; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-size: 15px;">View Booking Details</a>
        </div>
        <!-- Footer -->
        <div style="background: #F8FAFC; padding: 24px 32px; border-top: 1px solid #E2E8F0; text-align: center;">
          <p style="margin: 0; color: #94A3B8; font-size: 12px;">Oz Services · Nationwide Taxi Network · Available 24/7<br>Questions? Email us at ${ADMIN}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: `Oz Services <${FROM}>`,
      to: booking.email,
      subject: `✓ Booking Confirmed #${booking.bookingId} — Oz Services Taxi`,
      html,
    });
  } catch (err) {
    console.error('[Resend] Booking confirmation email failed:', err);
  }
};

// ─── Admin Notification Email ─────────────────────────────────────────────────
export const sendAdminNotificationEmail = async (booking: {
  name: string; email: string; phone: string;
  pickup: string; dropoff: string; date: string; time: string;
  service_type: string; passengers: number; notes?: string;
  bookingId: number | bigint;
}) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; background: #0F172A; color: #F8FAFC; padding: 32px;">
      <div style="max-width: 600px; margin: auto; background: #1E293B; border-radius: 12px; padding: 32px; border: 1px solid #334155;">
        <h2 style="color: #F59E0B; margin: 0 0 4px;">🚕 New Booking Alert #${booking.bookingId}</h2>
        <p style="color: #94A3B8; margin: 0 0 24px; font-size: 14px;">Received at ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding: 10px 0; color: #94A3B8; font-size: 13px; width: 130px; border-bottom: 1px solid #334155;">Passenger</td><td style="padding: 10px 0; color: #F8FAFC; font-weight: 700; border-bottom: 1px solid #334155;">${booking.name}</td></tr>
          <tr><td style="padding: 10px 0; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Phone 📞</td><td style="padding: 10px 0; color: #34D399; font-weight: 700; border-bottom: 1px solid #334155;"><a href="tel:${booking.phone}" style="color: #34D399;">${booking.phone}</a></td></tr>
          <tr><td style="padding: 10px 0; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Email</td><td style="padding: 10px 0; color: #F8FAFC; border-bottom: 1px solid #334155;">${booking.email}</td></tr>
          <tr><td style="padding: 10px 0; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Pickup</td><td style="padding: 10px 0; color: #F8FAFC; font-weight: 600; border-bottom: 1px solid #334155;">${booking.pickup}</td></tr>
          <tr><td style="padding: 10px 0; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Drop-off</td><td style="padding: 10px 0; color: #F8FAFC; font-weight: 600; border-bottom: 1px solid #334155;">${booking.dropoff}</td></tr>
          <tr><td style="padding: 10px 0; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Date/Time</td><td style="padding: 10px 0; color: #FBBF24; font-weight: 700; border-bottom: 1px solid #334155;">${booking.date} at ${booking.time}</td></tr>
          <tr><td style="padding: 10px 0; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Service</td><td style="padding: 10px 0; color: #F8FAFC; text-transform: capitalize; border-bottom: 1px solid #334155;">${booking.service_type} — ${booking.passengers} pax</td></tr>
          ${booking.notes ? `<tr><td style="padding: 10px 0; color: #94A3B8; font-size: 13px;">Notes</td><td style="padding: 10px 0; color: #FCA5A5;">${booking.notes}</td></tr>` : ''}
        </table>
        <div style="margin-top: 24px; text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/bookings" style="background: #2563EB; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">View in Admin Dashboard →</a>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: `Oz Services Bot <${FROM}>`,
      to: ADMIN,
      subject: `🚕 NEW BOOKING #${booking.bookingId} — ${booking.name} | ${booking.date} | ${booking.phone}`,
      html,
    });
  } catch (err) {
    console.error('[Resend] Admin notification email failed:', err);
  }
};

// ─── Legacy sendEmail wrapper (keeps existing code working) ───────────────────
export const sendEmail = async ({ to, subject, text, html }: {
  to: string; subject: string; text?: string; html?: string
}) => {
  try {
    await resend.emails.send({
      from: `Oz Services <${FROM}>`,
      to,
      subject,
      html: html || `<p>${text || ''}</p>`,
    });
    return true;
  } catch (err) {
    console.error('[Resend] sendEmail failed:', err);
    return process.env.NODE_ENV === 'development';
  }
};
