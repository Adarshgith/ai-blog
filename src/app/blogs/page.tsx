import BlogCard from "@/app/components/BlogCard";
import { prisma } from "@/app/lib/prisma";

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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">All Blogs</h1>
        <p className="text-gray-500">
          {blogs.length} blog{blogs.length !== 1 ? "s" : ""} published
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
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