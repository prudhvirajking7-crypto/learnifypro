import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { title, department, location, type, description, requirements, salary, active } = body;

  const job = await prisma.jobPost.update({
    where: { id: params.id },
    data: {
      title,
      department,
      location,
      type,
      description,
      requirements: requirements || [],
      salary: salary || null,
      active: !!active,
    },
  });

  return NextResponse.json(job);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.jobPost.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
