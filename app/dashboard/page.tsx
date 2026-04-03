import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Award, Clock, TrendingUp, Play, Star } from "lucide-react";
import { formatDuration } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?callbackUrl=/dashboard");

  const [enrollments, recentOrders] = await Promise.all([
    prisma.enrollment.findMany({
      where: { userId: session.user.id, status: "ACTIVE" },
      take: 4,
      orderBy: { createdAt: "desc" },
      include: {
        course: {
          select: { id: true, title: true, slug: true, thumbnail: true, totalLectures: true, instructor: { select: { name: true } } },
        },
        progress: { select: { completed: true } },
      },
    }),
    prisma.order.findMany({
      where: { userId: session.user.id, status: "COMPLETED" },
      take: 3,
      orderBy: { createdAt: "desc" },
      include: { orderItems: { include: { course: { select: { title: true } } } } },
    }),
  ]);

  const stats = [
    { label: "Enrolled Courses", value: enrollments.length, icon: BookOpen, color: "from-amber-500 to-amber-500" },
    { label: "Completed", value: enrollments.filter(e => e.progress.filter(p => p.completed).length === e.course.totalLectures && e.course.totalLectures > 0).length, icon: Award, color: "from-green-500 to-emerald-500" },
    { label: "In Progress", value: enrollments.filter(e => e.progress.some(p => p.completed)).length, icon: TrendingUp, color: "from-orange-500 to-amber-500" },
    { label: "Certificates", value: 0, icon: Star, color: "from-orange-500 to-rose-500" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {session.user.name?.split(" ")[0]}! &#x1F44B;</h1>
          <p className="text-gray-500 mt-1">Continue your learning journey</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-sm text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Continue Learning</h2>
              <Link href="/dashboard/my-learning" className="text-sm text-amber-600 hover:underline">View all</Link>
            </div>
            {enrollments.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
                <Link href="/courses" className="px-6 py-2.5 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors">
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {enrollments.map((enrollment) => {
                  const completed = enrollment.progress.filter(p => p.completed).length;
                  const total = enrollment.course.totalLectures;
                  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                  return (
                    <div key={enrollment.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 hover:shadow-md transition-shadow">
                      <div className="w-24 h-16 rounded-xl bg-gradient-to-br from-amber-100 to-amber-100 flex items-center justify-center shrink-0 overflow-hidden">
                        {enrollment.course.thumbnail ? (
                          <img src={enrollment.course.thumbnail} alt={enrollment.course.title} className="w-full h-full object-cover" />
                        ) : (
                          <BookOpen className="w-8 h-8 text-amber-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{enrollment.course.title}</h3>
                        <p className="text-xs text-gray-500 mb-2">{enrollment.course.instructor.name}</p>
                        <div className="h-1.5 bg-gray-100 rounded-full mb-1">
                          <div className="h-full bg-gradient-to-r from-amber-500 to-amber-500 rounded-full transition-all" style={{ width: `${percent}%` }} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{percent}% complete</span>
                          <Link href={`/courses/${enrollment.course.slug}/learn`} className="flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700">
                            <Play className="w-3 h-3" /> Continue
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Orders */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h2>
            {recentOrders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                <p className="text-gray-500 text-sm">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-gray-500">#{order.id.slice(0,8).toUpperCase()}</span>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Completed</span>
                    </div>
                    {order.orderItems.map((item) => (
                      <p key={item.id} className="text-sm text-gray-700 truncate">{item.course.title}</p>
                    ))}
                    <p className="text-xs text-gray-500 mt-2">&#x20B9;{order.totalAmount}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
