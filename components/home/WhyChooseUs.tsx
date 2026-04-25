import { FiShield, FiClock, FiDollarSign, FiMap } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const benefits = [
  {
    icon: FiShield,
    title: "Fully Vetted and Licensed Drivers",
    desc: "Before any driver joins our fleet, they go through a full federal background check, hold a valid commercial license, and carry complete insurance. Your safety is not something we compromise on.",
  },
  {
    icon: FiClock,
    title: "We Show Up When We Say We Will",
    desc: "Your time matters. We position drivers near you before you even hit book, so when your confirmation comes through, your ride is already on the way.",
  },
  {
    icon: FiDollarSign,
    title: "The Price You See Is the Price You Pay",
    desc: "No algorithm spikes. No hidden airport fees snuck in at the end. No surge pricing because it started raining. The fare we quote is the fare you pay, full stop.",
  },
  {
    icon: FiMap,
    title: "We Cover Your Area",
    desc: "Our drivers are spread across cities, suburbs, and airport corridors so there is always someone close by. Wherever you are heading, we can get you there.",
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
              We are not an app that matches you with a stranger and hopes for the best. We are a licensed taxi company with trained drivers, honest pricing, and a dispatch team that picks up the phone. Over 10,000 passengers have trusted us and kept coming back.
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
          <div className="relative flex flex-col gap-6">
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <Image src="/images/why_choose_us_luxury.png" alt="Well-dressed business person relaxing in the back of a luxury taxi vehicle" fill className="object-cover" />
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: "10K+", label: "Rides Completed" },
                  { num: "99%", label: "On-Time Rate" },
                  { num: "4.9★", label: "Star Rating" },
                  { num: "24/7", label: "Availability" },
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
                  Our Punctuality Promise
                </p>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  If your driver arrives more than 10 minutes late, your next ride upgrade is on us. We stand behind that because we rarely need to honor it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
