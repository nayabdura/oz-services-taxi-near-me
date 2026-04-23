/**
 * Blog Image & Content Patch Script
 * Run with: node scripts/patch-blogs.mjs
 *
 * This script:
 * 1. Updates existing blog post images with proper unique images
 * 2. Adds a third blog post about Corporate Travel
 * 3. Ensures all internal links are do-follow (no rel attribute)
 */

import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://nayabdura_db_user:bxmRfhve9RztD1PE@cluster0.u1b02pn.mongodb.net/ozservices?retryWrites=true&w=majority&appName=Cluster0';

const BlogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  category: String,
  image_url: String,
  meta_title: String,
  meta_description: String,
  published: Number,
  featured: Number,
  read_time: Number,
  author: { type: String, default: 'Oz Services' },
  views: { type: Number, default: 0 },
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

const SITE_URL = 'https://www.oztaxinearme.com';

// Use local public images (served from Next.js)
const BLOG_UPDATES = [
  {
    slug: 'best-taxi-services-usa',
    image_url: `${SITE_URL}/blog-taxi-usa.png`,
    content: `<h2>What Makes a Taxi Service the Best in the USA?</h2>
<p>In a country as vast and diverse as the United States, transportation needs differ significantly from state to state. Whether you are commuting through a dense metro like New York City, catching a red-eye flight in Los Angeles, or navigating the suburbs of Texas, the quality of your taxi service will directly impact your day.</p>
<p>The answer lies in three consistent pillars: <strong>reliability, transparency, and professionalism</strong>. At Oz Services, we have built our nationwide taxi network around these values, ensuring every customer — from first-time tourists to frequent business travelers — receives a premium experience.</p>
<h2>Why Reliability is Non-Negotiable</h2>
<p>When you <a href="/booking" title="Oz Services - book a taxi online">book a taxi online</a>, you are trusting a service with your schedule, your safety, and often your livelihood. A missed airport pickup or a no-show driver can cost you a missed flight, a lost business deal, or a ruined vacation.</p>
<p>Oz Services operates active dispatch centers around the clock, 365 days a year. Our drivers are vetted, licensed, and insured professionals who know local routes and maintain their vehicles to the highest standards.</p>
<h2>Transparent Pricing: No Surge Fees, Ever</h2>
<p>One of the biggest consumer complaints against modern rideshare platforms is surge pricing. A trusted <a href="/taxi-near-me" title="Oz Services - taxi near me">taxi near me</a> service like Oz Services provides upfront, flat-rate pricing with no hidden fees — ever. You know exactly what you will pay before you book.</p>
<h2>Nationwide Coverage Across All 50 States</h2>
<p>Unlike regional taxi companies, Oz Services provides verified ground transportation coverage across all 50 US states. Check our <a href="/service-areas" title="Oz Services - USA service areas">USA service areas</a> to find coverage near you. Whether you need a taxi in California, Texas, New York, or Wyoming, our dispatch network has you covered.</p>
<h2>How to Spot a Low-Quality Taxi Service</h2>
<ul>
<li>No verifiable licensing or insurance information</li>
<li>No online booking system or confirmation emails</li>
<li>No transparent pricing before you board</li>
<li>Driver vehicles with no identifiable markings or credentials</li>
<li>Poor or non-existent customer reviews</li>
</ul>
<h2>Book with Oz Services Today</h2>
<p>As America continues to grow and travel demand surges, having a reliable taxi partner you can count on anywhere is more valuable than ever. Ready to experience the difference? <a href="/booking" title="Oz Services - book your ride now">Book your ride online</a> in 60 seconds or call our dedicated dispatcher at 407-793-8143 available 24/7.</p>`,
  },
  {
    slug: 'airport-taxi-services-usa-guide',
    image_url: `${SITE_URL}/blog-airport-taxi.png`,
    content: `<h2>Why Airport Taxi Transfers Are the Smartest Travel Choice in 2026</h2>
<p>Every experienced traveler knows that the journey to and from the airport sets the entire tone of a trip. That is exactly why professional <a href="/services" title="Oz Services - airport taxi services">airport taxi services</a> have surged in popularity across the United States.</p>
<p>Unlike unpredictable rideshare platforms or expensive car rentals, airport taxi services provide a dedicated driver who monitors your flight, handles your luggage, and ensures you arrive without a single worry.</p>
<h2>Top Airports We Serve Nationwide</h2>
<p>Oz Services provides reliable airport taxi transfers to and from all major US airports, including:</p>
<ul>
<li><strong>John F. Kennedy (JFK) — New York, NY</strong></li>
<li><strong>Los Angeles International (LAX) — Los Angeles, CA</strong></li>
<li><strong>O'Hare International (ORD) — Chicago, IL</strong></li>
<li><strong>Dallas/Fort Worth (DFW) — Dallas, TX</strong></li>
<li><strong>Hartsfield-Jackson (ATL) — Atlanta, GA</strong></li>
<li><strong>Miami International (MIA) — Miami, FL</strong></li>
<li><strong>Seattle-Tacoma (SEA) — Seattle, WA</strong></li>
<li><strong>Denver International (DEN) — Denver, CO</strong></li>
</ul>
<p>No matter which airport you are traveling through, our <a href="/locations/florida" title="Oz Services - Florida taxi service">Florida dispatch network</a> and nationwide partners ensure a driver is ready and waiting.</p>
<h2>Flight Monitoring: We Track So You Don't Have To</h2>
<p>When your flight is delayed by 45 minutes, the last thing you want is your driver leaving because they think you are a no-show. At Oz Services, our dispatch team monitors your flight status automatically. You never pay for waiting time due to delays outside your control.</p>
<h2>How to Book Your USA Airport Taxi Transfer</h2>
<p>Booking with Oz Services is simple. Use our <a href="/booking" title="Oz Services - book airport taxi">online booking form</a>, enter your pickup airport and destination, select your vehicle type, and provide your flight number. Confirmation arrives instantly by email.</p>
<h2>What to Expect on the Day of Travel</h2>
<p>Your driver will be at the arrivals hall with a professional name board, ready to assist with your luggage. Our <a href="/fleet" title="Oz Services - our taxi fleet">fleet</a> includes economy sedans, premium SUVs, and luxury transfers, each immaculately clean and GPS-tracked for your safety. No surge pricing. No surprises.</p>`,
  },
];

const THIRD_BLOG = {
  title: 'Corporate Taxi Services USA: Premium Business Travel Solutions for Companies',
  slug: 'corporate-taxi-services-usa',
  excerpt: 'Discover how Oz Services delivers premium, on-account corporate taxi solutions for businesses across the USA — reliable, billed, and professional for every business trip.',
  content: `<h2>Why Corporate Taxi Services Are Essential for Modern Businesses</h2>
<p>In today's fast-paced business environment, reliable corporate ground transportation is no longer a luxury — it's a necessity. Whether you are transporting executives, clients, or employees to airports, meetings, or events, having a trusted <a href="/services" title="Oz Services - corporate taxi services">corporate taxi service</a> partner ensures every journey is seamless, professional, and on time.</p>
<p>Oz Services has established itself as the premier corporate ground transportation provider across all 50 US states, offering centralized billing, dedicated account management, and a fleet of executive vehicles that reflect your company's standards.</p>
<h2>Benefits of a Corporate Taxi Account with Oz Services</h2>
<h3>Centralized Billing & Invoicing</h3>
<p>Eliminate the hassle of employee expense reports and receipt chasing. Our corporate clients receive consolidated monthly invoices with full trip reports, making accounting straightforward and auditable.</p>
<h3>Priority Dispatch 24/7</h3>
<p>Corporate accounts receive priority dispatch status, ensuring vehicles are always available even during peak hours or special events. <a href="/booking" title="Oz Services - book corporate taxi">Book your corporate ride</a> online anytime or call our 24/7 corporate hotline.</p>
<h3>Executive Fleet Options</h3>
<p>From premium sedans to luxury SUVs, our <a href="/fleet" title="Oz Services - executive fleet">executive fleet</a> is maintained to the highest standards. Every vehicle features leather interiors, climate control, charging ports, and immaculate presentation.</p>
<h3>Nationwide Coverage</h3>
<p>Whether your team travels to New York, Los Angeles, Chicago, or smaller markets, our <a href="/service-areas" title="Oz Services - service areas">nationwide service areas</a> ensure consistent quality everywhere.</p>
<h2>Industries We Serve</h2>
<ul>
<li><strong>Finance & Banking</strong> — Executive airport transfers and client pickups</li>
<li><strong>Legal</strong> — Courthouse and client meeting transportation</li>
<li><strong>Healthcare</strong> — Medical professional and patient transport</li>
<li><strong>Technology</strong> — Conference and headquarters shuttle services</li>
<li><strong>Hospitality</strong> — Hotel guest and event transportation</li>
</ul>
<h2>Airport Transfer Specialists for Corporate Travelers</h2>
<p>Our most popular corporate service is airport transfer management. We monitor all flights in real time, ensuring your executives never wait at the curb or miss a connection. Drivers are professional, uniformed, and carry company name boards upon request.</p>
<p>We serve all major US airports including <a href="/locations/new-york" title="Oz Services - New York taxi">JFK in New York</a>, <a href="/locations/california" title="Oz Services - California taxi">LAX in Los Angeles</a>, ORD in Chicago, and dozens more across the country.</p>
<h2>Set Up Your Corporate Account Today</h2>
<p>Setting up a corporate account with Oz Services takes less than 10 minutes. <a href="/contact" title="Oz Services - contact us">Contact our corporate team</a> today and receive your first 3 rides at a 20% corporate discount. Let us become your company's trusted transportation partner.</p>`,
  category: 'Corporate Travel',
  image_url: `${SITE_URL}/blog-corporate-taxi.png`,
  meta_title: 'Corporate Taxi Services USA | Executive Business Travel | Oz Services',
  meta_description: 'Premium corporate taxi accounts for businesses across the USA. Centralized billing, 24/7 priority dispatch, executive fleet. Set up your account with Oz Services today.',
  published: 1,
  featured: 0,
  read_time: 6,
  author: 'Oz Services',
};

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Update existing blogs
    for (const update of BLOG_UPDATES) {
      const { slug, ...data } = update;
      const result = await Blog.findOneAndUpdate(
        { slug },
        { $set: data },
        { new: true }
      );
      if (result) {
        console.log(`✅ Updated blog: "${result.title}"`);
      } else {
        console.log(`⚠️  Blog not found for slug: ${slug}`);
      }
    }

    // Add third blog if it doesn't exist
    const existing = await Blog.findOne({ slug: THIRD_BLOG.slug });
    if (!existing) {
      await Blog.create(THIRD_BLOG);
      console.log(`✅ Created new blog: "${THIRD_BLOG.title}"`);
    } else {
      // Update existing with fresh content and image
      await Blog.findOneAndUpdate({ slug: THIRD_BLOG.slug }, { $set: {
        image_url: THIRD_BLOG.image_url,
        content: THIRD_BLOG.content,
        published: 1,
      }});
      console.log(`✅ Updated existing blog: "${THIRD_BLOG.title}"`);
    }

    console.log('\n🎉 All blog patches applied successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

run();
