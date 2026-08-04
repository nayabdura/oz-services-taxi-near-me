import { Metadata } from "next";
import Link from "next/link";
import { FiPhone, FiCheck, FiArrowRight } from "react-icons/fi";
import BookingWidget from "@/components/home/BookingWidget";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const BASE = "https://www.oztaxinearme.com";

export const metadata: Metadata = {
  title: "Taxi Near Me | Book a Cab Instantly in the USA — Oz Services",
  description:
    "Looking for a taxi near me? Oz Services sends a professional, licensed driver to your location across the USA. No surge pricing. Available 24 hours a day. Book online or call 407-793-8143 or (407) 967-603.",
  alternates: { canonical: "https://www.oztaxinearme.com/taxi-near-me" },
  keywords: [
    "taxi near me",
    "cab near me",
    "taxi service near me",
    "24 hour taxi near me",
    "affordable taxi near me",
    "Oz Services taxi near me",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.oztaxinearme.com/taxi-near-me",
    siteName: "Oz Services Taxi",
    title: "Taxi Near Me | Book a Cab Instantly in the USA — Oz Services",
    description: "Fast taxi dispatch with Oz Services. No surge pricing. Licensed drivers. Available 24 hours a day across all 50 states.",
    images: [
      {
        url: "https://www.oztaxinearme.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Taxi Near Me - Oz Services Taxi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taxi Near Me | Book a Cab Instantly in the USA — Oz Services",
    description: "Fast taxi dispatch with Oz Services. No surge pricing. Licensed drivers. Available 24 hours a day across all 50 states.",
    images: ["https://www.oztaxinearme.com/og-image.jpg"],
  },
};

const reasons = [
  { title: "Drivers Positioned Near You", desc: "Our drivers are stationed across major city centers and airport hubs throughout the USA. Most passengers see pickup times under 10 minutes." },
  { title: "The Price Never Changes", desc: "Rush hour, a big event, or a storm rolling in — our meter rate does not move. You pay exactly what Oz Services quoted you when you booked." },
  { title: "Fixed Rates on Key Routes", desc: "For airport runs and trips between cities, we offer fixed pricing. You know the exact total before your trip starts. No surprise charges at the end." },
  { title: "A Real Person Handles Your Booking", desc: "When you call or book online, a live Oz Services dispatcher confirms your vehicle, your driver, and your arrival time right away." },
];

const cities = [
  { name: "New York", slug: "new-york", note: "Serving JFK/LGA" },
  { name: "Los Angeles", slug: "california", note: "Serving LAX area" },
  { name: "Chicago", slug: "illinois", note: "Serving ORD/MDW" },
  { name: "Houston", slug: "texas", note: "Serving IAH area" },
  { name: "Miami", slug: "florida", note: "Serving MIA airport" },
  { name: "Orlando", slug: "florida", note: "Serving MCO airport" },
  { name: "Las Vegas", slug: "nevada", note: "Serving LAS area" },
  { name: "Atlanta", slug: "georgia", note: "Serving ATL airport" },
  { name: "Dallas", slug: "texas", note: "Serving DFW area" },
  { name: "Seattle", slug: "washington", note: "Serving SEA area" },
  { name: "Phoenix", slug: "arizona", note: "Serving PHX area" },
  { name: "Denver", slug: "colorado", note: "Serving DEN area" },
];

const faqs = [
  {
    question: "How do I find a taxi near me right now?",
    answer: "Call Oz Services at 407-793-8143 or (407) 967-603 or use our online booking form at oztaxinearme.com/booking. We have professional drivers across all major US cities ready to be dispatched 24 hours a day.",
  },
  {
    question: "What is the best taxi service near me in the USA?",
    answer: "Oz Services is rated 4.9 out of 5 across 847 reviews. We operate across all 50 states with no surge pricing, fully vetted licensed drivers, and real-time flight tracking for every airport pickup.",
  },
  {
    question: "How much does a taxi near me cost?",
    answer: "Oz Services fares start from $8 as a base fare. The final total depends on your distance and vehicle choice. We show you the full price before you confirm. No hidden charges.",
  },
  {
    question: "Is there a taxi near me available at night?",
    answer: "Yes. Oz Services operates around the clock every day of the year. Whether you need a late night pickup at 2 AM or an early morning airport run at 4 AM, we have drivers ready across the USA.",
  },
  {
    question: "Can I book a taxi near me online without calling?",
    answer: "Yes. Book at oztaxinearme.com/booking without needing to download an app. Enter your pickup and drop-off locations, choose your vehicle, and you will receive instant confirmation by SMS or email.",
  },
];

export default function TaxiNearMePage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${BASE}/` },
          { name: "Taxi Near Me", url: `${BASE}/taxi-near-me` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "TaxiService"],
            "@id": `${BASE}/taxi-near-me#localbusiness`,
            name: "Oz Services – Taxi Near Me",
            alternateName: "Oz Services",
            url: `${BASE}/taxi-near-me`,
            telephone: ["+1-407-793-8143", "+1-407-967-603"],
            priceRange: "$8 - $20",
            openingHours: "Mo-Su 00:00-23:59",
            areaServed: { "@type": "Country", name: "US" },
          }),
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-slate-900 pt-28 pb-24 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="pt-4">
                <p className="text-blue-400 font-bold tracking-wider uppercase text-xs mb-3">
                  Oz Services Immediate Dispatch
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading mb-6 tracking-tight">
                  Find a Taxi <span className="text-blue-500">Near You</span> in the USA
                </h1>
                <p className="text-slate-300 text-lg font-normal leading-relaxed mb-8 max-w-lg">
                  No app to download. No unpredictable surge pricing. Oz Services dispatches a professional driver to your location across the USA within minutes.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <a
                    href="tel:4077938143"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3.5 rounded-xl transition-colors text-xs whitespace-nowrap"
                  >
                    <FiPhone className="w-4 h-4" /> Call 407-793-8143
                  </a>
                  <a
                    href="tel:407967603"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3.5 rounded-xl transition-colors text-xs whitespace-nowrap"
                  >
                    <FiPhone className="w-4 h-4" /> Call (407) 967-603
                  </a>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-3.5 rounded-xl border border-slate-700 transition-colors text-xs"
                  >
                    Book Online Now <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["4.9/5 Rating", "No Surge Pricing", "All 50 US States", "Available 24/7"].map((item) => (
                    <span key={item} className="text-xs font-semibold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div><BookingWidget /></div>
            </div>
          </div>
        </section>

        {/* Why Oz Services */}
        <section className="py-20 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">Service Standards</p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-heading mb-4">
                Reliable Ground Transportation
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-normal">
                Licensed drivers, upfront flat rates, and dedicated 24/7 human dispatch support.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reasons.map(({ title, desc }) => (
                <div key={title} className="bg-slate-50 border border-slate-200 rounded-2xl p-7">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                    <FiCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-2">{title}</h3>
                  <p className="text-slate-600 font-normal leading-relaxed text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage — linked city cards */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-heading mb-3">
                Serving All 50 US States
              </h2>
              <p className="text-slate-600 font-normal text-base">
                Click your city to view localized service details and airport coverage.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {cities.map(({ name, slug, note }) => (
                <Link
                  key={name + slug}
                  href={`/locations/${slug}`}
                  className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 hover:border-blue-500 transition-colors group"
                >
                  <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600">{name}</div>
                  <div className="text-slate-500 text-xs font-normal mt-0.5">{note}</div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/service-areas" className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline">
                View all Oz Services service areas <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Semantic Content Block */}
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-900 font-heading mb-6">
              Why Search for a Taxi Near Me With Oz Services?
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              When searching for a <strong>taxi near me</strong>, passengers need prompt response times, honest rates, and licensed drivers. <strong>Oz Services</strong> provides nationwide transportation without surge pricing.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              The fare quoted at booking is guaranteed. Our drivers are positioned near major airport hubs and metropolitan business centers across the US.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                { label: "Airport Taxi Transfers", desc: "To and from all major US airports with real-time flight tracking.", href: "/services" },
                { label: "24/7 Local City Rides", desc: "Round-the-clock dispatch availability for day or late-night trips.", href: "/booking" },
                { label: "Corporate Taxi Accounts", desc: "Consolidated billing and priority dispatch for business clients.", href: "/services" },
                { label: "Long-Distance Routes", desc: "Fixed-rate regional rides between cities.", href: "/pricing" },
              ].map(({ label, desc, href }) => (
                <li key={label} className="flex gap-3 items-start text-sm">
                  <FiCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <Link href={href} className="font-bold text-slate-900 hover:text-blue-600">{label}:</Link>{" "}{desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-heading mb-3">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 font-normal leading-relaxed text-xs sm:text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-slate-900 text-center px-4 text-white">
          <h2 className="text-3xl md:text-4xl font-black font-heading mb-4">
            Need a Taxi Near You? Call Dispatch Now
          </h2>
          <p className="text-slate-300 text-base mb-8 max-w-xl mx-auto font-normal">
            Licensed drivers, upfront flat rates, and instant 24/7 dispatch across the USA.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:4077938143"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              <FiPhone className="w-4 h-4" /> Call 407-793-8143
            </a>
            <a
              href="tel:407967603"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              <FiPhone className="w-4 h-4" /> Call (407) 967-603
            </a>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3.5 rounded-xl border border-slate-700 transition-colors text-sm"
            >
              Book Online Now <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
