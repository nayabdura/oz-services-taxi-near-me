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
      { name: 'Michael T.', location: 'Orlando, FL', rating: 5, message: 'The best taxi service in Florida. Driver arrived 10 minutes early for my MCO flight. Immaculate car, totally professional.', published: 1 },
      { name: 'Sarah Jenkins', location: 'Miami, FL', rating: 5, message: 'We use Oz Services for all our corporate Miami clients. Billing is accurate, drivers are impeccable. Fully recommend.', published: 1 },
      { name: 'David R.', location: 'Tampa, FL', rating: 5, message: 'Saved us in a Tampa downpour. Driver was courteous and the price didn\'t change one cent. Remarkable consistency.', published: 1 },
      { name: 'Carlos D.', location: 'Jacksonville, FL', rating: 5, message: 'Best taxi experience in Florida. Clean vehicle, friendly driver, and fair pricing. My go-to service.', published: 1 },
    ];
    const stmt = db.prepare('INSERT INTO testimonials (name, location, rating, message, published) VALUES (@name, @location, @rating, @message, @published)');
    for (const t of testimonials) stmt.run(t);
  }

  // ─── Seed Sample Blogs ──────────────────────────────────────────────────────
  const blogCount = db.prepare('SELECT COUNT(*) as count FROM blogs').get() as { count: number };
  if (blogCount.count === 0) {
    const blogs = [
      {
        title: 'Navigating Orlando Theme Parks by Taxi: What You Need to Know',
        slug: 'navigating-orlando-theme-parks-taxi',
        excerpt: 'Avoid parking fees and traffic jams. Using a professional taxi makes your Disney or Universal trip stress-free and affordable.',
        content: '<h2>Why Take a Taxi to Orlando Theme Parks?</h2><p>Every year, millions of tourists visit Orlando\'s world-class theme parks. With Oz Services taxi, skip the $30+ parking fees and enjoy the journey.</p><h2>Cost Savings Over Parking</h2><p>Parking at Disney World or Universal Studios can cost $25–$50 per day per vehicle. Our taxi service often works out significantly cheaper for families and groups.</p><h2>Pickup from Any Orlando Area Hotel</h2><p>We service every major hotel corridor along International Drive and Disney Springs. Simply tell us your hotel name and we handle the rest.</p>',
        category: 'Travel Guides',
        image_url: '/images/blog-placeholder.jpg',
        meta_title: 'Orlando Theme Parks by Taxi | Oz Services Florida',
        meta_description: 'Learn how to get to Disney World, Universal Studios and other Orlando attractions easily by taxi with Oz Services. Cheaper than parking.',
        published: 1,
        featured: 1,
        read_time: 5,
      },
      {
        title: 'Top 10 Tips for Your Miami Airport Taxi Transfer',
        slug: 'miami-airport-taxi-tips',
        excerpt: 'Make your next MIA airport transfer completely stress-free with these expert tips from our Florida taxi dispatchers.',
        content: '<h2>Planning Your Miami Airport Taxi Transfer</h2><p>Miami International Airport (MIA) is one of the busiest in the US. Here\'s how to ensure a smooth taxi experience every time.</p><h2>Book in Advance</h2><p>Always pre-book your MIA taxi at least 2 hours before your flight. This ensures a driver is confirmed and staged at your terminal.</p><h2>Share Flight Details</h2><p>When booking with Oz Services, provide your flight number. We monitor arrivals and adjust your pickup if there are delays.</p>',
        category: 'Airport Travel',
        image_url: '/images/blog-placeholder.jpg',
        meta_title: 'Miami Airport Taxi Transfer Tips | Oz Services Florida',
        meta_description: 'Expert tips for a smooth taxi transfer from Miami International Airport (MIA). Book with Oz Services for reliable, on-time service.',
        published: 1,
        featured: 0,
        read_time: 7,
      },
      {
        title: 'Corporate Taxis vs Rideshare Apps: Why Businesses Choose Professional Taxi Services',
        slug: 'corporate-taxis-vs-rideshares',
        excerpt: 'Security, billing transparency, and strict professionalism. Here is why Florida businesses are switching from rideshare apps to dedicated corporate taxi accounts.',
        content: '<h2>The Problem with Rideshare for Business Travel</h2><p>Rideshare apps are convenient for personal use, but for corporate travel they introduce unpredictable surge pricing, inconsistent vehicle quality, and complex expense reporting challenges.</p><h2>What Corporate Taxi Accounts Offer</h2><p>A dedicated corporate account with Oz Services provides consolidated monthly invoicing, priority dispatch, and a dedicated account manager who knows your executives\' travel preferences.</p>',
        category: 'Corporate Travel',
        image_url: '/images/blog-placeholder.jpg',
        meta_title: 'Corporate Taxis vs Rideshare Apps | Oz Services Florida',
        meta_description: 'Why Florida businesses choose professional corporate taxi accounts over rideshare apps. Transparent billing, priority dispatch, dedicated support.',
        published: 1,
        featured: 0,
        read_time: 6,
      },
    ];
    const stmt = db.prepare('INSERT INTO blogs (title, slug, excerpt, content, category, image_url, meta_title, meta_description, published, featured, read_time) VALUES (@title, @slug, @excerpt, @content, @category, @image_url, @meta_title, @meta_description, @published, @featured, @read_time)');
    for (const b of blogs) stmt.run(b);
  }
}

export default getDB;
