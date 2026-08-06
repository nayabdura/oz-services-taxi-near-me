import { Metadata } from "next";
import LocationHeroSection from "@/components/home/LocationHeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import StatsSection from "@/components/home/StatsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FleetShowcase from "@/components/home/FleetShowcase";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Reliable Taxi Service in Ballarat | Oz Taxi Near Me – Book Now",
  description: "Need a taxi? Oz Taxi Near Me offers 24/7 airport transfers and local rides in Ballarat. Call 407-793-8143 for fast pickup!",
  alternates: { canonical: "/taxi-ballarat" },
  openGraph: {
    url: "https://www.oztaxinearme.com/taxi-ballarat",
    title: "Reliable Taxi Service in Ballarat | Oz Taxi Near Me",
    description: "24/7 airport transfers and local rides in Ballarat. No surge pricing. Call 407-793-8143.",
  },
};

export default function TaxiBallaratPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LocationHeroSection city="Ballarat" />
      <ServicesOverview />
      <WhyChooseUs />
      <FleetShowcase />
      <StatsSection />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </div>
  );
}
