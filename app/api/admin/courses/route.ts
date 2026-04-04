import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !["ADMIN", "INSTRUCTOR"].includes((session.user as any).role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const isAdmin = (session.user as any).role === "ADMIN";
  const search = req.nextUrl.searchParams.get("search") || "";
  const status = req.nextUrl.searchParams.get("status") || "";
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");

  const where: any = isAdmin ? {} : { instructorId: session.user.id };
  if (search) where.title = { contains: search, mode: "insensitive" };
  if (status) where.status = status;

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      skip: (page - 1) * 15,
      take: 15,
      orderBy: { createdAt: "desc" },
      include: {
        instructor: { select: { name: true, image: true } },
        category: { select: { name: true } },
        _count: { select: { enrollments: true, sections: true } },
      },
    }),
    prisma.course.count({ where }),
  ]);

  return NextResponse.json({ courses, total, pages: Math.ceil(total / 15) });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !["ADMIN", "INSTRUCTOR"].includes((session.user as any).role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { title, slug, description, shortDescription, price, discountPrice, level, language, status, featured, categoryId, requirements, objectives, tags, thumbnail, previewVideo } = body;

  const instructorId = (session.user as any).role === "ADMIN" && body.instructorId ? body.instructorId : session.user.id;

  try {
    const course = await prisma.course.create({
      data: {
        title, slug, description, shortDescription, price: parseFloat(price) || 0,
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        level, language, status: status || "DRAFT", featured: !!featured,
        categoryId: categoryId || null, instructorId, thumbnail, previewVideo,
        requirements: requirements || [], objectives: objectives || [], tags: tags || [],
      },
    });
    return NextResponse.json(course, { status: 201 });
  } catch (e: any) {
    if (e.code === "P2002") return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    throw e;
  }
}
