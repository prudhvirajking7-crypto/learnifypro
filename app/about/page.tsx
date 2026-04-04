import Link from "next/link";
import { GraduationCap, Briefcase, TrendingUp, Globe, Users, BookOpen, Award } from "lucide-react";

const PILLARS = [
  {
    icon: GraduationCap,
    title: "Expert Instructors",
    desc: "Every instructor is an active industry professional — not just an academic. They bring live, real-world experience into every lesson.",
  },
  {
    icon: Briefcase,
    title: "Real Projects",
    desc: "You learn by building. Every course includes hands-on projects you can add to your portfolio and show to any employer.",
  },
  {
    icon: TrendingUp,
    title: "Career Outcomes",
    desc: "Our curriculum is designed around what employers actually hire for. Students consistently land roles, promotions, and freelance clients.",
  },
];

const TEAM = [
  { initials: "JS", name: "John Smith", role: "Chief Executive Officer", from: "from-amber-500", to: "to-orange-600", bio: "15 years in EdTech. Previously VP at Coursera." },
  { initials: "PK", name: "Priya Kapoor", role: "Chief Technology Officer", from: "from-yellow-500", to: "to-amber-600", bio: "Ex-Google engineer. Shipped products used by millions." },
  { initials: "AM", name: "Arjun Mehta", role: "Head of Content", from: "from-amber-600", to: "to-yellow-700", bio: "Award-winning educator. Built 40+ courses from scratch." },
  { initials: "SC", name: "Sarah Chen", role: "Head of Partnerships", from: "from-orange-500", to: "to-amber-500", bio: "Forged partnerships with 50+ companies for student hiring." },
];

const STATS = [
  { value: "16+", label: "Courses" },
  { value: "500+", label: "Students" },
  { value: "10+", label: "Instructors" },
  { value: "4", label: "Countries" },
];

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-amber-950 to-stone-900 py-28 overflow-hidden">
        <div className="absolute top-10 right-10 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-200 text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Globe className="w-4 h-4 text-yellow-400" />
            Learn Without Boundaries
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Mission
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            We believe great education should be available to anyone, anywhere — regardless of background, location, or financial means.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────── */}
      <section className="bg-amber-700 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-extrabold text-white">{s.value}</p>
                <p className="text-amber-200 text-sm mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission Pillars ──────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What We Stand For</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Three principles guide every decision we make at LearnifyPro.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {PILLARS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-8 border border-amber-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center mb-6 group-hover:from-amber-200 group-hover:to-yellow-200 transition-colors">
                  <Icon className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Our Story</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-6 leading-snug">
                Built on a simple, powerful belief
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                LearnifyPro was founded with a simple belief — that great education shouldn&apos;t be locked behind location or expensive institutions.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                We started as a small team of engineers and educators who were frustrated by the gap between what universities teach and what employers actually need. So we built the bridge.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, learners from across four continents are using LearnifyPro to break into tech, level up their careers, and build things that matter.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-8 border border-amber-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-600 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Founded 2022</p>
                    <p className="text-gray-500 text-sm">Bengaluru, India</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed border-l-4 border-amber-500 pl-4">
                  &ldquo;Our north star is simple: every learner who puts in the work should get a real outcome.&rdquo;
                </blockquote>
                <p className="mt-4 text-sm font-semibold text-amber-700">— John Smith, CEO</p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-200 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">The People</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-3">Meet the Team</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">A small, passionate group united by one goal — helping learners reach their potential.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center group">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.from} ${member.to} flex items-center justify-center mx-auto mb-5 text-2xl font-extrabold text-white shadow-md`}>
                  {member.initials}
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                <p className="text-amber-600 text-sm font-medium mt-1 mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values Row ───────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Award, label: "Excellence", desc: "We hold every course to the highest standard before it reaches a learner." },
              { icon: Users, label: "Community", desc: "Learning is better together. We foster peer support and collaboration." },
              { icon: Globe, label: "Accessibility", desc: "Affordable pricing and multilingual support remove barriers to entry." },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{label}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-yellow-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to start your learning journey?</h2>
          <p className="text-amber-200 text-lg mb-10">Join thousands of learners building real skills with real instructors.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/courses" className="px-8 py-4 bg-white text-amber-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-xl">
              Browse Courses
            </Link>
            <Link href="/register" className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all">
              Join Free
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
