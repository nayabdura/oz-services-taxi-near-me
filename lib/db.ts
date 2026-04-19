import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), 'database');
const DB_PATH = path.join(DB_DIR, 'ozservices.db');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

let db: Database.Database;

function getDB(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initSchema(db);
  }
  return db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT,
      content TEXT,
      category TEXT,
      image_url TEXT,
      meta_title TEXT,
      meta_description TEXT,
      author TEXT DEFAULT 'Oz Services',
      published INTEGER DEFAULT 0,
      featured INTEGER DEFAULT 0,
      read_time INTEGER DEFAULT 5,
      views INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      pickup TEXT NOT NULL,
      dropoff TEXT NOT NULL,
      date TEXT,
      time TEXT,
      service_type TEXT DEFAULT 'standard',
      passengers INTEGER DEFAULT 1,
      notes TEXT,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'unread',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT,
      rating INTEGER DEFAULT 5,
      message TEXT NOT NULL,
      avatar TEXT,
      published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS pricing (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price TEXT NOT NULL,
      unit TEXT DEFAULT 'per ride',
      description TEXT,
      features TEXT,
      popular INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS fleet (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price TEXT,
      description TEXT,
      image_url TEXT,
      active INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // ─── Seed Admin User ────────────────────────────────────────────────────────
  // Uses ADMIN_EMAIL and ADMIN_PASSWORD from .env.local
  const adminEmail = process.env.ADMIN_EMAIL || 'Ozaseel1978@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'oz12345678';
  const adminName = process.env.ADMIN_NAME || 'Oz Services Admin';

  const adminExists = db.prepare('SELECT id FROM users WHERE role = ?').get('admin');
  if (!adminExists) {
    const bcrypt = require('bcryptjs');
    const hashedPassword = bcrypt.hashSync(adminPassword, 12);
    db.prepare('INSERT OR IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)')
      .run(adminName, adminEmail, hashedPassword, 'admin');
    console.log(`[DB] Admin user created: ${adminEmail}`);
  } else {
    // Always sync email/password changes from env
    const bcrypt = require('bcryptjs');
    const hashedPassword = bcrypt.hashSync(adminPassword, 12);
    db.prepare('UPDATE users SET email = ?, password = ?, name = ? WHERE role = ?')
      .run(adminEmail, hashedPassword, adminName, 'admin');
  }

  // ─── Seed Pricing ───────────────────────────────────────────────────────────
  const pricingCount = db.prepare('SELECT COUNT(*) as count FROM pricing').get() as { count: number };
  if (pricingCount.count === 0) {
    const pricingData = [
      { name: 'Economy Ride', price: '$8', unit: 'base fare', description: 'Comfortable standard sedan for daily commutes', features: JSON.stringify(['Up to 4 passengers', 'Air conditioned', 'GPS tracked', '24/7 available', '$2.50/mile']), popular: 0, sort_order: 1 },
      { name: 'Premium SUV', price: '$12', unit: 'base fare', description: 'Spacious executive SUV for airport transfers', features: JSON.stringify(['Up to 6 passengers', 'Leather interior', 'Priority booking', 'Complimentary water', '$3.50/mile']), popular: 1, sort_order: 2 },
      { name: 'Luxury Van', price: '$20', unit: 'base fare', description: 'Executive minivan for groups and corporate travel', features: JSON.stringify(['Up to 8 passengers', 'Professional chauffeur', 'Airport meet & greet', 'WiFi onboard', '$5.00/mile']), popular: 0, sort_order: 3 },
    ];
    const stmt = db.prepare('INSERT INTO pricing (name, price, unit, description, features, popular, sort_order) VALUES (@name, @price, @unit, @description, @features, @popular, @sort_order)');
    for (const p of pricingData) stmt.run(p);
  }

  // ─── Seed Testimonials ──────────────────────────────────────────────────────
  const testiCount = db.prepare('SELECT COUNT(*) as count FROM testimonials').get() as { count: number };
  if (testiCount.count === 0) {
    const testimonials = [
      { name: 'Michael T.', location: 'New York, NY', rating: 5, message: 'Best taxi service I have used anywhere in the USA. Driver arrived 10 minutes early for my JFK flight. Immaculate car, totally professional.', published: 1 },
      { name: 'Sarah Jenkins', location: 'Chicago, IL', rating: 5, message: 'We rely on Oz Services for all our corporate travel across the country. Billing is accurate, drivers are impeccable, and the service is consistent coast to coast.', published: 1 },
      { name: 'David R.', location: 'Los Angeles, CA', rating: 5, message: 'Needed a reliable ride across LA late at night. Oz Services delivered perfectly — courteous driver, clean car, and the price didn\'t change one cent. Remarkable.', published: 1 },
      { name: 'Carlos D.', location: 'Houston, TX', rating: 5, message: 'The best taxi experience I have had anywhere nationwide. Clean vehicle, friendly driver, and fair pricing. My go-to service wherever I travel.', published: 1 },
      { name: 'Emily Watson', location: 'Seattle, WA', rating: 5, message: 'Booked online in under 60 seconds, driver arrived right on time. The confirmation email was instant. Highly recommend Oz Services for airport trips.', published: 1 },
    ];
    const stmt = db.prepare('INSERT INTO testimonials (name, location, rating, message, published) VALUES (@name, @location, @rating, @message, @published)');
    for (const t of testimonials) stmt.run(t);
  }

  // ─── Seed Sample Blogs ──────────────────────────────────────────────────────
  const blogCount = db.prepare('SELECT COUNT(*) as count FROM blogs').get() as { count: number };
  if (blogCount.count === 0) {
    const blogs = [
      {
        title: 'Best Taxi Services in the USA: How to Choose a Reliable Nationwide Taxi Company',
        slug: 'best-taxi-services-usa',
        excerpt: 'Not all taxi companies are created equal. Here is your complete guide to identifying and booking the best, safest, and most reliable taxi service anywhere in the United States.',
        content: `<h2>What Makes a Taxi Service the Best in the USA?</h2><p>In a country as vast and diverse as the United States, transportation needs differ significantly from state to state. Whether you are commuting through a dense metro like New York City, catching a red-eye flight in Los Angeles, or navigating the suburbs of Texas, the quality of your taxi service will directly impact your day. So what actually separates a top-rated nationwide taxi service from an average one?</p><p>The answer lies in three consistent pillars: <strong>reliability, transparency, and professionalism</strong>. At Oz Services, we have built our nationwide taxi network around these values, ensuring every customer — from first-time tourists to frequent business travelers — receives a premium experience regardless of where they are in the US.</p><h2>Why Reliability is Non-Negotiable</h2><p>When you book a taxi, you are trusting a service with your schedule, your safety, and often your livelihood. A missed airport pickup or a no-show driver can cost you a missed flight, a lost business deal, or a ruined vacation. The best taxi companies in America maintain tight dispatch networks, real-time GPS tracking, and 24/7 availability to ensure this never happens.</p><p>Oz Services operates active dispatch centers around the clock, 365 days a year. Our drivers are vetted, licensed, and insured professionals who know local routes and maintain their vehicles to the highest standards. We do not rely on gig economy unpredictability — every driver is part of our trusted professional network.</p><h2>Transparent Pricing: No Surge Fees, Ever</h2><p>One of the biggest consumer complaints against modern rideshare platforms is surge pricing. During peak hours, bad weather, or major events, prices can inflate by 200–400%, leaving passengers shocked at the final fare. A trusted taxi service like Oz Services provides upfront, flat-rate pricing with no hidden fees — ever. You know exactly what you will pay before you book.</p><h2>Nationwide Coverage Across All 50 States</h2><p>Unlike regional taxi companies that are limited to a single city or metropolitan area, Oz Services provides verified ground transportation coverage across all 50 US states. This makes us the ideal partner for corporate travel managers, frequent flyers, and families who travel across state lines regularly. Whether you need a taxi in California, Texas, New York, or Wyoming, our dispatch network has you covered.</p><h2>How to Spot a Low-Quality Taxi Service</h2><ul><li>No verifiable licensing or insurance information</li><li>No online booking system or confirmation emails</li><li>No transparent pricing before you board</li><li>Driver vehicles with no identifiable markings or credentials</li><li>Poor or non-existent customer reviews</li></ul><h2>Book with Oz Services Today</h2><p>As America continues to grow and travel demand surges, having a reliable taxi partner you can count on anywhere is more valuable than ever. Oz Services delivers consistent quality, safety, and fair pricing nationwide. Ready to experience the difference? Book your ride online in 60 seconds or call our dedicated dispatcher at 407-793-8143 available 24/7.</p>`,
        category: 'Travel Guides',
        image_url: '/images/blog-placeholder.jpg',
        meta_title: 'Best Taxi Services in the USA | Reliable Nationwide Taxi | Oz Services',
        meta_description: 'Discover what makes a great taxi service in America. Oz Services offers reliable, transparent, and professional taxi rides across all 50 US states, 24/7.',
        published: 1,
        featured: 1,
        read_time: 7,
      },
      {
        title: 'Airport Taxi Services USA: The Complete Guide to Stress-Free Airport Transfers',
        slug: 'airport-taxi-services-usa-guide',
        excerpt: 'From JFK to LAX, our expert guide covers everything you need to know about booking a premium airport taxi transfer anywhere across the United States.',
        content: `<h2>Why Airport Taxi Transfers Are the Smartest Travel Choice in 2026</h2><p>Every experienced traveler knows that the journey to and from the airport sets the entire tone of a trip. Arrive late and stressed, and that energy follows you all day. Arrive calm, on time, and in a clean vehicle, and you start your journey on the right foot. That is exactly why professional airport taxi transfers have surged in popularity across the United States.</p><p>Unlike unpredictable rideshare platforms or expensive car rentals, airport taxi services provide a dedicated driver who monitors your flight, handles your luggage, and ensures you arrive at departures or your destination without a single worry.</p><h2>Top Airports We Serve Nationwide</h2><p>Oz Services provides reliable airport taxi transfers to and from all major US airports, including:</p><ul><li><strong>John F. Kennedy (JFK) — New York, NY</strong></li><li><strong>Los Angeles International (LAX) — Los Angeles, CA</strong></li><li><strong>O'Hare International (ORD) — Chicago, IL</strong></li><li><strong>Dallas/Fort Worth (DFW) — Dallas, TX</strong></li><li><strong>Hartsfield-Jackson (ATL) — Atlanta, GA</strong></li><li><strong>Miami International (MIA) — Miami, FL</strong></li><li><strong>Seattle-Tacoma (SEA) — Seattle, WA</strong></li><li><strong>Denver International (DEN) — Denver, CO</strong></li></ul><p>No matter which airport you are traveling through, our dispatch network ensures a driver is ready and waiting to get you where you need to go.</p><h2>Flight Monitoring: We Track So You Don't Have To</h2><p>One of the most valuable features of professional airport taxi services is real-time flight tracking. When your flight is delayed by 45 minutes, the last thing you want is your driver leaving because they think you are a no-show. At Oz Services, our dispatch team monitors your flight status automatically and adjusts your pickup time accordingly. You never pay for waiting time due to delays outside your control.</p><h2>How to Book Your USA Airport Taxi Transfer</h2><p>Booking with Oz Services is simple. Use our online booking form, enter your pickup airport and destination, select your vehicle type, and provide your flight number. Confirmation arrives instantly by email. For last-minute bookings, call our 24/7 dispatcher directly at 407-793-8143.</p><h2>What to Expect on the Day of Travel</h2><p>Your driver will be at the arrivals hall with a professional name board, ready to assist with your luggage. Our fleet includes economy sedans, premium SUVs, and luxury transfers, each immaculately clean and GPS-tracked for your family's safety. No surge pricing. No surprises. Just a smooth, professional ride from door to door.</p>`,
        category: 'Airport Travel',
        image_url: '/images/blog-placeholder.jpg',
        meta_title: 'Airport Taxi Services USA | Nationwide Airport Transfers 24/7 | Oz Services',
        meta_description: 'Book a professional airport taxi transfer anywhere in the USA. Oz Services covers all major US airports with flat-rate pricing, flight tracking, and 24/7 availability.',
        published: 1,
        featured: 0,
        read_time: 8,
      },
      {
        title: 'Nationwide Taxi Services Guide: Everything You Need to Know About Booking a Taxi Across the USA',
        slug: 'nationwide-taxi-services-guide',
        excerpt: 'Planning travel across multiple US states? This complete guide covers how nationwide taxi services work, what to expect, and how to get the best value for every trip.',
        content: `<h2>Understanding Nationwide Taxi Services in America</h2><p>For decades, the taxi industry in the United States was highly fragmented — dozens of regional operators serving individual cities with little coordination or consistency. That landscape has transformed dramatically. Today, technology-driven nationwide taxi networks like Oz Services provide seamless ground transportation across all 50 states from a single, unified platform.</p><p>This guide answers all the important questions about using a nationwide taxi service and explains why it is rapidly becoming the preferred choice for American travelers, corporate clients, and tourism operators.</p><h2>How Does a Nationwide Taxi Network Work?</h2><p>A nationwide taxi service maintains partnerships with licensed, insured local operators and professional drivers across every state. When you book through a centralized platform like Oz Services, your request is routed to the nearest qualified driver in your area. This means you receive local route expertise combined with the consistency and quality standards of a national brand.</p><h2>Benefits Over Local-Only Taxi Companies</h2><ul><li><strong>Consistent Quality Standards</strong> — no matter which state you are in, you receive the same professional experience</li><li><strong>One Booking Platform</strong> — manage all your travel needs from a single account</li><li><strong>Transparent Nationwide Pricing</strong> — standardized flat rates with no state-level pricing surprises</li><li><strong>Corporate Account Management</strong> — consolidated invoicing for employees traveling across multiple states</li></ul><h2>Best Practices for Booking Across State Lines</h2><p>If your journey crosses state lines — for example, from New Jersey to New York, or from Virginia to Maryland — always communicate this to your dispatcher at the time of booking. Interstate routes may attract different licensing requirements, and our dispatch team will assign the most appropriate vehicle and driver for your specific trip.</p><h2>Nationwide Taxi Services vs Rideshare Apps: Key Differences</h2><p>Rideshare apps operate on a gig economy model where any licensed driver can register and accept rides. Professional taxi services operate on a vetted employee or franchise model where every driver undergoes background checks, vehicle inspections, and professional training. For travelers who value safety, consistency, and accountability, the choice is clear.</p><h2>Book Your Nationwide Taxi Today</h2><p>Oz Services is proud to be America's premier nationwide taxi network. Whether you are traveling through a major metropolitan area or a quieter region, our dispatch team is ready to serve you 24 hours a day, 7 days a week. Book online or call 407-793-8143 to speak to a live dispatcher immediately.</p>`,
        category: 'Travel Guides',
        image_url: '/images/blog-placeholder.jpg',
        meta_title: 'Nationwide Taxi Services USA Guide 2026 | Oz Services',
        meta_description: 'Your complete 2026 guide to booking nationwide taxi services across all 50 US states. Learn how professional taxi networks work and how to get the best value.',
        published: 1,
        featured: 0,
        read_time: 9,
      },
      {
        title: 'Taxi Booking Tips USA: 10 Expert Tricks to Get the Best Taxi Every Time',
        slug: 'taxi-booking-tips-usa',
        excerpt: 'Stop wasting time and money on unreliable taxi experiences. These 10 expert tips will ensure you always get the best taxi service no matter where you are in the USA.',
        content: `<h2>10 Expert Taxi Booking Tips for US Travelers in 2026</h2><p>Whether you are a seasoned road warrior or an occasional traveler, these practical tips from our professional dispatch team will help you get the most out of every taxi ride across America.</p><h3>1. Always Pre-Book for Airport Trips</h3><p>If you are heading to or from an airport, book your taxi at least 2–3 hours in advance. This ensures a driver is confirmed, staged, and ready at your location with no risk of delay. Last-minute airport bookings can result in longer wait times — especially during peak hours.</p><h3>2. Provide Your Exact Address</h3><p>Your exact street address, floor number (if applicable), and any landmark instructions save precious time. Ambiguous pickup addresses are one of the most common causes of delays.</p><h3>3. Share Your Flight Details</h3><p>For airport pickups, always provide your flight number. Professional taxi services like Oz Services monitor incoming flights and automatically adjust your pickup time if your flight is delayed.</p><h3>4. Know What Vehicle Size You Need</h3><p>If you are traveling with extra luggage, ski equipment, or a group larger than 4, book an SUV or van in advance. Standard sedans have limited boot space and may not accommodate oversized items.</p><h3>5. Use a Service With Flat-Rate Pricing</h3><p>Avoid companies that only quote per-mile rates without a clear total estimate. Flat-rate pricing means you know exactly what you pay before you get in the cab — no surprises at your destination.</p><h3>6. Confirm Your Booking by Email</h3><p>Always use a taxi service that sends proper confirmation emails with your booking ID, driver details, and estimated arrival time. This is your proof of booking if anything goes wrong.</p><h3>7. Save the Dispatcher Number</h3><p>Always save the taxi company's dispatcher hotline in your phone. Our dispatch line is 407-793-8143 — available 24/7 for immediate assistance, route changes, or urgent pickups.</p><h3>8. Check the Reviews</h3><p>A reputable taxi service will have verifiable ratings and reviews on Google, Yelp, and Trustpilot. Never book without checking at least the recent review history.</p><h3>9. Use a Nationwide Service for Multi-City Trips</h3><p>If your itinerary spans multiple US cities, a nationwide taxi service provides seamless continuity. You book once, and the same quality standards apply in every city.</p><h3>10. Look for Licensed and Insured Operators</h3><p>Always verify that the taxi operator you book with carries valid state-issued commercial vehicle licenses and liability insurance. Oz Services only deploys fully licensed and insured vehicles giving you complete peace of mind.</p>`,
        category: 'Tips & Advice',
        image_url: '/images/blog-placeholder.jpg',
        meta_title: 'Taxi Booking Tips USA 2026 | 10 Expert Tips | Oz Services',
        meta_description: 'Get expert taxi booking tips for travelers anywhere in the USA. Learn how to pre-book, get flat rates, avoid surge pricing, and ensure safe reliable rides every time.',
        published: 1,
        featured: 0,
        read_time: 8,
      },
      {
        title: 'Corporate Taxi Services USA: Why Businesses Are Switching from Rideshare to Professional Taxi Accounts',
        slug: 'corporate-taxi-services-usa',
        excerpt: 'Surge pricing, inconsistent quality, and complex expense reporting make rideshare apps a poor choice for corporate travel. Here is why leading US businesses are choosing dedicated corporate taxi accounts.',
        content: `<h2>The Corporate Travel Problem Rideshare Apps Cannot Solve</h2><p>American businesses spend billions annually on employee ground transportation. From daily office commutes to multi-city executive tours, the reliability and professionalism of that transportation directly impacts productivity, client impressions, and company culture. Yet many organizations are still using consumer rideshare apps to manage what should be a strategically managed business function.</p><p>The results are predictable: expense report headaches, inconsistent service quality, and the constant anxiety of surge pricing making travel budgets unpredictable. This is why more US organizations are transitioning to <strong>dedicated corporate taxi accounts</strong> with professional nationwide operators.</p><h2>What a Corporate Taxi Account Looks Like</h2><p>A corporate taxi account with Oz Services provides your organization with:</p><ul><li><strong>Consolidated Monthly Invoicing</strong> — One invoice covering all employee rides, organized by cost center or employee</li><li><strong>Priority Dispatch</strong> — Corporate clients receive priority queuing during peak hours and major events</li><li><strong>Dedicated Account Manager</strong> — A single point of contact who understands your business travel patterns</li><li><strong>Pre-Approved Driver Network</strong> — Only our highest-rated professional drivers handle corporate accounts</li><li><strong>Nationwide Coverage</strong> — Single account management for employee travel across all 50 US states</li></ul><h2>The ROI of Professional Corporate Taxi Services</h2><p>When you factor in the time HR spends processing individual rideshare receipts, the financial variance from surge pricing, and the liability exposure from using unvetted independent gig drivers, the true cost of rideshare apps for business is dramatically higher than the sticker price. A corporate taxi account with a flat-rate structure and professional liability coverage eliminates all of these hidden costs.</p><h2>Industries That Benefit Most</h2><p>Industries with high ground transportation needs — including <strong>law firms, financial services, healthcare, consulting, hospitality, and technology</strong> — see the strongest return on investment from corporate taxi accounts. These industries require consistent professionalism, absolute punctuality, and clear audit trails for travel expenses.</p><h2>Setting Up Your Corporate Account</h2><p>Getting started with an Oz Services corporate account takes less than 10 minutes. Contact our corporate team via the booking form or call our dispatch line at 407-793-8143. We will assign a dedicated account manager who will walk you through setup, pricing structures, and the onboarding of your employees nationwide.</p><p>Join hundreds of American businesses that have already made the switch. Experience the difference that professional, predictable, and premium corporate ground transportation makes to your organization's productivity and culture.</p>`,
        category: 'Corporate Travel',
        image_url: '/images/blog-placeholder.jpg',
        meta_title: 'Corporate Taxi Services USA | Business Taxi Accounts | Oz Services',
        meta_description: 'Why leading US businesses choose corporate taxi accounts over rideshare apps. Oz Services offers flat-rate pricing, priority dispatch, and nationwide coverage for corporate clients.',
        published: 1,
        featured: 0,
        read_time: 9,
      },
    ];
    const stmt = db.prepare('INSERT INTO blogs (title, slug, excerpt, content, category, image_url, meta_title, meta_description, published, featured, read_time) VALUES (@title, @slug, @excerpt, @content, @category, @image_url, @meta_title, @meta_description, @published, @featured, @read_time)');
    for (const b of blogs) stmt.run(b);
  }
  // ─── Seed Fleet Vehicles ────────────────────────────────────────────────────
  const fleetCount = db.prepare('SELECT COUNT(*) as count FROM fleet').get() as { count: number };
  if (fleetCount.count === 0) {
    const fleetVehicles = [
      {
        name: 'Standard Sedan',
        price: 'From $25',
        description: 'Comfortable seating for up to 4 passengers. Perfect for city rides and everyday errands.',
        image_url: 'https://images.unsplash.com/photo-1549317661-bd32c5443c5b?q=80&w=600&h=400&auto=format&fit=crop',
        active: 1,
        sort_order: 1
      },
      {
        name: 'Premium SUV',
        price: 'From $45',
        description: 'Spacious interior fitting up to 6 passengers with extra luggage. Ideal for families and airport transfers.',
        image_url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=600&h=400&auto=format&fit=crop',
        active: 1,
        sort_order: 2
      },
      {
        name: 'Luxury Car',
        price: 'From $75',
        description: 'Arrive in style. Premium leather seats, complimentary water, and professional chauffeur service.',
        image_url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&h=400&auto=format&fit=crop',
        active: 1,
        sort_order: 3
      },
      {
        name: 'Airport Transfer Vehicle',
        price: 'From $55',
        description: 'Dedicated spacious vehicles ensuring all your luggage fits perfectly for hassle-free airport trips.',
        image_url: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=600&h=400&auto=format&fit=crop',
        active: 1,
        sort_order: 4
      }
    ];
    const stmt = db.prepare('INSERT INTO fleet (name, price, description, image_url, active, sort_order) VALUES (@name, @price, @description, @image_url, @active, @sort_order)');
    for (const v of fleetVehicles) stmt.run(v);
  }
}

export default getDB;
