import { Metadata } from "next";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Book a Taxi Online | Instant Confirmation | Oz Services Florida",
  description:
    "Book your Florida taxi online in under 60 seconds. Airport transfers, city rides, and corporate bookings with instant SMS and email confirmation. No surge pricing.",
  openGraph: {
    title: "Book a Taxi Online | Oz Services Florida",
    description:
      "Instant online taxi booking in Florida. Airport transfers, local rides, corporate accounts. Confirmed in seconds.",
  },
};

export default function BookingPage() {
  return <BookingClient />;
}
