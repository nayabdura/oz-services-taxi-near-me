import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | Oz Services Taxi",
  description: "Read Oz Services Terms & Conditions for nationwide taxi booking, flat-rate policies, passenger guidelines, and cancellation rules.",
  alternates: { canonical: "https://www.oztaxinearme.com/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <div className="pt-20 bg-white min-h-screen">
      <section className="bg-slate-900 py-16 text-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="text-blue-400 font-bold tracking-wider uppercase text-xs mb-2">Legal Terms</p>
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-white mb-3">Terms &amp; Conditions</h1>
          <p className="text-slate-400 text-xs font-medium">Last updated: 2026</p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 lg:p-12 space-y-8 border border-slate-200 rounded-2xl shadow-sm">
            {[
              { title: "1. Acceptance of Terms", body: "By placing a booking with Oz Services, you agree to these Terms and Conditions. Our services provide 24/7 passenger ground transportation across all 50 US states." },
              { title: "2. Booking & Vehicle Dispatch", body: "Bookings are processed in real time by our dispatch center. A booking is confirmed once confirmation details are transmitted via SMS or email. Vehicle types are assigned according to passenger selection." },
              { title: "3. Transparent Flat Rates", body: "Fares are quoted upfront in USD and include all standard operating charges. No dynamic surge pricing is applied during peak hours or weather events. Tolls and airport airport fees are calculated at booking." },
              { title: "4. Cancellation & Refund Policy", body: "Cancellations made in advance of driver dispatch are free of charge. In the event of flight delays, our live flight tracking system adjusts pickup times automatically." },
              { title: "5. Passenger Safety & Vehicle Care", body: "Passengers are required to adhere to safety regulations, wear seatbelts, and respect drivers and equipment. Vehicles undergo routine sanitation and maintenance." },
              { title: "6. Customer Support", body: "For questions, corporate account setup, or booking changes, contact our 24/7 dispatch line at 407-793-8143 or (407) 967-603 or email oztaxinearme@gmail.com." },
            ].map(section => (
              <div key={section.title}>
                <h2 className="text-slate-900 font-bold text-lg mb-2 font-heading">{section.title}</h2>
                <p className="text-slate-600 font-normal leading-relaxed text-sm">{section.body}</p>
              </div>
            ))}

            <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4 justify-between items-center text-xs font-semibold text-slate-500">
              <span>© {new Date().getFullYear()} Oz Services Taxi</span>
              <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
