import Link from "next/link";
import { FiArrowRight, FiPhoneCall, FiMapPin } from "react-icons/fi";

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
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">
              Nationwide Coverage
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-heading mb-4">
              USA Service Areas
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-normal">
              Serving major airport corridors, business districts, and suburban regions across America.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 flex-wrap">
            <a
              href="tel:4077938143"
              className="inline-flex items-center gap-2 whitespace-nowrap text-white font-bold bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-xl transition-colors text-xs shadow-md shadow-blue-600/20"
            >
              <FiPhoneCall className="w-4 h-4" /> Call 407-793-8143
            </a>
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 whitespace-nowrap text-slate-900 font-bold border-2 border-slate-900 px-4 py-3 rounded-xl hover:bg-slate-900 hover:text-white transition-colors text-xs"
            >
              All Service Areas <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {areas.map((area) => (
            <div
              key={area.name}
              className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 hover:bg-slate-100/80 transition-colors group"
            >
              <div>
                <span className="font-bold text-slate-900 text-sm">
                  {area.name}
                </span>
                <span className="block text-slate-500 text-xs font-medium mt-0.5">
                  {area.airport ? `Airport: ${area.airport}` : area.state}
                </span>
              </div>
              <FiMapPin className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
          ))}
          <div className="col-span-2 sm:col-span-3 md:col-span-4 flex items-center justify-center bg-slate-900 text-white rounded-xl px-4 py-3.5 font-bold text-sm">
            Nationwide Coverage — Call Dispatch to Book Rides Anywhere in the US
          </div>
        </div>
      </div>
    </section>
  );
}
