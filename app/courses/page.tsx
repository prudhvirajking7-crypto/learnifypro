import CourseCard from "@/components/courses/course-card";
import CourseFilters from "@/components/courses/course-filters";
import { Search } from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getCourses(searchParams: any) {
  const page = Number(searchParams.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;
  const search = searchParams.search;
  const category = searchParams.category;
  const level = searchParams.level;
  const sortBy = searchParams.sortBy || "createdAt";

  const where: any = { status: "PUBLISHED" };
  if (category) where.category = { slug: category };
  if (level) where.level = level;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { shortDescription: { contains: search, mode: "insensitive" } },
      { tags: { has: search } },
    ];
  }

  const orderBy: any =
    sortBy === "price" ? { price: "asc" } :
    sortBy === "rating" ? { reviews: { _count: "desc" } } :
    sortBy === "popular" ? { enrollments: { _count: "desc" } } :
    { createdAt: "desc" };

  try {
    const [rawCourses, total] = await Promise.all([
      prisma.course.findMany({
        where, skip, take: limit, orderBy,
        select: {
          id: true, title: true, slug: true, shortDescription: true,
          thumbnail: true, price: true, discountPrice: true, currency: true,
          level: true, language: true, totalDuration: true, totalLectures: true,
          featured: true,
          instructor: { select: { id: true, name: true, image: true } },
          category: { select: { name: true, slug: true } },
          _count: { select: { enrollments: true, reviews: true } },
          reviews: { select: { rating: true } },
        },
      }),
      prisma.course.count({ where }),
    ]);

    const courses = rawCourses.map((c) => ({
      ...c,
      averageRating: c.reviews.length > 0
        ? c.reviews.reduce((sum, r) => sum + r.rating, 0) / c.reviews.length : 0,
      reviews: undefined,
    }));

    return { courses, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  } catch {
    return { courses: [], pagination: null };
  }
}

export default async function CoursesPage({ searchParams }: { searchParams: any }) {
  const { courses, pagination } = await getCourses(searchParams);

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            {searchParams.search ? `Results for "${searchParams.search}"` : searchParams.category ? decodeURIComponent(searchParams.category).replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()) : "All Courses"}
          </h1>
          <p className="text-amber-200">{pagination?.total || 0} courses available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <CourseFilters />
          </aside>

          {/* Course grid */}
          <div className="flex-1">
            {courses.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {courses.map((course: any) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
                {pagination && pagination.totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-10">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                      <a
                        key={page}
                        href={`?${new URLSearchParams({ ...searchParams, page: page.toString() })}`}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                          page === pagination.page
                            ? "bg-amber-600 text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-amber-300 hover:text-amber-600"
                        }`}
                      >
                        {page}
                      </a>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
