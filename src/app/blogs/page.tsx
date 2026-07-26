import BlogCard from "@/app/components/BlogCard";
import { prisma } from "@/app/lib/prisma";

export const dynamic = 'force-dynamic'

async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return blogs;
  } catch (error) {
    console.error("DB Error:", error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-2">
          All Blogs
        </h1>
        <p className="text-ink-muted">
          {blogs.length} blog{blogs.length !== 1 ? "s" : ""} published
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-20 text-ink-faint">
          <p className="text-xl">No blogs yet!</p>
          <p>Be the first to write one 🚀</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog: any) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      )}
    </div>
  );
}