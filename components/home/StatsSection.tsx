export default function StatsSection() {
  const stats = [
    { value: "10,000+", label: "Happy Passengers" },
    { value: "50+", label: "Cities Covered" },
    { value: "24 / 7", label: "Dispatch Available" },
    { value: "4.9 ★", label: "Average Rating" },
  ];

  return (
    <section className="bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight mb-2">
                {value}
              </div>
              <div className="text-blue-100 font-semibold text-sm uppercase tracking-widest">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
