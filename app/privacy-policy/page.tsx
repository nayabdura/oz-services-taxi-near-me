import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Oz Services Taxi",
  description: "Read Oz Services Privacy Policy. Learn how we collect, use, and protect your personal information when booking our nationwide taxi services.",
  alternates: { canonical: "https://www.oztaxinearme.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20 bg-white min-h-screen">
      <section className="bg-slate-900 py-16 text-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="text-blue-400 font-bold tracking-widest uppercase text-xs mb-2">Legal Information</p>
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-white mb-3">Privacy Policy</h1>
          <p className="text-slate-400 text-xs font-medium">Last updated: 2026</p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 lg:p-12 space-y-8 border border-slate-200 rounded-2xl shadow-sm">
            {[
              { title: "1. Information We Collect", body: "We collect personal information voluntarily provided when requesting a taxi booking, including your name, email address, phone number, pickup/drop-off locations, and date of travel. We also process technical data via analytics tools to optimize booking performance." },
              { title: "2. How We Use Your Information", body: "Your information is strictly used to dispatch your requested vehicle, send confirmation notifications via SMS/email, process payments, provide live 24/7 customer support, and ensure trip safety across our nationwide network." },
              { title: "3. Information Sharing Policy", body: "Oz Services does not sell, rent, or trade your personal information to third parties. Information is only shared with assigned professional chauffeurs to complete your ride, and with encrypted payment processing gateways." },
              { title: "4. Data Encryption & Security", body: "We implement industry-standard SSL encryption and security protocols to safeguard all passenger data. Payment transactions are processed in compliance with PCI-DSS standards." },
              { title: "5. Cookies & Analytics", body: "We use essential cookies to maintain secure sessions, remember booking details, and measure anonymous website traffic. You can adjust cookie preferences in your web browser." },
              { title: "6. Passenger Rights & Inquiries", body: "You have the right to request access to, correction of, or deletion of your personal data stored with Oz Services. Contact our support team at oztaxinearme@gmail.com." },
              { title: "7. Contact Information", body: "For privacy-related inquiries or booking support, contact us at oztaxinearme@gmail.com or call 407-793-8143." },
            ].map(section => (
              <div key={section.title}>
                <h2 className="text-slate-900 font-bold text-lg mb-2 font-heading">{section.title}</h2>
                <p className="text-slate-600 font-normal leading-relaxed text-sm">{section.body}</p>
              </div>
            ))}

            <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4 justify-between items-center text-xs font-semibold text-slate-500">
              <span>© {new Date().getFullYear()} Oz Services Taxi</span>
              <Link href="/terms-and-conditions" className="text-blue-600 hover:underline">
                Terms & Conditions →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
