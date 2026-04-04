"use client";
import { useState } from "react";
import { PlusCircle, Trash2, ChevronDown, ChevronRight, Video, FileText, HelpCircle, GripVertical, Link2 } from "lucide-react";
import toast from "react-hot-toast";

interface Lecture {
  id: string; title: string; description?: string; videoUrl?: string;
  duration: number; isFree: boolean; type: string; videoStatus?: string; videoPlatform?: string;
}
interface Section { id: string; title: string; order: number; lectures: Lecture[]; }

export default function SectionEditor({ courseId, initialSections }: { courseId: string; initialSections: Section[] }) {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(initialSections.map((s) => s.id)));
  const [saving, setSaving] = useState<string | null>(null);

  const toggleExpand = (id: string) => setExpanded((prev) => { const s = new Set(prev); if (s.has(id)) { s.delete(id); } else { s.add(id); } return s; });

  /* SECTION actions */
  const addSection = async () => {
    const title = prompt("Section title:");
    if (!title?.trim()) return;
    try {
      const res = await fetch("/api/admin/sections", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ courseId, title }) });
      const section = await res.json();
      setSections((s) => [...s, { ...section, lectures: [] }]);
      setExpanded((e) => new Set(Array.from(e).concat(section.id)));
      toast.success("Section added");
    } catch { toast.error("Failed"); }
  };

  const deleteSection = async (sectionId: string) => {
    if (!confirm("Delete this section and all its lectures?")) return;
    try {
      await fetch(`/api/admin/sections/${sectionId}`, { method: "DELETE" });
      setSections((s) => s.filter((x) => x.id !== sectionId));
      toast.success("Section deleted");
    } catch { toast.error("Failed"); }
  };

  const renameSection = async (sectionId: string, currentTitle: string) => {
    const title = prompt("New title:", currentTitle);
    if (!title?.trim() || title === currentTitle) return;
    try {
      const res = await fetch(`/api/admin/sections/${sectionId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title }) });
      const updated = await res.json();
      setSections((s) => s.map((x) => x.id === sectionId ? { ...x, title: updated.title } : x));
      toast.success("Renamed");
    } catch { toast.error("Failed"); }
  };

  /* LECTURE actions */
  const addLecture = async (sectionId: string) => {
    const title = prompt("Lecture title:");
    if (!title?.trim()) return;
    try {
      const res = await fetch("/api/admin/lectures", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sectionId, title, type: "VIDEO" }) });
      const lecture = await res.json();
      setSections((s) => s.map((x) => x.id === sectionId ? { ...x, lectures: [...x.lectures, lecture] } : x));
      toast.success("Lecture added");
    } catch { toast.error("Failed"); }
  };

  const deleteLecture = async (sectionId: string, lectureId: string) => {
    if (!confirm("Delete this lecture?")) return;
    try {
      await fetch(`/api/admin/lectures/${lectureId}`, { method: "DELETE" });
      setSections((s) => s.map((x) => x.id === sectionId ? { ...x, lectures: x.lectures.filter((l) => l.id !== lectureId) } : x));
      toast.success("Lecture deleted");
    } catch { toast.error("Failed"); }
  };

  const updateLecture = async (sectionId: string, lecture: Lecture, patch: Partial<Lecture>) => {
    const updated = { ...lecture, ...patch };
    setSections((s) => s.map((x) => x.id === sectionId ? { ...x, lectures: x.lectures.map((l) => l.id === lecture.id ? updated : l) } : x));
    setSaving(lecture.id);
    try {
      await fetch(`/api/admin/lectures/${lecture.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch { toast.error("Failed to save"); }
    finally { setSaving(null); }
  };

const typeIcon = (type: string) => type === "VIDEO" ? <Video className="w-3.5 h-3.5" /> : type === "ARTICLE" ? <FileText className="w-3.5 h-3.5" /> : <HelpCircle className="w-3.5 h-3.5" />;

  const inputCls = "flex-1 min-w-0 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50";

  return (
    <div className="space-y-3">
      {sections.map((section, si) => (
        <div key={section.id} className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
          {/* Section header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-white/2">
            <button onClick={() => toggleExpand(section.id)} className="text-gray-400 hover:text-white transition-colors">
              {expanded.has(section.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            <span className="text-xs font-semibold text-gray-500 shrink-0">Section {si + 1}</span>
            <button onClick={() => renameSection(section.id, section.title)} className="font-semibold text-white text-sm hover:text-amber-400 transition-colors text-left flex-1 truncate">
              {section.title}
            </button>
            <span className="text-[10px] text-gray-500 shrink-0">{section.lectures.length} lectures</span>
            <button onClick={() => deleteSection(section.id)} className="p-1 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Lectures */}
          {expanded.has(section.id) && (
            <div className="divide-y divide-white/5">
              {section.lectures.map((lecture) => (
                <div key={lecture.id} className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600"><GripVertical className="w-4 h-4" /></span>
                    <span className={`p-1 rounded ${lecture.type === "VIDEO" ? "text-amber-400" : lecture.type === "ARTICLE" ? "text-orange-400" : "text-yellow-500"}`}>
                      {typeIcon(lecture.type)}
                    </span>
                    <input className={inputCls} defaultValue={lecture.title}
                      onBlur={(e) => { if (e.target.value !== lecture.title) updateLecture(section.id, lecture, { title: e.target.value }); }}
                    />
                    <select value={lecture.type} onChange={(e) => updateLecture(section.id, lecture, { type: e.target.value })}
                      className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-xs focus:outline-none focus:border-amber-500/50">
                      {["VIDEO", "ARTICLE", "QUIZ", "ASSIGNMENT"].map((t) => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
                    </select>
                    <label className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer whitespace-nowrap">
                      <input type="checkbox" className="accent-amber-500" checked={lecture.isFree} onChange={(e) => updateLecture(section.id, lecture, { isFree: e.target.checked })} />
                      Free
                    </label>
                    {saving === lecture.id && <span className="text-[10px] text-amber-400">Saving...</span>}
                    <button onClick={() => deleteLecture(section.id, lecture.id)} className="p-1 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Video URL + Duration */}
                  {lecture.type === "VIDEO" && (
                    <div className="flex gap-3 pl-10">
                      <div className="flex-1 relative">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                        <input className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50"
                          placeholder="Video URL (YouTube, Vimeo, HLS .m3u8, MP4...)"
                          defaultValue={lecture.videoUrl || ""}
                          onBlur={(e) => { if (e.target.value !== lecture.videoUrl) updateLecture(section.id, lecture, { videoUrl: e.target.value }); }}
                        />
                      </div>
                      <input type="number" placeholder="Duration (sec)" defaultValue={lecture.duration || ""}
                        className="w-32 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50"
                        onBlur={(e) => { if (Number(e.target.value) !== lecture.duration) updateLecture(section.id, lecture, { duration: Number(e.target.value) }); }}
                      />
                      {lecture.videoUrl && (
                        <span className="text-[10px] px-2 py-1 rounded-lg bg-green-500/10 text-green-400 flex items-center gap-1 whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> {lecture.videoPlatform || "ready"}
                        </span>
                      )}
                    </div>
                  )}
                  {/* Description */}
                  <div className="pl-10">
                    <input className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-xs placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50"
                      placeholder="Optional description..." defaultValue={lecture.description || ""}
                      onBlur={(e) => { if (e.target.value !== lecture.description) updateLecture(section.id, lecture, { description: e.target.value }); }}
                    />
                  </div>
                </div>
              ))}
              <div className="px-4 py-3">
                <button onClick={() => addLecture(section.id)} className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors">
                  <PlusCircle className="w-4 h-4" /> Add Lecture
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      <button onClick={addSection} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:-translate-y-0.5"
        style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
        <PlusCircle className="w-4 h-4" /> Add Section
      </button>
    </div>
  );
}
