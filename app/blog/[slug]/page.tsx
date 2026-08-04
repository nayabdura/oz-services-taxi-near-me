import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiClock, FiUser, FiShare2, FiCheckCircle } from "react-icons/fi";
import connectDB from "@/lib/db";
import { Blog } from "@/lib/models";

// Force dynamic because we are reading from DB
export const dynamic = "force-dynamic";

// Processes HTML content: adds rel="nofollow noopener noreferrer" to external links
// Internal links (starting with /) remain untouched (do-follow)
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
  
  // Increment view count
  await Blog.updateOne({ slug: resolvedParams.slug }, { $inc: { views: 1 } });

  // Fetch post
  const post = await Blog.findOne({ slug: resolvedParams.slug, published: 1 }).lean() as any;

  if (!post) {
    notFound();
  }

  // Fetch related posts (same category, excluding current)
  const relatedPosts = await Blog.find({ 
    category: post.category, 
    _id: { $ne: post._id }, 
    published: 1 
  }).limit(3).lean() as any[];

  const canonicalUrl = `https://www.oztaxinearme.com/blog/${post.slug}`;
  const publishDate = new Date(post.createdAt || post.created_at || Date.now());

  // Dynamic BlogPosting Schema for Google Rich Snippets & Fast Indexing
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
      {/* Article JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Blog Hero Banner */}
      <section className="bg-slate-900 py-16 lg:py-24 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-semibold text-sm mb-8 transition-colors bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700/60"
          >
            <FiArrowLeft className="w-4 h-4 text-blue-400" /> Back to all articles
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-blue-600 text-white text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-lg shadow-md">
              {post.category}
            </span>
            <span className="text-slate-400 text-xs font-semibold">
              Verified Guide
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-slate-300 text-sm font-medium pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                <FiUser className="w-3.5 h-3.5" />
              </div>
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
            <div className="flex items-center gap-2 text-slate-400">
              <span>👁️</span> {post.views || 1} views
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image_url && post.image_url !== "/images/blog-placeholder.jpg" && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
          <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl relative bg-slate-200 border-4 border-white">
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
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Key Takeaways Box */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-sm mb-10 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
              <FiCheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">Guide Overview</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </div>

          {/* HTML Content */}
          <div
            className="prose prose-lg prose-slate max-w-none prose-headings:font-heading prose-headings:font-black prose-headings:text-slate-900 prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-a:font-semibold prose-strong:text-slate-900 prose-li:text-slate-700 prose-img:rounded-2xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: processContent(post.content) }}
          />

          {/* Share Section */}
          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border">
            <div>
              <p className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                <FiShare2 className="text-blue-600" /> Share this travel guide
              </p>
              <p className="text-slate-500 text-xs">Help others find reliable 24/7 taxi information.</p>
            </div>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-all font-bold text-sm shadow-sm"
                aria-label="Share on X (Twitter)"
              >
                𝕏
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-all font-bold text-sm shadow-sm"
                aria-label="Share on Facebook"
              >
                f
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mb-8">
              Related Articles in <span className="text-blue-600">{post.category}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug || related._id}
                  href={`/blog/${related.slug}`}
                  className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-video w-full bg-slate-200 relative overflow-hidden">
                      {related.image_url ? (
                        <Image
                          src={related.image_url}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl bg-blue-50">📰</div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-slate-500 text-xs font-semibold mb-2 flex items-center gap-1">
                        <FiCalendar className="text-blue-600" /> {new Date(related.createdAt || related.created_at || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      <h3 className="text-slate-900 font-bold font-heading text-base group-hover:text-blue-600 transition-colors line-clamp-2">
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
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black font-heading mb-4 text-white">
            Need a Reliable Taxi Near You Right Now?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Book online in under 60 seconds with transparent flat rates and zero surge fees. 24/7 nationwide dispatch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/booking"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-600/30 active:scale-95"
            >
              Book Your Ride Online
            </Link>
            <a
              href="tel:+14077938143"
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all border border-slate-700"
            >
              Call 407-793-8143
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
