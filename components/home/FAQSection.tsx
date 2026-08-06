"use client";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import FAQSchema from "@/components/seo/FAQSchema";

const faqs = [
  {
    q: "How do I find a taxi near me with Oz Services?",
    a: "It is easy. Use the booking form on this page, type in where you are and where you need to go, pick your vehicle, and you will get a confirmation right away. If you would rather talk to someone, call 407-793-8143 and our dispatcher will handle everything for you.",
  },
  {
    q: "Does Oz Services charge surge pricing during busy hours or bad weather?",
    a: "No, never. The price we show you when you book is the price you pay. It does not matter if it is rush hour, a big event, or a storm outside. We do not change our rates based on demand. That is a promise we make to every passenger.",
  },
  {
    q: "Does Oz Services do airport taxi transfers?",
    a: "Yes, airport rides are one of our most booked services. We cover all major US airports including JFK, LAX, ORD, MIA, MCO, and DFW. Our team watches your flight in real time so if it is delayed, your driver waits. You will not be standing at the curb wondering where your ride is.",
  },
  {
    q: "Can I book a taxi online with Oz Services?",
    a: "You can. Head to oztaxinearme.com/booking, enter your pickup address and drop-off location, and choose when you want to be picked up. No app to download. We send confirmation to your phone or email within seconds.",
  },
  {
    q: "What areas does Oz Services cover?",
    a: "We operate across the USA from major cities like New York, Los Angeles, Chicago, Houston, and Miami to smaller towns in between. Our drivers are stationed across hundreds of locations so there is usually someone near you no matter where you are.",
  },
  {
    q: "Can my business set up a corporate taxi account?",
    a: "Yes. Business accounts get monthly billing so there is no need to submit individual receipts, plus priority booking and a dedicated account manager. Call 407-793-8143 and we can get your account set up within one business day.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <FAQSchema faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">
            FAQs
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-heading mb-5">
            Common Questions
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            Everything you need to know about booking a taxi near you with Oz
            Services.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 transition-colors"
            >
              <button
                className="w-full flex items-center justify-between text-left px-6 py-5 gap-4"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span
                  className={`font-bold text-[15px] leading-snug ${
                    open === i ? "text-blue-600" : "text-slate-900"
                  }`}
                >
                  {faq.q}
                </span>
                <FiChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 text-slate-400 ${
                    open === i ? "rotate-180 text-blue-500" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 pt-2 text-slate-600 font-medium leading-relaxed text-[15px] border-t border-slate-100">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
