import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = req.nextUrl.searchParams.get("url");
  const lectureId = req.nextUrl.searchParams.get("lectureId");

  if (!url || !lectureId) return NextResponse.json({ error: "Missing params" }, { status: 400 });

  // Verify user has enrollment for this lecture
  const lecture = await prisma.lecture.findUnique({
    where: { id: lectureId },
    include: { section: { include: { course: { include: { enrollments: { where: { userId: session.user.id, status: { in: ["ACTIVE", "COMPLETED"] } } } } } } } },
  });

  if (!lecture) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const hasAccess = lecture.isFree ||
    lecture.section.course.enrollments.length > 0 ||
    (session.user as any).role === "ADMIN" ||
    (session.user as any).role === "INSTRUCTOR";

  if (!hasAccess) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // Proxy the video stream
  try {
    const upstream = await fetch(url, {
      headers: { Range: req.headers.get("range") || "" },
    });
    const headers = new Headers();
    ["content-type", "content-length", "content-range", "accept-ranges"].forEach((h) => {
      const v = upstream.headers.get(h);
      if (v) headers.set(h, v);
    });
    headers.set("Cache-Control", "private, max-age=3600");
    return new NextResponse(upstream.body, { status: upstream.status, headers });
  } catch {
    return NextResponse.json({ error: "Stream error" }, { status: 502 });
  }
}
