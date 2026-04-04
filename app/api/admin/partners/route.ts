import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const partners = await prisma.partner.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(partners);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await req.json();
  const { name, logo, website, active, order } = body;
  const partner = await prisma.partner.create({
    data: { name, logo: logo || null, website: website || null, active: active ?? true, order: order ?? 0 },
  });
  return NextResponse.json(partner, { status: 201 });
}
