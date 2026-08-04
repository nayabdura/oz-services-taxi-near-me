import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://nayabdura_db_user:bxmRfhve9RztD1PE@cluster0.u1b02pn.mongodb.net/ozservices?retryWrites=true&w=majority&appName=Cluster0";

const blogSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  excerpt: String,
  content: String,
  category: String,
  image_url: String,
  author: { type: String, default: "Oz Services Team" },
  views: { type: Number, default: 0 },
  meta_title: String,
  meta_description: String,
  published: { type: Number, default: 1 },
  featured: { type: Number, default: 0 },
  read_time: { type: Number, default: 6 },
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

const additionalBlogs = [
  {
    title: "5 Secrets to Stress-Free Airport Taxi Transfers in Major US Metros",
    slug: "secrets-stress-free-airport-taxi-transfers-usa",
    excerpt: "Discover 5 insider secrets for stress-free airport taxi transfers across major US airports including JFK, LAX, ORD, DFW, and MCO.",
    category: "Airport Travel",
    image_url: "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1200&h=675&auto=format&fit=crop",
    author: "Oz Services Team",
    views: 64,
    meta_title: "Airport Taxi Transfer Tips USA | Oz Services Taxi",
    meta_description: "Discover 5 insider secrets for stress-free airport taxi transfers across major US airports. Flight tracking, flat rates, and pickup tips.",
    published: 1,
    featured: 0,
    read_time: 8,
    content: `
<h2>Navigating Airport Travel with Absolute Confidence</h2>
<p>Airport travel is universally acknowledged as one of the most stressful aspects of modern travel. Between security checkpoints, baggage claims, tight layovers, and unpredictable flight delays, the last leg of your journey—getting to or from the airport terminal—should be smooth, comfortable, and completely hassle-free.</p>
<p>Whether you are arriving at John F. Kennedy (JFK) in New York, Los Angeles International (LAX), O'Hare (ORD) in Chicago, or Orlando International (MCO), choosing a professional airport taxi transfer ensures you start and end your trip on the right foot. Here are 5 expert secrets to guaranteeing a stress-free airport taxi experience every time.</p>

<h2>Secret 1: Provide Your Flight Number During Booking</h2>
<p>Flight schedules are inherently volatile. Weather delays, gate holds, and early arrivals happen daily across American airspace. When you book your airport transfer with <a href="/booking">Oz Services</a>, always provide your exact airline and flight number.</p>
<p>Our 24/7 dispatch system integrates automated real-time flight tracking software. If your flight is delayed by 45 minutes, our dispatchers adjust your driver's dispatch time automatically. You will never pay for waiting time caused by airline delays outside your control, and your driver will be waiting in the arrivals hall when your plane touches down.</p>

<h2>Secret 2: Request Flat-Rate Airport Transfers to Avoid Gridlock Costs</h2>
<p>Metropolitan airport routes are notorious for severe rush-hour traffic. If you ride in a metered cab or use dynamic rideshare pricing, sitting in a 40-minute highway gridlock near LAX or JFK can double your fare.</p>
<p>At Oz Services, we provide upfront <a href="/pricing">flat-rate airport pricing</a>. The price quoted at booking is guaranteed—regardless of traffic conditions, detours, or heavy rain. You can relax in climate-controlled comfort without watching a fare meter tick upward in traffic.</p>

<h2>Secret 3: Reserve the Right Vehicle Size for Your Luggage</h2>
<p>Underestimating luggage volume is a frequent cause of airport travel frustration. Overstuffing suitcases into a compact sedan trunk creates discomfort and safety hazards. Follow this general fleet guide when booking:</p>
<ul>
  <li><strong>Standard Sedan:</strong> Perfect for 1–3 passengers traveling with up to 3 standard carry-on or checked bags.</li>
  <li><strong>Executive SUV:</strong> Highly recommended for families (up to 6 passengers) carrying 4–6 large suitcases, strollers, or sports equipment.</li>
  <li><strong>Passenger Van:</strong> Essential for group delegations, tour groups, or extended family trips carrying up to 8 passengers and extensive cargo.</li>
</ul>
<p>Explore full vehicle dimensions on our <a href="/fleet">Oz Services Fleet Page</a>.</p>

<h2>Secret 4: Use Dedicated Airport Meet-and-Greet Services</h2>
<p>Finding a rideshare pickup zone in unfamiliar airports can involve walking long distances through parking garages with heavy luggage. Professional airport taxi transfers offer personalized Meet-and-Greet options.</p>
<p>Your designated chauffeur will greet you inside the terminal baggage claim area with a professional name sign, assist with your heavy luggage, and escort you directly to your reserved vehicle parked in priority commercial lanes.</p>

<h2>Secret 5: Keep Dispatch Contact Numbers Saved on Mobile</h2>
<p>Navigating large airports is significantly easier when you have direct phone access to your transport dispatcher. Save Oz Services dispatch numbers—<strong>407-793-8143</strong> and <strong>(407) 967-603</strong>—directly in your mobile phone contacts for immediate assistance upon landing.</p>

<h2>Book Your Next USA Airport Transfer Today</h2>
<p>Experience seamless airport transportation across all 50 states. Visit our <a href="/booking">Airport Taxi Booking Portal</a> to secure your transfer in under 60 seconds.</p>
    `
  },
  {
    title: "Complete Guide to Taxi Services in Orlando & Florida Theme Parks",
    slug: "orlando-florida-theme-park-taxi-guide",
    excerpt: "Planning a Florida vacation? Read our complete guide to booking reliable, affordable taxis between Orlando International Airport (MCO), Walt Disney World, and Universal Studios.",
    category: "Travel Guides",
    image_url: "https://images.unsplash.com/photo-1575089776834-8be346a6c694?q=80&w=1200&h=675&auto=format&fit=crop",
    author: "Oz Services Team",
    views: 78,
    meta_title: "Orlando Taxi Guide | Disney & Universal Airport Cab | Oz Services",
    meta_description: "Planning a Florida theme park trip? Read our complete guide to booking reliable taxis between Orlando International Airport (MCO), Disney, and Universal.",
    published: 1,
    featured: 0,
    read_time: 9,
    content: `
<h2>Making the Most of Your Orlando Family Vacation</h2>
<p>Orlando, Florida is undisputed as the theme park capital of the world, welcoming over 74 million visitors annually to Walt Disney World, Universal Studios Florida, SeaWorld, and the Orange County Convention Center. Navigating Central Florida transportation efficiently can make or break your vacation experience.</p>
<p>While renting a car involves expensive rental fees, toll road passes, and $30+ daily parking charges at park gates, relying on hotel shuttle buses can waste hours of precious park time. A professional <a href="/about">Orlando taxi service like Oz Services</a> provides direct, door-to-door comfort, allowing your family to maximize park hours and minimize travel fatigue.</p>

<h2>1. Transfers from Orlando International Airport (MCO) to Disney & Universal</h2>
<p>Upon landing at Orlando International Airport (MCO), your primary objective is reaching your resort quickly and comfortably. Average taxi transit times from MCO to major tourist hubs are:</p>
<ul>
  <li><strong>MCO to Walt Disney World Resorts:</strong> ~25–35 minutes via SR-417 or Beachline Expressway.</li>
  <li><strong>MCO to Universal Studios & International Drive:</strong> ~20–25 minutes via SR-528.</li>
  <li><strong>MCO to Lake Buena Vista & Kissimmee:</strong> ~30–40 minutes.</li>
</ul>
<p>By pre-booking an Oz Services flat-rate airport taxi, your driver will be waiting at MCO terminal arrivals to assist with stroller and luggage loading before heading directly to your resort check-in desk.</p>

<h2>2. Avoiding Theme Park Parking Hassles and Toll Costs</h2>
<p>Renting a car in Orlando comes with significant hidden expenses. Central Florida features numerous toll expressways (such as the Florida Turnpike, SR-417, and SR-528), and theme park parking fees range from $30 to $50 per day per vehicle.</p>
<p>Riding with Oz Services eliminates rental fees, gas refilling charges, toll transponder surcharges, and long walks across massive theme park parking lots. Our drivers drop you off directly at designated VIP passenger drop-off zones steps from park entrance turnstiles.</p>

<h2>3. Spacious SUVs and Vans for Strollers and Luggage</h2>
<p>Family vacations to Orlando involve substantial luggage, strollers, booster seats, and park gear. Oz Services operates a versatile fleet of spacious executive SUVs and minivans equipped to comfortably transport large families and all associated gear. Request child safety seats or booster seats during online booking for added peace of mind.</p>

<h2>4. Late-Night Pickups After Fireworks & Nighttime Shows</h2>
<p>When theme parks close following evening fireworks and light shows, thousands of tired park-goers head for transit exits simultaneously. Rideshare apps routinely trigger peak surge pricing, multiplying rates by 3x or 4x amidst long wait times.</p>
<p>Oz Services operates 24/7. Pre-book your post-fireworks pickup, and your assigned driver will be waiting at designated commercial loading zones to whisk your family back to your hotel promptly and affordably.</p>

<h2>Book Your Orlando Taxi Service Today</h2>
<p>Ready for a stress-free Orlando vacation? Calculate your flat rate on our <a href="/pricing">Pricing Calculator</a> or call our 24/7 Orlando dispatch team at <strong>407-793-8143</strong> or <strong>(407) 967-603</strong>.</p>
    `
  },
  {
    title: "Why Fixed-Rate Taxi Services Are Essential for Family Travel",
    slug: "fixed-rate-taxi-services-family-travel-guide",
    excerpt: "Traveling with family requires safety, predictability, and comfort. Learn why fixed-rate taxi services offer superior reliability, luggage space, and peace of mind over gig apps.",
    category: "Travel Guides",
    image_url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&h=675&auto=format&fit=crop",
    author: "Oz Services Team",
    views: 51,
    meta_title: "Family Travel Taxi Tips USA | Safe & Affordable Cabs | Oz Services",
    meta_description: "Traveling with kids or family? Learn why fixed-rate taxi services offer superior safety, luggage space, and peace of mind over rideshare apps.",
    published: 1,
    featured: 0,
    read_time: 7,
    content: `
<h2>Putting Family Comfort and Safety First</h2>
<p>Family vacations create lifelong memories, but coordinating group travel with children, elderly relatives, and multiple suitcases can test any parent's patience. When moving your family through airport terminals, hotel lobbies, and city attractions, your ground transportation choice plays a vital role in keeping everyone safe, relaxed, and on schedule.</p>
<p>While solo travelers might tolerate transit delays or cramped vehicles, family travel demands guaranteed space, vetted professional drivers, and zero financial surprises. Here is why fixed-rate professional taxi services like <a href="/about">Oz Services</a> are the gold standard for family transportation across America.</p>

<h2>1. Guaranteed Flat-Rate Pricing Keeps Vacation Budgets Intact</h2>
<p>Vacation budgets require strict planning. Unpredictable rideshare surge pricing can derail travel budgets when unexpected rain or airport traffic inflates a $30 fare into a $100 charge.</p>
<p>With Oz Services, the rate quoted during booking is fixed. No matter how heavy the traffic or how long the airport queue, your family's transport cost never changes. Check upfront rates anytime on our <a href="/pricing">Transparent Pricing Page</a>.</p>

<h2>2. Room for the Whole Family and All Your Gear</h2>
<p>Packing for a family trip means managing multiple large suitcases, carry-on bags, strollers, car seats, and diaper bags. Standard compact rideshare vehicles frequently lack the trunk space necessary to accommodate family luggage.</p>
<p>Oz Services offers spacious SUV and minivan options specifically designed for family group travel. Everyone gets a comfortable seat with ample legroom, and all luggage fits securely in the trunk space.</p>

<h2>3. Vetted, Experienced Chauffeurs Who Prioritize Safety</h2>
<p>When your children are in the vehicle, driver professionalism and vehicle safety standards are paramount. Oz Services professional drivers undergo thorough background checks, driving safety audits, and commercial vehicle safety inspections. Our drivers drive smoothly and courteously, ensuring a serene ride for your loved ones.</p>

<h2>4. Reliable Pickups for Early Flights and Late Arrivals</h2>
<p>Waking children up at 3:30 AM for an early flight is challenging enough without worrying if a rideshare driver will accept your booking. Pre-booking with Oz Services guarantees a driver arrives at your driveway 10 minutes prior to your scheduled pickup time.</p>

<h2>Plan Your Next Family Trip with Oz Services</h2>
<p>Book your family's airport transfer or city ride today using our simple <a href="/booking">Online Booking Portal</a> or call our 24/7 dispatcher at <strong>407-793-8143</strong> or <strong>(407) 967-603</strong>.</p>
    `
  }
];

async function seed() {
  try {
    console.log("[Seed Script] Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("[Seed Script] Connected successfully.");

    for (const post of additionalBlogs) {
      const res = await Blog.updateOne(
        { slug: post.slug },
        { $set: post },
        { upsert: true }
      );
      console.log(`[Seed Script] Upserted blog "${post.slug}":`, res.acknowledged ? "OK" : "FAILED");
    }

    const count = await Blog.countDocuments({ published: 1 });
    console.log(`[Seed Script] Total published blogs in database now: ${count}`);

    await mongoose.disconnect();
    console.log("[Seed Script] Finished successfully!");
  } catch (err) {
    console.error("[Seed Script] Error:", err);
    process.exit(1);
  }
}

seed();
