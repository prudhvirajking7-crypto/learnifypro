import TPLogo from "@/components/ui/tp-logo";
import { Download, Mail, Newspaper, ExternalLink, Image, Type, Palette } from "lucide-react";

const COVERAGE = [
  {
    publication: "TechCrunch",
    initials: "TC",
    color: "from-green-500 to-emerald-600",
    quote: "TechProwexa is quietly building something that the edtech giants missed — a genuine focus on career outcomes over vanity metrics.",
    date: "January 2025",
    category: "Startup Spotlight",
  },
  {
    publication: "Product Hunt",
    initials: "PH",
    color: "from-orange-400 to-red-500",
    quote: "#2 Product of the Day. A polished, thoughtfully designed platform that puts the learner first — the community loved it.",
    date: "November 2024",
    category: "Product Launch",
  },
  {
    publication: "Hacker News",
    initials: "HN",
    color: "from-amber-500 to-orange-600",
    quote: "The discussion was overwhelmingly positive. Comments highlighted the focus on project-based learning as a real differentiator in a crowded market.",
    date: "October 2024",
    category: "Community Feature",
  },
  {
    publication: "The Next Web",
    initials: "TNW",
    color: "from-blue-500 to-indigo-600",
    quote: "This Indian startup is proving that world-class e-learning doesn't need Silicon Valley money or a flashy rebrand — it needs the right curriculum.",
    date: "September 2024",
    category: "Feature Article",
  },
];

const BRAND_ASSETS = [
  { icon: Image, label: "Logo Files", desc: "SVG, PNG, and PDF in light and dark variants. Minimum clear space rules included." },
  { icon: Type, label: "Typography", desc: "Primary typeface: Geist Sans. Technical accents use Geist Mono for code, data, and learning controls." },
  { icon: Palette, label: "Colour Palette", desc: "Amber 600 (#D97706), Gold 400 (#FBBF24), Slate 950 (#020617), and supporting warm neutrals." },
];

export default function PressPage() {
  return (
    <main className="pt-20">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-amber-950 to-stone-900 py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-200 text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Newspaper className="w-4 h-4 text-yellow-400" />
            Press &amp; Media
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            TechProwexa{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              in the Press
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Our story is being told. Here&apos;s what the world&apos;s leading tech publications are saying about the future of learning.
          </p>
        </div>
      </section>

      {/* ── Media Kit ────────────────────────────────────────────── */}
      <section className="py-14 bg-amber-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Need our assets?</h2>
            <p className="text-amber-200">Download our official media kit — logos, brand colours, team photos, and company boilerplate.</p>
          </div>
          <a href="/brand/techprowexa-tp-mark.svg" download className="flex items-center gap-2 px-7 py-3.5 bg-white text-amber-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-xl shrink-0">
            <Download className="w-5 h-5" />
            Download TP Mark
          </a>
        </div>
      </section>

      {/* ── Coverage ─────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Coverage</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Highlights from media features and community coverage around the world.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {COVERAGE.map((item) => (
              <div key={item.publication} className="bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-sm font-extrabold text-white`}>
                      {item.initials}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{item.publication}</p>
                      <p className="text-xs text-gray-400">{item.date}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-100">
                    {item.category}
                  </span>
                </div>
                <blockquote className="text-gray-600 italic leading-relaxed border-l-4 border-amber-400 pl-4 mb-4">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <button className="flex items-center gap-1.5 text-sm text-amber-600 font-semibold hover:text-amber-700 transition-colors group-hover:gap-2">
                  Read full article <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Assets ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Brand Assets</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Please use our official brand assets and follow these guidelines when referencing TechProwexa.
            </p>
          </div>
          <div className="mb-10 grid gap-6 overflow-hidden rounded-2xl border border-amber-100 bg-gradient-to-br from-slate-950 via-stone-950 to-amber-950 p-6 sm:grid-cols-[220px_1fr] sm:items-center sm:p-8">
            <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/20">
              <TPLogo size={144} />
            </div>
            <div className="text-center sm:text-left">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Official Mark</p>
              <h3 className="mb-3 text-2xl font-bold text-white">TechProwexa TP monogram</h3>
              <p className="text-sm leading-relaxed text-amber-100/75">
                Use this square mark for app icons, social avatars, press mentions, and compact brand placements where the full wordmark is too wide.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {BRAND_ASSETS.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-7 border border-amber-100">
                <div className="w-12 h-12 rounded-xl bg-amber-600 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-amber-800 leading-relaxed">
            <strong>Usage Guidelines:</strong> Do not modify the logo, change its colours, or place it on backgrounds that reduce visibility. Always maintain the specified clear space. The &ldquo;TechProwexa&rdquo; name should always appear as one word with capital T and P. When in doubt, contact our press team before publishing.
          </div>
        </div>
      </section>

      {/* ── Press Contact ────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-yellow-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Mail className="w-10 h-10 text-amber-200 mx-auto mb-5" />
          <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-amber-200 text-lg mb-6">
            For press inquiries, interview requests, or fact-checking, reach our communications team directly.
          </p>
          <a
            href="mailto:press@techprowexa.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-xl text-lg"
          >
            press@techprowexa.com
          </a>
          <p className="text-amber-300 text-sm mt-5">We aim to respond within 24 hours on business days.</p>
        </div>
      </section>
    </main>
  );
}
