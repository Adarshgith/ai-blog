import Link from "next/link";
import BlogCard from "./components/BlogCard";
import { prisma } from "@/app/lib/prisma";
import { auth, signIn } from "@/app/lib/auth";

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

export default async function Home() {
  const session = await auth();

  const signInAction = async () => {
    "use server";
    await signIn("google");
  };

  if (!session?.user) {
    return (
      <div className="min-h-[70vh] flex items-center">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center py-8 sm:py-14 w-full">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-4">
              AI-powered publishing
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.08] mb-5">
              Write faster.
              <br />
              Publish sharper.
            </h1>
            <p className="text-lg text-ink-muted max-w-md mb-8">
              WordCraft AI drafts a complete, polished blog post from a single
              topic — so you can spend your time editing, not staring at a
              blank page. Sign in to start reading and writing.
            </p>
            <div className="flex flex-wrap gap-3">
              <form action={signInAction}>
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-primary-dark transition-colors"
                >
                  Start Reading
                </button>
              </form>
            </div>
          </div>

          <div className="relative hidden sm:block h-72 lg:h-80">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-56 h-40 lg:w-64 lg:h-44 bg-primary-tint border border-border rounded-2xl -rotate-6 translate-x-6 shadow-sm" />
              <div className="absolute w-56 h-40 lg:w-64 lg:h-44 bg-accent-tint border border-border rounded-2xl rotate-3 -translate-x-6 shadow-sm" />
              <div className="relative w-56 h-40 lg:w-64 lg:h-44 bg-surface border border-border rounded-2xl shadow-lg p-5 flex flex-col justify-between">
                <div className="flex gap-2">
                  <span className="bg-accent-tint text-accent text-[10px] px-2 py-0.5 rounded-full font-medium">
                    🤖 AI Generated
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 w-4/5 bg-ink/10 rounded-full" />
                  <div className="h-2.5 w-3/5 bg-ink/10 rounded-full" />
                </div>
                <div className="flex justify-between items-center text-[11px] text-ink-faint">
                  <span>Today</span>
                  <span className="text-primary font-medium">Read more →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const blogs = await getBlogs();

  return (
    <div>
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center py-8 sm:py-14 mb-16 sm:mb-20">
        <div>
          <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-4">
            AI-powered publishing
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.08] mb-5">
            Write faster.
            <br />
            Publish sharper.
          </h1>
          <p className="text-lg text-ink-muted max-w-md mb-8">
            WordCraft AI drafts a complete, polished blog post from a single
            topic — so you can spend your time editing, not staring at a
            blank page.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/create"
              className="bg-primary text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-primary-dark transition-colors"
            >
              + Create Blog
            </Link>
            <Link
              href="/blogs"
              className="bg-surface text-ink border border-border px-6 py-3 rounded-lg text-base font-medium hover:border-primary hover:text-primary transition-colors"
            >
              Browse Blogs
            </Link>
          </div>
        </div>

        <div className="relative hidden sm:block h-72 lg:h-80">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-56 h-40 lg:w-64 lg:h-44 bg-primary-tint border border-border rounded-2xl -rotate-6 translate-x-6 shadow-sm" />
            <div className="absolute w-56 h-40 lg:w-64 lg:h-44 bg-accent-tint border border-border rounded-2xl rotate-3 -translate-x-6 shadow-sm" />
            <div className="relative w-56 h-40 lg:w-64 lg:h-44 bg-surface border border-border rounded-2xl shadow-lg p-5 flex flex-col justify-between">
              <div className="flex gap-2">
                <span className="bg-accent-tint text-accent text-[10px] px-2 py-0.5 rounded-full font-medium">
                  🤖 AI Generated
                </span>
              </div>
              <div className="space-y-2">
                <div className="h-2.5 w-4/5 bg-ink/10 rounded-full" />
                <div className="h-2.5 w-3/5 bg-ink/10 rounded-full" />
              </div>
              <div className="flex justify-between items-center text-[11px] text-ink-faint">
                <span>Today</span>
                <span className="text-primary font-medium">Read more →</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Latest Blogs
          </h2>
          <Link
            href="/blogs"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all →
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 text-ink-faint">
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
