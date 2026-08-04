import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiClock, FiUser, FiEye, FiShare2, FiCheckCircle } from "react-icons/fi";
import connectDB from "@/lib/db";
import { Blog } from "@/lib/models";

export const dynamic = "force-dynamic";

function processContent(html: string): string {
  return html.replace(
    /<a\s([^>]*href=["'])(https?:\/\/(?!(?:www\.)?oztaxinearme\.com)[^"']+)(["'][^>]*)>/gi,
    (match, pre, url, post) => {
      if (/rel=/i.test(post)) {
        return `<a ${pre}${url}${post.replace(/rel=["'][^"']*["']/i, 'rel="nofollow noopener noreferrer"')}>`;
      }
      return `<a ${pre}${url}${post} rel="nofollow noopener noreferrer" target="_blank">`;
    }
  );
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug: resolvedParams.slug }).lean() as any;

  if (!blog) return { title: "Post Not Found" };

  const canonicalUrl = `https://www.oztaxinearme.com/blog/${resolvedParams.slug}`;

  return {
    title: blog.meta_title || `${blog.title} | Oz Services Taxi`,
    description: blog.meta_description || blog.excerpt,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt,
      url: canonicalUrl,
      type: "article",
      publishedTime: blog.createdAt ? new Date(blog.createdAt).toISOString() : undefined,
      authors: [blog.author || "Oz Services"],
      images: blog.image_url ? [blog.image_url] : ["https://www.oztaxinearme.com/og-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt,
      images: blog.image_url ? [blog.image_url] : ["https://www.oztaxinearme.com/og-image.jpg"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  await connectDB();
  
  await Blog.updateOne({ slug: resolvedParams.slug }, { $inc: { views: 1 } });

  const post = await Blog.findOne({ slug: resolvedParams.slug, published: 1 }).lean() as any;

  if (!post) {
    notFound();
  }

  const relatedPosts = await Blog.find({ 
    category: post.category, 
    _id: { $ne: post._id }, 
    published: 1 
  }).limit(3).lean() as any[];

  const canonicalUrl = `https://www.oztaxinearme.com/blog/${post.slug}`;
  const publishDate = new Date(post.createdAt || post.created_at || Date.now());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#article`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    "headline": post.title,
    "description": post.meta_description || post.excerpt,
    "image": post.image_url ? [post.image_url] : ["https://www.oztaxinearme.com/og-image.jpg"],
    "datePublished": publishDate.toISOString(),
    "dateModified": post.updatedAt ? new Date(post.updatedAt).toISOString() : publishDate.toISOString(),
    "author": {
      "@type": "Organization",
      "name": post.author || "Oz Services Taxi",
      "url": "https://www.oztaxinearme.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Oz Services Taxi",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.oztaxinearme.com/logo.png",
      },
    },
    "articleSection": post.category || "Taxi Guides",
    "inLanguage": "en-US",
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Blog Hero Banner */}
      <section className="bg-slate-900 py-16 lg:py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium text-xs mb-6 transition-colors bg-slate-800 px-3.5 py-1.5 rounded-lg border border-slate-700"
          >
            <FiArrowLeft className="w-3.5 h-3.5 text-blue-400" /> Back to all articles
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-slate-300 text-xs font-medium pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <FiUser className="w-4 h-4 text-blue-400" />
              <span>{post.author || "Oz Services Team"}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="w-4 h-4 text-blue-400" />
              {publishDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })}
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="w-4 h-4 text-blue-400" />
              {post.read_time || 6} min read
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <FiEye className="w-4 h-4 text-blue-400" />
              <span>{post.views || 1} Views</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image_url && post.image_url !== "/images/blog-placeholder.jpg" && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-lg relative bg-slate-200 border-2 border-white">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Main Article Body */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8 flex gap-4 items-start">
            <FiCheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-slate-900 font-bold text-sm mb-1">Article Overview</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </div>

          <div
            className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-2xl prose-h3:text-xl prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-strong:text-slate-900 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: processContent(post.content) }}
          />

          {/* EEAT Author & Editorial Verification Card */}
          <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                  Verified Guide
                </span>
                <span className="text-slate-500 text-xs font-semibold">
                  Reviewed by {post.author || "Oz Services Logistics Team"}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Oz Services Editorial & Transportation Safety Board</h4>
              <p className="text-slate-600 text-xs mt-1 max-w-xl">
                Written and reviewed by licensed USA transportation logistics specialists. Grounded in official airport transfer protocols, passenger safety regulations, and zero-surge pricing guarantees.
              </p>
            </div>
            <Link
              href="/booking"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors shrink-0 whitespace-nowrap shadow-sm"
            >
              Book Your Ride <FiCheckCircle className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-xl border">
            <div>
              <p className="font-bold text-slate-900 text-sm mb-0.5 flex items-center gap-2">
                <FiShare2 className="text-blue-600 w-4 h-4" /> Share this travel guide
              </p>
              <p className="text-slate-500 text-xs">Help others find reliable 24/7 taxi information.</p>
            </div>
            <div className="flex gap-2">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-colors font-bold text-xs"
                aria-label="Share on X (Twitter)"
              >
                𝕏
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-colors font-bold text-xs"
                aria-label="Share on Facebook"
              >
                f
              </a>
            </div>
          </div>

          {/* Internal Linking Topical Cluster */}
          <div className="mt-8 p-6 bg-slate-900 text-white rounded-2xl">
            <h4 className="font-bold text-base mb-2 text-white font-heading">Explore Related Taxi Services</h4>
            <p className="text-slate-300 text-xs mb-4">Need reliable ground transportation? Discover our nationwide cab services and transparent fare options:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <li>
                <Link href="/taxi-near-me" className="text-blue-400 font-bold hover:underline">
                  • Local Taxi Near Me
                </Link>{" "}
                — 24/7 fast city dispatch
              </li>
              <li>
                <Link href="/services" className="text-blue-400 font-bold hover:underline">
                  • Airport Taxi Transfer
                </Link>{" "}
                — Real-time flight tracking
              </li>
              <li>
                <Link href="/pricing" className="text-blue-400 font-bold hover:underline">
                  • Flat Rate Taxi Fares
                </Link>{" "}
                — Zero surge pricing guarantee
              </li>
              <li>
                <Link href="/booking" className="text-blue-400 font-bold hover:underline">
                  • Book a Taxi Online
                </Link>{" "}
                — Instant SMS/email confirmation
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-14 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-slate-900 font-heading mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug || related._id}
                  href={`/blog/${related.slug}`}
                  className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:border-blue-500 transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-video w-full bg-slate-200 relative overflow-hidden">
                      {related.image_url ? (
                        <Image
                          src={related.image_url}
                          alt={related.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-bold bg-slate-100">No Image</div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-slate-500 text-xs font-medium mb-2 flex items-center gap-1">
                        <FiCalendar className="text-blue-600" /> {new Date(related.createdAt || related.created_at || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      <h3 className="text-slate-900 font-bold font-heading text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Booking CTA */}
      <section className="py-14 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-3 text-white">
            Need a Reliable Taxi Near You?
          </h2>
          <p className="text-slate-300 text-sm mb-6 max-w-xl mx-auto">
            Book online in under 60 seconds with transparent flat rates and zero surge fees.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/booking"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-md"
            >
              Book Ride Online
            </Link>
            <a
              href="tel:4077938143"
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-6 py-3 rounded-xl border border-slate-700 transition-colors"
            >
              Call 407-793-8143
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
