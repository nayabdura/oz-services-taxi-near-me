import Link from "next/link";
import { FiArrowRight, FiPhoneCall } from "react-icons/fi";

const areas = [
  { name: "New York", state: "NY", airport: "JFK" },
  { name: "Los Angeles", state: "CA", airport: "LAX" },
  { name: "Chicago", state: "IL", airport: "ORD" },
  { name: "Houston", state: "TX", airport: "IAH" },
  { name: "Miami", state: "FL", airport: "MIA" },
  { name: "Orlando", state: "FL", airport: "MCO" },
  { name: "Las Vegas", state: "NV", airport: "LAS" },
  { name: "Atlanta", state: "GA", airport: "ATL" },
  { name: "Dallas", state: "TX", airport: "DFW" },
  { name: "Seattle", state: "WA", airport: "SEA" },
  { name: "Phoenix", state: "AZ", airport: "PHX" },
  { name: "Denver", state: "CO", airport: "DEN" },
  { name: "Boston", state: "MA", airport: "BOS" },
  { name: "San Francisco", state: "CA", airport: "SFO" },
  { name: "Detroit", state: "MI", airport: "DTW" },
  { name: "Tampa", state: "FL", airport: "TPA" },
];

export default function ServiceAreasSection() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">
              Nationwide Coverage
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-heading mb-4">
              Serving All USA States
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              Our professional driver network spans every state coast to coast.
              Major city centers, airports, and suburban areas — all covered.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:4077938143"
              className="inline-flex items-center gap-2 whitespace-nowrap text-white font-bold bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition-all text-sm shadow-lg shadow-blue-600/20"
            >
              <FiPhoneCall className="w-4 h-4" /> Call 407-793-8143
            </a>
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 whitespace-nowrap text-slate-900 font-bold border-2 border-slate-900 px-6 py-3 rounded-xl hover:bg-slate-900 hover:text-white transition-all text-sm"
            >
              All Service Areas <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {areas.map((area) => (
            <div
              key={area.name}
              className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 hover:bg-blue-50 hover:border-blue-200 transition-colors group"
            >
              <div>
                <span className="font-bold text-slate-800 group-hover:text-blue-700 text-sm transition-colors">
                  {area.name}
                </span>
                <span className="block text-slate-400 text-xs font-semibold mt-0.5">
                  {area.airport ? `Airport: ${area.airport}` : area.state}
                </span>
              </div>
              <span className="text-slate-400 group-hover:text-blue-500 text-sm transition-colors">📍</span>
            </div>
          ))}
          {/* All USA catch-all */}
          <div className="col-span-2 sm:col-span-3 md:col-span-4 flex items-center justify-center bg-blue-600 text-white rounded-xl px-4 py-3.5 font-bold text-sm">
            + All 50 States Covered — Call Us to Book Anywhere in the USA
          </div>
        </div>
      </div>
    </section>
  );
}
