import Link from "next/link";
import BlogCard from "./components/BlogCard";

async function getBlogs() {
  const res = await fetch("/api/blogs", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center py-20 border-b border-gray-200 mb-10">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to AI Blog ✍️
        </h1>
        <p className="text-xl text-gray-500 mb-8">
          Write your own blogs or let AI write for you!
        </p>
        <Link
          href="/create"
          className="bg-black text-white px-8 py-3 rounded-lg text-lg hover:bg-gray-800"
        >
          + Create Blog
        </Link>
      </div>

      {/* Latest Blogs */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest Blogs</h2>
          <Link href="/blogs" className="text-gray-500 hover:text-black">
            View all →
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl">No blogs yet!</p>
            <p>Be the first to write one 🚀</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map((blog: any) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}