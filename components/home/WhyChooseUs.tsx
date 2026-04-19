import { FiShield, FiClock, FiDollarSign, FiMap } from "react-icons/fi";
import Link from "next/link";

const benefits = [
  {
    icon: FiShield,
    title: "Fully Vetted & Licensed Drivers",
    desc: "Every driver undergoes federal background checks, holds a valid commercial license, and is fully insured. We never cut corners on your safety.",
  },
  {
    icon: FiClock,
    title: "Guaranteed On-Time Pickup",
    desc: "We respect your schedule. Advanced dispatch algorithms ensure your driver is positioned nearby before you even request your ride.",
  },
  {
    icon: FiDollarSign,
    title: "100% Transparent Pricing",
    desc: "No surge pricing, no hidden fees, no algorithm manipulation. The quoted price is always the exact final price you pay.",
  },
  {
    icon: FiMap,
    title: "Nationwide USA Coverage",
    desc: "From New York City to Los Angeles, from Chicago to Miami — if you're in the USA, we have a driver ready to get you there.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-heading mb-6">
              Built on Trust,<br />Driven by Excellence
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium mb-10">
              We're not a rideshare algorithm. We're a real nationwide taxi company with
              real accountability, real drivers, and real service standards that have
              earned the trust of over 10,000 passengers across America.
            </p>

            <div className="space-y-7">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg font-heading mb-1">
                      {title}
                    </h3>
                    <p className="text-slate-600 font-medium leading-relaxed text-[15px]">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-slate-800 transition-colors active:scale-95 text-sm shadow-sm"
              >
                About Our Company →
              </Link>
            </div>
          </div>

          {/* Right: Stats Visual */}
          <div className="relative flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: "10K+", label: "Rides Completed" },
                  { num: "99%", label: "On-Time Rate" },
                  { num: "4.9★", label: "Star Rating" },
                  { num: "50*", label: "US States covered" },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center py-4 border border-slate-100 rounded-xl">
                    <div className="text-3xl font-black text-blue-600 font-heading tracking-tight mb-1">
                      {num}
                    </div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-7 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0 text-white text-lg">
                ✓
              </div>
              <div>
                <p className="text-white font-bold text-lg font-heading mb-1">
                  Punctuality Guarantee
                </p>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  If your driver is more than 10 minutes late, your next ride
                  upgrade is completely free. That's our commitment to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
