import Link from "next/link";
import { FiNavigation, FiSend, FiBriefcase, FiClock, FiUsers, FiCompass, FiArrowRight } from "react-icons/fi";

const services = [
  {
    icon: FiNavigation,
    title: "Local Taxi Near Me",
    desc: "Fast dispatch across major city centers and local suburbs. Prompt pickup times available 24 hours a day.",
    link: "/taxi-near-me",
  },
  {
    icon: FiSend,
    title: "Airport Taxi Transfers",
    desc: "Real-time flight status monitoring for seamless arrivals and departures across all major US airport hubs.",
    link: "/taxi-near-me",
  },
  {
    icon: FiCompass,
    title: "City & Regional Rides",
    desc: "Flat-rate transportation between cities and regions without unexpected traffic multipliers or surge pricing.",
    link: "/services",
  },
  {
    icon: FiBriefcase,
    title: "Corporate Travel Accounts",
    desc: "Consolidated monthly invoicing, priority dispatch, and dedicated account management for enterprise teams.",
    link: "/pricing",
  },
  {
    icon: FiClock,
    title: "24/7 Night & Early Morning Rides",
    desc: "Round-the-clock dispatch availability for late-night event departures and early morning airport transfers.",
    link: "/taxi-near-me",
  },
  {
    icon: FiUsers,
    title: "Executive Group Transportation",
    desc: "Spacious SUVs and executive vans accommodating up to 8 passengers with generous luggage capacity.",
    link: "/pricing",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">
            Core Services
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-heading mb-4">
            Transportation Solutions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            From local city transfers to nationwide corporate travel, Oz Services provides reliable ground transportation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.title}
                className="group bg-white border border-slate-200 rounded-2xl p-7 hover:border-blue-500 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-3">
                    {srv.title}
                  </h3>
                  <p className="text-slate-600 font-normal leading-relaxed text-sm mb-6">
                    {srv.desc}
                  </p>
                </div>
                <Link
                  href={srv.link}
                  aria-label={`Learn more about ${srv.title}`}
                  className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-sm group-hover:gap-2.5 transition-all"
                >
                  Learn More <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
