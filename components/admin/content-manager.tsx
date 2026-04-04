"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface ContentItem {
  id: string; key: string; value: string; label: string; type: string;
}

const emptyForm = { key: "", value: "", label: "", type: "text" };

export default function ContentManager({ initialItems }: { initialItems: ContentItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ContentItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [inlineEdits, setInlineEdits] = useState<Record<string, string>>({});
  const [inlineSaving, setInlineSaving] = useState<string | null>(null);
  const router = useRouter();

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (item: ContentItem) => { setEditing(item); setForm({ key: item.key, value: item.value, label: item.label, type: item.type }); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditing(null); };

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.key.trim() || !form.label.trim()) { toast.error("Key and label are required"); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/content/${editing.id}` : "/api/admin/content";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      if (editing) {
        setItems((p) => p.map((x) => x.id === editing.id ? data : x));
        toast.success("Content updated");
      } else {
        setItems((p) => [...p, data]);
        toast.success("Content created");
      }
      closeModal();
      router.refresh();
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const saveInline = async (item: ContentItem) => {
    const val = inlineEdits[item.id];
    if (val === undefined || val === item.value) return;
    setInlineSaving(item.id);
    try {
      const res = await fetch(`/api/admin/content/${item.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: val, label: item.label, type: item.type }),
      });
      if (!res.ok) throw new Error("Failed");
      setItems((p) => p.map((x) => x.id === item.id ? { ...x, value: val } : x));
      setInlineEdits((e) => { const n = { ...e }; delete n[item.id]; return n; });
      toast.success("Saved");
    } catch {
      toast.error("Failed");
    } finally {
      setInlineSaving(null);
    }
  };

  const remove = async (id: string) => {
    if (deleteId !== id) { setDeleteId(id); return; }
    try {
      await fetch(`/api/admin/content/${id}`, { method: "DELETE" });
      setItems((p) => p.filter((x) => x.id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleteId(null);
    }
  };

  const inputCls = "w-full px-3 py-2 rounded-xl text-sm text-amber-100 placeholder:text-amber-700/40 focus:outline-none focus:border-amber-500/60 transition-colors border border-amber-800/30 bg-amber-900/10";
  const labelCls = "block text-xs font-semibold text-amber-500/70 mb-1";

  const typeGroups = Array.from(new Set(items.map((i) => i.type)));

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-amber-100">Page Content</h1>
          <p className="text-amber-200/50 text-sm mt-1">Manage homepage text, stats, and other site-wide content</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-black transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
          <Plus className="w-4 h-4" /> Add Content
        </button>
      </div>

      {items.length === 0 && (
        <div className="text-center py-16 rounded-2xl border border-amber-800/20" style={{ background: "rgba(245,158,11,0.04)" }}>
          <p className="text-amber-600/50 text-sm">No content entries yet.</p>
          <button onClick={openCreate} className="mt-3 text-xs text-amber-400 hover:text-amber-300 underline">Add your first entry</button>
        </div>
      )}

      {typeGroups.map((type) => (
        <div key={type} className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-amber-600/60 px-1">{type}</h2>
          <div className="rounded-2xl border border-amber-800/20 overflow-hidden" style={{ background: "rgba(245,158,11,0.04)" }}>
            {items.filter((i) => i.type === type).map((item, idx, arr) => (
              <div key={item.id} className={`flex items-start gap-4 p-4 ${idx < arr.length - 1 ? "border-b border-amber-800/10" : ""}`}>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-amber-400">{item.label}</span>
                    <span className="text-[10px] text-amber-700/50 font-mono">{item.key}</span>
                  </div>
                  {item.type === "textarea" ? (
                    <textarea
                      className="w-full px-3 py-2 rounded-xl text-xs text-amber-200/80 placeholder:text-amber-700/40 focus:outline-none focus:border-amber-500/60 border border-amber-800/30 bg-amber-900/10 resize-y min-h-[80px]"
                      value={inlineEdits[item.id] ?? item.value}
                      onChange={(e) => setInlineEdits((p) => ({ ...p, [item.id]: e.target.value }))}
                      onBlur={() => saveInline(item)}
                    />
                  ) : (
                    <input
                      className="w-full px-3 py-2 rounded-xl text-xs text-amber-200/80 placeholder:text-amber-700/40 focus:outline-none focus:border-amber-500/60 border border-amber-800/30 bg-amber-900/10"
                      value={inlineEdits[item.id] ?? item.value}
                      onChange={(e) => setInlineEdits((p) => ({ ...p, [item.id]: e.target.value }))}
                      onBlur={() => saveInline(item)}
                    />
                  )}
                  {inlineSaving === item.id && <span className="text-[10px] text-amber-400">Saving...</span>}
                  {inlineEdits[item.id] !== undefined && inlineEdits[item.id] !== item.value && inlineSaving !== item.id && (
                    <button onClick={() => saveInline(item)}
                      className="flex items-center gap-1 text-[10px] text-amber-400 hover:text-amber-300 transition-colors">
                      <Save className="w-3 h-3" /> Save
                    </button>
                  )}
                </div>
                <div className="flex gap-1 shrink-0 pt-6">
                  <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => remove(item.id)}
                    className={`p-1.5 rounded-lg transition-colors text-xs ${deleteId === item.id ? "bg-red-500/20 text-red-400 px-2" : "bg-white/5 text-amber-700/50 hover:bg-red-500/10 hover:text-red-400"}`}>
                    {deleteId === item.id ? "Confirm?" : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-md rounded-2xl border border-amber-800/30 p-6 space-y-4"
            style={{ background: "linear-gradient(135deg,#1a1205,#241a08)" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-amber-100">{editing ? "Edit Content" : "Add Content"}</h2>
              <button onClick={closeModal} className="p-1.5 rounded-lg text-amber-600/60 hover:text-amber-300 hover:bg-amber-500/10">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className={labelCls}>Key (unique identifier) *</label>
                <input className={inputCls} value={form.key} onChange={(e) => set("key", e.target.value)} placeholder="e.g. hero_title" disabled={!!editing} />
              </div>
              <div>
                <label className={labelCls}>Label (display name) *</label>
                <input className={inputCls} value={form.label} onChange={(e) => set("label", e.target.value)} placeholder="e.g. Hero Title" />
              </div>
              <div>
                <label className={labelCls}>Type</label>
                <select className={inputCls} value={form.type} onChange={(e) => set("type", e.target.value)}>
                  <option value="text">text</option>
                  <option value="textarea">textarea</option>
                  <option value="number">number</option>
                  <option value="url">url</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Value</label>
                {form.type === "textarea" ? (
                  <textarea className={`${inputCls} min-h-[100px] resize-y`} value={form.value} onChange={(e) => set("value", e.target.value)} placeholder="Content value..." />
                ) : (
                  <input className={inputCls} value={form.value} onChange={(e) => set("value", e.target.value)} placeholder="Content value..." />
                )}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={save} disabled={saving}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-black disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </button>
              <button onClick={closeModal} className="px-4 py-2.5 rounded-xl text-sm text-amber-400/70 bg-amber-500/10 hover:bg-amber-500/20">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
