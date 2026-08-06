import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Oz Services | 24/7 Taxi Dispatch",
  description:
    "Contact Oz Services for 24/7 taxi bookings, airport transfers & corporate accounts. Call 407-793-8143 or message our dispatch team anytime.",
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

