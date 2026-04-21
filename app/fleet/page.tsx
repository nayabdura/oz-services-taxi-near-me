import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FleetClient from "@/components/fleet/FleetClient";

export const metadata: Metadata = {
  title: "Our Fleet | Oz Services - Nationwide Taxi & Airport Cars",
  description: "Explore our diverse fleet of economy sedans, premium SUVs, luxury cars, and airport transfer vehicles serving nationwide USA.",
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
