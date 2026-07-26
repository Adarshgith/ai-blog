import Link from "next/link";
import Image from "next/image";
import DeleteButton from "@/app/components/DeleteButton";
import { prisma } from "@/app/lib/prisma";

async function getBlog(slug: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });
    return blog;
  } catch (error) {
    console.error("DB Error:", error);
    return null;
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div className="text-center py-20">
        <h1 className="font-display text-2xl font-semibold text-ink mb-3">
          Blog not found!
        </h1>
        <Link href="/blogs" className="text-primary hover:underline">
          ← Back to blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-1 sm:px-0">

      {/* Back Button */}
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-primary mb-8 transition-colors"
      >
        ← Back to blogs
      </Link>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-8 shadow-sm border border-border">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {blog.isAIGenerated && (
          <span className="bg-accent-tint text-accent text-xs px-3 py-1 rounded-full font-medium">
            🤖 AI Generated
          </span>
        )}
        {blog.tags.map((tag: string) => (
          <span
            key={tag}
            className="bg-primary-tint text-primary text-xs px-3 py-1 rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-3 leading-tight">
        {blog.title}
      </h1>

      {/* Excerpt */}
      <p className="text-lg text-ink-muted mb-4">{blog.excerpt}</p>

      {/* Author + Date */}
      <div className="flex items-center gap-4 text-sm text-ink-faint mb-8">
        {blog.authorName && (
          <span className="flex items-center gap-1.5">
            <span>✍️</span>
            <span className="font-medium text-ink-muted">{blog.authorName}</span>
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <span>📅</span>
          <span>
            {new Date(blog.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </span>
      </div>

      <hr className="mb-8 border-border" />

      {/* Content */}
      <div
        className="prose prose-base sm:prose-lg max-w-none prose-headings:text-ink prose-headings:font-display prose-p:text-ink-muted prose-li:text-ink-muted prose-strong:text-ink prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <hr className="my-10 border-border" />

      {/* Footer */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 sm:justify-between sm:items-center">
        <Link
          href="/blogs"
          className="text-sm text-ink-muted hover:text-primary transition-colors order-2 sm:order-1"
        >
          ← Back to blogs
        </Link>
        <div className="flex flex-wrap gap-3 order-1 sm:order-2">
          <Link
            href={`/edit/${slug}`}
            className="bg-primary text-white text-sm px-5 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            ✏️ Edit Blog
          </Link>
          <DeleteButton slug={slug} />
          <Link
            href="/create"
            className="bg-ink text-white text-sm px-5 py-2 rounded-lg hover:bg-ink/85 transition-colors"
          >
            ✍️ Write a Blog
          </Link>
        </div>
      </div>

    </div>
  );
}   