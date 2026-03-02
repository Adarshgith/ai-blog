import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET all blogs
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST create new blog
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, tags, isAIGenerated, coverImage } = body;

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        tags,
        coverImage: coverImage ?? null,
        isAIGenerated: isAIGenerated ?? false,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}