# Oz Services — Florida Taxi Near Me 🚕

A professional full-stack taxi booking platform for **Oz Services**, Florida's premier 24/7 taxi network. Built with Next.js 16, SQLite, Resend email, and Tailwind CSS v4.

## 🔗 Live Site
[ozservices.com](https://ozservices.com)

## 🚀 Features
- **Online Booking System** with multi-step form and instant email confirmation
- **Admin Dashboard** — manage bookings, blog posts, pricing, and testimonials
- **Resend Email** — beautiful HTML confirmation emails + admin alerts on every booking
- **Vercel Cron Jobs** — automated daily booking reminders at 8am EST
- **Full SEO** — JSON-LD schema, sitemap, robots.txt, Open Graph, structured metadata
- **Responsive Design** — mobile, tablet, desktop optimized

## 📋 Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Database:** SQLite via better-sqlite3
- **Email:** Resend API
- **Styling:** Tailwind CSS v4
- **Auth:** JWT (jsonwebtoken + bcryptjs)

## ⚙️ Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/oz-services-taxi.git
cd oz-services-taxi

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Fill in your values in .env.local

# 4. Run development server
npm run dev
```

## 🔑 Environment Variables

Copy `.env.example` to `.env.local` and fill:

| Variable | Required | Description |
|---|---|---|
| `ADMIN_EMAIL` | ✅ | Admin login email |
| `ADMIN_PASSWORD` | ✅ | Admin login password |
| `JWT_SECRET` | ✅ | JWT signing secret |
| `RESEND_API_KEY` | ✅ | From [resend.com](https://resend.com) |
| `FROM_EMAIL` | ✅ | Verified sender email |
| `ADMIN_EMAIL_NOTIFY` | ✅ | Receives booking alerts |
| `CRON_SECRET` | ✅ | Authenticates cron calls |

## 📧 Email Setup (Resend)
1. Sign up at [resend.com](https://resend.com) (free, 3,000 emails/month)  
2. Go to API Keys → Create API Key  
3. Add `RESEND_API_KEY=re_...` to your `.env.local` and Vercel environment variables
4. For custom domain sender: verify your domain in Resend dashboard

## 🕗 Cron Jobs
Daily booking reminders run via Vercel Cron at **8am EST**. Add `CRON_SECRET` to both `.env.local` and Vercel env vars.

## 🌐 Deploy to Vercel
1. Push to GitHub
2. Import repo in [Vercel dashboard](https://vercel.com)
3. Set all environment variables from `.env.example`
4. Deploy!

> **Note:** SQLite database resets on each Vercel deployment. For production, migrate to [Turso](https://turso.tech/) (SQLite-compatible) or PostgreSQL.

## 📄 Admin Access
- URL: `/admin`  
- Default email: set via `ADMIN_EMAIL`  
- Default password: set via `ADMIN_PASSWORD`

---
Built with ❤️ for Oz Services Florida Taxi
