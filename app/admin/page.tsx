import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, BookOpen, TrendingUp, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  const [totalUsers, totalCourses, totalEnrollments, revenueData, recentEnrollments, recentUsers, courseStats] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.enrollment.count(),
    prisma.order.aggregate({ where: { status: "COMPLETED" }, _sum: { totalAmount: true } }),
    prisma.enrollment.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true, image: true } },
        course: { select: { title: true, thumbnail: true } },
      },
    }),
    prisma.user.findMany({
      take: 5, orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, image: true, role: true, createdAt: true },
    }),
    prisma.course.findMany({
      take: 6, orderBy: { createdAt: "desc" },
      select: { id: true, title: true, status: true, price: true, thumbnail: true, _count: { select: { enrollments: true } } },
    }),
  ]);

  const totalRevenue = (revenueData._sum.totalAmount || 0);

  const stats = [
    { label: "Total Users", value: totalUsers.toLocaleString(), icon: Users },
    { label: "Total Courses", value: totalCourses.toLocaleString(), icon: BookOpen },
    { label: "Enrollments", value: totalEnrollments.toLocaleString(), icon: TrendingUp },
    { label: "Revenue (INR)", value: `₹${(totalRevenue / 100).toLocaleString()}`, icon: DollarSign },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-amber-100">Dashboard</h1>
        <p className="text-amber-200/50 text-sm mt-1">Welcome back, {session?.user?.name}. Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-amber-800/20 p-5"
            style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(180,83,9,0.05) 100%)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-amber-200/60 text-sm font-medium">{label}</p>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.25), rgba(180,83,9,0.15))" }}>
                <Icon className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-amber-100">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enrollments */}
        <div className="rounded-2xl border border-amber-800/15 overflow-hidden bg-amber-950/20">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(245,158,11,0.1)" }}>
            <h2 className="text-amber-100 font-semibold text-sm">Recent Enrollments</h2>
            <Link href="/admin/users" className="text-amber-400 text-xs hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-amber-800/10">
            {recentEnrollments.map((e) => (
              <div key={e.id} className="flex items-center gap-3 px-5 py-3">
                {e.user.image ? (
                  <img src={e.user.image} className="w-8 h-8 rounded-full object-cover" alt="" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {e.user.name?.[0] || "?"}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-amber-100 text-xs font-medium truncate">{e.user.name}</p>
                  <p className="text-amber-200/40 text-[10px] truncate">{e.course.title}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  e.status === "ACTIVE" ? "bg-green-500/15 text-green-400" :
                  e.status === "BLOCKED" ? "bg-red-500/15 text-red-400" :
                  "bg-gray-500/15 text-gray-400"
                }`}>{e.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Course Overview */}
        <div className="rounded-2xl border border-amber-800/15 overflow-hidden bg-amber-950/20">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(245,158,11,0.1)" }}>
            <h2 className="text-amber-100 font-semibold text-sm">Course Overview</h2>
            <Link href="/admin/courses" className="text-amber-400 text-xs hover:underline">Manage</Link>
          </div>
          <div className="divide-y divide-amber-800/10">
            {courseStats.map((c) => (
              <div key={c.id} className="flex items-center gap-3 px-5 py-3">
                <div className="w-10 h-7 rounded-md bg-amber-900/30 overflow-hidden shrink-0">
                  {c.thumbnail ? <img src={c.thumbnail} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full bg-gradient-to-br from-amber-900 to-orange-900" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-amber-100 text-xs font-medium truncate">{c.title}</p>
                  <p className="text-amber-200/40 text-[10px]">{c._count.enrollments} enrolled · ₹{c.price}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  c.status === "PUBLISHED" ? "bg-green-500/15 text-green-400" :
                  c.status === "DRAFT" ? "bg-yellow-500/15 text-yellow-400" :
                  "bg-amber-500/15 text-amber-400"
                }`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="rounded-2xl border border-amber-800/15 overflow-hidden bg-amber-950/20">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(245,158,11,0.1)" }}>
          <h2 className="text-amber-100 font-semibold text-sm">New Users</h2>
          <Link href="/admin/users" className="text-amber-400 text-xs hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(245,158,11,0.08)" }}>
                {["User", "Email", "Role", "Joined"].map((h) => (
                  <th key={h} className="text-left text-xs text-amber-600/60 font-medium px-5 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-800/10">
              {recentUsers.map((u) => (
                <tr key={u.id} className="hover:bg-amber-500/5 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      {u.image ? <img src={u.image} className="w-7 h-7 rounded-full" alt="" /> : <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-[10px] font-bold">{u.name?.[0]}</div>}
                      <span className="text-amber-100 text-xs font-medium truncate max-w-[120px]">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-amber-200/50 text-xs truncate max-w-[160px]">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      u.role === "ADMIN" ? "bg-amber-500/20 text-amber-300" :
                      u.role === "INSTRUCTOR" ? "bg-orange-500/15 text-orange-400" :
                      "bg-stone-500/15 text-stone-400"
                    }`}>{u.role}</span>
                  </td>
                  <td className="px-5 py-3 text-amber-600/60 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
