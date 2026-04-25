import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FiShield, FiClock, FiTarget, FiUsers } from "react-icons/fi";

export const metadata: Metadata = {
  title: "About Oz Services | Trusted Taxi Company Across the USA",
  description:
    "Oz Services is a licensed, 24/7 taxi company serving passengers across the USA. Learn about how we started, what we stand for, and why thousands of travelers book with us again and again.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Oz Services | Trusted Taxi Company Across the USA",
    description:
      "A licensed 24/7 taxi company with vetted drivers, honest pricing, and service across the USA. Airport transfers, city rides, and corporate travel.",
  },
};

const values = [
  {
    icon: FiShield,
    title: "Safety Is Always the Priority",
    desc: "Every driver in our network goes through a full federal background check, holds a valid commercial license, and carries complete insurance coverage. Our vehicles are inspected monthly. No exceptions.",
  },
  {
    icon: FiClock,
    title: "We Show Up On Time",
    desc: "We track live traffic conditions, airport gates, and your exact route from the moment you book. When we give you a pickup time, we keep it. Our on-time rate is consistently above 99 percent.",
  },
  {
    icon: FiTarget,
    title: "The Price We Quote Is the Price You Pay",
    desc: "No algorithms deciding your fare at checkout. No surge multipliers buried in the fine print. You see the full price before you confirm your booking and that is exactly what you are charged.",
  },
  {
    icon: FiUsers,
    title: "Real People Handling Every Ride",
    desc: "We are not an app connecting strangers. We are a real taxi company with an in-house dispatch team, trained drivers, and direct accountability to every passenger we serve.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero */}
      <section className="relative bg-slate-950 pt-28 pb-20 overflow-hidden">
        <Image
          src="/images/about_hero.png"
          alt="Modern high-tech taxi dispatch center map representing nationwide USA coverage"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4">
            Our Story
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading mb-6 tracking-tight">
            About Oz Services
          </h1>
          <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            We built Oz Services because passengers deserved a taxi company they could actually depend on. Honest pricing. Drivers who show up. Service that works, every single time.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-heading mb-6 tracking-tight">
                From a Small Fleet to a Nationwide Taxi Network
              </h2>
              <div className="space-y-5 text-slate-600 font-medium leading-relaxed text-[15px]">
                <p>
                  Oz Services started with a small regional fleet running between hotel corridors and international airports. Everywhere we operated, we heard the same frustration from travelers. Rideshare apps were inconsistent. Prices spiked without warning. Drivers showed up in the wrong vehicles and had no idea which terminal to use.
                </p>
                <p>
                  We decided to do things differently. We hired licensed, fully vetted professional drivers. We set flat transparent rates that never change based on demand. We built a dispatch team that monitors your flight before you even land and positions a driver nearby so you are never left waiting.
                </p>
                <p>
                  Today our fleet of sedans, premium SUVs, and executive minivans serves tens of thousands of passengers every year across all 50 states. We cover every major airport hub and every city in between.
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

            {/* Image side */}
            <div className="relative w-full h-80 lg:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 order-first lg:order-last">
              <Image
                src="/images/why_choose_us_luxury.png"
                alt="Professional chauffeur providing excellent customer taxi service"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-20">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
            Ready to Book Your Ride?
          </h2>
          <p className="text-blue-100 font-medium text-lg mb-8 max-w-xl mx-auto">
            Book online in under 60 seconds or call us directly. No apps, no surge pricing, and no unpleasant surprises when you arrive.
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
