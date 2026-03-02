import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  tags: string[];
  isAIGenerated: boolean;
  createdAt: string;
}

export default function BlogCard({
  title,
  excerpt,
  slug,
  tags,
  isAIGenerated,
  createdAt,
}: BlogCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-white">
      {/* Tags Row */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {isAIGenerated && (
          <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
            🤖 AI Generated
          </span>
        )}
        {tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
        {title}
      </h2>

      {/* Excerpt */}
      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{excerpt}</p>

      {/* Footer */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          {new Date(createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        <Link
          href={`/blogs/${slug}`}
          className="text-sm font-medium text-black hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}