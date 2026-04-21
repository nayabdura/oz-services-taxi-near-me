import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiClock, FiUser } from "react-icons/fi";
import connectDB from "@/lib/db";
import { Blog } from "@/lib/models";

// Force dynamic because we are reading from SQLite DB
export const dynamic = "force-dynamic";

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

  return {
    title: blog.meta_title,
    description: blog.meta_description,
    alternates: { canonical: `/blog/${resolvedParams.slug}` },
    openGraph: {
      title: blog.meta_title,
      description: blog.meta_description,
      images: blog.image_url ? [blog.image_url] : ["/og-image.jpg"],
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

  return (
    <div className="pt-20 bg-white">
      {/* Blog Hero */}
      <section className="bg-slate-900 py-20 lg:py-28 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium text-sm mb-8 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-heading leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-slate-300 text-sm font-medium">
            <div className="flex items-center gap-2">
              <FiUser className="w-4 h-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="w-4 h-4" />
              {new Date(post.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="w-4 h-4" />
              {post.read_time} min read
            </div>
            <div className="flex items-center gap-2">
              👁️ {post.views} views
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image_url && post.image_url !== "/images/blog-placeholder.jpg" && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
          <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-2xl relative bg-slate-100">
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

      {/* Content */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share CTA */}
          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-bold text-slate-900 mb-1">Share this article</p>
              <p className="text-slate-500 text-sm">Help others find reliable taxi guides.</p>
            </div>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1DA1F2] hover:text-white transition-all"
              >
                𝕏
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1877F2] hover:text-white transition-all"
              >
                f
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-900 font-heading mb-10">
              More from <span className="text-blue-600">{post.category}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all group"
                >
                  <div className="aspect-video w-full bg-slate-100 relative overflow-hidden">
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
                    <p className="text-slate-500 text-xs font-semibold mb-3 flex items-center gap-2">
                       <FiCalendar /> {new Date(related.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                    <h3 className="text-slate-900 font-bold font-heading text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white font-heading mb-6">
            Ready to book your ride?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Get instant confirmation and a professional, licensed driver dispatched directly to your location.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-slate-50 font-bold text-lg px-8 py-4 rounded-xl transition-transform active:scale-95 shadow-xl shadow-blue-900/20"
          >
            Book a Taxi Now
          </Link>
        </div>
      </section>
    </div>
  );
}
