"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
  });
  const [isAIGenerated, setIsAIGenerated] = useState(false);

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

  const handleAIGenerate = async () => {
    if (!aiTopic) {
      alert("Please enter a topic!");
      return;
    }

    setAiLoading(true);

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: aiTopic }),
    });

    const data = await res.json();

    if (data.error) {
      alert("AI generation failed!");
    } else {
      setForm({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        tags: data.tags.join(", "),
      });
      setIsAIGenerated(true);
    }

    setAiLoading(false);
    setPreviewMode(true);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content || !form.excerpt) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);

    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        slug,
        coverImage,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        isAIGenerated,
      }),
    });

    if (res.ok) {
      const blog = await res.json();
      router.push(`/blogs/${blog.slug}`);
    } else {
      alert("Failed to create blog!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Create New Blog ✍️
      </h1>

      {/* AI Generator Section */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-purple-900 mb-1">
          🤖 Generate with AI
        </h2>
        <p className="text-sm text-purple-600 mb-4">
          Enter a topic and AI will write the entire blog for you!
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="e.g. Future of Artificial Intelligence"
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
            className="flex-1 text-black border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleAIGenerate}
            disabled={aiLoading}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 whitespace-nowrap"
          >
            {aiLoading ? "Generating..." : "✨ Generate"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
          />
          {imageUploading && (
            <p className="text-sm text-gray-500 mt-2">Uploading image...</p>
          )}
          {coverImage && (
            <div className="mt-3 relative w-full h-48 rounded-lg overflow-hidden">
              <Image src={coverImage} alt="Cover" fill className="object-cover" />
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter blog title..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt (Short Description)
          </label>
          <input
            type="text"
            placeholder="Short description of your blog..."
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
            placeholder="e.g. tech, ai, programming"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Content */}
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
      placeholder="Write your blog content here..."
      value={form.content}
      onChange={(e) => setForm({ ...form, content: e.target.value })}
      rows={12}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black resize-none"
    />
  )}
</div>

        {/* AI Generated Badge */}
        {isAIGenerated && (
          <div className="flex items-center gap-2 text-purple-600">
            <span className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
              🤖 AI Generated Content
            </span>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading || imageUploading}
          className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Blog 🚀"}
        </button>
      </div>
    </div>
  );
}