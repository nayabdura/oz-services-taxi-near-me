"use client";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    q: "Are all your Florida taxi drivers fully vetted and licensed?",
    a: "Yes — without exception. Every Oz Services driver holds a valid Florida commercial driving license, has passed a comprehensive federal background check, and is fully covered by commercial vehicle insurance. We run routine re-vetting every 12 months."
  },
  {
    q: "Do you provide airport transfers to MCO, MIA, and TPA?",
    a: "Absolutely. We specialize in airport transfers to Orlando International (MCO), Miami International (MIA), and Tampa International (TPA), as well as Fort Lauderdale (FLL) and West Palm Beach (PBI). Our dispatchers monitor flight data in real-time to ensure zero delays on your arrival pickups."
  },
  {
    q: "Do you charge surge pricing during busy periods or bad weather?",
    a: "Never. Oz Services operates on a strict no-surge-pricing policy. Whether it's rush hour, a major theme park event, or a hurricane warning, you always pay the displayed metered rate or your pre-agreed fixed fare. This is our core promise to every passenger."
  },
  {
    q: "How do I get an upfront fare estimate?",
    a: "Use our booking widget on this page to enter your pickup and drop-off locations. You'll receive an instant fare estimate that reflects your exact route. Corporate clients can also contact us directly for fixed monthly rate negotiations."
  },
  {
    q: "Can I set up a corporate taxi account for my business?",
    a: "Yes. Corporate accounts receive dedicated account management, consolidated monthly invoicing, priority dispatch access, and discounted high-volume route pricing. Contact our team to set up your business account within 24 hours."
  },
  {
    q: "What areas of Florida do you cover?",
    a: "We operate across all major Florida cities including Orlando, Miami, Tampa, Fort Lauderdale, West Palm Beach, Kissimmee, St. Petersburg, Jacksonville, Clearwater, Daytona Beach, Boca Raton, and Tallahassee — with continuous expansion underway."
  }
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
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
            Everything you need to know before booking your Florida taxi.
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
