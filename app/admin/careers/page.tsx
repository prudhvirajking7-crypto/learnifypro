import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CareersManager from "@/components/admin/careers-manager";

export default async function AdminCareersPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") redirect("/dashboard");
  const jobs = await prisma.jobPost.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-amber-100">Careers</h1>
        <p className="text-amber-200/50 text-sm mt-1">Manage job postings on the careers page</p>
      </div>
      <CareersManager initialJobs={jobs} />
    </div>
  );
}
