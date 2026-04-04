"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X, Check, Globe, Image as ImageIcon } from "lucide-react";

interface Partner {
  id: string; name: string; logo: string | null; website: string | null;
  active: boolean; order: number;
}

const emptyForm = { name: "", logo: "", website: "", active: true, order: 0 };

export default function PartnersManager({ initialPartners }: { initialPartners: Partner[] }) {
  const [partners, setPartners] = useState(initialPartners);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (p: Partner) => { setEditing(p); setForm({ name: p.name, logo: p.logo || "", website: p.website || "", active: p.active, order: p.order }); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditing(null); };

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.name.trim()) { toast.error("Name is required"); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/partners/${editing.id}` : "/api/admin/partners";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      if (editing) {
        setPartners((p) => p.map((x) => x.id === editing.id ? data : x));
        toast.success("Partner updated");
      } else {
        setPartners((p) => [...p, data]);
        toast.success("Partner added");
      }
      closeModal();
      router.refresh();
    } catch {
      toast.error("Failed to save partner");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (deleteId !== id) { setDeleteId(id); return; }
    try {
      await fetch(`/api/admin/partners/${id}`, { method: "DELETE" });
      setPartners((p) => p.filter((x) => x.id !== id));
      toast.success("Partner removed");
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleteId(null);
    }
  };

  const inputCls = "w-full px-3 py-2 rounded-xl text-sm text-amber-100 placeholder:text-amber-700/40 focus:outline-none focus:border-amber-500/60 transition-colors"
    + " border border-amber-800/30"
    + " bg-amber-900/10";
  const labelCls = "block text-xs font-semibold text-amber-500/70 mb-1";

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-amber-100">Partners</h1>
          <p className="text-amber-200/50 text-sm mt-1">Manage trusted partner companies shown on homepage</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-black transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
          <Plus className="w-4 h-4" /> Add Partner
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {partners.map((p) => (
          <div key={p.id}
            className="rounded-2xl border border-amber-800/20 p-4 space-y-3"
            style={{ background: "rgba(245,158,11,0.04)" }}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {p.logo ? (
                  <img src={p.logo} alt={p.name} className="w-10 h-10 object-contain rounded-lg bg-white/5 shrink-0 p-1" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <ImageIcon className="w-5 h-5 text-amber-600/50" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-amber-100 font-semibold text-sm truncate">{p.name}</p>
                  {p.website && (
                    <a href={p.website} target="_blank" rel="noopener noreferrer"
                      className="text-amber-600/60 text-xs hover:text-amber-400 flex items-center gap-1 truncate">
                      <Globe className="w-3 h-3 shrink-0" /> {p.website.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${p.active ? "bg-green-500/15 text-green-400" : "bg-stone-500/15 text-stone-500"}`}>
                  {p.active ? "Active" : "Hidden"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-700/50">Order: {p.order}</span>
              <div className="flex gap-2">
                <button onClick={() => openEdit(p)}
                  className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => remove(p.id)}
                  className={`p-1.5 rounded-lg transition-colors text-xs ${deleteId === p.id ? "bg-red-500/20 text-red-400 px-2" : "bg-white/5 text-amber-700/50 hover:bg-red-500/10 hover:text-red-400"}`}>
                  {deleteId === p.id ? "Confirm?" : <Trash2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        ))}
        {partners.length === 0 && (
          <div className="col-span-3 text-center py-16 text-amber-600/50">No partners yet. Add your first one!</div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-md rounded-2xl border border-amber-800/30 p-6 space-y-4"
            style={{ background: "linear-gradient(135deg,#1a1205,#241a08)" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-amber-100">{editing ? "Edit Partner" : "Add Partner"}</h2>
              <button onClick={closeModal} className="p-1.5 rounded-lg text-amber-600/60 hover:text-amber-300 hover:bg-amber-500/10 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className={labelCls}>Company Name *</label>
                <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Acme Corp" />
              </div>
              <div>
                <label className={labelCls}>Logo URL</label>
                <input className={inputCls} value={form.logo} onChange={(e) => set("logo", e.target.value)} placeholder="https://example.com/logo.png" />
              </div>
              <div>
                <label className={labelCls}>Website URL</label>
                <input className={inputCls} value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="https://example.com" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Display Order</label>
                  <input className={inputCls} type="number" value={form.order} onChange={(e) => set("order", Number(e.target.value))} placeholder="0" />
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select className={inputCls} value={form.active ? "1" : "0"} onChange={(e) => set("active", e.target.value === "1")}>
                    <option value="1">Active</option>
                    <option value="0">Hidden</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={save} disabled={saving}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-black disabled:opacity-60 transition-all"
                style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
                {saving ? "Saving..." : editing ? "Update" : "Add Partner"}
              </button>
              <button onClick={closeModal} className="px-4 py-2.5 rounded-xl text-sm text-amber-400/70 bg-amber-500/10 hover:bg-amber-500/20 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
