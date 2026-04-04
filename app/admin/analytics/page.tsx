import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") redirect("/dashboard");

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo  = new Date(now.getTime() -  7 * 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    newUsersThisMonth,
    newUsersThisWeek,
    totalCourses,
    publishedCourses,
    totalEnrollments,
    enrollmentsThisMonth,
    completedEnrollments,
    totalRevenue,
    revenueThisMonth,
    topCourses,
    recentOrders,
    enrollmentsByDay,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.course.count(),
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.enrollment.count(),
    prisma.enrollment.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.enrollment.count({ where: { status: "COMPLETED" } }),
    prisma.order.aggregate({ where: { status: "COMPLETED" }, _sum: { totalAmount: true } }),
    prisma.order.aggregate({ where: { status: "COMPLETED", createdAt: { gte: thirtyDaysAgo } }, _sum: { totalAmount: true } }),
    prisma.course.findMany({
      take: 10,
      orderBy: { enrollments: { _count: "desc" } },
      include: {
        _count: { select: { enrollments: true, reviews: true } },
        instructor: { select: { name: true } },
      },
    }),
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      where: { status: "COMPLETED" },
      include: {
        user: { select: { name: true, email: true } },
        orderItems: { include: { course: { select: { title: true } } } },
      },
    }),
    prisma.enrollment.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  // Group enrollments by day for mini chart
  const dayMap: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    dayMap[d.toISOString().slice(0, 10)] = 0;
  }
  enrollmentsByDay.forEach((e) => {
    const key = e.createdAt.toISOString().slice(0, 10);
    if (key in dayMap) dayMap[key]++;
  });
  const chartData = Object.entries(dayMap);
  const maxVal = Math.max(...chartData.map(([, v]) => v), 1);

  const fmt = (n: number) =>
    n >= 1000 ? `₹${(n / 1000).toFixed(1)}k` : `₹${n}`;

  const completionRate = totalEnrollments > 0
    ? ((completedEnrollments / totalEnrollments) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-amber-100">Analytics</h1>
        <p className="text-amber-200/50 text-sm mt-1">Platform-wide metrics and trends</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: "Total Users",
            value: totalUsers.toLocaleString(),
            sub: `+${newUsersThisMonth} this month · +${newUsersThisWeek} this week`,
          },
          {
            label: "Enrollments",
            value: totalEnrollments.toLocaleString(),
            sub: `+${enrollmentsThisMonth} this month · ${completionRate}% completion`,
          },
          {
            label: "Total Revenue",
            value: fmt(totalRevenue._sum.totalAmount || 0),
            sub: `${fmt(revenueThisMonth._sum.totalAmount || 0)} this month`,
          },
          {
            label: "Courses",
            value: totalCourses.toLocaleString(),
            sub: `${publishedCourses} published · ${totalCourses - publishedCourses} draft`,
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-amber-800/20 p-5"
            style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(180,83,9,0.05) 100%)" }}
          >
            <p className="text-xs font-semibold text-amber-600/70 uppercase tracking-wider">{card.label}</p>
            <p className="text-3xl font-bold text-amber-100 mt-1">{card.value}</p>
            <p className="text-xs text-amber-200/50 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Enrollment trend chart (pure CSS bar chart) */}
      <div className="rounded-2xl border border-amber-800/20 p-6" style={{ background: "rgba(245,158,11,0.04)" }}>
        <h2 className="text-sm font-semibold text-amber-100 mb-4">New Enrollments — Last 30 Days</h2>
        <div className="flex items-end gap-1 h-28">
          {chartData.map(([day, count]) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-1 group" title={`${day}: ${count}`}>
              <div
                className="w-full rounded-sm bg-amber-500/60 group-hover:bg-amber-400 transition-all duration-200"
                style={{ height: `${(count / maxVal) * 100}%`, minHeight: count > 0 ? "4px" : "2px" }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-amber-600/60 mt-2">
          <span>{chartData[0]?.[0]}</span>
          <span>{chartData[chartData.length - 1]?.[0]}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top Courses */}
        <div className="rounded-2xl border border-amber-800/20 p-6" style={{ background: "rgba(245,158,11,0.04)" }}>
          <h2 className="text-sm font-semibold text-amber-100 mb-4">Top Courses by Enrollment</h2>
          <div className="space-y-3">
            {topCourses.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-amber-600/60 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-amber-100 truncate">{c.title}</p>
                  <p className="text-xs text-amber-200/50">{c.instructor.name} · {c._count.reviews} reviews</p>
                </div>
                <span className="text-xs font-semibold text-amber-400 shrink-0">
                  {c._count.enrollments} enrolled
                </span>
              </div>
            ))}
            {topCourses.length === 0 && (
              <p className="text-sm text-amber-600/60">No courses yet.</p>
            )}
          </div>
        </div>

        {/* Recent Revenue */}
        <div className="rounded-2xl border border-amber-800/20 p-6" style={{ background: "rgba(245,158,11,0.04)" }}>
          <h2 className="text-sm font-semibold text-amber-100 mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-amber-100 truncate">{order.user.name || order.user.email}</p>
                  <p className="text-xs text-amber-200/50 truncate">
                    {order.orderItems.map((oi) => oi.course.title).join(", ")}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-green-400">₹{order.totalAmount.toFixed(0)}</p>
                  <p className="text-xs text-amber-600/60">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </div>
              </div>
            ))}
            {recentOrders.length === 0 && (
              <p className="text-sm text-amber-600/60">No completed orders yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
