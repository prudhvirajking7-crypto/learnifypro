import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { status } = await req.json();
  if (!["ACTIVE", "BLOCKED", "COMPLETED", "REFUNDED"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const enrollment = await prisma.enrollment.update({
    where: { id: params.id },
    data: { status },
    include: { user: { select: { name: true, email: true } }, course: { select: { title: true } } },
  });

  return NextResponse.json(enrollment);
}
