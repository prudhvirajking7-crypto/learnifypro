import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, Pencil, Eye } from "lucide-react";

export default async function InstructorCoursesPage() {
  const session = await getServerSession(authOptions);
  const courses = await prisma.course.findMany({
    where: { instructorId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: { category: { select: { name: true } }, _count: { select: { enrollments: true, sections: true } } },
  });

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">My Courses</h1>
        <Link href="/instructor/courses/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-black hover:-translate-y-0.5 transition-all"
          style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
          <PlusCircle className="w-4 h-4" /> New Course
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {courses.map((c) => (
          <div key={c.id} className="rounded-2xl border border-white/8 overflow-hidden transition-all hover:border-amber-500/30" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="h-32 bg-gray-800 relative">
              {c.thumbnail ? <img src={c.thumbnail} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full bg-gradient-to-br from-amber-900/50 to-orange-900/50" />}
              <span className={`absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full font-semibold ${c.status === "PUBLISHED" ? "bg-green-500/80 text-white" : c.status === "DRAFT" ? "bg-yellow-500/80 text-black" : "bg-gray-500/80 text-white"}`}>
                {c.status}
              </span>
            </div>
            <div className="p-4 space-y-3">
              <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">{c.title}</h3>
              <div className="flex items-center gap-3 text-[10px] text-gray-500">
                <span>{c._count.enrollments} students</span>
                <span>·</span>
                <span>{c._count.sections} sections</span>
                <span>·</span>
                <span>{c.category?.name || "Uncategorized"}</span>
              </div>
              <div className="flex gap-2">
                <Link href={`/instructor/courses/${c.id}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all">
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </Link>
                <Link href={`/courses/${c.slug}`} target="_blank" className="px-3 py-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                  <Eye className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
        {courses.length === 0 && (
          <div className="col-span-3 text-center py-16 text-gray-500">
            <p className="text-lg">No courses yet</p>
            <Link href="/instructor/courses/new" className="text-amber-400 text-sm hover:underline mt-2 block">Create your first course →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
