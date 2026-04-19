import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative bg-slate-900 py-20 lg:py-28 overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-15 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading mb-6 tracking-tight">
          Need a Taxi{" "}
          <span className="text-blue-500">Near You</span>{" "}
          Right Now?
        </h2>

        <p className="text-xl text-slate-300 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
          Skip the app. Skip the surge pricing. Call or book online and have a
          professional Oz Services driver dispatched to your exact location
          within minutes — anywhere in the USA.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base px-9 py-4 rounded-xl transition-colors shadow-xl shadow-blue-600/30 active:scale-95"
          >
            Book Online — It's Instant
          </Link>
          <a
            href="tel:4077938143"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold text-base px-9 py-4 rounded-xl border border-white/20 transition-colors backdrop-blur-sm active:scale-95"
          >
            📞 Call 407-793-8143
          </a>
        </div>

        {/* Trust points */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10">
          {["No surge pricing", "Zero hidden fees", "Confirmed in under 60 seconds", "Available 24/7"].map(
            (item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-slate-400 text-sm font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                {item}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
