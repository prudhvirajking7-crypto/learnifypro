import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const jobs = await prisma.jobPost.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { title, department, location, type, description, requirements, salary, active } = body;

  const job = await prisma.jobPost.create({
    data: {
      title,
      department,
      location: location || "Remote",
      type: type || "Full-time",
      description,
      requirements: requirements || [],
      salary: salary || null,
      active: active !== undefined ? active : true,
    },
  });

  return NextResponse.json(job, { status: 201 });
}
