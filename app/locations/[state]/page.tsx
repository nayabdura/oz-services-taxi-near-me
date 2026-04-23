import { Metadata } from "next";
import { USA_STATES } from "@/lib/data/states";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FiMapPin, FiClock, FiStar, FiPhoneCall, FiChevronRight } from "react-icons/fi";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { generateStateContent } from "@/lib/utils/seo-spintax";

// Pre-generate static paths for all 50 states for incredible SSG performance
export async function generateStaticParams() {
  return USA_STATES.map((s) => ({ state: s.slug }));
}

type Props = {
  params: { state: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const stateObj = USA_STATES.find(s => s.slug === resolvedParams.state);
  if (!stateObj) return { title: "Location Not Found" };

  const { name } = stateObj;
  const { title, metaDescription } = generateStateContent(name);

  return {
    title,
    description: metaDescription,
    keywords: [
      `taxi in ${name}`,
      `taxi near me ${name}`,
      `${name} taxi service`,
      `airport taxi ${name}`,
      `book cab ${name}`,
      `Oz Services ${name}`,
      `best taxi company in ${name}`,
      `cheap taxi ${name}`,
      `24/7 taxi ${name}`,
    ],
    alternates: {
      canonical: `/locations/${resolvedParams.state}`,
    },
    openGraph: {
      title,
      description: metaDescription,
      url: `https://www.oztaxinearme.com/locations/${resolvedParams.state}`,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const resolvedParams = await params;
  const stateObj = USA_STATES.find(s => s.slug === resolvedParams.state);

  if (!stateObj) {
    notFound();
  }

  const { name } = stateObj;
  const { heroTitle, heroSubtitle, p1, p2, faqs } = generateStateContent(name);

  return (
    <>
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://www.oztaxinearme.com/" },
          { name: "Locations", url: "https://www.oztaxinearme.com/service-areas" },
          { name, url: `https://www.oztaxinearme.com/locations/${stateObj.slug}` }
        ]} 
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `Oz Services Taxi ${name}`,
            description: `Reliable and professional 24/7 taxi services across ${name}. Airport transfers, corporate travel, and local dispatch.`,
            url: `https://www.oztaxinearme.com/locations/${stateObj.slug}`,
            telephone: "407-793-8143",
            image: "https://www.oztaxinearme.com/og-image.jpg",
            areaServed: {
              "@type": "State",
              name: name,
            },
          }),
        }}
      />
      
      {/* Hero Section */}
      <section className="bg-slate-900 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-blue-400 text-sm font-bold tracking-widest uppercase mb-4">
            <FiMapPin /> <span>Serving {name}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white font-heading mb-6 tracking-tight">
            {heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            {heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="tel:4077938143"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg shadow-blue-600/20 text-lg"
            >
              <FiPhoneCall className="w-5 h-5" /> Call Dispatch
            </a>
            <Link 
              href="/booking"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-bold py-4 px-8 rounded-xl transition-colors text-lg"
            >
              Book Online Now <FiChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals & Service Features (EEAT) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 flex items-center justify-center rounded-xl mb-6">
                <FiClock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Available 24/7 in {name}</h3>
              <p className="text-slate-600">Our dispatch center operates round-the-clock. Day or night, rain or shine, we have drivers stationed across {name} ready to assist.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 flex items-center justify-center rounded-xl mb-6">
                <FiStar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Top-Rated Drivers</h3>
              <p className="text-slate-600">Travel safely with our fully vetted, licensed, and insured professional drivers who know the local routes of {name} perfectly.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 flex items-center justify-center rounded-xl mb-6">
                <FiMapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Airport & Local Transfers</h3>
              <p className="text-slate-600">From major international airports to local suburban addresses, we provide comprehensive ground transportation across the entire state.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Semantic Content for AI / Semantic SEO */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-slate prose-headings:font-heading prose-headings:text-slate-900">
          <h2 className="text-3xl font-black mb-6">Your Trusted {name} Transportation Partner</h2>
          <p>{p1}</p>
          <p>{p2}</p>
          <h3 className="text-2xl font-bold mt-10 mb-4">Why Book Your {name} Taxi With Oz Services?</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <Link href="/booking" className="font-bold text-slate-900 hover:text-blue-600 no-underline">Instant Online Booking:</Link>{" "}
              Reserve your taxi in {name} in seconds — no account required.
            </li>
            <li>
              <Link href="/fleet" className="font-bold text-slate-900 hover:text-blue-600 no-underline">Nationwide Fleet:</Link>{" "}
              Access to economy sedans, luxury SUVs, and corporate vehicles.
            </li>
            <li>
              <Link href="/services" className="font-bold text-slate-900 hover:text-blue-600 no-underline">Corporate Accounts:</Link>{" "}
              Simplified billing for {name} enterprise clients with priority dispatch.
            </li>
            <li>
              <Link href="/services" className="font-bold text-slate-900 hover:text-blue-600 no-underline">Flight Tracking:</Link>{" "}
              We monitor your incoming flights to {name} airports, ensuring we are there exactly when you land.
            </li>
            <li>
              <Link href="/pricing" className="font-bold text-slate-900 hover:text-blue-600 no-underline">Transparent Pricing:</Link>{" "}
              View our rates — no surge pricing, no hidden fees, ever.
            </li>
          </ul>
        </div>
      </section>


      {/* GEO AI FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 font-heading mb-4">Frequently Asked Questions ({name})</h2>
            <p className="text-slate-600">Everything you need to know about booking our taxi service in {name}.</p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-blue-600 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-black text-white font-heading mb-6">Ready to ride in {name}?</h2>
        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Skip the lines and unpredictable fares. Book your professional {name} taxi right now.</p>
        <Link 
          href="/booking"
          className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-10 py-5 rounded-xl hover:bg-slate-50 transition-all shadow-xl text-lg hover:scale-105"
        >
          Book Your Taxi Instantly
        </Link>
      </section>
    </>
  );
}
