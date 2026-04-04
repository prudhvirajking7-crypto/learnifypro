import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function InstructorStudentsPage({ searchParams }: { searchParams: { courseId?: string } }) {
  const session = await getServerSession(authOptions);
  const instructorId = session!.user.id;

  const courses = await prisma.course.findMany({
    where: { instructorId },
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  });

  const courseId = searchParams.courseId || courses[0]?.id;

  const enrollments = courseId ? await prisma.enrollment.findMany({
    where: { courseId, course: { instructorId } },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true, image: true } },
      progress: true,
      course: { select: { totalLectures: true } },
    },
  }) : [];

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Students</h1>
        <p className="text-gray-400 text-sm mt-1">Read-only view of student progress across your courses</p>
      </div>

      {/* Course filter */}
      <div className="flex gap-2 flex-wrap">
        {courses.map((c) => (
          <a key={c.id} href={`?courseId=${c.id}`}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${courseId === c.id ? "bg-amber-500 text-black" : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"}`}>
            {c.title}
          </a>
        ))}
      </div>

      <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8">
                {["Student", "Email", "Enrolled", "Progress", "Status"].map((h) => (
                  <th key={h} className="text-left text-xs text-gray-500 font-semibold px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {enrollments.map((e) => {
                const completed = e.progress.filter((p) => p.completed).length;
                const total = e.course.totalLectures || 1;
                const pct = Math.round((completed / total) * 100);
                return (
                  <tr key={e.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {e.user.image ? <img src={e.user.image} className="w-8 h-8 rounded-xl" alt="" /> : (
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold">{e.user.name?.[0]}</div>
                        )}
                        <span className="text-white text-xs font-medium">{e.user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs">{e.user.email}</td>
                    <td className="px-5 py-3 text-gray-400 text-xs">{new Date(e.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden w-24">
                          <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">{completed}/{total} ({pct}%)</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${e.status === "ACTIVE" ? "bg-green-500/15 text-green-400" : e.status === "BLOCKED" ? "bg-red-500/15 text-red-400" : "bg-gray-500/15 text-gray-400"}`}>
                        {e.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {enrollments.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-500 text-sm">No students enrolled yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
