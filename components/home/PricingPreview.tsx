import Link from "next/link";
import { FiCheck } from "react-icons/fi";

const plans = [
  {
    name: "Economy",
    vehicle: "Standard Sedan",
    base: "$8",
    perMile: "$2.50",
    minFare: "$12",
    passengers: "Up to 4",
    bags: "2 medium",
    features: ["Air conditioning", "GPS tracked", "24/7 available", "2 medium bags"],
    popular: false,
    cta: "/booking?service=economy",
  },
  {
    name: "Premium",
    vehicle: "Executive SUV",
    base: "$12",
    perMile: "$3.50",
    minFare: "$18",
    passengers: "Up to 6",
    bags: "4 large",
    features: ["Leather interior", "Priority booking", "6 passengers", "Complimentary water"],
    popular: true,
    cta: "/booking?service=premium",
  },
  {
    name: "Luxury",
    vehicle: "Executive Van",
    base: "$20",
    perMile: "$5.00",
    minFare: "$30",
    passengers: "Up to 8",
    bags: "Full team",
    features: ["Meet & greet", "WiFi onboard", "Chauffeur dressed", "Luggage assistance"],
    popular: false,
    cta: "/booking?service=luxury",
  },
];

export default function PricingPreview() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">
            Transparent Fares
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-heading mb-5">
            Honest, Upfront Pricing
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            We never charge surge pricing. The price you see below is the price
            you pay — guaranteed, no exceptions, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
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
              {plan.popular && (
                <div className="bg-blue-600 text-white text-xs font-bold uppercase tracking-widest text-center py-2.5">
                  ★ Most Popular Choice
                </div>
              )}

              {/* Plan Header */}
              <div
                className={`p-7 pb-6 ${
                  plan.popular ? "bg-white" : "bg-white"
                }`}
              >
                <div className="flex items-end justify-between mb-1">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 font-heading">
                      {plan.name}
                    </h3>
                    <p className="text-slate-500 font-medium text-sm">{plan.vehicle}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black text-slate-900 tracking-tight">
                      {plan.base}
                    </div>
                    <div className="text-slate-400 text-xs font-semibold">base fare</div>
                  </div>
                </div>

                {/* Micro stats */}
                <div className="flex gap-3 mt-5">
                  <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                    <div className="font-black text-slate-900 text-sm">{plan.perMile}</div>
                    <div className="text-slate-400 text-xs font-semibold mt-0.5">Per mile</div>
                  </div>
                  <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                    <div className="font-black text-slate-900 text-sm">{plan.passengers}</div>
                    <div className="text-slate-400 text-xs font-semibold mt-0.5">Passengers</div>
                  </div>
                  <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                    <div className="font-black text-slate-900 text-sm">{plan.minFare}</div>
                    <div className="text-slate-400 text-xs font-semibold mt-0.5">Min fare</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="border-t border-slate-100 p-7 pt-6 flex flex-col flex-grow">
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <FiCheck
                        className={`w-4 h-4 flex-shrink-0 ${
                          plan.popular ? "text-blue-600" : "text-slate-400"
                        }`}
                      />
                      <span className="text-slate-700 font-medium text-[15px]">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.cta}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all active:scale-95 ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  Book {plan.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-slate-400 text-sm font-medium mt-8">
          All prices in USD. Airport surcharges and SunPass tolls passed at cost only. No markup.{" "}
          <Link href="/pricing" className="text-blue-600 underline hover:text-blue-700">
            View full pricing details →
          </Link>
        </p>
      </div>
    </section>
  );
}
