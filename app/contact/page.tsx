import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Oz Services | Call or Book a Taxi 24 Hours a Day",
  description:
    "Need to reach us? Call Oz Services at 407-793-8143 any time of day or night, or send a message for taxi bookings, corporate accounts, or general enquiries. We serve all 50 USA states.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "https://www.oztaxinearme.com/contact",
    title: "Contact Oz Services | 24 Hour Taxi Dispatch",
    description: "Call 407-793-8143 or send us a message. We are available 24 hours a day across the USA.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}

