import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const areas = [
  { name: "Orlando", airport: "MCO" },
  { name: "Miami", airport: "MIA" },
  { name: "Tampa", airport: "TPA" },
  { name: "Fort Lauderdale", airport: "FLL" },
  { name: "West Palm Beach", airport: "PBI" },
  { name: "Kissimmee", airport: null },
  { name: "St. Petersburg", airport: null },
  { name: "Jacksonville", airport: "JAX" },
  { name: "Clearwater", airport: null },
  { name: "Daytona Beach", airport: "DAB" },
  { name: "Boca Raton", airport: null },
  { name: "Tallahassee", airport: "TLH" },
];

export default function ServiceAreasSection() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">
              Coverage Network
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-heading mb-4">
              We Cover All of Florida
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              Our professional driver network spans the entire Sunshine State. 
              Major city centers and all three international airport hubs are covered.
            </p>
          </div>
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 whitespace-nowrap text-slate-900 font-bold border-2 border-slate-900 px-6 py-3 rounded-xl hover:bg-slate-900 hover:text-white transition-all text-sm"
          >
            All Service Areas <FiArrowRight className="w-4 h-4" />
          </Link>
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
                {area.airport && (
                  <span className="block text-slate-400 text-xs font-semibold mt-0.5">
                    Serving {area.airport}
                  </span>
                )}
              </div>
              <span className="text-slate-400 group-hover:text-blue-500 text-sm transition-colors">📍</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
