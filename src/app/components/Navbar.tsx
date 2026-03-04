import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          ✍️ AiBlogHub
        </Link>
        <div className="flex gap-6 text-center items-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link href="/blogs" className="text-gray-600 hover:text-gray-900">
            Blogs
          </Link>
          <Link
            href="/create"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            + New Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}