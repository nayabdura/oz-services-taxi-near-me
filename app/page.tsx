import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";

export const metadata: Metadata = {
  title: "Oz Services | Taxi Near Me — Book a Cab 24/7 Across the USA",
  description:
    "Oz Services is a trusted 24/7 taxi company serving passengers across the USA. Book a ride for airport transfers, city trips, corporate travel, or a late night pickup. No surge pricing. Call 407-793-8143 or book online.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "https://www.oztaxinearme.com/",
    title: "Oz Services | Taxi Near Me — Book a Cab 24/7 Across the USA",
    description:
      "Oz Services is your reliable taxi near me across the USA. Airport transfers, city rides, corporate accounts. No surge pricing. Available 24 hours a day.",
    images: [
      {
        url: "https://www.oztaxinearme.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Oz Services Taxi Near Me | USA Cab Service",
      },
    ],
  },
};
import dynamic from "next/dynamic";
import ServicesOverview from "@/components/home/ServicesOverview";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";

const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"));
const FleetShowcase = dynamic(() => import("@/components/home/FleetShowcase"));
const StatsSection = dynamic(() => import("@/components/home/StatsSection"));
const ServiceAreasSection = dynamic(() => import("@/components/home/ServiceAreasSection"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const PricingPreview = dynamic(() => import("@/components/home/PricingPreview"));
const FAQSection = dynamic(() => import("@/components/home/FAQSection"));
const BlogPreview = dynamic(() => import("@/components/home/BlogPreview"));
const CTASection = dynamic(() => import("@/components/home/CTASection"));

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LocalBusinessSchema />
      <HeroSection />
      <ServicesOverview />
      <WhyChooseUs />
      <FleetShowcase />
      <StatsSection />
      <ServiceAreasSection />
      <Testimonials />
      <PricingPreview />
      <FAQSection />
      <BlogPreview />
      <CTASection />
    </div>
  );
}

