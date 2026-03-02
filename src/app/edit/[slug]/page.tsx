"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`/api/blogs/${slug}`);
      const data = await res.json();
      setForm({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        tags: data.tags.join(", "),
      });
      setCoverImage(data.coverImage || "");
      setFetching(false);
    };
    fetchBlog();
  }, [slug]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.secure_url) {
      setCoverImage(data.secure_url);
    } else {
      alert("Image upload failed!");
    }

    setImageUploading(false);
  };

  const handleUpdate = async () => {
    if (!form.title || !form.content || !form.excerpt) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);

    const res = await fetch(`/api/blogs/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        coverImage,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      }),
    });

    if (res.ok) {
      const blog = await res.json();
      router.push(`/blogs/${blog.slug}`);
    } else {
      alert("Failed to update blog!");
    }

    setLoading(false);
  };

  if (fetching) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Edit Blog ✏️
      </h1>

      <div className="flex flex-col gap-6">

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image
          </label>
          {coverImage && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3">
              <Image
                src={coverImage}
                alt="Cover"
                fill
                className="object-cover"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
          />
          {imageUploading && (
            <p className="text-sm text-gray-500 mt-2">Uploading image...</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt
          </label>
          <input
            type="text"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => setPreviewMode(false)}
              className={`text-sm px-3 py-1 rounded-lg ${!previewMode ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}
            >
              ✏️ Edit
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode(true)}
              className={`text-sm px-3 py-1 rounded-lg ${previewMode ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}
            >
              👁️ Preview
            </button>
          </div>
          {previewMode ? (
            <div
              className="w-full border border-gray-300 rounded-lg px-4 py-3 min-h-64 prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: form.content }}
            />
          ) : (
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={12}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            disabled={loading || imageUploading}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Blog ✅"}
          </button>
          <button
            onClick={() => router.back()}
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}