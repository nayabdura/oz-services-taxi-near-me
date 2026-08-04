import Link from "next/link";
import Image from "next/image";
import { FiPhone, FiArrowRight } from "react-icons/fi";

export default function CTASection() {
  return (
    <section className="relative bg-slate-950 py-20 lg:py-28 overflow-hidden">
      <Image
        src="/images/cta_luxury.png"
        alt="Oz Services executive transportation"
        fill
        className="object-cover opacity-20 mix-blend-luminosity"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading mb-6 tracking-tight">
          Need a Taxi <span className="text-blue-500">Near You</span> Right Now?
        </h2>

        <p className="text-slate-300 text-lg font-normal leading-relaxed mb-8 max-w-2xl mx-auto">
          Contact our dispatch team or request a ride online. Fast response times, flat rates, and professional drivers 24 hours a day.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-7 py-4 rounded-xl transition-colors shadow-lg shadow-blue-600/20 whitespace-nowrap"
          >
            Book Online <FiArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:4077938143"
            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-7 py-4 rounded-xl border border-slate-700 transition-colors whitespace-nowrap"
          >
            <FiPhone className="w-4 h-4 text-blue-400" /> Call 407-793-8143
          </a>
          <a
            href="tel:407967603"
            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-7 py-4 rounded-xl border border-slate-700 transition-colors whitespace-nowrap"
          >
            <FiPhone className="w-4 h-4 text-blue-400" /> Call (407) 967-603
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-10 border-t border-slate-800/80 pt-8">
          {["No Surge Pricing", "Upfront Rates", "Instant Confirmation", "Available 24 Hours a Day"].map(
            (item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-slate-400 text-xs font-semibold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                {item}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
