import Link from "next/link";
import { FiPhone } from "react-icons/fi";
import BookingWidget from "./BookingWidget";

export default function HeroSection() {
  return (
    <section className="relative bg-slate-900 pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="flex flex-col">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-600/15 border border-blue-500/25 rounded-full px-4 py-2 w-fit mb-8">
              <span className="flex gap-0.5 text-yellow-400 text-xs leading-none">
                {"★★★★★"}
              </span>
              <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
                #1 Rated Nationwide Taxi
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading leading-[1.05] tracking-tight mb-6">
              Professional{" "}
              <span className="text-blue-500">Taxi Near Me</span>
              <br className="hidden sm:block" /> Across All USA
            </h1>

            <p className="text-lg text-slate-300 font-medium leading-relaxed mb-8 max-w-lg">
              Fast, reliable, and transparent taxi service operating 24/7 across
              all USA states. Specializing in airport transfers, local city rides,
              and corporate travel — with zero surge pricing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href="tel:4077938143"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-600/25 active:scale-95 text-base"
              >
                <FiPhone className="w-4 h-4" />
                Call 407-793-8143
              </a>
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold px-7 py-3.5 rounded-xl border border-white/20 transition-colors text-base backdrop-blur-sm"
              >
                Book Online
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                "No surge pricing",
                "24/7 available",
                "Flight tracking included",
                "Vetted licensed drivers",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-slate-400 text-sm font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Booking Widget */}
          <div className="w-full lg:w-auto">
            <BookingWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
