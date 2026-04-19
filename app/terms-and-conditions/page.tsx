import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Oz Services Taxi Florida",
  description: "Read Oz Services Terms & Conditions for using our taxi booking services across Florida. Understand your rights and obligations.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <div className="pt-20 bg-white">
      <section className="hero-bg section-sm">
        <div className="container max-w-3xl mx-auto text-center">
          <span className="badge mb-4">📋 Legal</span>
          <h1 className="section-title text-4xl text-gray-900 mb-4">Terms &amp; Conditions</h1>
          <p className="text-gray-600">Last updated: April 15, 2025</p>
        </div>
      </section>

      <section className="section bg-gray-50 border-t border-gray-200">
        <div className="container max-w-4xl mx-auto">
          <div className="glass-card bg-white p-8 lg:p-12 space-y-10 border-gray-100 shadow-md">
            {[
              { title: "1. Acceptance of Terms", body: "By using Oz Services or our taxi booking services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services." },
              { title: "2. Booking and Confirmation", body: "All taxi bookings are subject to driver availability in the Florida area. A booking is only confirmed upon receipt of a confirmation SMS or email from Oz Services. We reserve the right to cancel any booking at our discretion with appropriate notice." },
              { title: "3. Pricing and Payment", body: "All fares are displayed in USD and include taxes. Additional charges may apply for tolls, surcharges (e.g., airport pickups at MCO or MIA), and waiting time. Payment is accepted via cash, credit/debit card, or approved account facilities." },
              { title: "4. Cancellation Policy", body: "Cancellations made more than 1 hour before scheduled pickup time are free of charge. Cancellations within 1 hour of pickup may incur a cancellation fee of up to the minimum fare. No-shows will be charged the full minimum fare." },
              { title: "5. Passenger Conduct", body: "Passengers are expected to behave respectfully toward our drivers and vehicles. Oz Services reserves the right to refuse service to passengers who are intoxicated, abusive, or who damage our vehicles. Damage to vehicles will result in a cleaning or repair fee." },
              { title: "6. Limitation of Liability", body: "Oz Services is not liable for delays caused by traffic, weather (such as Florida hurricanes or heavy rain), or other circumstances beyond our control. Our maximum liability for any claim is limited to the fare paid for the specific trip in question." },
              { title: "7. Lost Property", body: "Oz Services takes no responsibility for personal items left in vehicles. Found items will be held for 7 days and may be claimed by contacting our customer service team. Unclaimed items will be donated to charity." },
              { title: "8. Modifications to Terms", body: "We reserve the right to modify these Terms at any time. Continued use of our services after changes constitutes acceptance of the new Terms. We recommend reviewing these Terms periodically." },
            ].map(section => (
              <div key={section.title}>
                <h2 className="text-gray-900 font-bold text-xl mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>{section.title}</h2>
                <p className="text-gray-600 leading-relaxed text-sm">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
