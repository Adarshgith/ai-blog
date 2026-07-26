import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";

// GET single blog by slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({
      where: { slug: id },
    });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// PUT update blog
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be signed in to edit a blog" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const existingBlog = await prisma.blog.findUnique({
      where: { slug: id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    if (existingBlog.userId !== session.user.id) {
      return NextResponse.json(
        { error: "You can only edit your own blogs" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, excerpt, content, tags, coverImage } = body;

    const blog = await prisma.blog.update({
      where: { slug: id },
      data: { title, excerpt, content, tags, coverImage },
    });

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be signed in to delete a blog" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const existingBlog = await prisma.blog.findUnique({
      where: { slug: id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    if (existingBlog.userId !== session.user.id) {
      return NextResponse.json(
        { error: "You can only delete your own blogs" },
        { status: 403 }
      );
    }

    await prisma.blog.delete({
      where: { slug: id },
    });

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}