import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !["ADMIN", "INSTRUCTOR"].includes((session.user as any).role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const isAdmin = (session.user as any).role === "ADMIN";
  const instructorFilter = isAdmin ? {} : { instructorId: session.user.id };

  const [totalUsers, totalCourses, totalEnrollments, totalRevenue, recentEnrollments, courseStats] = await Promise.all([
    isAdmin ? prisma.user.count() : Promise.resolve(0),
    prisma.course.count({ where: instructorFilter }),
    prisma.enrollment.count({ where: isAdmin ? {} : { course: instructorFilter } }),
    isAdmin
      ? prisma.order.aggregate({ where: { status: "COMPLETED" }, _sum: { totalAmount: true } })
      : Promise.resolve({ _sum: { totalAmount: 0 } }),
    prisma.enrollment.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      where: isAdmin ? {} : { course: instructorFilter },
      include: { user: { select: { name: true, email: true, image: true } }, course: { select: { title: true, thumbnail: true } } },
    }),
    prisma.course.findMany({
      where: instructorFilter,
      select: {
        id: true, title: true, thumbnail: true, status: true, price: true,
        _count: { select: { enrollments: true, reviews: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  return NextResponse.json({
    totalUsers,
    totalCourses,
    totalEnrollments,
    totalRevenue: (totalRevenue as any)._sum?.totalAmount || 0,
    recentEnrollments,
    courseStats,
  });
}
