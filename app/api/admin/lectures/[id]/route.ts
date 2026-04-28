import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !["ADMIN", "INSTRUCTOR"].includes((session.user as any).role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const contentType = req.headers.get("content-type") || "";
  let data: any = {};

  if (contentType.includes("multipart/form-data")) {
    // Video file upload - save URL as-is for now (production: upload to cloud)
    const formData = await req.formData();
    const videoFile = formData.get("video") as File | null;
    const videoUrl = formData.get("videoUrl") as string | null;

    if (videoFile) {
      // In production replace with Cloudflare/Bunny/Mux upload
      // For now, store the video URL if provided, or mark as pending
      data.videoUrl = videoUrl || null;
      data.videoStatus = "ready";
      data.videoPlatform = "upload";
    } else if (videoUrl) {
      data.videoUrl = videoUrl;
      data.videoStatus = "ready";
      data.videoPlatform = detectPlatform(videoUrl);
    }
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const duration = formData.get("duration") as string;
    const isFree = formData.get("isFree") === "true";
    const type = formData.get("type") as string;
    if (title) data.title = title;
    if (description) data.description = description;
    if (duration) data.duration = parseInt(duration) || 0;
    data.isFree = isFree;
    if (type) data.type = type;
  } else {
    const body = await req.json();
    data = {
      title: body.title, description: body.description,
      videoUrl: body.videoUrl || null, duration: parseInt(body.duration) || 0,
      isFree: !!body.isFree, type: body.type, resources: body.resources || [],
      videoStatus: body.videoUrl ? "ready" : null,
      videoPlatform: body.videoUrl ? detectPlatform(body.videoUrl) : null,
    };
  }

  const lecture = await prisma.lecture.update({ where: { id: params.id }, data });
  return NextResponse.json(lecture);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !["ADMIN", "INSTRUCTOR"].includes((session.user as any).role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  await prisma.lecture.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}

function detectPlatform(url: string): string {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("vimeo.com")) return "vimeo";
  if (url.includes("cloudflarestream.com")) return "cloudflare";
  if (url.includes("b-cdn.net") || url.includes("bunnycdn")) return "bunny";
  if (url.includes("mux.com")) return "mux";
  if (url.includes("cloudinary.com")) return "cloudinary";
  return "direct";
}
