import { Metadata } from "next";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Book a Taxi Online | Instant Confirmation | Oz Services USA",
  description:
    "Book your taxi online in under 60 seconds. Airport transfers, city rides, and corporate bookings with instant SMS and email confirmation. No surge pricing across all 50 USA states.",
  alternates: { canonical: "/booking" },
  openGraph: {
    title: "Book a Taxi Online | Oz Services USA",
    description:
      "Instant online taxi booking nationwide. Airport transfers, local rides, corporate accounts. Confirmed in seconds.",
  },
};

export default function BookingPage() {
  return <BookingClient />;
}
