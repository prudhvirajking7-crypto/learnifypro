import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !["ADMIN", "INSTRUCTOR"].includes((session.user as any).role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      enrollments: {
        include: {
          course: { select: { id: true, title: true, thumbnail: true, slug: true } },
          progress: { include: { lecture: { select: { id: true, title: true, duration: true } } } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(user);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { role } = body;

  const user = await prisma.user.update({
    where: { id: params.id },
    data: { role },
    select: { id: true, name: true, email: true, role: true },
  });

  return NextResponse.json(user);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Prevent deleting own account
  if ((session.user as any).id === params.id) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
