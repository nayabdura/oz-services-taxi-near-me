import { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "USA Taxi Tips & Travel Guides | Oz Services Blog",
  description:
    "Expert taxi travel tips, airport guides, and USA transportation advice from the Oz Services team. Stay informed and travel smarter across America.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "USA Taxi Tips & Travel Guides | Oz Services Blog",
    description:
      "Expert travel tips, airport taxi guides, and USA transportation advice from Oz Services.",
  },
};

export default function BlogPage() {
  return <BlogListClient />;
}
