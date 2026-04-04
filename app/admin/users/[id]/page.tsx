import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle, XCircle } from "lucide-react";
import EnrollmentControl from "@/components/admin/enrollment-control";

export default async function AdminUserDetailPage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      enrollments: {
        include: {
          course: { select: { id: true, title: true, thumbnail: true, slug: true, totalLectures: true } },
          progress: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) notFound();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/users" className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">{user.name}</h1>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>
        <span className={`ml-auto text-xs px-3 py-1 rounded-full font-semibold ${
          user.role === "ADMIN" ? "bg-amber-500/20 text-amber-300" :
          user.role === "INSTRUCTOR" ? "bg-orange-500/15 text-orange-400" :
          "bg-stone-500/15 text-stone-400"
        }`}>{user.role}</span>
      </div>

      {/* Profile card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Member Since", value: new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
          { label: "Email Verified", value: user.emailVerified ? "Yes" : "No" },
          { label: "Enrolled Courses", value: user.enrollments.length },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl p-4 border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
            <p className="text-gray-400 text-xs mb-1">{label}</p>
            <p className="text-white font-semibold">{value}</p>
          </div>
        ))}
      </div>

      {/* Enrollments */}
      <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="px-5 py-4 border-b border-white/8">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" /> Enrolled Courses
          </h2>
        </div>
        {user.enrollments.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-10">No enrollments yet</p>
        ) : (
          <div className="divide-y divide-white/5">
            {user.enrollments.map((enr) => {
              const completedCount = enr.progress.filter((p) => p.completed).length;
              const pct = enr.course.totalLectures > 0 ? Math.round((completedCount / enr.course.totalLectures) * 100) : 0;
              return (
                <div key={enr.id} className="p-5 flex flex-wrap gap-4 items-start">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-12 h-8 rounded-lg overflow-hidden shrink-0 bg-gray-800">
                      {enr.course.thumbnail ? <img src={enr.course.thumbnail} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full bg-gradient-to-br from-amber-900 to-orange-900" />}
                    </div>
                    <div className="min-w-0">
                      <Link href={`/admin/courses/${enr.course.id}`} className="text-white text-sm font-medium hover:text-amber-400 truncate block">{enr.course.title}</Link>
                      <p className="text-gray-500 text-xs">Enrolled {new Date(enr.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="flex-1 min-w-[140px]">
                    <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                      <span>{completedCount}/{enr.course.totalLectures} lectures</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>

                  {/* Status + control */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      enr.status === "ACTIVE" ? "bg-green-500/15 text-green-400" :
                      enr.status === "BLOCKED" ? "bg-red-500/15 text-red-400" :
                      enr.status === "COMPLETED" ? "bg-amber-500/15 text-amber-400" :
                      "bg-gray-500/15 text-gray-400"
                    }`}>{enr.status}</span>
                    <EnrollmentControl enrollmentId={enr.id} currentStatus={enr.status} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
