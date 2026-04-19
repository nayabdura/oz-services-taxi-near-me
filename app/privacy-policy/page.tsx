import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Oz Services Taxi Florida",
  description: "Read Oz Services Privacy Policy. Learn how we collect, use and protect your personal information when you use our Florida taxi booking services.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20 bg-white">
      <section className="hero-bg section-sm">
        <div className="container max-w-3xl mx-auto text-center">
          <span className="badge mb-4">🔒 Legal</span>
          <h1 className="section-title text-4xl text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: April 15, 2025</p>
        </div>
      </section>

      <section className="section bg-gray-50 border-t border-gray-200">
        <div className="container max-w-4xl mx-auto">
          <div className="glass-card bg-white p-8 lg:p-12 space-y-10 border-gray-100 shadow-md">
            {[
              { title: "1. Information We Collect", body: "We collect personal information that you voluntarily provide when making bookings, including your name, email address, phone number, and pickup/drop-off locations in Florida. We also collect information about your use of our website through cookies and analytics tools." },
              { title: "2. How We Use Your Information", body: "Your information is used to: process and confirm your taxi bookings; send booking confirmations and updates; provide customer support; improve our services and website; send promotional communications (with your consent); and comply with legal obligations." },
              { title: "3. Information Sharing", body: "We do not sell, trade, or rent your personal information to third parties. We may share your information with our Florida-based drivers to facilitate your booking, and with payment processors to handle transactions. We may disclose information when required by law." },
              { title: "4. Data Security", body: "We implement industry-standard security measures to protect your personal information. All data transmission is encrypted using SSL technology. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security." },
              { title: "5. Cookies", body: "We use cookies to enhance your browsing experience, analyze website traffic and personalize content. You can control cookie settings through your browser preferences. Disabling cookies may affect the functionality of our website." },
              { title: "6. Your Rights", body: "You have the right to access, correct, or delete your personal information. You may also opt-out of marketing communications at any time. To exercise these rights, please contact us at privacy@ozservices.com." },
              { title: "7. Children's Privacy", body: "Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children." },
              { title: "8. Contact Us", body: "For privacy-related enquiries, please contact our Privacy Officer at privacy@ozservices.com or call our 24/7 customer service line." },
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
