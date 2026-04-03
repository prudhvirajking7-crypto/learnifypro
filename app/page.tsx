import Link from "next/link";
import { GraduationCap, Star, Users, Award, TrendingUp, ChevronRight, Play, CheckCircle, Globe, Zap, BookOpen } from "lucide-react";

async function getFeaturedCourses() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/courses?featured=true&limit=8`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.courses || [];
  } catch { return []; }
}

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.categories || [];
  } catch { return []; }
}

const STATS = [
  { label: "Students", value: "10M+", icon: Users },
  { label: "Courses", value: "1,000+", icon: BookOpen },
  { label: "Instructors", value: "500+", icon: Award },
  { label: "Countries", value: "190+", icon: Globe },
];

const CATEGORIES = [
  { name: "Web Development", icon: "💻", slug: "web-development", count: "1,200+ courses" },
  { name: "Data Science", icon: "📊", slug: "data-science", count: "800+ courses" },
  { name: "Mobile Dev", icon: "📱", slug: "mobile-development", count: "600+ courses" },
  { name: "Design", icon: "🎨", slug: "design", count: "900+ courses" },
  { name: "Business", icon: "💼", slug: "business", count: "700+ courses" },
  { name: "Marketing", icon: "📣", slug: "marketing", count: "500+ courses" },
  { name: "Finance", icon: "💰", slug: "finance", count: "400+ courses" },
  { name: "IT & Software", icon: "🔧", slug: "it-software", count: "1,100+ courses" },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Full Stack Developer", company: "Infosys", text: "LearnifyPro helped me land my dream job. The courses are incredibly practical and the instructors are industry experts.", avatar: "PS", rating: 5 },
  { name: "Rahul Verma", role: "Data Scientist", company: "Amazon", text: "The data science curriculum is outstanding. I went from zero to landing a data science role in just 6 months.", avatar: "RV", rating: 5 },
  { name: "Ananya Singh", role: "UX Designer", company: "Flipkart", text: "Best platform for design courses. The projects are real-world and the feedback from instructors is invaluable.", avatar: "AS", rating: 5 },
];

export default async function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-purple-200 text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>#1 Learning Platform in India</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Learn Without
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Limits</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Start, switch, or advance your career with 1,000+ courses taught by real-world experts. Learn at your own pace, on any device.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/courses" className="px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-xl shadow-purple-900/30 flex items-center gap-2">
                  Explore Courses <ChevronRight className="w-5 h-5" />
                </Link>
                <Link href="/register" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all">
                  Start for Free
                </Link>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {["A", "B", "C", "D"].map((l, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 border-2 border-purple-900 flex items-center justify-center text-white text-xs font-bold">{l}</div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                    <span className="text-white font-semibold ml-1">4.8</span>
                  </div>
                  <p className="text-gray-400 text-sm">Trusted by 10M+ learners</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  {STATS.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="bg-white/10 rounded-xl p-4 text-center">
                      <Icon className="w-6 h-6 text-purple-300 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{value}</div>
                      <div className="text-sm text-gray-300">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Career Growth</p>
                      <p className="text-gray-300 text-xs">87% report career advancement</p>
                    </div>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-[87%] bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-purple-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 text-white justify-center">
                <Icon className="w-6 h-6 text-purple-200" />
                <div>
                  <div className="font-bold text-xl">{value}</div>
                  <div className="text-purple-200 text-sm">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Top Categories</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Choose from hundreds of categories and thousands of courses. Find what you need to grow your career.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/courses?category=${cat.slug}`} className="group bg-white rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose LearnifyPro?</h2>
              <div className="space-y-6">
                {[
                  { title: "Learn from Industry Experts", desc: "Our instructors are experienced professionals with real-world expertise, not just academics.", icon: Award },
                  { title: "Learn at Your Own Pace", desc: "Access courses anytime, anywhere. Pause, rewind, and learn on your schedule.", icon: Play },
                  { title: "Get Certified", desc: "Earn certificates upon course completion to showcase your skills to employers.", icon: GraduationCap },
                  { title: "Lifetime Access", desc: "Purchase once and get lifetime access. Go back and review content whenever you need.", icon: Zap },
                ].map(({ title, desc, icon: Icon }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                      <p className="text-gray-500 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "98%", label: "Satisfaction rate", color: "from-purple-500 to-indigo-500" },
                { value: "4.8★", label: "Average rating", color: "from-pink-500 to-rose-500" },
                { value: "24/7", label: "Support available", color: "from-orange-500 to-amber-500" },
                { value: "30-Day", label: "Money back guarantee", color: "from-green-500 to-emerald-500" },
              ].map((stat) => (
                <div key={stat.label} className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white`}>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-gray-500">Join millions of learners who are transforming their careers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role} at {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-purple-200 text-lg mb-8">Join over 10 million learners who are advancing their careers with LearnifyPro.</p>
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
