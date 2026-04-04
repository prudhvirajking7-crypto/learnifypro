import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CourseForm from "@/components/admin/course-form";
import SectionEditor from "@/components/admin/section-editor";

export default async function InstructorCourseEditPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const [course, categories] = await Promise.all([
    prisma.course.findUnique({
      where: { id: params.id },
      include: { sections: { orderBy: { order: "asc" }, include: { lectures: { orderBy: { order: "asc" } } } } },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!course) notFound();
  if (course.instructorId !== session!.user.id && (session!.user as any).role !== "ADMIN") redirect("/instructor/courses");

  const instructor = { id: session!.user.id, name: session!.user.name || "", email: session!.user.email || "" };

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <Link href="/instructor/courses" className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">Edit Course</h1>
          <p className="text-gray-400 text-sm">{course.title}</p>
        </div>
      </div>
      <CourseForm categories={categories} instructors={[instructor]} initialData={course} />
      <div className="pt-2">
        <h2 className="text-lg font-bold text-white mb-4">Course Curriculum</h2>
        <SectionEditor courseId={course.id} initialSections={course.sections as any} />
      </div>
    </div>
  );
}
