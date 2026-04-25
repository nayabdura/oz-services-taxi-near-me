import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FleetClient from "@/components/fleet/FleetClient";

export const metadata: Metadata = {
  title: "Our Fleet | Sedans, SUVs and Executive Vans | Oz Services Taxi",
  description: "Browse the Oz Services fleet. We operate economy sedans, premium SUVs, luxury cars, and executive minivans for airport transfers, city rides, and corporate travel across the USA.",
  alternates: { canonical: "/fleet" },
};

export default function FleetPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 bg-slate-50 min-h-screen">
        <FleetClient />
      </main>
      <Footer />
    </>
  );
}
