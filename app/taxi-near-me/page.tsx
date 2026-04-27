import { Metadata } from "next";
import Link from "next/link";
import BookingWidget from "@/components/home/BookingWidget";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const BASE = "https://www.oztaxinearme.com";

export const metadata: Metadata = {
  title: "Taxi Near Me | Book a Cab Instantly in the USA — Oz Services",
  description:
    "Looking for a taxi near me? Oz Services sends a professional, licensed driver to your location across the USA. No surge pricing. Available 24 hours a day. Book online or call 407-793-8143.",
  alternates: { canonical: "/taxi-near-me" },
  keywords: [
    "taxi near me",
    "cab near me",
    "taxi service near me",
    "24 hour taxi near me",
    "affordable taxi near me",
    "Oz Services taxi near me",
  ],
  openGraph: {
    title: "Taxi Near Me | Book a Cab Instantly in the USA — Oz Services",
    description: "Fast taxi dispatch with Oz Services. No surge pricing. Licensed drivers. Available 24 hours a day across all 50 states.",
    url: `${BASE}/taxi-near-me`,
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
    answer: "Call Oz Services at 407-793-8143 or use our online booking form at oztaxinearme.com/booking. We have professional drivers across all major US cities ready to be dispatched 24 hours a day.",
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
            telephone: "+1-407-793-8143",
            priceRange: "$8 - $20",
            openingHours: "Mo-Su 00:00-23:59",
            areaServed: { "@type": "Country", name: "US" },
          }),
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-slate-900 pt-28 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="pt-4">
                <p className="text-yellow-400 font-bold tracking-widest uppercase text-xs mb-4">
                  Oz Services — Immediate Dispatch
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading mb-6 tracking-tight">
                  Find a Taxi <span className="text-blue-500">Near You</span> in the USA Right Now
                </h1>
                <p className="text-xl text-slate-300 font-medium leading-relaxed mb-8 max-w-lg">
                  No app to download. No unpredictable surge pricing. Oz Services dispatches a professional, licensed driver to your location across the USA within minutes. We are available 24 hours a day, 7 days a week.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <a
                    href="tel:4077938143"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-600/25 text-sm active:scale-95"
                  >
                    📞 Call Oz Services: 407-793-8143
                  </a>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold px-7 py-3.5 rounded-xl border border-white/20 transition-colors text-sm"
                  >
                    Book Online Now →
                  </Link>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["⭐ 4.9/5 Rating", "✓ No Surge Pricing", "✓ All 50 States", "✓ 24/7 Available"].map((item) => (
                    <span key={item} className="text-xs font-semibold text-slate-300 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
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
        <section className="py-20 lg:py-28 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">Why Book Oz Services</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-heading mb-5">
                A Taxi Service You Can Actually Rely On
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Rideshare apps made getting a ride easier but also a lot less predictable. Oz Services brings back what a taxi service is supposed to be — licensed drivers, flat rates, and a team that actually answers the phone.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reasons.map(({ title, desc }) => (
                <div key={title} className="bg-slate-50 border border-slate-200 rounded-2xl p-7 hover:border-blue-200 hover:shadow-lg transition-all">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm mb-5">✓</div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-3">{title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-[15px]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage — linked city cards */}
        <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-heading mb-4">
                Oz Services Covers All 50 States
              </h2>
              <p className="text-slate-600 font-medium text-lg">
                Whether you need an airport run or a late night local trip, there is an Oz Services driver near you right now. Click your city to see local details and coverage.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {cities.map(({ name, slug, note }) => (
                <Link
                  key={name + slug}
                  href={`/locations/${slug}`}
                  className="bg-white border border-slate-200 rounded-xl px-4 py-4 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                >
                  <div className="font-bold text-slate-900 group-hover:text-blue-700 text-sm transition-colors">{name}</div>
                  <div className="text-slate-400 text-xs font-medium mt-1">{note}</div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/service-areas" className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-700 underline-offset-2 hover:underline">
                View all Oz Services service areas across the USA →
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
            <p className="text-slate-600 text-lg leading-relaxed mb-5">
              When you search for a <strong>taxi near me</strong>, you need something fast, honest, and reliable. You do not need an app that triples your fare because it started raining. <strong>Oz Services</strong> was built to give passengers across the United States a better option.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              We operate with <strong>zero surge pricing</strong>. The fare shown at booking is the fare you pay, every time. Our licensed drivers are positioned near city centers, airports, and business districts so when you need a <strong>cab near me</strong>, we can have someone with you quickly.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                { label: "Airport Taxi Transfers", desc: "To and from all major US airports with real-time flight tracking.", href: "/services" },
                { label: "24/7 Local City Rides", desc: "Need a taxi at 3 AM? Our dispatch never sleeps.", href: "/booking" },
                { label: "Corporate Taxi Accounts", desc: "Dedicated billing and priority dispatch for business clients.", href: "/services" },
                { label: "Long-Distance Routes", desc: "Fixed-rate rides between cities with no surprise fees.", href: "/pricing" },
              ].map(({ label, desc, href }) => (
                <li key={label} className="flex gap-3 items-start">
                  <span className="mt-1 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  <span className="text-slate-700">
                    <Link href={href} className="font-bold text-slate-900 hover:text-blue-600">{label}:</Link>{" "}{desc}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-slate-600 text-lg">
              Ready to book?{" "}
              <Link href="/booking" className="text-blue-600 font-semibold hover:underline">Book your Oz Services taxi online</Link>{" "}
              or call{" "}
              <a href="tel:4077938143" className="text-blue-600 font-semibold hover:underline">407-793-8143</a>{" "}
              to speak with a live dispatcher right now.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-heading mb-4">
                Taxi Near Me Common Questions
              </h2>
              <p className="text-slate-600 font-medium text-lg">
                Answers to the questions we get asked most about booking a taxi near you with Oz Services.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 transition-colors">
                  <h3 className="text-[15px] font-bold text-slate-900 mb-3">{faq.question}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-[15px]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-blue-600 text-center px-4">
          <h2 className="text-3xl md:text-5xl font-black text-white font-heading mb-6">
            Need a Taxi Near You? Call Oz Services Now
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Forget the surge pricing and the long wait. Oz Services sends a professional, licensed driver to you within minutes. We are here 24 hours a day across all 50 US states.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:4077938143"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-10 py-5 rounded-xl hover:bg-slate-50 transition-all shadow-xl text-lg hover:scale-105"
            >
              📞 Call 407-793-8143
            </a>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white font-bold px-10 py-5 rounded-xl hover:bg-blue-800 transition-all text-lg border border-blue-500"
            >
              Book Online Now →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
