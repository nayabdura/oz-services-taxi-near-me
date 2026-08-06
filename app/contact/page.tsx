import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Oz Services | Call or Book a Taxi 24 Hours a Day",
  description:
    "Need to reach us? Call Oz Services at 407-793-8143 any time of day or night, or send a message for taxi bookings, corporate accounts, or general enquiries. We serve all 50 USA states.",
  alternates: { canonical: "https://www.oztaxinearme.com/contact" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.oztaxinearme.com/contact",
    siteName: "Oz Services Taxi",
    title: "Contact Oz Services | 24 Hour Taxi Dispatch",
    description: "Call 407-793-8143 or send us a message. We are available 24 hours a day across the USA.",
    images: [
      {
        url: "https://www.oztaxinearme.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Oz Services Taxi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Oz Services | 24 Hour Taxi Dispatch",
    description: "Call 407-793-8143 or send us a message. We are available 24 hours a day across the USA.",
    images: ["https://www.oztaxinearme.com/og-image.jpg"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}

