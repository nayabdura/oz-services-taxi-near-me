import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { USA_CITIES } from "@/lib/data/cities";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { FiPhoneCall, FiMapPin, FiStar, FiClock } from "react-icons/fi";

const BASE = "https://www.oztaxinearme.com";

export async function generateStaticParams() {
  return USA_CITIES.map((city) => ({
    state: city.stateSlug,
    citySlug: `taxi-in-${city.slug}`,
  }));
}

type Props = { params: { state: string; citySlug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { citySlug } = await params;
  const requestedCity = decodeURIComponent(citySlug).replace("taxi-in-", "").toLowerCase();
  const cityObj = USA_CITIES.find((c) => c.slug.toLowerCase() === requestedCity);
  if (!cityObj) return { title: "Location Not Found" };

  const { name, state, airport } = cityObj;
  const airportText = airport ? ` | ${airport} Airport Transfers` : "";

  return {
    title: `Taxi in ${name}${airportText} | Oz Services — 24/7 Cab Booking`,
    description: `Need a taxi in ${name}, ${state}? Oz Services provides professional cab service in ${name} around the clock with no surge pricing. Airport transfers, city rides and corporate travel. Call 407-793-8143.`,
    keywords: [
      `taxi in ${name}`,
      `${name} taxi near me`,
      `taxi service ${name}`,
      `cab in ${name}`,
      `affordable taxi ${name}`,
      `24 hour taxi ${name}`,
      `Oz Services ${name}`,
      ...(airport ? [`airport taxi ${name}`, `${airport} airport taxi`] : []),
    ],
    alternates: { canonical: `https://www.oztaxinearme.com/locations/${cityObj.stateSlug}/taxi-in-${cityObj.slug}` },
    openGraph: {
      title: `Taxi in ${name} | Oz Services — 24/7 Cab Service`,
      description: `Professional taxi service in ${name}, ${state}. No surge pricing. Airport transfers and local rides available 24 hours a day.`,
      url: `${BASE}/locations/${cityObj.stateSlug}/taxi-in-${cityObj.slug}`,
    },
  };
}

export default async function CityTaxiPage({ params }: Props) {
  const { citySlug } = await params;
  const requestedCity = decodeURIComponent(citySlug).replace("taxi-in-", "").toLowerCase();
  const cityObj = USA_CITIES.find((c) => c.slug.toLowerCase() === requestedCity);
  if (!cityObj) notFound();

  const { name, state, stateSlug, airport } = cityObj;

  const faqs = [
    {
      question: `How do I book a taxi in ${name}?`,
      answer: `Booking a taxi in ${name} with Oz Services takes about a minute. Go to oztaxinearme.com/booking, enter your pickup location in ${name} and your destination, choose your vehicle, and you will get a confirmation by SMS or email straight away. You can also call 407-793-8143 and a live dispatcher will handle everything for you.`,
    },
    {
      question: `Is there a 24 hour taxi service in ${name}?`,
      answer: `Yes. Oz Services runs around the clock in ${name}, ${state}. Our dispatch center does not close. Whether you need a ride at midnight or an early airport run before dawn, we have licensed drivers ready to go.`,
    },
    {
      question: `Does Oz Services use surge pricing in ${name}?`,
      answer: `No. Oz Services does not use surge pricing in ${name} or anywhere else we operate. The price we quote when you book is what you pay. It does not go up during rush hour, bad weather, or busy events.`,
    },
    ...(airport
      ? [
          {
            question: `Do you offer airport transfers from ${name} (${airport})?`,
            answer: `Yes. Airport transfers are one of our most booked services in ${name}. We monitor your flight so your driver knows exactly when to be there. Book online or call 407-793-8143 for your ${airport} airport transfer.`,
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Schema Markup */}
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${BASE}/` },
          { name: "Taxi Near Me", url: `${BASE}/taxi-near-me` },
          { name: state, url: `${BASE}/locations/${stateSlug}` },
          { name: `Taxi in ${name}`, url: `${BASE}/locations/${stateSlug}/taxi-in-${requestedCity}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "TaxiService"],
            "@id": `${BASE}/locations/${stateSlug}/taxi-in-${requestedCity}#localbusiness`,
            name: `Oz Services Taxi ${name}`,
            alternateName: "Oz Services",
            description: `Professional 24/7 taxi service in ${name}, ${state}. Airport transfers, city rides, and corporate travel with zero surge pricing.`,
            url: `${BASE}/locations/${stateSlug}/taxi-in-${requestedCity}`,
            telephone: "+1-407-793-8143",
            priceRange: "$8 - $20",
            openingHours: "Mo-Su 00:00-23:59",
            image: `${BASE}/og-image.jpg`,
            areaServed: {
              "@type": "City",
              name: name,
              containedInPlace: { "@type": "State", name: state },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: 4.9,
              reviewCount: 847,
              bestRating: 5,
            },
          }),
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-slate-900 pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/10 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="flex items-center justify-center gap-2 text-blue-400 text-sm font-bold tracking-widest uppercase mb-4">
              <FiMapPin />
              <span>Oz Services — {name}, {state}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white font-heading mb-6 tracking-tight">
              Taxi in <span className="text-blue-500">{name}</span>
              <br className="hidden sm:block" />
              <span className="text-3xl md:text-4xl">Available 24 Hours a Day. No Surge Pricing.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Oz Services dispatches professional, licensed drivers in {name} within minutes.
              {airport && ` We serve ${airport} airport and all ${name} area locations.`}{" "}
              Book online or call us for an immediate dispatch.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:4077938143"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg shadow-blue-600/20 text-lg"
              >
                <FiPhoneCall className="w-5 h-5" /> Call 407-793-8143
              </a>
              <Link
                href="/booking"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-bold py-4 px-8 rounded-xl transition-colors text-lg"
              >
                Book Online Now →
              </Link>
            </div>
            {/* Trust Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {["⭐ 4.9/5 Rating", "✓ No Surge Pricing", "✓ Licensed Drivers", "✓ 24/7 Dispatch"].map((t) => (
                <span key={t} className="text-xs font-semibold text-slate-300 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <FiClock className="w-6 h-6" />,
                  title: `Available Around the Clock in ${name}`,
                  desc: `Our dispatch team works day and night. No matter the time, there are Oz Services drivers stationed across ${name} ready to pick you up.`,
                },
                {
                  icon: <FiStar className="w-6 h-6" />,
                  title: "Highly Rated Drivers",
                  desc: `Every driver we use in ${name} is fully vetted, licensed, and insured. They know the local roads and they show up on time.`,
                },
                {
                  icon: <FiMapPin className="w-6 h-6" />,
                  title: airport ? `${airport} Airport Transfers` : "Local and Airport Transfers",
                  desc: airport
                    ? `We track flights in real time for every pickup and drop-off at ${name} (${airport}). You will not pay more because of a delay.`
                    : `From suburban streets to major transport hubs, we cover all ground transport needs across ${name}.`,
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-blue-100 text-blue-600 flex items-center justify-center rounded-xl mb-5">
                    {icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                  <p className="text-slate-600 text-[15px] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Semantic SEO Content */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-900 font-heading mb-6">
              Professional Taxi Service in {name}, {state}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-5">
              When you need a <strong>taxi in {name}</strong>, Oz Services is the most dependable option you will find. We run on transparent fixed pricing with no surge fees. Our drivers are fully licensed, background-checked, and positioned throughout {name} for fast dispatch times.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Whether you need a quick ride within {name}, an{" "}
              {airport ? <><strong>{airport} airport taxi transfer</strong>, a corporate</> : "airport transfer, a corporate"}{" "}
              booking, or a late night pickup, Oz Services is available 24 hours a day, 365 days a year.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                { label: "Book Taxi Online", href: "/booking", desc: `Reserve your ${name} taxi in seconds — no app or account needed.` },
                { label: "View All Services", href: "/services", desc: "Airport transfers, corporate rides, local trips, and more." },
                { label: "Taxi Near Me", href: "/taxi-near-me", desc: "Find Oz Services drivers near your exact location right now." },
                { label: `${state} Taxi Service`, href: `/locations/${stateSlug}`, desc: `View all Oz Services coverage areas across ${state}.` },
              ].map(({ label, href, desc }) => (
                <li key={label} className="flex gap-3 items-start">
                  <span className="mt-1 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs flex-shrink-0">✓</span>
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
              <h2 className="text-3xl font-black text-slate-900 font-heading mb-4">
              Taxi in {name} Common Questions
            </h2>
            <p className="text-slate-600 text-lg">
              Questions people ask us about Oz Services taxi in {name}, {state}.
            </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 transition-colors">
                  <h3 className="text-[15px] font-bold text-slate-900 mb-3">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed text-[15px]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-blue-600 text-center px-4">
          <h2 className="text-3xl md:text-5xl font-black text-white font-heading mb-6">
            Book Your {name} Taxi Today
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            No surge pricing. No waiting around. Oz Services dispatches a licensed driver in {name} within minutes, any time of day or night.
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
              Book Online →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
