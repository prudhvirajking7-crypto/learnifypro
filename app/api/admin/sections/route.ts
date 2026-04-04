import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !["ADMIN", "INSTRUCTOR"].includes((session.user as any).role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { courseId, title } = await req.json();
  const maxOrder = await prisma.section.aggregate({ where: { courseId }, _max: { order: true } });
  const section = await prisma.section.create({
    data: { courseId, title, order: (maxOrder._max.order || 0) + 1 },
    include: { lectures: true },
  });
  return NextResponse.json(section, { status: 201 });
}
