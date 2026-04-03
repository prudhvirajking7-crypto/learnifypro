import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: session.user.id, status: "ACTIVE" },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            totalLectures: true,
            totalDuration: true,
            instructor: { select: { name: true } },
          },
        },
        progress: { select: { lectureId: true, completed: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const enrollmentsWithProgress = enrollments.map((e) => {
      const completedCount = e.progress.filter((p) => p.completed).length;
      const progressPercent =
        e.course.totalLectures > 0
          ? Math.round((completedCount / e.course.totalLectures) * 100)
          : 0;
      return {
        ...e,
        progressPercent,
        completedLectures: completedCount,
      };
    });

    return NextResponse.json({ enrollments: enrollmentsWithProgress });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch enrollments" },
      { status: 500 }
    );
  }
}
