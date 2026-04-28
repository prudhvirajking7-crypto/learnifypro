import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Play, CheckCircle } from "lucide-react";

export default async function MyLearningPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?callbackUrl=/dashboard/my-learning");

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      course: {
        select: {
          id: true, title: true, slug: true, thumbnail: true,
          totalLectures: true, totalDuration: true,
          instructor: { select: { name: true } },
          category: { select: { name: true } },
        },
      },
      progress: { select: { completed: true, lectureId: true } },
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Learning</h1>
            <p className="text-gray-500 mt-1">{enrollments.length} courses enrolled</p>
          </div>
          <Link href="/courses" className="px-4 py-2 bg-amber-600 text-white text-sm font-semibold rounded-xl hover:bg-amber-700 transition-colors">
            Browse More Courses
          </Link>
        </div>

        {enrollments.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses yet</h3>
            <p className="text-gray-500 mb-6">Enroll in your first course to start learning</p>
            <Link href="/courses" className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {enrollments.map((enrollment) => {
              const completed = enrollment.progress.filter(p => p.completed).length;
              const total = enrollment.course.totalLectures;
              const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
              const isCompleted = percent === 100 && total > 0;

              return (
                <div key={enrollment.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-amber-100 to-amber-100 relative overflow-hidden">
                    {enrollment.course.thumbnail ? (
                      <img src={enrollment.course.thumbnail} alt={enrollment.course.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-amber-300" />
                      </div>
                    )}
                    {isCompleted && (
                      <div className="absolute inset-0 bg-green-900/60 flex items-center justify-center">
                        <CheckCircle className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{enrollment.course.title}</h3>
                    <p className="text-xs text-gray-500 mb-3">{enrollment.course.instructor.name}</p>
                    <div className="h-1.5 bg-gray-100 rounded-full mb-2">
                      <div
                        className={`h-full rounded-full transition-all ${isCompleted ? "bg-green-500" : "bg-gradient-to-r from-amber-500 to-amber-500"}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500">{percent}% complete</span>
                      <span className="text-xs text-gray-500">{completed}/{total} lectures</span>
                    </div>
                    <Link
                      href={`/courses/${enrollment.course.slug}/learn`}
                      className="w-full flex items-center justify-center gap-2 py-2 bg-amber-600 text-white text-sm font-semibold rounded-xl hover:bg-amber-700 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5" />
                      {percent === 0 ? "Start" : isCompleted ? "Review" : "Continue"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
