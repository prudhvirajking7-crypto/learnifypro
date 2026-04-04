import Link from "next/link";
import {
  TrendingUp,
  BookOpen,
  Users,
  Globe,
  Mail,
  BarChart2,
  Lightbulb,
  ShieldCheck,
  Layers,
  CalendarDays,
} from "lucide-react";

const METRICS = [
  { icon: BookOpen, value: "16+", label: "Courses Published", sub: "Across 6 categories" },
  { icon: Users, value: "10+", label: "Expert Instructors", sub: "Active professionals" },
  { icon: Layers, value: "6", label: "Subject Categories", sub: "Tech, business & more" },
  { icon: CalendarDays, value: "2024", label: "Year Founded", sub: "Bengaluru, India" },
];

const HIGHLIGHTS = [
  {
    icon: TrendingUp,
    title: "Massive Market Opportunity",
    desc: "The global e-learning market is projected to exceed $1 trillion by 2032, growing at a CAGR of over 13%. India alone is the world's second-largest online learning market with over 500 million internet users.",
  },
  {
    icon: Lightbulb,
    title: "Differentiated Product",
    desc: "LearnifyPro is built around project-based learning and career outcomes — not just video content. Our curriculum is co-designed with hiring companies, creating a measurable edge over traditional MOOC platforms.",
  },
  {
    icon: ShieldCheck,
    title: "Built to Scale",
    desc: "A modern, cloud-native technology stack (Next.js, PostgreSQL, Stripe/Razorpay, Google OAuth) enables rapid geographic and category expansion without proportional cost increases.",
  },
  {
    icon: Globe,
    title: "Early Global Traction",
    desc: "Within our first year, learners from four continents have enrolled on the platform — validating international demand without a single dollar of paid acquisition spend.",
  },
];

export default function InvestorsPage() {
  return (
    <main className="pt-20">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-amber-950 to-stone-900 py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-200 text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <BarChart2 className="w-4 h-4 text-yellow-400" />
            Investor Relations
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Investing in the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Future of Learning
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            LearnifyPro is building the definitive career-outcomes platform for the next generation of knowledge workers — starting in India, scaling globally.
          </p>
        </div>
      </section>

      {/* ── Mission for Investors ──────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Our Mission</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-5 leading-snug">
            Closing the gap between education and employment
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Globally, over 300 million young people are underemployed — not for lack of ambition, but because formal education fails to teach the skills employers actually hire for. LearnifyPro is solving this at scale by pairing working professionals as instructors with a curriculum built around real job requirements.
          </p>
        </div>
      </section>

      {/* ── Key Metrics ──────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Key Metrics</h2>
            <p className="text-gray-500 max-w-lg mx-auto">A snapshot of LearnifyPro&apos;s current scale as we enter our growth phase.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METRICS.map(({ icon: Icon, value, label, sub }) => (
              <div
                key={label}
                className="bg-white rounded-2xl border border-amber-100 p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center mx-auto mb-5 group-hover:from-amber-200 group-hover:to-yellow-200 transition-colors">
                  <Icon className="w-7 h-7 text-amber-600" />
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-1">{value}</p>
                <p className="font-semibold text-gray-800 text-sm">{label}</p>
                <p className="text-gray-400 text-xs mt-1">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Market Opportunity ───────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Why Now</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-3">The Opportunity</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Four structural tailwinds combine to create the ideal conditions for a career-outcomes e-learning platform.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-8 border border-amber-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-5 group-hover:bg-amber-200 transition-colors">
                  <Icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Market Size Visual ───────────────────────────────────── */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-amber-500">
            {[
              { value: "$1T+", label: "Global EdTech TAM by 2032", sub: "Source: Global Market Insights" },
              { value: "13%+", label: "Annual Market Growth (CAGR)", sub: "Consistent 10-year trend" },
              { value: "500M+", label: "Internet Users in India", sub: "World's 2nd largest online learner base" },
            ].map((item) => (
              <div key={item.label} className="px-6 py-4">
                <p className="text-5xl font-extrabold text-white">{item.value}</p>
                <p className="text-amber-200 font-semibold mt-2 text-sm">{item.label}</p>
                <p className="text-amber-300 text-xs mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Investment Thesis ────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Investment Thesis</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We are raising to accelerate three vectors of growth.
            </p>
          </div>
          <div className="space-y-5">
            {[
              {
                num: "01",
                title: "Content Depth",
                desc: "Expand from 16 to 100+ courses across high-demand categories — Web Development, Data Science, AI/ML, Cloud, Cybersecurity, and Business Management.",
              },
              {
                num: "02",
                title: "Instructor Network",
                desc: "Scale the instructor-vetting and onboarding pipeline to bring world-class professionals from the US, UK, and Southeast Asia onto the platform.",
              },
              {
                num: "03",
                title: "Employer Partnerships",
                desc: "Build direct hiring channels with 50+ companies so that LearnifyPro certificates carry verifiable, employer-trusted weight in recruitment decisions.",
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-6 items-start bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-md transition-all">
                <span className="text-3xl font-extrabold text-amber-200 shrink-0 leading-none">{item.num}</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-yellow-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Mail className="w-10 h-10 text-amber-200 mx-auto mb-5" />
          <h2 className="text-2xl font-bold text-white mb-4">Investment Inquiries</h2>
          <p className="text-amber-200 text-lg mb-6">
            We are open to conversations with mission-aligned investors — angels, family offices, and early-stage funds who believe in the future of career education.
          </p>
          <a
            href="mailto:investors@learnifypro.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-xl text-lg"
          >
            investors@learnifypro.com
          </a>
          <p className="text-amber-300 text-sm mt-5">We review all inquiries and respond within 3 business days.</p>
        </div>
      </section>

      {/* ── Legal Disclaimer ─────────────────────────────────────── */}
      <section className="py-8 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-slate-500 text-xs leading-relaxed text-center">
            <strong className="text-slate-400">Disclaimer:</strong> This page is for informational purposes only and does not constitute an offer or solicitation to sell securities. All forward-looking statements reflect current expectations and are subject to risks and uncertainties. Market size figures are sourced from third-party research reports and are provided for context only. LearnifyPro makes no representation as to their accuracy. Past performance is not indicative of future results. Any investment in an early-stage company carries significant risk, including the possible loss of the entire invested amount. Please consult a qualified financial adviser before making any investment decision.
          </p>
        </div>
      </section>
    </main>
  );
}
