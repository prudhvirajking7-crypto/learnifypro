import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !["ADMIN", "INSTRUCTOR"].includes((session.user as any).role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { sectionId, title, description, videoUrl, duration, isFree, type, resources } = await req.json();
  const maxOrder = await prisma.lecture.aggregate({ where: { sectionId }, _max: { order: true } });
  const lecture = await prisma.lecture.create({
    data: {
      sectionId, title, description, videoUrl: videoUrl || null,
      duration: parseInt(duration) || 0, isFree: !!isFree,
      type: type || "VIDEO", resources: resources || [],
      order: (maxOrder._max.order || 0) + 1,
    },
  });
  return NextResponse.json(lecture, { status: 201 });
}
