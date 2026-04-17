import Link from "next/link";
import {
  Accessibility,
  Keyboard,
  Volume2,
  Captions,
  Sun,
  Type,
  AlertTriangle,
  MessageSquare,
  CheckCircle,
  ClipboardList,
} from "lucide-react";

const FEATURES = [
  {
    icon: Keyboard,
    title: "Keyboard Navigation",
    desc: "All interactive elements are reachable and operable via keyboard alone. We follow logical tab order and ensure visible focus indicators on all focusable elements.",
  },
  {
    icon: Volume2,
    title: "Screen Reader Support",
    desc: "Pages use semantic HTML5 elements, ARIA landmarks, and descriptive labels so screen readers such as NVDA, JAWS, and VoiceOver can accurately convey content and controls.",
  },
  {
    icon: Captions,
    title: "Closed Captions",
    desc: "All course video lectures include accurate closed captions. Transcripts are available for download on every video lesson page.",
  },
  {
    icon: Sun,
    title: "High Contrast Mode",
    desc: "Our platform respects the prefers-contrast and prefers-color-scheme media queries. A high-contrast variant is available to improve readability for users with low vision.",
  },
  {
    icon: Type,
    title: "Text Resize",
    desc: "Text can be scaled up to 200% using browser zoom without loss of content or functionality. We avoid fixed pixel font sizes throughout the interface.",
  },
  {
    icon: CheckCircle,
    title: "Descriptive Alt Text",
    desc: "All informative images include descriptive alternative text. Decorative images are marked with empty alt attributes so they are ignored by assistive technologies.",
  },
];

const LIMITATIONS = [
  {
    area: "Legacy Course Videos",
    detail: "Some older course videos uploaded before Q3 2024 may have auto-generated captions that contain errors. We are working with instructors to replace these with human-verified captions.",
  },
  {
    area: "Third-Party Embeds",
    detail: "Certain embedded tools (e.g., interactive coding sandboxes from third-party providers) may not fully conform to WCAG 2.1 AA. We are evaluating alternatives.",
  },
  {
    area: "PDF Downloads",
    detail: "Some course resource PDFs may not be fully tagged for screen-reader navigation. Tagged versions will be made available upon request.",
  },
];

export default function AccessibilityPage() {
  return (
    <main className="pt-20">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-amber-950 to-stone-900 py-24 overflow-hidden">
        <div className="absolute top-10 right-10 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-200 text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Accessibility className="w-4 h-4 text-yellow-400" />
            Accessibility
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Accessibility{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Statement
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            TechProwexa is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone.
          </p>
        </div>
      </section>

      {/* ── Commitment ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Our Commitment</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-5">
                Education that works for everyone
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We believe that accessible education is not an optional feature — it is a fundamental right. Our team works to ensure that learners of all abilities can access, navigate, and benefit from TechProwexa.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We measure our accessibility work against the Web Content Accessibility Guidelines (WCAG) and actively review feedback from users with disabilities to guide improvements.
              </p>
            </div>
            <div className="bg-amber-50 rounded-3xl border border-amber-100 p-8">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-600 flex items-center justify-center shrink-0">
                  <ClipboardList className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest">Conformance Status</p>
                  <p className="text-xl font-extrabold text-gray-900 mt-0.5">WCAG 2.1 Level AA</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                TechProwexa aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. These guidelines explain how to make web content more accessible to people with disabilities.
              </p>
              <a
                href="https://www.w3.org/WAI/WCAG21/quickref/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-600 font-semibold text-sm mt-4 hover:text-amber-700 transition-colors underline underline-offset-2"
              >
                Learn about WCAG 2.1
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Accessibility Features ───────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">What We Provide</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-3">Accessibility Features</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              We have implemented a range of features to help all users access our content.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7 border border-amber-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center mb-5 group-hover:from-amber-200 group-hover:to-yellow-200 transition-colors">
                  <Icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Known Limitations ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Known Limitations</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            While we strive for full WCAG 2.1 AA conformance, we are aware of the following limitations that we are actively working to address:
          </p>
          <div className="space-y-4">
            {LIMITATIONS.map(({ area, detail }) => (
              <div
                key={area}
                className="bg-white rounded-2xl border border-amber-100 shadow-lg p-6 flex gap-4 items-start"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1.5">{area}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formal Approach ──────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Our Formal Approach</h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                <strong className="text-gray-800">Assessment:</strong> TechProwexa assesses the accessibility of its platform through self-evaluation and periodic third-party audits. We use automated testing tools (Axe, Lighthouse) as part of our continuous integration pipeline, supplemented by manual testing with assistive technologies.
              </p>
              <p>
                <strong className="text-gray-800">Remediation:</strong> Accessibility issues reported by users or identified through audits are logged in our issue tracker and prioritised. Critical accessibility barriers are treated as high-priority bugs and addressed in the next release cycle.
              </p>
              <p>
                <strong className="text-gray-800">Training:</strong> Our engineering and design teams receive accessibility training annually, and accessibility requirements are included in the definition of done for all new features.
              </p>
              <p>
                <strong className="text-gray-800">Standards:</strong> This statement was prepared in accordance with the Web Accessibility Initiative (WAI) guidance on writing accessibility statements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feedback & Contact ───────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-yellow-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <MessageSquare className="w-12 h-12 text-amber-200 mx-auto mb-5" />
          <h2 className="text-3xl font-bold text-white mb-4">Accessibility Feedback</h2>
          <p className="text-amber-200 text-lg mb-10 max-w-2xl mx-auto">
            We welcome your feedback on the accessibility of TechProwexa. If you experience any barriers or would like to request an accessible format of any content, please let us know.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-5 text-left">
              <p className="text-amber-200 text-xs font-semibold uppercase tracking-widest mb-1">Email</p>
              <a
                href="mailto:accessibility@learnifypro.com"
                className="text-white font-semibold text-sm hover:text-amber-200 transition-colors"
              >
                accessibility@learnifypro.com
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-5 text-left">
              <p className="text-amber-200 text-xs font-semibold uppercase tracking-widest mb-1">Response Time</p>
              <p className="text-white font-semibold text-sm">Within 2 business days</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white text-amber-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-xl inline-block"
          >
            Use Our Contact Form
          </Link>
        </div>
      </section>
    </main>
  );
}
