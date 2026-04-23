import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Oz Services | 24/7 Taxi Dispatch – Call or Book Online",
  description:
    "Get in touch with Oz Services 24/7. Call 407-793-8143 or send a message for taxi bookings, corporate accounts, or general enquiries. Serving all 50 USA states.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "https://www.oztaxinearme.com/contact",
    title: "Contact Oz Services | 24/7 Taxi Dispatch",
    description: "Call 407-793-8143 or send us a message. Available 24/7 across the USA.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}

