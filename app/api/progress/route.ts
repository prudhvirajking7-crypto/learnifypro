import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { enrollmentId, lectureId, completed } = await req.json();

    // Verify enrollment belongs to user
    const enrollment = await prisma.enrollment.findFirst({
      where: { id: enrollmentId, userId: session.user.id },
    });

    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment not found" }, { status: 404 });
    }

    const progress = await prisma.progress.upsert({
      where: {
        enrollmentId_lectureId: { enrollmentId, lectureId },
      },
      update: { completed },
      create: { enrollmentId, lectureId, completed },
    });

    // Check if course is fully completed
    const [totalLectures, completedLectures] = await Promise.all([
      prisma.lecture.count({
        where: { section: { courseId: enrollment.courseId } },
      }),
      prisma.progress.count({
        where: { enrollmentId, completed: true },
      }),
    ]);

    if (completedLectures >= totalLectures && totalLectures > 0) {
      await prisma.enrollment.update({
        where: { id: enrollmentId },
        data: { status: "COMPLETED", completedAt: new Date() },
      });
    }

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Progress update error:", error);
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 }
    );
  }
}
