import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FleetClient from "@/components/fleet/FleetClient";

export const metadata = {
  title: "Our Fleet | Oz Services - Nationwide Taxi & Airport Cars",
  description: "Explore our diverse fleet of economy, premium SUVs, luxury cars, and airport transfer vehicles serving nationwide USA.",
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
