import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

const POSTS = [
  {
    slug: "project-based-learning",
    category: "Learning",
    title: "Why Project-Based Learning Beats Passive Videos",
    excerpt: "Watching videos is comfortable. Building things is hard. Here's why discomfort is exactly what accelerates real skill development — and how we design for it.",
    date: "March 18, 2025",
    author: "Arjun Mehta",
    readTime: "6 min read",
    color: "from-amber-500 to-orange-500",
  },
  {
    slug: "in-demand-skills-2025",
    category: "Career",
    title: "5 In-Demand Skills to Learn in 2025",
    excerpt: "The job market is shifting faster than ever. We analysed 10,000+ job postings to find the skills that are showing up most — and where to learn them efficiently.",
    date: "March 5, 2025",
    author: "Sarah Chen",
    readTime: "8 min read",
    color: "from-yellow-500 to-amber-600",
  },
  {
    slug: "first-dev-job-6-months",
    category: "Career",
    title: "How to Land Your First Dev Job in 6 Months",
    excerpt: "A practical, no-fluff roadmap for career changers. We've seen this exact path work for dozens of our learners — here's what they all had in common.",
    date: "February 20, 2025",
    author: "John Smith",
    readTime: "10 min read",
    color: "from-amber-600 to-yellow-700",
  },
  {
    slug: "future-of-online-education",
    category: "Industry",
    title: "The Future of Online Education",
    excerpt: "AI tutors, cohort models, employer partnerships — the next decade of e-learning looks radically different from the last. Here's our take on where it's all headed.",
    date: "February 8, 2025",
    author: "Priya Kapoor",
    readTime: "7 min read",
    color: "from-orange-500 to-amber-500",
  },
  {
    slug: "building-portfolio-projects",
    category: "Projects",
    title: "Building Real Portfolio Projects",
    excerpt: "A GitHub full of tutorials isn't a portfolio — it's homework. We break down what makes a project stand out to hiring managers, and share 10 ideas to build right now.",
    date: "January 25, 2025",
    author: "Arjun Mehta",
    readTime: "9 min read",
    color: "from-yellow-600 to-amber-700",
  },
  {
    slug: "bootcamp-to-senior-dev",
    category: "Career",
    title: "From Bootcamp to Senior Dev",
    excerpt: "Making the leap from junior to senior is less about years of experience and more about how you think. Four engineers share what changed everything for them.",
    date: "January 10, 2025",
    author: "Sarah Chen",
    readTime: "11 min read",
    color: "from-amber-500 to-yellow-600",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Learning: "bg-blue-50 text-blue-700 border-blue-100",
  Career: "bg-green-50 text-green-700 border-green-100",
  Industry: "bg-purple-50 text-purple-700 border-purple-100",
  Projects: "bg-amber-50 text-amber-700 border-amber-100",
};

export default function BlogPage() {
  return (
    <main className="pt-20">
      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-amber-950 to-stone-900 py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-amber-500/20 text-amber-300 text-sm font-semibold px-4 py-1.5 rounded-full border border-amber-500/30 mb-6">
            Insights &amp; Ideas
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            From the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              LearnifyPro
            </span>{" "}
            Team
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Practical advice on learning, careers, and the future of education — written by the people building it.
          </p>
        </div>
      </section>

      {/* ── Blog Grid ────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Featured post */}
          <div className="mb-12">
            <div className="bg-white rounded-3xl border border-amber-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className={`h-3 bg-gradient-to-r ${POSTS[0].color}`} />
              <div className="p-8 sm:p-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${CATEGORY_COLORS[POSTS[0].category]}`}>
                      {POSTS[0].category}
                    </span>
                    <span className="text-gray-400 text-xs">Featured</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors leading-snug">
                    {POSTS[0].title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">{POSTS[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{POSTS[0].author}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{POSTS[0].date}</span>
                    <span>{POSTS[0].readTime}</span>
                  </div>
                  <Link href={`/blog/${POSTS[0].slug}`} className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:gap-3 transition-all">
                    Read article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className={`h-48 rounded-2xl bg-gradient-to-br ${POSTS[0].color} opacity-20`} />
              </div>
            </div>
          </div>

          {/* Grid of remaining posts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.slice(1).map((post) => (
              <article key={post.slug} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                <div className={`h-1.5 bg-gradient-to-r ${post.color}`} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[post.category]}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3 leading-snug group-hover:text-amber-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-5">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ───────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-yellow-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Get new posts in your inbox</h2>
          <p className="text-amber-200 mb-8">Practical career and learning advice, no spam. Unsubscribe anytime.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button className="px-6 py-3 bg-white text-amber-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
