import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";

export const metadata: Metadata = {
  title: "Oz Services | Taxi Near Me – Book a Cab 24/7 Across the USA",
  description:
    "Oz Services is America's trusted 24/7 nationwide taxi company. Book a taxi near you instantly for airport transfers, city rides, corporate travel, and late-night pickups across all 50 USA states. No surge pricing. Call 407-793-8143 or book online.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "https://www.oztaxinearme.com/",
    title: "Oz Services | Taxi Near Me – Book a Cab 24/7 Across the USA",
    description:
      "Oz Services – America's most reliable taxi near me. Airport transfers, city rides, corporate accounts. Serving all 50 USA states 24/7. No surge pricing.",
    images: [
      {
        url: "https://www.oztaxinearme.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Oz Services – Taxi Near Me | Nationwide USA Cab Service",
      },
    ],
  },
};
import ServicesOverview from "@/components/home/ServicesOverview";
import StatsSection from "@/components/home/StatsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FleetShowcase from "@/components/home/FleetShowcase";
import ServiceAreasSection from "@/components/home/ServiceAreasSection";
import Testimonials from "@/components/home/Testimonials";
import PricingPreview from "@/components/home/PricingPreview";
import FAQSection from "@/components/home/FAQSection";
import BlogPreview from "@/components/home/BlogPreview";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
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

