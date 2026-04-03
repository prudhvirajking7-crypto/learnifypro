import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured") === "true";
    const sortBy = searchParams.get("sortBy") || "createdAt";

    const skip = (page - 1) * limit;

    const where: any = { status: "PUBLISHED" };
    if (category) where.category = { slug: category };
    if (level) where.level = level;
    if (featured) where.featured = true;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { tags: { has: search } },
      ];
    }

    const orderBy: any =
      sortBy === "price"
        ? { price: "asc" }
        : sortBy === "rating"
        ? { reviews: { _count: "desc" } }
        : sortBy === "popular"
        ? { enrollments: { _count: "desc" } }
        : { createdAt: "desc" };

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        select: {
          id: true,
          title: true,
          slug: true,
          shortDescription: true,
          thumbnail: true,
          price: true,
          discountPrice: true,
          currency: true,
          level: true,
          language: true,
          totalDuration: true,
          totalLectures: true,
          featured: true,
          instructor: {
            select: { id: true, name: true, image: true },
          },
          category: {
            select: { name: true, slug: true },
          },
          _count: {
            select: { enrollments: true, reviews: true },
          },
          reviews: {
            select: { rating: true },
          },
        },
      }),
      prisma.course.count({ where }),
    ]);

    const coursesWithRating = courses.map((course) => ({
      ...course,
      averageRating:
        course.reviews.length > 0
          ? course.reviews.reduce((sum, r) => sum + r.rating, 0) /
            course.reviews.length
          : 0,
      reviews: undefined,
    }));

    return NextResponse.json({
      courses: coursesWithRating,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get courses error:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
