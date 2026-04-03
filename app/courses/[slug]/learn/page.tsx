import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import VideoPlayer from "@/components/courses/video-player";
import { Lock, CheckCircle, ChevronDown, BookOpen } from "lucide-react";
import { formatDuration } from "@/lib/utils";

async function getEnrollmentData(userId: string, slug: string) {
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: {
          lectures: { orderBy: { order: "asc" } },
        },
      },
    },
  });
  if (!course) return null;

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId: course.id } },
    include: { progress: { select: { lectureId: true, completed: true } } },
  });

  return { course, enrollment };
}

export default async function CourseLearnPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { lecture?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect(`/login?callbackUrl=/courses/${params.slug}/learn`);

  const data = await getEnrollmentData(session.user.id, params.slug);
  if (!data || !data.enrollment) redirect(`/courses/${params.slug}`);

  const { course, enrollment } = data;
  const allLectures = course.sections.flatMap(s => s.lectures);
  const currentLectureId = searchParams.lecture || allLectures[0]?.id;
  const currentLecture = allLectures.find(l => l.id === currentLectureId) || allLectures[0];
  const completedIds = new Set(enrollment?.progress.filter(p => p.completed).map(p => p.lectureId));
  const progressPercent = allLectures.length > 0 ? Math.round((completedIds.size / allLectures.length) * 100) : 0;

  return (
    <main className="min-h-screen bg-gray-900 pt-16 flex">
      {/* Video area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Video */}
        <div className="bg-black aspect-video max-h-[70vh]">
          {currentLecture?.videoUrl ? (
            <VideoPlayer
              url={currentLecture.videoUrl}
              lectureId={currentLecture.id}
              enrollmentId={enrollment!.id}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white gap-3">
              <BookOpen className="w-16 h-16 text-gray-400" />
              <p className="text-gray-400">No video available for this lecture</p>
            </div>
          )}
        </div>

        {/* Lecture info */}
        <div className="p-6 bg-white flex-1">
          <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl font-bold text-gray-900">{currentLecture?.title}</h1>
              <span className="text-sm text-gray-500">{progressPercent}% complete</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full mb-4">
              <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
            {currentLecture?.description && (
              <p className="text-gray-600 text-sm leading-relaxed">{currentLecture.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar curriculum */}
      <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto hidden lg:block">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-bold text-gray-900 text-sm">{course.title}</h2>
          <p className="text-xs text-gray-500 mt-0.5">{completedIds.size}/{allLectures.length} lectures completed</p>
        </div>
        {course.sections.map((section) => (
          <details key={section.id} open className="border-b border-gray-100">
            <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 list-none">
              <div className="flex items-center gap-2">
                <ChevronDown className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-xs text-gray-700">{section.title}</span>
              </div>
              <span className="text-xs text-gray-400">{section.lectures.length}</span>
            </summary>
            {section.lectures.map((lecture) => {
              const isCompleted = completedIds.has(lecture.id);
              const isCurrent = lecture.id === currentLecture?.id;
              return (
                <a
                  key={lecture.id}
                  href={`?lecture=${lecture.id}`}
                  className={`flex items-center gap-3 px-4 py-3 text-xs transition-colors ${
                    isCurrent ? "bg-purple-50 border-l-4 border-purple-600" : "hover:bg-gray-50"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  ) : (
                    <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${isCurrent ? "border-purple-600" : "border-gray-300"}`} />
                  )}
                  <span className={`flex-1 ${isCurrent ? "font-medium text-purple-700" : "text-gray-600"}`}>{lecture.title}</span>
                  <span className="text-gray-400 shrink-0">{formatDuration(lecture.duration)}</span>
                </a>
              );
            })}
          </details>
        ))}
      </aside>
    </main>
  );
}
