import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/sidebar";
import PageTransition from "@/components/providers/page-transition";

export default async function InstructorLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  if (!session || !["INSTRUCTOR", "ADMIN"].includes(role)) redirect("/dashboard");

  return (
    <div className="flex min-h-screen overflow-hidden" style={{ background: "#160f03" }}>
      <AdminSidebar role="INSTRUCTOR" user={session.user as any} />
      <main className="h-screen flex-1 overflow-y-auto pt-16 lg:pt-0" style={{ background: "linear-gradient(160deg, #1a1205 0%, #160f03 50%, #1e1508 100%)" }}>
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
