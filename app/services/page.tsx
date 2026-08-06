import { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiPhone, FiNavigation, FiSend, FiBriefcase, FiClock, FiUsers, FiCompass } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Nationwide Taxi Services | 24/7 Cab — Oz Services",
  description:
    "Oz Services provides 24/7 airport transfers, city rides, corporate accounts & long-distance cab rides across the USA. Zero surge pricing. Book online.",
  alternates: { canonical: "https://www.oztaxinearme.com/services" },
  openGraph: {
    title: "Nationwide Taxi Services | Airport, Corporate & City Transfers — Oz Services",
    description:
      "Professional taxi services across the USA. Airport taxi transfers, corporate accounts, city cab rides, and group transport — no surge pricing.",
    url: "https://www.oztaxinearme.com/services",
    siteName: "Oz Services Taxi",
  },
};

const services = [
  {
    icon: FiNavigation,
    title: "Local Taxi Near Me",
    slug: "/taxi-near-me",
    desc: "Rapid cab dispatch for daily errands, appointments, and local city commutes. Positioned across major USA cities for fast response times.",
    features: ["Same-day online taxi booking", "Real-time dispatch updates", "Zero surge pricing", "Available 24/7"],
  },
  {
    icon: FiSend,
    title: "Airport Taxi Transfers",
    slug: "/taxi-near-me",
    desc: "Reliable airport cab rides to and from all major US airports. Live flight tracking included so your driver is ready when your plane lands.",
    features: ["Live airport flight tracking", "Terminal pickup coordination", "Flight delay protection", "No waiting penalties"],
  },
  {
    icon: FiCompass,
    title: "Long Distance & Intercity Taxi",
    slug: "/pricing",
    desc: "Flat-rate long-distance ground transportation between cities and states with no unexpected meter jumps or surge rates.",
    features: ["Fixed-rate route pricing", "Comfortable executive sedans", "Experienced long-distance drivers", "Clean maintained fleet"],
  },
  {
    icon: FiBriefcase,
    title: "Corporate & Executive Travel",
    slug: "/pricing",
    desc: "Dedicated executive travel accounts for US businesses. Consolidated monthly billing, priority taxi dispatch, and dedicated account support.",
    features: ["Monthly invoicing option", "Priority dispatch queue", "Dedicated account management", "Corporate volume discounts"],
  },
  {
    icon: FiClock,
    title: "24/7 Night & Early Morning Taxi",
    slug: "/taxi-near-me",
    desc: "Safe, reliable taxi dispatch at any hour. Whether catching a 4 AM flight or returning from a late event, our drivers operate 24 hours a day.",
    features: ["Round-the-clock operations", "Vetted licensed drivers", "Full GPS ride tracking", "Safe reliable service"],
  },
  {
    icon: FiUsers,
    title: "Group & Family Taxi Transportation",
    slug: "/fleet",
    desc: "Executive minivans and spacious SUVs accommodating up to 8 passengers for family trips, airport runs, and group travel.",
    features: ["Up to 8 passengers", "Ample luggage capacity", "Child seat on request", "Multi-vehicle dispatch"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 pt-28 pb-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-400 font-bold tracking-widest uppercase text-xs mb-3">
            Nationwide Dispatch
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading mb-6 tracking-tight">
            Professional <span className="text-blue-500">Taxi Services</span>
          </h1>
          <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            From airport terminals to city centers, corporate travel to 24/7 late night dispatch — Oz Services provides reliable ground transportation across America.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.title}
                  className="flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-blue-500 transition-all duration-200"
                >
                  <div className="bg-slate-900 p-6 text-white border-b border-slate-800">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold font-heading mb-2 text-white">
                      {srv.title}
                    </h2>
                    <p className="text-slate-300 font-normal leading-relaxed text-xs sm:text-sm">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <ul className="space-y-2.5 mb-6">
                      {srv.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-slate-700 text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={srv.slug}
                      className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs hover:underline"
                    >
                      Book This Service <FiArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Helpful Blog Guides & Articles Cluster */}
          <div className="mt-16 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">Helpful Travel Guides & Taxi Insights</h3>
                <p className="text-slate-600 text-xs mt-1">Read expert advice from our logistics team before booking your ride:</p>
              </div>
              <Link href="/blog" className="text-blue-600 font-bold text-xs hover:underline shrink-0">
                View All Articles →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/blog/secrets-stress-free-airport-taxi-transfers-usa" className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 transition-colors group">
                <span className="text-blue-600 text-xs font-bold uppercase tracking-wider block mb-1">Airport Travel</span>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">Airport Taxi Transfer Tips</h4>
              </Link>
              <Link href="/blog/corporate-taxi-executive-travel-guide-usa" className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 transition-colors group">
                <span className="text-blue-600 text-xs font-bold uppercase tracking-wider block mb-1">Corporate</span>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">Corporate Taxi Executive Travel Guide</h4>
              </Link>
              <Link href="/blog/taxi-vs-rideshare-flat-rate-guide-usa" className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 transition-colors group">
                <span className="text-blue-600 text-xs font-bold uppercase tracking-wider block mb-1">Pricing Guide</span>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">Flat Rate Taxi vs Rideshare Surge</h4>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-14 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h2 className="text-2xl font-black font-heading mb-1 text-white">
              Need Instant Taxi Dispatch?
            </h2>
            <p className="text-blue-100 text-sm font-normal">Call our 24/7 dispatchers to book your vehicle immediately.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:4077938143"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-5 py-3 rounded-xl hover:bg-slate-50 transition-colors whitespace-nowrap text-xs shadow-md"
            >
              <FiPhone className="w-4 h-4" /> Call 407-793-8143
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
