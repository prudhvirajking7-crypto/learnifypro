"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PlusCircle, X } from "lucide-react";

const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "ALL_LEVELS"];
const STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"];

interface CourseFormProps {
  categories: { id: string; name: string }[];
  instructors: { id: string; name: string; email: string }[];
  initialData?: any;
}

export default function CourseForm({ categories, instructors, initialData }: CourseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    shortDescription: initialData?.shortDescription || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    discountPrice: initialData?.discountPrice || "",
    level: initialData?.level || "BEGINNER",
    language: initialData?.language || "English",
    status: initialData?.status || "DRAFT",
    featured: initialData?.featured || false,
    categoryId: initialData?.categoryId || "",
    instructorId: initialData?.instructorId || instructors[0]?.id || "",
    thumbnail: initialData?.thumbnail || "",
    previewVideo: initialData?.previewVideo || "",
    requirements: initialData?.requirements || [""],
    objectives: initialData?.objectives || [""],
    tags: initialData?.tags?.join(", ") || "",
  });

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const updateList = (key: "requirements" | "objectives", idx: number, val: string) => {
    const arr = [...form[key]];
    arr[idx] = val;
    set(key, arr);
  };

  const addItem = (key: "requirements" | "objectives") => set(key, [...form[key], ""]);
  const removeItem = (key: "requirements" | "objectives", idx: number) => set(key, form[key].filter((_: any, i: number) => i !== idx));

  const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
        requirements: form.requirements.filter(Boolean),
        objectives: form.objectives.filter(Boolean),
      };

      const url = initialData ? `/api/admin/courses/${initialData.id}` : "/api/admin/courses";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed");
      }

      const course = await res.json();
      toast.success(initialData ? "Course updated!" : "Course created!");
      router.push(`/admin/courses/${course.id}`);
      router.refresh();
    } catch (e: any) {
      toast.error(e.message || "Error saving course");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors";
  const labelCls = "block text-xs font-semibold text-gray-400 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="rounded-2xl border border-white/8 p-5 space-y-4" style={{ background: "rgba(255,255,255,0.03)" }}>
        <h2 className="text-white font-semibold text-sm">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Course Title *</label>
            <input className={inputCls} value={form.title} required onChange={(e) => { set("title", e.target.value); if (!initialData) set("slug", autoSlug(e.target.value)); }} placeholder="e.g. Complete React Bootcamp 2024" />
          </div>
          <div>
            <label className={labelCls}>Slug *</label>
            <input className={inputCls} value={form.slug} required onChange={(e) => set("slug", e.target.value)} placeholder="e.g. complete-react-bootcamp-2024" />
          </div>
        </div>
        <div>
          <label className={labelCls}>Short Description</label>
          <input className={inputCls} value={form.shortDescription} onChange={(e) => set("shortDescription", e.target.value)} placeholder="One-line description shown on course cards" />
        </div>
        <div>
          <label className={labelCls}>Full Description (HTML supported)</label>
          <textarea className={`${inputCls} min-h-[120px] resize-y`} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="<p>Detailed course description...</p>" />
        </div>
      </div>

      {/* Pricing & Settings */}
      <div className="rounded-2xl border border-white/8 p-5 space-y-4" style={{ background: "rgba(255,255,255,0.03)" }}>
        <h2 className="text-white font-semibold text-sm">Pricing & Settings</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className={labelCls}>Price (₹)</label>
            <input className={inputCls} type="number" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="0" />
          </div>
          <div>
            <label className={labelCls}>Discount Price (₹)</label>
            <input className={inputCls} type="number" value={form.discountPrice} onChange={(e) => set("discountPrice", e.target.value)} placeholder="optional" />
          </div>
          <div>
            <label className={labelCls}>Level</label>
            <select className={inputCls} value={form.level} onChange={(e) => set("level", e.target.value)}>
              {LEVELS.map((l) => <option key={l} value={l} className="bg-gray-900">{l.replace("_", " ")}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select className={inputCls} value={form.status} onChange={(e) => set("status", e.target.value)}>
              {STATUSES.map((s) => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Category</label>
            <select className={inputCls} value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)}>
              <option value="" className="bg-gray-900">No Category</option>
              {categories.map((c) => <option key={c.id} value={c.id} className="bg-gray-900">{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Instructor</label>
            <select className={inputCls} value={form.instructorId} onChange={(e) => set("instructorId", e.target.value)}>
              {instructors.map((i) => <option key={i.id} value={i.id} className="bg-gray-900">{i.name} ({i.email})</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Language</label>
            <input className={inputCls} value={form.language} onChange={(e) => set("language", e.target.value)} placeholder="English" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Thumbnail URL</label>
            <input className={inputCls} value={form.thumbnail} onChange={(e) => set("thumbnail", e.target.value)} placeholder="https://..." />
          </div>
          <div>
            <label className={labelCls}>Preview Video URL</label>
            <input className={inputCls} value={form.previewVideo} onChange={(e) => set("previewVideo", e.target.value)} placeholder="https://youtube.com/watch?v=..." />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 accent-amber-500" />
          <label htmlFor="featured" className="text-sm text-gray-300">Featured on homepage</label>
        </div>
      </div>

      {/* Requirements & Objectives */}
      {(["requirements", "objectives"] as const).map((key) => (
        <div key={key} className="rounded-2xl border border-white/8 p-5 space-y-3" style={{ background: "rgba(255,255,255,0.03)" }}>
          <h2 className="text-white font-semibold text-sm capitalize">{key}</h2>
          {form[key].map((item: string, idx: number) => (
            <div key={idx} className="flex gap-2">
              <input className={`${inputCls} flex-1`} value={item} onChange={(e) => updateList(key, idx, e.target.value)} placeholder={key === "requirements" ? "e.g. Basic JavaScript knowledge" : "e.g. Build real-world projects"} />
              <button type="button" onClick={() => removeItem(key, idx)} className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"><X className="w-4 h-4" /></button>
            </div>
          ))}
          <button type="button" onClick={() => addItem(key)} className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors">
            <PlusCircle className="w-4 h-4" /> Add {key === "requirements" ? "Requirement" : "Objective"}
          </button>
        </div>
      ))}

      {/* Tags */}
      <div className="rounded-2xl border border-white/8 p-5" style={{ background: "rgba(255,255,255,0.03)" }}>
        <h2 className="text-white font-semibold text-sm mb-3">Tags</h2>
        <input className={inputCls} value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="react, javascript, nodejs (comma-separated)" />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading}
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-black disabled:opacity-60 transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}
        >
          {loading ? "Saving..." : initialData ? "Update Course" : "Create Course"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-400 bg-white/5 hover:bg-white/10 transition-all">
          Cancel
        </button>
      </div>
    </form>
  );
}
