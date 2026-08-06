import { FiShield, FiClock, FiDollarSign, FiMap, FiCheck, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const benefits = [
  {
    icon: FiShield,
    title: "Vetted & Licensed Chauffeurs",
    desc: "Every driver undergoes background screening, holds commercial licensing, and carries full commercial passenger liability insurance.",
  },
  {
    icon: FiClock,
    title: "Punctual & Reliable Arrivals",
    desc: "Drivers are strategically positioned near key airport hubs and city corridors to ensure on-time pickups.",
  },
  {
    icon: FiDollarSign,
    title: "Guaranteed Upfront Rates",
    desc: "No surge pricing during peak hours, bad weather, or traffic delays. The price quoted during booking is fixed.",
  },
  {
    icon: FiMap,
    title: "Nationwide USA Coverage",
    desc: "Coverage extending across all 50 states, serving major metropolitan airports, business districts, and local communities.",
  },
];

export default function WhyChooseUs({ city }: { city?: string }) {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">
              Why Choose Oz Services {city ? `in ${city}` : ""}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-heading mb-6 tracking-tight">
              {city ? `Built on Trust & Professionalism in ${city}` : "Built on Trust & Professionalism"}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-normal mb-8">
              A licensed nationwide taxi network with professional drivers, transparent flat rates, and a 24/7 human dispatch center.
            </p>

            <div className="space-y-6">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base font-heading mb-1">
                      {title}
                    </h3>
                    <p className="text-slate-600 font-normal leading-relaxed text-sm">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-slate-800 transition-colors text-sm shadow-sm"
              >
                About Our Company <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative flex flex-col gap-6">
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md border border-slate-200">
              <Image 
                src="/images/why_choose_us_luxury.png" 
                alt="Executive business travel with Oz Services" 
                fill 
                className="object-cover" 
              />
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "10,000+", label: "Rides Completed" },
                  { num: "99%", label: "On-Time Rate" },
                  { num: "4.9 / 5", label: "Passenger Rating" },
                  { num: "24/7", label: "Dispatch Service" },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center py-4 border border-slate-100 rounded-xl bg-slate-50/50">
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight mb-1">
                      {num}
                    </div>
                    <div className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 flex items-start gap-4 text-white">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white mt-0.5">
                <FiCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base font-heading mb-1">
                  Punctuality Guarantee
                </h4>
                <p className="text-slate-300 font-normal text-xs sm:text-sm leading-relaxed">
                  Real-time flight monitoring and driver position tracking ensure your vehicle arrives on schedule.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
