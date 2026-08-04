import Link from "next/link";
import Image from "next/image";
import { FiPhone, FiArrowRight } from "react-icons/fi";
import BookingWidget from "./BookingWidget";

export default function HeroSection() {
  return (
    <section className="relative bg-slate-950 pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      <Image
        src="/images/hero_luxury.png"
        alt="Oz Services luxury executive taxi fleet"
        fill
        className="object-cover opacity-30 mix-blend-luminosity"
        sizes="100vw"
        priority
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 w-fit mb-6">
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">
                Oz Services Taxi Network
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading leading-[1.05] tracking-tight mb-6">
              Professional <span className="text-blue-500">Taxi Near Me</span>
              <br className="hidden sm:block" /> Available 24/7
            </h1>

            <p className="text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-lg">
              Reliable pickups, guaranteed on-time arrivals, and transparent flat-rate pricing. No surge pricing or hidden fees across all 50 US states.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10 flex-wrap">
              <a
                href="tel:4077938143"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 text-sm whitespace-nowrap"
              >
                <FiPhone className="w-4 h-4" />
                Call 407-793-8143
              </a>
              <a
                href="tel:407967603"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 text-sm whitespace-nowrap"
              >
                <FiPhone className="w-4 h-4" />
                Call (407) 967-603
              </a>
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3.5 rounded-xl border border-slate-700 transition-all text-sm whitespace-nowrap"
              >
                Book Online <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800/80 max-w-md">
              {[
                "No Surge Pricing Ever",
                "Licensed & Vetted Drivers",
                "24/7 Dispatch Team",
                "Flight Tracking Included",
              ].map((item) => (
                <div
                  key={item}
                  className="text-slate-400 text-xs font-semibold flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <BookingWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
