import { Metadata } from "next";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Book a Taxi Online | 24/7 Cab — Oz Services",
  description:
    "Book your taxi online in 60 seconds with Oz Services. Instant confirmation for airport transfers & city rides. Zero surge pricing across the USA.",
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
