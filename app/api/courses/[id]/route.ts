import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = params;

    const course = await prisma.course.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
        status: "PUBLISHED",
      },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
            _count: { select: { coursesCreated: true, enrollments: true } },
          },
        },
        category: { select: { id: true, name: true, slug: true } },
        sections: {
          orderBy: { order: "asc" },
          include: {
            lectures: {
              orderBy: { order: "asc" },
              select: {
                id: true,
                title: true,
                duration: true,
                order: true,
                isFree: true,
                type: true,
                videoUrl: session ? true : false,
                resources: true,
              },
            },
          },
        },
        reviews: {
          take: 10,
          orderBy: { createdAt: "desc" },
          include: {
            user: { select: { name: true, image: true } },
          },
        },
        _count: {
          select: { enrollments: true, reviews: true },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    let isEnrolled = false;
    if (session?.user?.id) {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id,
            courseId: course.id,
          },
        },
      });
      isEnrolled = !!enrollment;
    }

    const averageRating =
      course.reviews.length > 0
        ? course.reviews.reduce(
            (sum: number, review: { rating: number }) => sum + review.rating,
            0
          ) /
          course.reviews.length
        : 0;

    return NextResponse.json({ ...course, averageRating, isEnrolled });
  } catch (error) {
    console.error("Get course error:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}
