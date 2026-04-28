import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ContentManager from "@/components/admin/content-manager";

export default async function AdminContentPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") redirect("/dashboard");

  const items = await prisma.siteContent.findMany({ orderBy: { key: "asc" } });

  return <ContentManager initialItems={items} />;
}
