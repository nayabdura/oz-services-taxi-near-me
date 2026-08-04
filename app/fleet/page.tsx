import { Metadata } from "next";
import FleetClient from "@/components/fleet/FleetClient";

export const metadata: Metadata = {
  title: "Our Fleet | Sedans, SUVs and Executive Vans | Oz Services Taxi",
  description: "Browse the Oz Services fleet. We operate economy sedans, premium SUVs, luxury cars, and executive minivans for airport transfers, city rides, and corporate travel across the USA.",
  alternates: { canonical: "https://www.oztaxinearme.com/fleet" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.oztaxinearme.com/fleet",
    siteName: "Oz Services Taxi",
    title: "Our Fleet | Sedans, SUVs and Executive Vans | Oz Services Taxi",
    description: "Browse the Oz Services fleet. We operate economy sedans, premium SUVs, luxury cars, and executive minivans for airport transfers, city rides, and corporate travel across the USA.",
    images: [{ url: "https://www.oztaxinearme.com/og-image.jpg", width: 1200, height: 630, alt: "Oz Services Fleet" }],
  },
};

export default function FleetPage() {
  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <FleetClient />
    </div>
  );
}
