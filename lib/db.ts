import mongoose from 'mongoose';
import { User, Blog, Pricing, Testimonial, Fleet } from './models';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then(async (mongoose) => {
      console.log("[DB] Connected to MongoDB");
      await initSchema();
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

async function initSchema() {
  try {
    // ─── Seed Admin User ────────────────────────────────────────────────────────
    const adminEmail = (process.env.ADMIN_EMAIL || 'Ozaseel1978@gmail.com').trim();
    const adminPassword = (process.env.ADMIN_PASSWORD || 'oz12345678').trim();
    const adminName = (process.env.ADMIN_NAME || 'Oz Services Admin').trim();

    const adminUser = await User.findOne({ role: 'admin' });
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    if (!adminUser) {
      await User.create({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log(`[DB] Admin user created: ${adminEmail}`);
    } else {
      // Sync password if changed in env
      adminUser.email = adminEmail;
      adminUser.password = hashedPassword;
      adminUser.name = adminName;
      await adminUser.save();
    }

    // ─── Seed Pricing ───────────────────────────────────────────────────────────
    const pricingCount = await Pricing.countDocuments();
    if (pricingCount === 0) {
      const pricingData = [
        { name: 'Economy Ride', price: '$8', unit: 'base fare', description: 'Comfortable standard sedan for daily commutes', features: JSON.stringify(['Up to 4 passengers', 'Air conditioned', 'GPS tracked', '24/7 available', '$2.50/mile']), popular: 0, sort_order: 1 },
        { name: 'Premium SUV', price: '$12', unit: 'base fare', description: 'Spacious executive SUV for airport transfers', features: JSON.stringify(['Up to 6 passengers', 'Leather interior', 'Priority booking', 'Complimentary water', '$3.50/mile']), popular: 1, sort_order: 2 },
        { name: 'Luxury Van', price: '$20', unit: 'base fare', description: 'Executive minivan for groups and corporate travel', features: JSON.stringify(['Up to 8 passengers', 'Professional chauffeur', 'Airport meet & greet', 'WiFi onboard', '$5.00/mile']), popular: 0, sort_order: 3 },
      ];
      await Pricing.insertMany(pricingData);
    }

    // ─── Seed Testimonials ──────────────────────────────────────────────────────
    const testiCount = await Testimonial.countDocuments();
    if (testiCount === 0) {
      const testimonials = [
        { name: 'Michael T.', location: 'New York, NY', rating: 5, message: 'Best taxi service I have used anywhere in the USA. Driver arrived 10 minutes early for my JFK flight. Immaculate car, totally professional.', published: 1 },
        { name: 'Sarah Jenkins', location: 'Chicago, IL', rating: 5, message: 'We rely on Oz Services for all our corporate travel across the country. Billing is accurate, drivers are impeccable, and the service is consistent coast to coast.', published: 1 },
        { name: 'David R.', location: 'Los Angeles, CA', rating: 5, message: 'Needed a reliable ride across LA late at night. Oz Services delivered perfectly — courteous driver, clean car, and the price didn\'t change one cent. Remarkable.', published: 1 },
        { name: 'Carlos D.', location: 'Houston, TX', rating: 5, message: 'The best taxi experience I have had anywhere nationwide. Clean vehicle, friendly driver, and fair pricing. My go-to service wherever I travel.', published: 1 },
        { name: 'Emily Watson', location: 'Seattle, WA', rating: 5, message: 'Booked online in under 60 seconds, driver arrived right on time. The confirmation email was instant. Highly recommend Oz Services for airport trips.', published: 1 },
      ];
      await Testimonial.insertMany(testimonials);
    }

    // ─── Seed Sample Blogs ──────────────────────────────────────────────────────
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      const blogs = [
        {
          title: 'Best Taxi Services in the USA: How to Choose a Reliable Nationwide Taxi Company',
          slug: 'best-taxi-services-usa',
          excerpt: 'Not all taxi companies are created equal. Here is your complete guide to identifying and booking the best, safest, and most reliable taxi service anywhere in the United States.',
          content: `<h2>What Makes a Taxi Service the Best in the USA?</h2><p>In a country as vast and diverse as the United States, transportation needs differ significantly from state to state. Whether you are commuting through a dense metro like New York City, catching a red-eye flight in Los Angeles, or navigating the suburbs of Texas, the quality of your taxi service will directly impact your day. So what actually separates a top-rated nationwide taxi service from an average one?</p><p>The answer lies in three consistent pillars: <strong>reliability, transparency, and professionalism</strong>. At Oz Services, we have built our nationwide taxi network around these values, ensuring every customer — from first-time tourists to frequent business travelers — receives a premium experience regardless of where they are in the US.</p><h2>Why Reliability is Non-Negotiable</h2><p>When you book a taxi, you are trusting a service with your schedule, your safety, and often your livelihood. A missed airport pickup or a no-show driver can cost you a missed flight, a lost business deal, or a ruined vacation. The best taxi companies in America maintain tight dispatch networks, real-time GPS tracking, and 24/7 availability to ensure this never happens.</p><p>Oz Services operates active dispatch centers around the clock, 365 days a year. Our drivers are vetted, licensed, and insured professionals who know local routes and maintain their vehicles to the highest standards. We do not rely on gig economy unpredictability — every driver is part of our trusted professional network.</p><h2>Transparent Pricing: No Surge Fees, Ever</h2><p>One of the biggest consumer complaints against modern rideshare platforms is surge pricing. During peak hours, bad weather, or major events, prices can inflate by 200–400%, leaving passengers shocked at the final fare. A trusted taxi service like Oz Services provides upfront, flat-rate pricing with no hidden fees — ever. You know exactly what you will pay before you book.</p><h2>Nationwide Coverage Across All 50 States</h2><p>Unlike regional taxi companies that are limited to a single city or metropolitan area, Oz Services provides verified ground transportation coverage across all 50 US states. This makes us the ideal partner for corporate travel managers, frequent flyers, and families who travel across state lines regularly. Whether you need a taxi in California, Texas, New York, or Wyoming, our dispatch network has you covered.</p><h2>How to Spot a Low-Quality Taxi Service</h2><ul><li>No verifiable licensing or insurance information</li><li>No online booking system or confirmation emails</li><li>No transparent pricing before you board</li><li>Driver vehicles with no identifiable markings or credentials</li><li>Poor or non-existent customer reviews</li></ul><h2>Book with Oz Services Today</h2><p>As America continues to grow and travel demand surges, having a reliable taxi partner you can count on anywhere is more valuable than ever. Oz Services delivers consistent quality, safety, and fair pricing nationwide. Ready to experience the difference? Book your ride online in 60 seconds or call our dedicated dispatcher at 407-793-8143 available 24/7.</p>`,
          category: 'Travel Guides',
          image_url: 'https://images.unsplash.com/photo-1549317661-bd32c5443c5b?q=80&w=800&h=500&auto=format&fit=crop',
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
          image_url: 'https://images.unsplash.com/photo-1549317661-bd32c5443c5b?q=80&w=800&h=500&auto=format&fit=crop',
          meta_title: 'Airport Taxi Services USA | Nationwide Airport Transfers 24/7 | Oz Services',
          meta_description: 'Book a professional airport taxi transfer anywhere in the USA. Oz Services covers all major US airports with flat-rate pricing, flight tracking, and 24/7 availability.',
          published: 1,
          featured: 0,
          read_time: 8,
        },
      ];
      await Blog.insertMany(blogs);
    }

    // ─── Seed Fleet ─────────────────────────────────────────────────────────────
    const fleetCount = await Fleet.countDocuments();
    if (fleetCount === 0) {
      const fleetVehicles = [
        { name: 'Standard Sedan', price: 'From $25', description: 'Comfortable seating for up to 4 passengers. Perfect for city rides and everyday errands.', image_url: 'https://images.unsplash.com/photo-1549317661-bd32c5443c5b?q=80&w=600&h=400&auto=format&fit=crop', active: 1, sort_order: 1 },
        { name: 'Premium SUV', price: 'From $45', description: 'Spacious interior fitting up to 6 passengers with extra luggage. Ideal for families and airport transfers.', image_url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=600&h=400&auto=format&fit=crop', active: 1, sort_order: 2 },
        { name: 'Luxury Car', price: 'From $75', description: 'Arrive in style. Premium leather seats, complimentary water, and professional chauffeur service.', image_url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&h=400&auto=format&fit=crop', active: 1, sort_order: 3 },
        { name: 'Airport Transfer Vehicle', price: 'From $55', description: 'Dedicated spacious vehicles ensuring all your luggage fits perfectly for hassle-free airport trips.', image_url: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=600&h=400&auto=format&fit=crop', active: 1, sort_order: 4 }
      ];
      await Fleet.insertMany(fleetVehicles);
    }
  } catch (err) {
    console.error("DB Seeding error:", err);
  }
}

export default connectDB;
