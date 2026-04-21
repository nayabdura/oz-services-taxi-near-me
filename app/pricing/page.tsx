import { Metadata } from "next";
import Link from "next/link";
import { FiCheck, FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Transparent Taxi Pricing | No Surge Pricing | Oz Services USA",
  description:
    "View our competitive nationwide taxi fare rates. Economy, Premium, and Luxury tiers with upfront pricing, zero surge fees, and no hidden charges. Airport transfers, city rides, and corporate accounts across all USA states.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Transparent Taxi Pricing | No Hidden Fees | Oz Services USA",
    description:
      "Honest taxi fares nationwide. No surge pricing. No hidden fees. Guaranteed upfront pricing on every ride.",
  },
};

const plans = [
  {
    name: "Economy",
    vehicle: "Standard Sedan",
    base: "$8",
    perMile: "$2.50",
    minFare: "$12",
    passengers: 4,
    bags: 2,
    features: [
      "Standard sedan or compact",
      "Air conditioning",
      "Real-time GPS tracking",
      "Up to 4 passengers",
      "2 medium bags",
      "24/7 dispatch access",
    ],
    popular: false,
    cta: "/booking?service=economy",
    ctaLabel: "Book Economy",
  },
  {
    name: "Premium",
    vehicle: "Executive SUV",
    base: "$12",
    perMile: "$3.50",
    minFare: "$18",
    passengers: 6,
    bags: 4,
    features: [
      "Spacious executive SUV",
      "Premium leather interior",
      "Priority booking queue",
      "Up to 6 passengers",
      "4 large bags",
      "Complimentary water",
    ],
    popular: true,
    cta: "/booking?service=premium",
    ctaLabel: "Book Premium",
  },
  {
    name: "Luxury",
    vehicle: "Executive Minivan",
    base: "$20",
    perMile: "$5.00",
    minFare: "$30",
    passengers: 8,
    bags: 8,
    features: [
      "Executive minivan or van",
      "Professional chauffeur",
      "Airport meet & greet",
      "Up to 8 passengers",
      "High-speed WiFi onboard",
      "Full luggage assistance",
    ],
    popular: false,
    cta: "/booking?service=luxury",
    ctaLabel: "Book Luxury",
  },
];

const notes = [
  "All prices shown in USD. Applicable state and local taxes may vary by location.",
  "Airport authority surcharges are passed at exact cost — zero markup.",
  "Toll road fees passed at exact cost. No markup on tolls.",
  "Corporate accounts receive custom volume discounts and monthly billing cycles.",
  "Waiting time billed at $0.50/minute after an initial complimentary 5 minutes.",
  "Holiday surcharges may apply on Thanksgiving, Christmas Eve, and New Year's Eve.",
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4">
            Fare Structure
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading mb-6 tracking-tight">
            Simple, Transparent <span className="text-blue-500">Pricing</span>
          </h1>
          <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            We publish our full fare structure publicly because we have nothing
            to hide. No surge algorithms. No dynamic pricing. Just honest, fair
            taxi rates — available nationwide across all USA states.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border overflow-hidden ${
                  plan.popular
                    ? "border-blue-600 shadow-2xl shadow-blue-900/10 md:-translate-y-3"
                    : "border-slate-200 shadow-sm"
                }`}
              >
                {/* Popular Banner */}
                {plan.popular && (
                  <div className="bg-blue-600 text-white text-xs font-bold uppercase tracking-widest text-center py-2.5">
                    ★ Most Popular
                  </div>
                )}

                {/* Top */}
                <div className="p-7 pb-6 bg-white">
                  <h2 className="text-2xl font-black text-slate-900 font-heading">
                    {plan.name}
                  </h2>
                  <p className="text-slate-500 font-medium text-sm mb-5">
                    {plan.vehicle}
                  </p>

                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-5xl font-black text-slate-900 tracking-tight">
                      {plan.base}
                    </span>
                    <span className="text-slate-400 font-semibold text-sm mb-1.5">
                      /base fare
                    </span>
                  </div>

                  {/* Micro metrics */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                      <div className="font-black text-slate-900 text-sm">{plan.perMile}</div>
                      <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wide mt-0.5">Per mile</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                      <div className="font-black text-slate-900 text-sm">{plan.passengers}</div>
                      <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wide mt-0.5">Pax</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                      <div className="font-black text-slate-900 text-sm">{plan.minFare}</div>
                      <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wide mt-0.5">Min fare</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="border-t border-slate-100 p-7 pt-6 flex flex-col flex-grow bg-white">
                  <ul className="space-y-3.5 mb-8 flex-grow">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <FiCheck
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            plan.popular ? "text-blue-600" : "text-slate-400"
                          }`}
                        />
                        <span className="text-slate-700 font-medium text-[14px] leading-snug">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.cta}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all flex items-center justify-center gap-2 active:scale-95 ${
                      plan.popular
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {plan.ctaLabel} <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Notes */}
      <section className="pb-20 lg:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
            <h2 className="text-blue-900 font-bold text-xl font-heading mb-6">
              Important Pricing Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map((note) => (
                <div key={note} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <p className="text-blue-900/80 font-medium leading-relaxed text-sm">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
