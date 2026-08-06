import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FiShield, FiClock, FiTarget, FiUsers, FiPhone, FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "About Oz Services | 24/7 Nationwide USA Taxi",
  description:
    "Oz Services is a licensed nationwide taxi company serving all 50 US states. Professional drivers, flat-rate pricing & 24/7 live dispatch.",
  alternates: {
    canonical: "https://www.oztaxinearme.com/about",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.oztaxinearme.com/about",
    siteName: "Oz Services Taxi",
    title: "About Oz Services | 24/7 Nationwide USA Taxi Company",
    description:
      "A licensed 24/7 taxi company serving passengers across all 50 US states. Professional drivers, flat-rate pricing, 24/7 live dispatch.",
    images: [
      {
        url: "https://www.oztaxinearme.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Oz Services Taxi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Oz Services | 24/7 Nationwide USA Taxi Company",
    description:
      "A licensed 24/7 taxi company serving passengers across all 50 US states.",
    images: ["https://www.oztaxinearme.com/og-image.jpg"],
  },
};

const values = [
  {
    icon: FiShield,
    title: "Safety Is Always First",
    desc: "Every driver in our fleet undergoes full background checks, holds commercial licensing, and carries full commercial passenger insurance.",
  },
  {
    icon: FiClock,
    title: "On-Time Arrival Guarantee",
    desc: "We track live traffic conditions and flight arrivals so your vehicle is positioned and ready before your scheduled pickup time.",
  },
  {
    icon: FiTarget,
    title: "Transparent Flat Rates",
    desc: "No demand algorithms or surge multipliers. The fare quoted at booking is the exact price you pay.",
  },
  {
    icon: FiUsers,
    title: "24/7 Human Dispatch Support",
    desc: "We are an established taxi company with a live 24/7 human dispatch center ready to handle bookings and questions around the clock.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Page Hero */}
      <section className="relative bg-slate-900 py-20 lg:py-28 text-white">
        <Image
          src="/images/about_hero_luxury.png"
          alt="Oz Services executive taxi company background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <p className="text-blue-400 font-bold tracking-widest uppercase text-xs mb-3">
            Company Overview
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading mb-6 tracking-tight">
            About Oz Services
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            Building America&apos;s most reliable nationwide taxi service through vetted drivers, transparent flat rates, and dedicated 24/7 passenger dispatch.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">Our Mission</p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-heading mb-6">
                Redefining Ground Transportation Across America
              </h2>
              <div className="space-y-4 text-slate-600 font-normal leading-relaxed text-base">
                <p>
                  Oz Services was founded to fix the core issues of modern ground travel: unpredictable surge pricing, unvetted gig drivers, and automated customer service that leaves passengers stranded.
                </p>
                <p>
                  We built our nationwide taxi network around three core principles: <strong>passenger safety</strong>, <strong>honest flat-rate pricing</strong>, and <strong>24/7 live human dispatch support</strong>.
                </p>
                <p>
                  Today, our network serves passengers across all 50 US states — covering major international airports, metropolitan business centers, and suburban communities.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm shadow-md"
                >
                  Book a Ride Now <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-md border border-slate-200">
              <Image
                src="/images/why_choose_us_luxury.png"
                alt="Professional chauffeur with Oz Services passenger"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 pt-12 border-t border-slate-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "10+", label: "Years Operating" },
                { value: "10,000+", label: "Completed Trips" },
                { value: "50", label: "US States Covered" },
                { value: "4.9 / 5", label: "Average Rating" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center"
                >
                  <div className="text-3xl font-black text-slate-900 font-heading mb-1">
                    {value}
                  </div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">
              Core Principles
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-heading mb-4">
              What We Stand For
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-normal">
              Four fundamental standards guiding every ride with Oz Services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-slate-200 rounded-2xl p-7 flex items-start gap-5 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg font-heading mb-2">
                    {title}
                  </h3>
                  <p className="text-slate-600 font-normal leading-relaxed text-sm">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* EEAT Licensing & Credentials Grid */}
          <div className="mt-16 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 font-heading mb-3">EEAT Trust &amp; Safety Compliance</h3>
            <p className="text-slate-600 text-xs mb-6 max-w-2xl">
              Oz Services operates under strict Department of Transportation (DOT) compliance standards, commercial passenger insurance policies, and 2026 USA ground transport regulations:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-blue-600 font-bold uppercase tracking-wider block mb-1">Commercial License</span>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Fully Licensed Chauffeurs</h4>
                <p className="text-slate-600 leading-relaxed">Every driver in our network holds active commercial passenger endorsements and undergoes annual background checks.</p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-blue-600 font-bold uppercase tracking-wider block mb-1">Insurance &amp; Safety</span>
                <h4 className="font-bold text-slate-900 text-sm mb-1">$1M Commercial Liability</h4>
                <p className="text-slate-600 leading-relaxed">Passengers are fully covered under comprehensive commercial liability insurance for total peace of mind on every journey.</p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-blue-600 font-bold uppercase tracking-wider block mb-1">AEO &amp; Flight Tracking</span>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Real-Time Flight Sync</h4>
                <p className="text-slate-600 leading-relaxed">Our dispatch engine integrates live FAA flight data to adjust pickup times automatically for delayed or early arrivals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black font-heading mb-4 text-white">
            Ready to Book Your Ride?
          </h2>
          <p className="text-slate-300 text-base mb-8 max-w-xl mx-auto">
            Book online in under 60 seconds or call our 24/7 dispatch center.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-md"
            >
              Book a Taxi Now <FiArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:4077938143"
              className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl border border-slate-700 transition-colors"
            >
              <FiPhone className="w-4 h-4 text-blue-400" /> Call 407-793-8143
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
