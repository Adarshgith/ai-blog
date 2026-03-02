"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    setLoading(true);

    const res = await fetch(`/api/blogs/${slug}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/blogs");
    } else {
      alert("Failed to delete blog!");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-500 text-white text-sm px-5 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
    >
      {loading ? "Deleting..." : "🗑️ Delete Blog"}
    </button>
  );
}