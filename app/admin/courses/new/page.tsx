import { prisma } from "@/lib/prisma";
import CourseForm from "@/components/admin/course-form";

export default async function NewCoursePage() {
  const [categories, instructors] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.user.findMany({ where: { role: { in: ["INSTRUCTOR", "ADMIN"] }, name: { not: null }, email: { not: null } }, select: { id: true, name: true, email: true }, orderBy: { name: "asc" } }).then((u) => u as { id: string; name: string; email: string }[]),
  ]);

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Create New Course</h1>
        <p className="text-gray-400 text-sm mt-1">Fill in the details to publish a new course.</p>
      </div>
      <CourseForm categories={categories} instructors={instructors} />
    </div>
  );
}
