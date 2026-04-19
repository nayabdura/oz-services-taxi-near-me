import { Metadata } from "next";
import Link from "next/link";
import BookingWidget from "@/components/home/BookingWidget";

export const metadata: Metadata = {
  title: "Taxi Near Me | Instant Cab Booking in Florida — Oz Services",
  description:
    "Searching for a taxi near me in Florida? Oz Services dispatches professional, licensed drivers instantly across Orlando, Miami, Tampa, and 50+ cities. Zero surge pricing. Available 24/7.",
  openGraph: {
    title: "Taxi Near Me | Instant Cab Booking in Florida",
    description:
      "Fast taxi dispatch across 50+ Florida cities. No surge pricing. Licensed drivers. Available 24/7.",
  },
};

const reasons = [
  {
    title: "Drivers Stationed Locally",
    desc: "Unlike scattered gig-worker apps, our professional drivers are positioned within Florida city centers and airport hubs — giving us under-10-minute average pickup times.",
  },
  {
    title: "Zero Surge Pricing, Ever",
    desc: "Rush hour, a major theme park event, or a severe storm warning — the meter rate never changes. You always pay exactly what's quoted.",
  },
  {
    title: "Transparent Fixed Routes",
    desc: "For airport runs and common inter-city routes, we offer fixed pricing so you know the exact total before your trip begins.",
  },
  {
    title: "Immediate Human Dispatch",
    desc: "When you call or book online, you're connected to a real human dispatcher who confirms your vehicle, your driver, and your ETA instantly.",
  },
];

const cities = [
  { name: "Orlando", note: "Serving MCO airport" },
  { name: "Miami", note: "Serving MIA airport" },
  { name: "Tampa", note: "Serving TPA airport" },
  { name: "Fort Lauderdale", note: "Serving FLL airport" },
  { name: "West Palm Beach", note: "Serving PBI airport" },
  { name: "Kissimmee", note: "Theme park corridor" },
  { name: "St. Petersburg", note: "Gulf Coast coverage" },
  { name: "Jacksonville", note: "Serving JAX airport" },
  { name: "Clearwater", note: "Beach & resort area" },
  { name: "Daytona Beach", note: "East coast coverage" },
  { name: "Boca Raton", note: "South Florida" },
  { name: "Tallahassee", note: "Serving TLH airport" },
];

export default function TaxiNearMePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 pt-28 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Copy */}
            <div className="pt-4">
              <p className="text-yellow-400 font-bold tracking-widest uppercase text-xs mb-4">
                Immediate Dispatch
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading mb-6 tracking-tight">
                Find a Taxi <span className="text-blue-500">Near You</span> in
                Florida — Right Now
              </h1>
              <p className="text-xl text-slate-300 font-medium leading-relaxed mb-8 max-w-lg">
                No app downloads. No unpredictable surge pricing. Oz Services
                dispatches a professional, licensed driver to your exact location
                within minutes — 24 hours a day, 7 days a week.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-600/25 text-sm active:scale-95"
                >
                  📞 Call for Immediate Pickup
                </a>
              </div>
            </div>

            {/* Right: Widget */}
            <div>
              <BookingWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Why We Beat Rideshares */}
      <section className="py-20 lg:py-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">
              Why Book Oz Services
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-heading mb-5">
              A Taxi Service You Can Actually Rely On
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              Rideshare apps made transportation convenient but unpredictable.
              We bring back the reliability of a professional taxi service —
              with modern booking technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map(({ title, desc }) => (
              <div
                key={title}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-7 hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm mb-5">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-heading mb-3">
                  {title}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed text-[15px]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-heading mb-4">
              Serving 50+ Florida Cities
            </h2>
            <p className="text-slate-600 font-medium text-lg">
              Whether it's an airport run or a late-night local trip, chances are
              we have a driver near you right now.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cities.map(({ name, note }) => (
              <div
                key={name}
                className="bg-white border border-slate-200 rounded-xl px-4 py-4 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="font-bold text-slate-900 group-hover:text-blue-700 text-sm transition-colors">
                  {name}
                </div>
                <div className="text-slate-400 text-xs font-medium mt-1">
                  {note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
