import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ChevronRight, Zap, Award, Play, GraduationCap, BookOpen } from "lucide-react";

async function getFeaturedCourses() {
  try {
    return await prisma.course.findMany({
      where: { status: "PUBLISHED", featured: true },
      take: 6,
      orderBy: { createdAt: "desc" },
      select: {
        id: true, slug: true, title: true, shortDescription: true,
        thumbnail: true, price: true, discountPrice: true, level: true,
        totalLectures: true, totalDuration: true,
        instructor: { select: { name: true } },
      },
    });
  } catch { return []; }
}

const CATEGORIES = [
  { name: "Web Development", icon: "💻", slug: "web-development" },
  { name: "Data Science", icon: "📊", slug: "data-science" },
  { name: "Mobile Dev", icon: "📱", slug: "mobile-development" },
  { name: "Design", icon: "🎨", slug: "design" },
  { name: "Business", icon: "💼", slug: "business" },
  { name: "Marketing", icon: "📣", slug: "marketing" },
  { name: "Finance", icon: "💰", slug: "finance" },
  { name: "IT & Software", icon: "🔧", slug: "it-software" },
];

const WHY_US = [
  { icon: Award, title: "Industry Expert Instructors", desc: "Every instructor is an active professional — not just a teacher. Learn from people who do this work every day." },
  { icon: Play, title: "Project-Based Learning", desc: "Build real projects from day one. Graduate with a portfolio that proves what you can do to any employer." },
  { icon: GraduationCap, title: "Recognised Certificates", desc: "Earn certificates on course completion. Share them on LinkedIn and your CV to stand out." },
  { icon: Zap, title: "Learn at Your Pace", desc: "Lifetime access to every course you enrol in. Start, pause, and return whenever suits you." },
];

export default async function HomePage() {
  const featured = await getFeaturedCourses();

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-purple-200 text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Learn from industry professionals — with real projects</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Learn Without
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Limits</span>
          </h1>

          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Start, switch, or advance your career with 1,000+ courses taught by real-world experts. Learn at your own pace, on any device.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/courses" className="px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-xl shadow-purple-900/30 flex items-center gap-2">
              Explore Courses <ChevronRight className="w-5 h-5" />
            </Link>
            <Link href="/register" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all">
              Start for Free
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Courses ─────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Courses</h2>
                <p className="text-gray-500">Hand-picked by our team — start learning today.</p>
              </div>
              <Link href="/courses" className="text-purple-600 font-semibold hover:underline flex items-center gap-1 text-sm">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((course) => (
                <Link key={course.id} href={`/courses/${course.slug}`} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="h-44 bg-gradient-to-br from-purple-100 to-indigo-100 overflow-hidden">
                    {course.thumbnail ? (
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-purple-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">{course.level.replace("_", " ")}</span>
                    <h3 className="font-bold text-gray-900 mt-3 mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">{course.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{course.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">by {course.instructor.name}</span>
                      <span className="font-bold text-gray-900">
                        {course.price === 0 ? <span className="text-green-600">Free</span> : `₹${(course.discountPrice ?? course.price).toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Browse Categories ────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Browse by Category</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Thousands of courses across every in-demand skill area.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/courses?category=${cat.slug}`} className="group bg-white rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors text-sm">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Built for real career outcomes</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Not just video lectures — structured programmes taught by working professionals, with projects you can show employers.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {WHY_US.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-indigo-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to start building your career?</h2>
          <p className="text-purple-200 text-lg mb-10">Join learners who are gaining real skills from industry experts — and landing jobs to prove it.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register" className="px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-xl">
              Get Started for Free
            </Link>
            <Link href="/courses" className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
