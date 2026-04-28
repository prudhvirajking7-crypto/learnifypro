"use client";

import { useState } from "react";
import { Mail, Clock, MessageSquare, ChevronDown, CheckCircle } from "lucide-react";

const SUBJECTS = [
  "General Inquiry",
  "Technical Support",
  "Billing",
  "Partnership",
  "Press",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="pt-20">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-amber-950 to-stone-900 py-24 overflow-hidden">
        <div className="absolute top-10 right-10 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-200 text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <MessageSquare className="w-4 h-4 text-yellow-400" />
            Support
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-xl mx-auto">
            Have a question, a problem, or just want to say hello? We&apos;d love to hear from you.
            Fill out the form and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* ── Two-Column Content ───────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left — Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
                <p className="text-gray-500 text-sm mb-8">
                  All fields marked with <span className="text-red-500">*</span> are required.
                </p>

                {submitted ? (
                  <div className="flex flex-col items-center text-center py-12 gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Message sent!</h3>
                    <p className="text-gray-500 max-w-sm">
                      Thanks for reaching out. We&apos;ll review your message and reply to{" "}
                      <span className="font-semibold text-gray-700">{form.email}</span> within
                      24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="mt-2 text-amber-600 font-semibold hover:text-amber-700 text-sm underline underline-offset-2"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-gray-800 placeholder-gray-400 transition"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-gray-800 placeholder-gray-400 transition"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-gray-800 bg-white transition"
                        >
                          <option value="" disabled>
                            Select a subject…
                          </option>
                          {SUBJECTS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help…"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-gray-800 placeholder-gray-400 resize-none transition"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right — Contact Info */}
            <div className="lg:col-span-2 space-y-5">
              {/* Email card */}
              <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-500 text-sm mb-2">Drop us a line any time.</p>
                    <a
                      href="mailto:support@techprowexa.com"
                      className="text-amber-600 font-semibold text-sm hover:text-amber-700 transition-colors"
                    >
                      support@techprowexa.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Response time card */}
              <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Response Time</h3>
                    <p className="text-gray-500 text-sm mb-1">We aim to reply within:</p>
                    <p className="text-amber-700 font-bold text-lg">Within 24 hours</p>
                    <p className="text-gray-400 text-xs mt-1">
                      During weekdays. Slightly longer on weekends.
                    </p>
                  </div>
                </div>
              </div>

              {/* Office hours card */}
              <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Office Hours</h3>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">Monday – Friday</span>
                        <span className="font-semibold text-gray-800">9 AM – 6 PM IST</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">Saturday</span>
                        <span className="font-semibold text-gray-800">10 AM – 2 PM IST</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">Sunday</span>
                        <span className="font-semibold text-gray-800">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-amber-50 rounded-2xl border border-amber-100 p-6">
                <h3 className="font-bold text-gray-900 mb-3">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    { label: "Help Center", href: "/help" },
                    { label: "Refund Policy", href: "/terms#refunds" },
                    { label: "Privacy Policy", href: "/privacy" },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-amber-700 font-medium hover:text-amber-900 transition-colors"
                      >
                        → {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
