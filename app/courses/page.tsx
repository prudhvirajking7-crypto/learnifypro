import CourseCard from "@/components/courses/course-card";
import CourseFilters from "@/components/courses/course-filters";
import { Search } from "lucide-react";

async function getCourses(searchParams: any) {
  const params = new URLSearchParams();
  if (searchParams.search) params.set("search", searchParams.search);
  if (searchParams.category) params.set("category", searchParams.category);
  if (searchParams.level) params.set("level", searchParams.level);
  if (searchParams.sortBy) params.set("sortBy", searchParams.sortBy);
  params.set("page", searchParams.page || "1");
  params.set("limit", "12");
  
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/courses?${params}`, { next: { revalidate: 60 } });
    if (!res.ok) return { courses: [], pagination: null };
    return res.json();
  } catch { return { courses: [], pagination: null }; }
}

export default async function CoursesPage({ searchParams }: { searchParams: any }) {
  const { courses, pagination } = await getCourses(searchParams);

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            {searchParams.search ? `Results for "${searchParams.search}"` : searchParams.category ? decodeURIComponent(searchParams.category).replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()) : "All Courses"}
          </h1>
          <p className="text-purple-200">{pagination?.total || 0} courses available</p>
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
                            ? "bg-purple-600 text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-600"
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
