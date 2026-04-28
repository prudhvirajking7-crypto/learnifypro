import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import PartnersManager from "@/components/admin/partners-manager";

export default async function AdminPartnersPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") redirect("/dashboard");

  const partners = await prisma.partner.findMany({ orderBy: { order: "asc" } });

  return <PartnersManager initialPartners={partners} />;
}
