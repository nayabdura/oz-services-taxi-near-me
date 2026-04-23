"use client";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import FAQSchema from "@/components/seo/FAQSchema";

const faqs = [
  {
    q: "How do I find a taxi near me with Oz Services?",
    a: "Finding a taxi near you with Oz Services is simple. Use our online booking form on this page, enter your pickup location and destination, choose your vehicle, and receive instant confirmation. Alternatively, call our 24/7 dispatcher at 407-793-8143 for immediate dispatch to your exact location.",
  },
  {
    q: "Does Oz Services charge surge pricing during peak hours or bad weather?",
    a: "Never. Oz Services operates a strict no-surge-pricing policy nationwide. Whether it's rush hour, a major event, or a hurricane warning, you always pay the displayed quoted rate. Transparent pricing is our core promise to every passenger across all 50 USA states.",
  },
  {
    q: "Does Oz Services offer airport taxi transfers across the USA?",
    a: "Yes — airport transfers are one of our most popular services. We provide seamless, punctual airport pickups and drop-offs at all major US airports including JFK, LAX, ORD, MIA, MCO, DFW, and many more. Our dispatchers monitor your flight in real-time to ensure zero delays.",
  },
  {
    q: "Can I book a taxi online with Oz Services?",
    a: "Absolutely. Our online booking system is available 24/7 at oztaxinearme.com/booking. Simply enter your pickup address, drop-off location, and preferred time. No app download required. Instant confirmation sent by SMS or email.",
  },
  {
    q: "What areas does Oz Services cover in the USA?",
    a: "Oz Services operates across all 50 US states. From New York and Los Angeles to Chicago, Houston, Miami, Dallas, Phoenix, and thousands of smaller cities in between. We have drivers strategically positioned across major metropolitan areas for fastest dispatch times.",
  },
  {
    q: "Can my business set up a corporate taxi account with Oz Services?",
    a: "Yes. Corporate accounts receive dedicated account management, consolidated monthly invoicing, priority dispatch, and discounted high-volume route pricing. Contact our team at 407-793-8143 to set up your Oz Services business account within 24 hours.",
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
