import Link from "next/link";
import Image from "next/image";
import DeleteButton from "@/app/components/DeleteButton";

async function getBlog(slug: string) {
  const res = await fetch(`/api/blogs/${slug}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (blog.error) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-900">Blog not found!</h1>
        <Link href="/blogs" className="text-gray-500 hover:text-black">
          ← Back to blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">

      {/* Back Button */}
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 block transition-colors"
      >
        ← Back to blogs
      </Link>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-8 shadow-sm">
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
          <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full font-medium">
            🤖 AI Generated
          </span>
        )}
        {blog.tags.map((tag: string) => (
          <span
            key={tag}
            className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-300 mb-3 leading-tight">
        {blog.title}
      </h1>

      {/* Excerpt */}
      <p className="text-lg text-gray-400 mb-4">{blog.excerpt}</p>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-gray-300 mb-8">
        <span>📅</span>
        <span>
          {new Date(blog.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      <hr className="mb-8 border-gray-200" />

      {/* Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:text-gray-400 prose-p:text-gray-400 prose-li:text-gray-500 prose-strong:text-gray-400"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <hr className="my-10 border-gray-200" />

    {/* Footer */}
    <div className="flex justify-between items-center">
    <Link
        href="/blogs"
        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
    >
        ← Back to blogs
    </Link>
    <div className="flex gap-3">
        <Link
        href={`/edit/${slug}`}
        className="bg-blue-500 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
        ✏️ Edit Blog
        </Link>
        <DeleteButton slug={slug} />
        <Link
        href="/create"
        className="bg-gray-900 text-white text-sm px-5 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
        ✍️ Write a Blog
        </Link>
    </div>
    </div>

    </div>
  );
}