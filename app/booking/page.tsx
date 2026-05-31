import { Metadata } from "next";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Book a Taxi Online | Instant Confirmation | Oz Services USA",
  description:
    "Book your taxi online in under 60 seconds. Airport transfers, city rides, and corporate bookings with instant SMS and email confirmation. No surge pricing across all 50 USA states.",
  alternates: { canonical: "https://www.oztaxinearme.com/booking" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.oztaxinearme.com/booking",
    siteName: "Oz Services Taxi",
    title: "Book a Taxi Online | Oz Services USA",
    description:
      "Instant online taxi booking nationwide. Airport transfers, local rides, corporate accounts. Confirmed in seconds.",
    images: [
      {
        url: "https://www.oztaxinearme.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Book a Taxi Online - Oz Services Taxi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Taxi Online | Oz Services USA",
    description:
      "Instant online taxi booking nationwide. Airport transfers, local rides, corporate accounts. Confirmed in seconds.",
    images: ["https://www.oztaxinearme.com/og-image.jpg"],
  },
};

export default function BookingPage() {
  return <BookingClient />;
}
