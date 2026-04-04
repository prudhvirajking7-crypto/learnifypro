import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CourseForm from "@/components/admin/course-form";
import SectionEditor from "@/components/admin/section-editor";

export default async function AdminCourseEditPage({ params }: { params: { id: string } }) {
  const [course, categories, instructors] = await Promise.all([
    prisma.course.findUnique({
      where: { id: params.id },
      include: { sections: { orderBy: { order: "asc" }, include: { lectures: { orderBy: { order: "asc" } } } } },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.user.findMany({ where: { role: { in: ["INSTRUCTOR", "ADMIN"] }, name: { not: null }, email: { not: null } }, select: { id: true, name: true, email: true }, orderBy: { name: "asc" } }).then((u) => u as { id: string; name: string; email: string }[]),
  ]);

  if (!course) notFound();

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/courses" className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">Edit Course</h1>
          <p className="text-gray-400 text-sm">{course.title}</p>
        </div>
        <Link href={`/courses/${course.slug}`} target="_blank" className="ml-auto text-xs px-3 py-1.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
          Preview →
        </Link>
      </div>

      <CourseForm categories={categories} instructors={instructors} initialData={course} />

      <div className="pt-2">
        <h2 className="text-lg font-bold text-white mb-4">Course Curriculum</h2>
        <SectionEditor courseId={course.id} initialSections={course.sections as any} />
      </div>
    </div>
  );
}
