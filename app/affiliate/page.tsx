import Link from "next/link";
import { DollarSign, Link2, Users, CalendarCheck, ChevronRight, HelpCircle, Percent } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Users,
    title: "Sign Up Free",
    desc: "Create your affiliate account in under 2 minutes. No credit card, no approval wait — just a simple form and you're in.",
  },
  {
    step: "02",
    icon: Link2,
    title: "Share Your Link",
    desc: "Get your unique referral link and share it on your blog, YouTube channel, social media, or anywhere your audience hangs out.",
  },
  {
    step: "03",
    icon: DollarSign,
    title: "Earn Commission",
    desc: "Every time someone purchases a course through your link, you earn 30% of the sale — automatically tracked and paid monthly.",
  },
];

const FAQS = [
  {
    q: "How do I track my referrals?",
    a: "Your affiliate dashboard shows real-time clicks, conversions, and earnings. You'll also get a monthly email summary with a full breakdown.",
  },
  {
    q: "When and how do I get paid?",
    a: "Payouts are processed on the 1st of each month via bank transfer or PayPal for all earnings from the previous month. Minimum payout is ₹500 / $10.",
  },
  {
    q: "What does the 90-day cookie mean?",
    a: "If someone clicks your link, we track them for 90 days. If they purchase any time within that window, you earn the commission — even if they come back later.",
  },
  {
    q: "Are there restrictions on promotion?",
    a: "You can't use paid search ads that bid on 'LearnifyPro' branded terms, and coupon sites require prior approval. Everything else is fair game.",
  },
];

export default function AffiliatePage() {
  return (
    <main className="pt-20">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-amber-950 to-stone-900 py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-sm font-semibold px-4 py-1.5 rounded-full border border-amber-500/30 mb-6">
            <Percent className="w-4 h-4" />
            Affiliate Program
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Earn with Every{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Referral
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Partner with LearnifyPro and earn a generous 30% commission on every course sale you refer. No cap, no expiry — just passive income from sharing what you love.
          </p>
          <Link href="/register" className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-2xl shadow-amber-900/40 text-lg">
            Join the Program Free <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── Commission Details ────────────────────────────────────── */}
      <section className="py-14 bg-amber-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 divide-x divide-amber-500 text-center">
            {[
              { value: "30%", label: "Commission Rate", sub: "Per sale" },
              { value: "90 Days", label: "Cookie Window", sub: "Per click" },
              { value: "Monthly", label: "Payouts", sub: "1st of the month" },
            ].map((item) => (
              <div key={item.label} className="px-6 py-4">
                <p className="text-4xl font-extrabold text-white">{item.value}</p>
                <p className="text-amber-200 font-semibold mt-1">{item.label}</p>
                <p className="text-amber-300 text-sm">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Three simple steps stand between you and a steady stream of affiliate income.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden sm:block absolute top-14 left-1/6 right-1/6 h-0.5 bg-amber-200" style={{ left: "calc(100%/6)", right: "calc(100%/6)" }} />

            {STEPS.map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl p-8 border border-amber-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center relative group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-amber-200 group-hover:shadow-amber-300 transition-shadow">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Step {step}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It's For ─────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-5">Built for creators &amp; educators</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Whether you run a tech blog, a YouTube channel, a developer newsletter, or a bootcamp — the LearnifyPro affiliate program is designed to reward you fairly for every learner you send our way.
              </p>
              <ul className="space-y-3">
                {["Content creators & bloggers", "YouTubers & podcasters", "Coding bootcamps & educators", "Developer community managers"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                      <ChevronRight className="w-3.5 h-3.5 text-amber-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border border-amber-100">
              <h3 className="font-bold text-gray-900 text-lg mb-5">Example Earnings</h3>
              <div className="space-y-4">
                {[
                  { refs: "5 referrals / month", avg: "₹4,999 avg order", earn: "₹7,498 / mo" },
                  { refs: "20 referrals / month", avg: "₹4,999 avg order", earn: "₹29,994 / mo" },
                  { refs: "50 referrals / month", avg: "₹4,999 avg order", earn: "₹74,985 / mo" },
                ].map((row) => (
                  <div key={row.refs} className="flex items-center justify-between py-3 border-b border-amber-100 last:border-0">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{row.refs}</p>
                      <p className="text-xs text-gray-400">{row.avg}</p>
                    </div>
                    <span className="font-extrabold text-amber-600 text-lg">{row.earn}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">* Illustrative only. Actual earnings depend on conversion rates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <HelpCircle className="w-10 h-10 text-amber-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-amber-200 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-yellow-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <CalendarCheck className="w-10 h-10 text-amber-200 mx-auto mb-5" />
          <h2 className="text-3xl font-bold text-white mb-4">Start earning today</h2>
          <p className="text-amber-200 text-lg mb-10">
            Sign up is completely free. Your affiliate dashboard is ready the moment you register.
          </p>
          <Link href="/register" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-amber-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-2xl text-lg">
            Create Affiliate Account <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
