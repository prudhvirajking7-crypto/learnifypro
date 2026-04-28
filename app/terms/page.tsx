import Link from "next/link";
import { FileText, Scale } from "lucide-react";

const TOC = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "use-of-service", label: "2. Use of Service" },
  { id: "user-accounts", label: "3. User Accounts" },
  { id: "course-enrollment", label: "4. Course Enrollment" },
  { id: "intellectual-property", label: "5. Intellectual Property" },
  { id: "payment-refunds", label: "6. Payment & Refunds" },
  { id: "prohibited-conduct", label: "7. Prohibited Conduct" },
  { id: "disclaimer", label: "8. Disclaimer of Warranties" },
  { id: "liability", label: "9. Limitation of Liability" },
  { id: "governing-law", label: "10. Governing Law" },
  { id: "contact", label: "11. Contact" },
];

export default function TermsPage() {
  return (
    <main className="pt-20">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-amber-950 to-stone-900 py-24 overflow-hidden">
        <div className="absolute top-10 right-10 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-200 text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Scale className="w-4 h-4 text-yellow-400" />
            Legal
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Terms of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Service
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            Last updated:{" "}
            <span className="text-amber-300 font-semibold">January 1, 2025</span>
          </p>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-4 gap-12 items-start">
            {/* Table of Contents */}
            <aside className="lg:col-span-1 lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                    Contents
                  </h2>
                </div>
                <ul className="space-y-2">
                  {TOC.map(({ id, label }) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="text-sm text-gray-600 hover:text-amber-700 transition-colors block py-0.5 leading-snug"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Sections */}
            <div className="lg:col-span-3 space-y-8">
              {/* Intro */}
              <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8">
                <p className="text-gray-600 leading-relaxed text-sm">
                  These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the TechProwexa website and services (&ldquo;Service&rdquo;) operated by TechProwexa (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, you may not use the Service.
                </p>
              </div>

              {/* 1 */}
              <div id="acceptance" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">1</span>
                  Acceptance of Terms
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  By creating an account, purchasing a course, or otherwise accessing the Service, you confirm that you are at least 13 years of age, have the legal capacity to enter into a binding agreement, and accept these Terms in full. If you are accessing the Service on behalf of an organisation, you represent that you have authority to bind that organisation to these Terms.
                </p>
              </div>

              {/* 2 */}
              <div id="use-of-service" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">2</span>
                  Use of Service
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                  <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You are responsible for all activity that occurs under your account. TechProwexa grants you a limited, non-exclusive, non-transferable, revocable licence to access and use the Service for personal, non-commercial learning purposes.</p>
                  <p>We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time with reasonable notice where practicable.</p>
                </div>
              </div>

              {/* 3 */}
              <div id="user-accounts" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">3</span>
                  User Accounts
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                  <p>You must provide accurate, current, and complete information when registering. You are responsible for maintaining the confidentiality of your credentials and for all activity that occurs under your account.</p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2">
                    <li>You must notify us immediately of any unauthorised use of your account.</li>
                    <li>You may not share your account credentials or allow others to access your account.</li>
                    <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
                  </ul>
                </div>
              </div>

              {/* 4 */}
              <div id="course-enrollment" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">4</span>
                  Course Enrollment
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                  <p>Upon successful payment (or free enrolment where applicable), you are granted a personal, non-transferable licence to access the course content for educational purposes only.</p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2">
                    <li>Course access is provided to you individually and may not be shared.</li>
                    <li>You may not record, reproduce, redistribute, or resell any course content.</li>
                    <li>Course content may be updated, revised, or retired by the instructor or TechProwexa at any time.</li>
                    <li>Completion certificates are issued only when all required activities are finished.</li>
                  </ul>
                </div>
              </div>

              {/* 5 */}
              <div id="intellectual-property" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">5</span>
                  Intellectual Property
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                  <p>All content on the TechProwexa platform — including course videos, materials, logos, branding, and software — is the intellectual property of TechProwexa or its instructors and is protected by applicable copyright, trademark, and other intellectual property laws.</p>
                  <p>You retain ownership of any content you submit (such as reviews or forum posts) but grant TechProwexa a worldwide, royalty-free licence to use, display, and distribute that content in connection with the Service.</p>
                </div>
              </div>

              {/* 6 */}
              <div id="payment-refunds" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">6</span>
                  Payment &amp; Refunds
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                  <p>All prices are displayed in the applicable currency at checkout. Payment is due at the time of purchase. We use Stripe and Razorpay to process payments securely.</p>
                  <p><strong>Refund Policy:</strong> You may request a full refund within 30 days of purchase if you are unsatisfied for any reason, provided you have not completed more than 30% of the course content. To request a refund, contact <a href="mailto:support@techprowexa.com" className="text-amber-600 underline underline-offset-2">support@techprowexa.com</a> with your order details. Refunds are processed within 5–7 business days to the original payment method.</p>
                </div>
              </div>

              {/* 7 */}
              <div id="prohibited-conduct" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">7</span>
                  Prohibited Conduct
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                  <p>You agree not to:</p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2">
                    <li>Copy, reproduce, or redistribute course content without authorisation.</li>
                    <li>Use the Service to transmit spam, malware, or any harmful content.</li>
                    <li>Attempt to reverse-engineer, decompile, or disassemble any part of the platform.</li>
                    <li>Harass, threaten, or defame other users or instructors.</li>
                    <li>Create fake reviews or manipulate ratings.</li>
                    <li>Use automated tools (bots, scrapers) to access the Service without express written permission.</li>
                    <li>Circumvent any access controls or security measures.</li>
                  </ul>
                </div>
              </div>

              {/* 8 */}
              <div id="disclaimer" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">8</span>
                  Disclaimer of Warranties
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES. YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK.
                </p>
              </div>

              {/* 9 */}
              <div id="liability" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">9</span>
                  Limitation of Liability
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, LEARNIFYPRO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, NOR FOR ANY LOSS OF PROFITS, DATA, GOODWILL, OR BUSINESS OPPORTUNITY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE. OUR TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID TO LEARNIFYPRO IN THE 12 MONTHS PRECEDING THE CLAIM.
                </p>
              </div>

              {/* 10 */}
              <div id="governing-law" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">10</span>
                  Governing Law
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  These Terms are governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Bengaluru, Karnataka, India. If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.
                </p>
              </div>

              {/* 11 */}
              <div id="contact" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">11</span>
                  Contact
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                  <p>If you have questions about these Terms, please contact us:</p>
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 space-y-1">
                    <p className="font-semibold text-gray-800">TechProwexa — Legal Team</p>
                    <p>
                      Email:{" "}
                      <a href="mailto:legal@techprowexa.com" className="text-amber-600 underline underline-offset-2">
                        legal@techprowexa.com
                      </a>
                    </p>
                    <p>Address: Bengaluru, Karnataka, India</p>
                  </div>
                  <p>
                    Or use our{" "}
                    <Link href="/contact" className="text-amber-600 underline underline-offset-2 hover:text-amber-700">
                      contact form
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
