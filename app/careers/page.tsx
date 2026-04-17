import { MapPin, Clock, DollarSign, Laptop, BookOpen, Coffee, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";
import CareersClient from "@/components/careers/careers-client";

const PERKS = [
  { icon: Laptop, title: "Remote First", desc: "Work from anywhere in the world. We're fully distributed and async-friendly." },
  { icon: BookOpen, title: "Learning Budget", desc: "$1,000 / year for courses, books, conferences — invest in yourself on us." },
  { icon: Coffee, title: "Flexible Hours", desc: "No rigid 9-to-5. Own your schedule and deliver great work on your terms." },
  { icon: TrendingUp, title: "Equity", desc: "Every team member gets meaningful equity. When we grow, you grow with us." },
];

export default async function CareersPage() {
  const jobs = await prisma.jobPost.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="pt-20">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-amber-950 to-stone-900 py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-amber-500/20 text-amber-300 text-sm font-semibold px-4 py-1.5 rounded-full border border-amber-500/30 mb-6">
            We&apos;re Hiring
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Build the future of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              learning
            </span>{" "}
            with us
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            We&apos;re a small, passionate team on a mission to make world-class education accessible to everyone. Join us and work on something that matters.
          </p>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Why TechProwexa?</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            We&apos;re a small, passionate team building education infrastructure that reaches learners across four countries. You won&apos;t be a cog in a machine here — every person has real ownership, direct impact, and the trust to do their best work.
          </p>
        </div>
      </section>

      {/* ── Open Roles (dynamic) ─────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Open Roles</h2>
            <p className="text-gray-500">All positions are fully remote and open worldwide.</p>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-400 text-lg">No open positions at the moment.</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon or send us a general application below.</p>
            </div>
          ) : (
            <CareersClient jobs={jobs} />
          )}
        </div>
      </section>

      {/* ── Life at TechProwexa ───────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Life at TechProwexa</h2>
            <p className="text-gray-500 max-w-lg mx-auto">We take care of our team so our team can focus on taking care of learners.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-7 border border-amber-100 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-amber-600 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Our Hiring Process</h2>
          <div className="grid sm:grid-cols-4 gap-4">
            {["Application Review", "Intro Call (30 min)", "Skills Assessment", "Offer"].map((step, i) => (
              <div key={step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
                  {i + 1}
                </div>
                <p className="text-sm font-semibold text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-yellow-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <DollarSign className="w-10 h-10 text-amber-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Don&apos;t see your role?</h2>
          <p className="text-amber-200 text-lg mb-6">
            We&apos;re always on the lookout for exceptional people. Send us your resume and tell us how you&apos;d contribute.
          </p>
          <a
            href="mailto:careers@learnifypro.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-xl"
          >
            careers@learnifypro.com
          </a>
        </div>
      </section>
    </main>
  );
}
