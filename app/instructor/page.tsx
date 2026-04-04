import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Users, TrendingUp, PlusCircle } from "lucide-react";

export default async function InstructorDashboard() {
  const session = await getServerSession(authOptions);
  const instructorId = session!.user.id;

  const [courses, totalEnrollments, recentEnrollments] = await Promise.all([
    prisma.course.findMany({
      where: { instructorId },
      select: { id: true, title: true, thumbnail: true, status: true, price: true, slug: true, _count: { select: { enrollments: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.enrollment.count({ where: { course: { instructorId } } }),
    prisma.enrollment.findMany({
      take: 8,
      where: { course: { instructorId } },
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true, image: true } },
        course: { select: { title: true } },
      },
    }),
  ]);

  const stats = [
    { label: "My Courses", value: courses.length, icon: BookOpen, color: "bg-amber-500/10" },
    { label: "Total Students", value: totalEnrollments, icon: Users, color: "bg-amber-600/10" },
    { label: "Published", value: courses.filter((c) => c.status === "PUBLISHED").length, icon: TrendingUp, color: "bg-green-500/10" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Instructor Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back, {session?.user?.name}</p>
        </div>
        <Link href="/instructor/courses/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-black hover:-translate-y-0.5 transition-all"
          style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
          <PlusCircle className="w-4 h-4" /> New Course
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl p-5 border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-sm">{label}</p>
              <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center`}><Icon className="w-4 h-4 text-white opacity-80" /></div>
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
            <h2 className="text-white font-semibold text-sm">My Courses</h2>
            <Link href="/instructor/courses" className="text-amber-400 text-xs hover:underline">Manage</Link>
          </div>
          <div className="divide-y divide-white/5">
            {courses.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center gap-3 px-5 py-3">
                <div className="w-12 h-8 rounded-lg overflow-hidden shrink-0 bg-gray-800">
                  {c.thumbnail ? <img src={c.thumbnail} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full bg-gradient-to-br from-amber-900 to-orange-900" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white text-xs font-medium truncate">{c.title}</p>
                  <p className="text-gray-500 text-[10px]">{c._count.enrollments} students</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.status === "PUBLISHED" ? "bg-green-500/15 text-green-400" : "bg-yellow-500/15 text-yellow-400"}`}>{c.status}</span>
                <Link href={`/instructor/courses/${c.id}`} className="text-[10px] px-2 py-1 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors">Edit</Link>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
            <h2 className="text-white font-semibold text-sm">Recent Students</h2>
            <Link href="/instructor/students" className="text-amber-400 text-xs hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-white/5">
            {recentEnrollments.map((e) => (
              <div key={e.id} className="flex items-center gap-3 px-5 py-3">
                {e.user.image ? <img src={e.user.image} className="w-7 h-7 rounded-full" alt="" /> : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">{e.user.name?.[0]}</div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-white text-xs font-medium truncate">{e.user.name}</p>
                  <p className="text-gray-500 text-[10px] truncate">{e.course.title}</p>
                </div>
                <span className="text-[10px] text-gray-500">{new Date(e.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
