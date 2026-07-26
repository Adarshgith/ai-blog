import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  tags: string[];
  isAIGenerated: boolean;
  createdAt: string;
  coverImage?: string;
  authorName?: string;
}

export default function BlogCard({
  title,
  excerpt,
  slug,
  tags,
  isAIGenerated,
  createdAt,
  coverImage,
  authorName,
}: BlogCardProps) {
  return (
    <Link
      href={`/blogs/${slug}`}
      className="group flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Cover */}
      <div className="relative w-full h-40 bg-primary-tint overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-3xl text-primary/30">✍️</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        {/* Tags Row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {isAIGenerated && (
            <span className="bg-accent-tint text-accent text-xs px-2.5 py-1 rounded-full font-medium">
              🤖 AI Generated
            </span>
          )}
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-primary-tint text-primary text-xs px-2.5 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="font-display text-lg font-semibold text-ink mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h2>

        {/* Excerpt */}
        <p className="text-ink-muted text-sm mb-4 line-clamp-2 flex-1">
          {excerpt}
        </p>

        {/* Author */}
        {authorName && (
          <p className="text-xs text-ink-faint mb-3">
            by <span className="font-medium text-ink-muted">{authorName}</span>
          </p>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-border">
          <span className="text-xs text-ink-faint">
            {new Date(createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="text-sm font-medium text-primary group-hover:underline">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}