import Link from "next/link";

const services = [
  {
    emoji: "🚗",
    title: "Local Taxi Near Me",
    desc: "Rapid dispatch for daily commutes and errands. Local drivers stationed throughout the area for sub-10-minute pickup times.",
    link: "/taxi-near-me",
  },
  {
    emoji: "✈️",
    title: "Airport Taxi Transfers",
    desc: "Stress-free rides to MCO, MIA, and TPA. We monitor your flight live for delays and offer complimentary meet & greet in arrivals.",
    link: "/taxi-near-me",
  },
  {
    emoji: "🏙️",
    title: "City & Suburban Rides",
    desc: "Navigate new cities like a local. Fixed-rate city trips with zero surge pricing, even during rush hour or major events.",
    link: "/services",
  },
  {
    emoji: "💼",
    title: "Corporate Accounts",
    desc: "Consolidated monthly invoicing, priority dispatch, and a dedicated VIP account manager for your executive travel needs.",
    link: "/pricing",
  },
  {
    emoji: "🌙",
    title: "Late Night Rides",
    desc: "Safe, secure late-night and early-morning pickups. All drivers are background-checked and vehicles fully tracked.",
    link: "/taxi-near-me",
  },
  {
    emoji: "👨‍👩‍👧‍👦",
    title: "Group Travel",
    desc: "Executive minivans for groups up to 8. Spacious, comfortable, and priced affordably for families and team transport.",
    link: "/pricing",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">
            Our Solutions
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-heading mb-5">
            Every Service You Need
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            From quick local trips to executive corporate travel — Oz Services
            covers every transportation need locally and regionally with professional
            reliability.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.title}
              className="group bg-white border border-slate-200 rounded-2xl p-7 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-3xl mb-5">{srv.emoji}</div>
              <h3 className="text-xl font-bold text-slate-900 font-heading mb-3">
                {srv.title}
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed mb-6 text-[15px]">
                {srv.desc}
              </p>
              <Link
                href={srv.link}
                className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-sm group-hover:gap-2.5 transition-all"
              >
                Learn more <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
