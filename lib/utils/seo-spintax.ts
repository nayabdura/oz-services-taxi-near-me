// Seeded Random Number Generator to ensure consistent SSG builds for each state
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function stringToSeed(str: string) {
  let seed = 0;
  for (let i = 0; i < str.length; i++) {
    seed = str.charCodeAt(i) + ((seed << 5) - seed);
  }
  return seed;
}

// Spintax Helper: deterministically picks one option from an array based on the state name
export function spinPick<T>(options: T[], stateName: string, salt: number = 0): T {
  const seed = stringToSeed(stateName.toLowerCase() + salt.toString());
  const rand = mulberry32(seed)();
  return options[Math.floor(rand * options.length)];
}

// ----------------------------------------------------------------------
// SPINTAX DICTIONARIES
// ----------------------------------------------------------------------

const titles = [
  "Taxi Service in {state} | Book Local & Airport Cab 24/7 — Oz Services",
  "Reliable {state} Taxi Near Me | 24/7 Airport Cab Booking",
  "Best Taxi in {state} | Fast & Affordable Cab Service — Oz Services",
  "Top-Rated {state} Taxicab | 24/7 Dispatch & No Surge Pricing",
  "Book a Taxi in {state} Today | Premium Airport & Local Rides",
];

const metaDescriptions = [
  "Looking for a reliable taxi in {state}? Oz Services offers professional taxicab rides, seamless airport transfers, and corporate booking across {state}. No surge pricing. Call 407-793-8143 or book online.",
  "Need a fast cab in {state}? We provide 24/7 premium taxi services for airport transfers, city rides, and business travel. Discover transparent pricing with Oz Services today.",
  "Searching for a taxi near me in {state}? Oz Services guarantees on-time, safe, and comfortable rides across the entire state. Book your affordable airport transfer instantly online.",
  "Book your {state} taxicab with Oz Services. Experience luxury SUVs, economy sedans, and 24-hour dispatch without the unpredictability of rideshare surge fees.",
  "America's most trusted taxi service is now available in {state}. From urgent airport drops to late-night local trips, call 407-793-8143 for an immediate pickup.",
];

const heroHeadlines = [
  "Reliable Taxi Service in {state}",
  "Your Premium {state} Taxicab",
  "Fast & Safe Taxi Rides Across {state}",
  "The Best Way to Travel in {state}",
  "24/7 Taxi Dispatch for {state}",
];

const heroSubtitles = [
  "America's premier transportation network is ready to pick you up in {state}. Whether you need an airport transfer, city commuting, or corporate travel, we guarantee a safe and prompt ride 24/7.",
  "Skip the rideshare unpredictability. Book a professional, licensed driver in {state} for your next airport transfer or local errand. Always transparent, never any surge pricing.",
  "From early morning flights to late-night returns, our dedicated fleet in {state} is standing by. Experience the reliability of a true professional taxicab service today.",
  "Need a reliable ride right now? Our top-rated {state} taxi service ensures you reach your destination on time, in comfort, and with absolute peace of mind.",
];

const contentP1 = [
  "Navigating ground transportation in {state} shouldn't be a hassle. At Oz Services, we've optimized our operations to deliver quick, reliable, and comfortable taxi solutions that cater strictly to your schedule. Whether you are a tourist exploring local attractions, a business executive attending meetings, or a resident needing a quick local trip, our {state} taxicab services are tailored for you.",
  "When traveling across {state}, finding dependable transportation is crucial. Oz Services brings decades of logistical expertise to offer a superior taxi experience. We cater to daily commuters, busy corporate teams, and vacationers looking for stress-free travel. Our {state} fleet is meticulously maintained to provide unparalleled comfort.",
  "Why settle for unpredictable transit when you can ride with the best? Our {state} taxi operations are built on a foundation of trust, safety, and punctuality. If you require an immediate pickup, a scheduled airport transfer, or a sophisticated corporate ride, our dedicated {state} network has you covered.",
];

const contentP2 = [
  "Unlike unpredictable rideshare apps, we provide transparent, upfront pricing with zero hidden surge fees. When you search for a taxi near me in {state}, our dispatch network immediately locates the nearest available premium vehicle to ensure wait times are kept to an absolute minimum.",
  "Forget about fluctuating prices during rush hour. We believe in honest, fixed pricing for every journey. Requesting a {state} taxi means you get an immediate confirmation, a professional chauffeur, and a guaranteed rate that never jumps when it rains.",
  "Our commitment to excellence means you never have to guess your fare. We actively monitor traffic conditions across {state} to dispatch the closest driver rapidly. No surge fees, no unexpected charges—just reliable taxi service exactly when you need it.",
];

const faqOrderVariations = [
  [0, 1, 2, 3, 4],
  [1, 0, 3, 2, 4],
  [2, 4, 1, 0, 3],
  [4, 2, 0, 3, 1],
  [3, 1, 4, 2, 0],
];

// Base FAQs to be shuffled/spun
const getBaseFaqs = (stateName: string) => [
  {
    question: `How do I book a taxi in ${stateName} online?`,
    answer: `Booking a taxi in ${stateName} with Oz Services is instant. Use our online booking form at oztaxinearme.com/booking, enter your pickup and drop-off locations, choose your vehicle type, and receive immediate SMS confirmation. No app download required.`,
  },
  {
    question: `Do you provide airport taxi transfers in ${stateName}?`,
    answer: `Yes. Oz Services specializes in 24/7 airport taxi transfers to and from all major airports in ${stateName}. Our dispatchers track your flight in real-time to ensure punctual pickups even on delayed arrivals.`,
  },
  {
    question: `How much does a taxi cost in ${stateName}?`,
    answer: `Taxi fares in ${stateName} with Oz Services start from $8 as a base fare. Final costs depend on distance and service type. We offer transparent, upfront pricing with zero surge fees. Use our booking widget for an instant quote.`,
  },
  {
    question: `Does Oz Services charge surge pricing in ${stateName}?`,
    answer: `Never. Oz Services operates a strict no-surge-pricing policy across all 50 states including ${stateName}. Whether it's rush hour, a major event, or bad weather, you always pay exactly the quoted rate.`,
  },
  {
    question: `What types of vehicles are available for taxi service in ${stateName}?`,
    answer: `Oz Services offers economy sedans, luxury SUVs, and corporate executive vehicles for taxi service in ${stateName}. All vehicles are clean, fully insured, and driven by vetted, licensed professionals.`,
  },
];


// ----------------------------------------------------------------------
// GENERATOR FUNCTION
// ----------------------------------------------------------------------

export function generateStateContent(stateName: string) {
  const replaceState = (text: string) => text.replace(/\{state\}/g, stateName);

  // Use salt values (1, 2, 3...) to ensure different fields don't pick the same random index
  const title = replaceState(spinPick(titles, stateName, 1));
  const metaDescription = replaceState(spinPick(metaDescriptions, stateName, 2));
  const heroTitle = replaceState(spinPick(heroHeadlines, stateName, 3));
  const heroSubtitle = replaceState(spinPick(heroSubtitles, stateName, 4));
  const p1 = replaceState(spinPick(contentP1, stateName, 5));
  const p2 = replaceState(spinPick(contentP2, stateName, 6));

  const faqs = getBaseFaqs(stateName);
  const faqOrder = spinPick(faqOrderVariations, stateName, 7);
  const randomizedFaqs = faqOrder.map(index => faqs[index]);

  return {
    title,
    metaDescription,
    heroTitle,
    heroSubtitle,
    p1,
    p2,
    faqs: randomizedFaqs,
  };
}
