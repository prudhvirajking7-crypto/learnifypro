import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CourseForm from "@/components/admin/course-form";

export default async function InstructorNewCoursePage() {
  const session = await getServerSession(authOptions);
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  const instructor = { id: session!.user.id, name: session!.user.name || "", email: session!.user.email || "" };

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Create New Course</h1>
        <p className="text-gray-400 text-sm mt-1">Your course will be in DRAFT status until you publish it.</p>
      </div>
      <CourseForm categories={categories} instructors={[instructor]} initialData={{ instructorId: instructor.id }} />
    </div>
  );
}
