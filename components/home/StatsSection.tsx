export default function StatsSection() {
  const stats = [
    { value: "10,000+", label: "Verified Rides" },
    { value: "50+", label: "States Covered" },
    { value: "24 / 7", label: "Live Dispatch" },
    { value: "4.9 / 5", label: "Average Rating" },
  ];

  return (
    <section className="bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight mb-2">
                {value}
              </div>
              <div className="text-slate-400 font-semibold text-xs uppercase tracking-widest">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
