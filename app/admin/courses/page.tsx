import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, Search, Pencil, Trash2, Eye } from "lucide-react";
import CourseDeleteButton from "@/components/admin/course-delete-btn";

export default async function AdminCoursesPage({ searchParams }: { searchParams: { search?: string; status?: string; page?: string } }) {
  const search = searchParams.search || "";
  const status = searchParams.status || "";
  const page = parseInt(searchParams.page || "1");
  const limit = 15;

  const where: any = {};
  if (search) where.title = { contains: search, mode: "insensitive" };
  if (status) where.status = status;

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: "desc" },
      include: {
        instructor: { select: { name: true } },
        category: { select: { name: true } },
        _count: { select: { enrollments: true, sections: true } },
      },
    }),
    prisma.course.count({ where }),
  ]);

  const pages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Courses</h1>
          <p className="text-gray-400 text-sm mt-0.5">{total} total courses</p>
        </div>
        <Link href="/admin/courses/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-black transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}
        >
          <PlusCircle className="w-4 h-4" /> New Course
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <form className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input name="search" defaultValue={search} placeholder="Search courses..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-amber-500/50" />
        </form>
        <form className="flex gap-2 flex-wrap">
          {["", "DRAFT", "PUBLISHED", "ARCHIVED"].map((s) => (
            <button key={s} name="status" value={s} type="submit"
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${status === s ? "bg-amber-500 text-black" : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"}`}>
              {s || "All"}
            </button>
          ))}
        </form>
      </div>

      <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8">
                {["Course", "Instructor", "Category", "Enrollments", "Status", "Price", "Actions"].map((h) => (
                  <th key={h} className="text-left text-xs text-gray-500 font-semibold px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {courses.map((c) => (
                <tr key={c.id} className="hover:bg-white/3 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-9 rounded-lg overflow-hidden shrink-0 bg-gray-800">
                        {c.thumbnail ? <img src={c.thumbnail} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full bg-gradient-to-br from-amber-900 to-orange-900" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-xs font-medium truncate max-w-[160px]">{c.title}</p>
                        <p className="text-gray-500 text-[10px]">{c._count.sections} sections</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{c.instructor.name}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{c.category?.name || "—"}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{c._count.enrollments}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${c.status === "PUBLISHED" ? "bg-green-500/15 text-green-400" : c.status === "DRAFT" ? "bg-yellow-500/15 text-yellow-400" : "bg-gray-500/15 text-gray-400"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-xs">₹{c.discountPrice || c.price}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/courses/${c.slug}`} target="_blank" className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"><Eye className="w-3.5 h-3.5" /></Link>
                      <Link href={`/admin/courses/${c.id}`} className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all"><Pencil className="w-3.5 h-3.5" /></Link>
                      <CourseDeleteButton courseId={c.id} courseTitle={c.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pages > 1 && (
          <div className="flex items-center justify-center gap-2 px-5 py-4 border-t border-white/8">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <Link key={p} href={`?page=${p}&search=${search}&status=${status}`}
                className={`w-8 h-8 rounded-lg text-xs font-medium flex items-center justify-center transition-all ${p === page ? "bg-amber-500 text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
