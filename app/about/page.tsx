import { Metadata } from "next";
import Link from "next/link";
import { FiShield, FiClock, FiTarget, FiUsers } from "react-icons/fi";

export const metadata: Metadata = {
  title: "About Oz Services | America's Most Trusted Taxi Company",
  description:
    "Learn about Oz Services — America's premier 24/7 nationwide taxi network. Discover our story, our mission, and our commitment to safe, transparent, and reliable transportation across all 50 states.",
  openGraph: {
    title: "About Oz Services | America's Most Trusted Taxi Company",
    description:
      "America's premier 24/7 nationwide taxi network. Reliable airport transfers, local rides, and corporate travel across the USA.",
  },
};

const values = [
  {
    icon: FiShield,
    title: "Safety First, Always",
    desc: "Every driver undergoes federal background checks, holds a valid commercial license, and is fully insured. Vehicles are inspected monthly. There are zero exceptions to our safety standards.",
  },
  {
    icon: FiClock,
    title: "Punctuality is Non-Negotiable",
    desc: "We track live traffic, airport gates, and your route in real time. When we quote a pickup time, we honour it. Our on-time performance rate consistently exceeds 99%.",
  },
  {
    icon: FiTarget,
    title: "Complete Pricing Transparency",
    desc: "No algorithms. No surge multipliers. No fine print. You see the full price before you book, and you pay exactly that amount — regardless of traffic, weather, or demand.",
  },
  {
    icon: FiUsers,
    title: "Real People Behind Every Ride",
    desc: "We're a real nationwide taxi company — not a tech startup with contractor drivers. Every dispatch is handled by our in-house team who knows the roads intimately.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero */}
      <section className="bg-slate-900 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4">
            Our Story
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading mb-6 tracking-tight">
            About Oz Services
          </h1>
          <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            Serving all of the USA. Built with one mission — to
            give passengers a nationwide taxi service they can genuinely rely on, every
            single time.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-heading mb-6 tracking-tight">
                From a Small Fleet to America's Premier Taxi Network
              </h2>
              <div className="space-y-5 text-slate-600 font-medium leading-relaxed text-[15px]">
                <p>
                  Oz Services launched from a small regional fleet operating
                  around major hotel corridors and international
                  airports. The problem we kept hearing from travelers was
                  consistent: rideshare apps were unpredictable — surge pricing,
                  wrong vehicles, drivers who didn't know the airport terminals.
                </p>
                <p>
                  We built Oz Services to solve exactly that. Licensed, vetted
                  professional drivers. Transparent flat rates. Dispatchers who
                  monitor your flight and are stationed nearby before you land.
                  It's the kind of service that used to be called standard — we
                  just made it reliable again.
                </p>
                <p>
                  Today, our fleet of sedans, premium SUVs, and executive minivans
                  serves tens of thousands of passengers annually across 50
                  states, covering every major airport hub and every corner
                  of the USA.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 text-sm active:scale-95"
                >
                  Book a Ride Today →
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "10+", label: "Years Operating", sub: "Nationwide coverage" },
                { value: "10K+", label: "Rides Completed", sub: "Verified passenger trips" },
                { value: "50+", label: "States Covered", sub: "Nationwide network" },
                { value: "4.9★", label: "Star Rating", sub: "From 847+ reviews" },
              ].map(({ value, label, sub }) => (
                <div
                  key={label}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-7 text-center hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <div className="text-4xl font-black text-blue-600 font-heading mb-2 tracking-tight">
                    {value}
                  </div>
                  <div className="font-bold text-slate-900 text-sm mb-1">{label}</div>
                  <div className="text-slate-500 text-xs font-medium">{sub}</div>
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
              Our Values
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-heading mb-5">
              What We Stand For
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              Four principles that shape every decision, every dispatch, and every
              ride at Oz Services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-slate-200 rounded-2xl p-8 flex gap-5 hover:shadow-lg hover:border-blue-100 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-3">
                    {title}
                  </h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-[15px]">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white font-heading mb-4">
            Ready to Ride with America's Best?
          </h2>
          <p className="text-blue-100 font-medium text-lg mb-8 max-w-xl mx-auto">
            Book your next ride in under 60 seconds. No apps, no surge pricing, no
            surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-sm active:scale-95"
            >
              Book a Taxi Now
            </Link>
            <a
              href="tel:4077938143"
              className="inline-flex items-center justify-center text-white font-bold px-8 py-4 rounded-xl border-2 border-white/30 hover:bg-white/10 transition-colors text-sm"
            >
              📞 Call 407-793-8143
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
