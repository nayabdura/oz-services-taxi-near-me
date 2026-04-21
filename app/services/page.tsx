import { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Nationwide Taxi Services | Airport, Corporate & City Transfers",
  description:
    "Oz Services provides professional USA taxi services including airport transfers, local city rides, corporate accounts, late-night pickups, and group travel — all with zero surge pricing.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Nationwide Taxi Services | Airport, Corporate & City Transfers",
    description:
      "Professional taxi services across the USA. Airport transfers, corporate accounts, city rides, and group transport — no surge pricing.",
  },
};

const services = [
  {
    icon: "🚗",
    title: "Local Taxi Near Me",
    slug: "/taxi-near-me",
    desc: "Rapid dispatch for daily errands, appointments, and commutes. Our localized fleet is positioned within major USA cities for under-10-minute response times.",
    features: ["Same-day booking", "Real-time driver tracking", "Zero surge pricing", "24/7 availability"],
  },
  {
    icon: "✈️",
    title: "Airport Taxi Transfers",
    slug: "/taxi-near-me",
    desc: "Reliable trips to and from every major US airport. We monitor your flight data live and adjust for any delays — your driver waits for you, not the other way around.",
    features: ["Live flight tracking", "Meet & greet in terminal", "Flight delay protection", "No extra waiting fees"],
  },
  {
    icon: "🏙️",
    title: "City & Sightseeing Rides",
    slug: "/taxi-near-me",
    desc: "Explore Florida's world-class destinations — theme parks, beaches, boardwalks, and downtown hubs — with a professional driver who knows every route.",
    features: ["Fixed-rate city routes", "Multi-stop trips available", "Local driver expertise", "Comfortable clean vehicles"],
  },
  {
    icon: "💼",
    title: "Corporate Taxi Accounts",
    slug: "/pricing",
    desc: "Dedicated executive travel management for US businesses. Consolidated monthly billing, priority dispatching, and a dedicated account manager for your team.",
    features: ["Monthly invoicing", "Priority booking queue", "Dedicated account manager", "Volume discounts available"],
  },
  {
    icon: "🌙",
    title: "Late Night & Early Morning",
    slug: "/taxi-near-me",
    desc: "Safe, reliable transportation at any hour. Whether you're heading home after a late evening event or catching a 4am flight, our drivers are available and ready.",
    features: ["24/7 operations", "Vetted night-shift drivers", "Full GPS tracking", "Safe lighting in all vehicles"],
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Group & Family Travel",
    slug: "/pricing",
    desc: "Executive minivans and large SUVs for groups of up to 8 passengers. Perfect for family vacations, sports teams, wedding parties, and conference transfers.",
    features: ["Up to 8 passengers", "Ample luggage space", "Child seat on request", "Multi-vehicle coordination"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4">
            What We Offer
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading mb-6 tracking-tight">
            Complete Nationwide{" "}
            <span className="text-blue-500">Taxi Services</span>
          </h1>
          <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            From airport terminals to city centers, from corporate boardrooms to
            family reunions — Oz Services has a professional solution for every
            transportation need across America.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((srv) => (
              <div
                key={srv.title}
                className="flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Card Top */}
                <div className="bg-slate-50 border-b border-slate-200 px-7 py-6">
                  <div className="text-3xl mb-4">{srv.icon}</div>
                  <h2 className="text-2xl font-black text-slate-900 font-heading mb-2">
                    {srv.title}
                  </h2>
                  <p className="text-slate-600 font-medium leading-relaxed text-[15px]">
                    {srv.desc}
                  </p>
                </div>

                {/* Feature List */}
                <div className="px-7 py-6 flex-grow flex flex-col">
                  <ul className="space-y-3 mb-7 flex-grow">
                    {srv.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-slate-700 text-sm font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={srv.slug}
                    className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:gap-3 transition-all"
                  >
                    Book This Service <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-14 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white font-heading mb-1">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-blue-100 font-medium">Call our dispatchers and we'll match you with the right vehicle immediately.</p>
          </div>
          <a
            href="tel:4077938143"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-7 py-4 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap flex-shrink-0 text-sm active:scale-95"
          >
            📞 Call 407-793-8143
          </a>
        </div>
      </section>
    </div>
  );
}
