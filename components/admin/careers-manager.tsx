"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, MapPin, Clock, DollarSign, Briefcase } from "lucide-react";
import toast from "react-hot-toast";

type JobPost = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salary: string | null;
  active: boolean;
  createdAt: string | Date;
};

type FormData = {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salary: string;
  active: boolean;
};

const EMPTY_FORM: FormData = {
  title: "",
  department: "",
  location: "Remote",
  type: "Full-time",
  description: "",
  requirements: [],
  salary: "",
  active: true,
};

export default function CareersManager({ initialJobs }: { initialJobs: JobPost[] }) {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobPost[]>(initialJobs);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPost | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [newReq, setNewReq] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openCreate = () => {
    setEditingJob(null);
    setForm(EMPTY_FORM);
    setNewReq("");
    setShowModal(true);
  };

  const openEdit = (job: JobPost) => {
    setEditingJob(job);
    setForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: [...job.requirements],
      salary: job.salary || "",
      active: job.active,
    });
    setNewReq("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingJob(null);
    setForm(EMPTY_FORM);
    setNewReq("");
  };

  const addRequirement = () => {
    const trimmed = newReq.trim();
    if (!trimmed) return;
    setForm((prev) => ({ ...prev, requirements: [...prev.requirements, trimmed] }));
    setNewReq("");
  };

  const removeRequirement = (index: number) => {
    setForm((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.department.trim() || !form.description.trim()) {
      toast.error("Title, department, and description are required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        department: form.department.trim(),
        location: form.location.trim(),
        type: form.type,
        description: form.description.trim(),
        requirements: form.requirements,
        salary: form.salary.trim() || null,
        active: form.active,
      };

      let res: Response;
      if (editingJob) {
        res = await fetch(`/api/admin/careers/${editingJob.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/careers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Failed to save");

      const saved: JobPost = await res.json();

      if (editingJob) {
        setJobs((prev) => prev.map((j) => (j.id === saved.id ? saved : j)));
        toast.success("Job post updated");
      } else {
        setJobs((prev) => [saved, ...prev]);
        toast.success("Job post created");
      }

      closeModal();
      router.refresh();
    } catch {
      toast.error("Failed to save job post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/careers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setJobs((prev) => prev.filter((j) => j.id !== id));
      toast.success("Job post deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete job post");
    } finally {
      setDeleting(false);
      setConfirmDeleteId(null);
    }
  };

  const inputClass =
    "bg-amber-950/30 border border-amber-800/30 text-amber-100 rounded-xl px-3 py-2 w-full focus:outline-none focus:border-amber-500/50 placeholder-amber-700/40";

  return (
    <>
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-amber-200/50 text-sm">
          {jobs.length} job {jobs.length === 1 ? "posting" : "postings"}
        </p>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-md transition-all hover:opacity-90 active:scale-95"
          style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
        >
          <Plus className="w-4 h-4" />
          Add Job
        </button>
      </div>

      {/* Job list */}
      {jobs.length === 0 ? (
        <div
          className="rounded-2xl border border-amber-800/20 p-16 text-center"
          style={{ background: "rgba(245,158,11,0.03)" }}
        >
          <Briefcase className="w-10 h-10 text-amber-700/40 mx-auto mb-4" />
          <p className="text-amber-200/40 text-sm">No job postings yet. Create one to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-amber-800/20 p-5 transition-all hover:border-amber-700/30"
              style={{ background: "rgba(245,158,11,0.04)" }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border bg-amber-950/40 text-amber-400 border-amber-700/30">
                      {job.department}
                    </span>
                    {job.active ? (
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25">
                        Active
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-800 text-gray-500">
                        Inactive
                      </span>
                    )}
                  </div>
                  <h3 className="text-amber-100 font-semibold text-base mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4">
                    <span className="flex items-center gap-1.5 text-xs text-amber-200/40">
                      <MapPin className="w-3.5 h-3.5 text-amber-600/60" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-amber-200/40">
                      <Clock className="w-3.5 h-3.5 text-amber-600/60" />
                      {job.type}
                    </span>
                    {job.salary && (
                      <span className="flex items-center gap-1.5 text-xs text-amber-200/40">
                        <DollarSign className="w-3.5 h-3.5 text-amber-600/60" />
                        {job.salary}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEdit(job)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-400 hover:bg-amber-500/10 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </button>

                  {confirmDeleteId === job.id ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDelete(job.id)}
                        disabled={deleting}
                        className="text-[11px] px-2.5 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50 font-medium"
                      >
                        {deleting ? "..." : "Confirm"}
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="text-[11px] px-2.5 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(job.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="w-full max-w-2xl rounded-2xl border border-amber-800/25 shadow-2xl overflow-hidden"
            style={{ background: "#150f00" }}
          >
            {/* Modal header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid rgba(245,158,11,0.15)" }}
            >
              <h2 className="text-amber-100 font-semibold text-lg">
                {editingJob ? "Edit Job Post" : "New Job Post"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-amber-600/60 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Title */}
              <div>
                <label className="text-amber-300/70 text-sm font-medium block mb-1.5">
                  Job Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Senior Full Stack Engineer"
                  className={inputClass}
                />
              </div>

              {/* Department + Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-amber-300/70 text-sm font-medium block mb-1.5">
                    Department <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}
                    placeholder="e.g. Engineering"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-amber-300/70 text-sm font-medium block mb-1.5">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                    className={inputClass}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
              </div>

              {/* Location + Salary */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-amber-300/70 text-sm font-medium block mb-1.5">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                    placeholder="e.g. Remote"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-amber-300/70 text-sm font-medium block mb-1.5">Salary</label>
                  <input
                    type="text"
                    value={form.salary}
                    onChange={(e) => setForm((p) => ({ ...p, salary: e.target.value }))}
                    placeholder="e.g. $80k–$120k / year"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-amber-300/70 text-sm font-medium block mb-1.5">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Describe the role, responsibilities, and what the candidate will work on..."
                  rows={4}
                  className={inputClass}
                  style={{ resize: "vertical" }}
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="text-amber-300/70 text-sm font-medium block mb-1.5">Requirements</label>
                <div className="space-y-2 mb-2">
                  {form.requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="flex-1 text-sm text-amber-200/70 bg-amber-950/20 border border-amber-800/20 rounded-lg px-3 py-1.5">
                        {req}
                      </span>
                      <button
                        onClick={() => removeRequirement(i)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newReq}
                    onChange={(e) => setNewReq(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addRequirement(); } }}
                    placeholder="Add a requirement and press Enter"
                    className={inputClass}
                  />
                  <button
                    onClick={addRequirement}
                    className="px-3 py-2 rounded-xl text-white text-sm font-semibold shrink-0 transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Active toggle */}
              <div className="flex items-center gap-3">
                <button
                  role="switch"
                  aria-checked={form.active}
                  onClick={() => setForm((p) => ({ ...p, active: !p.active }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    form.active ? "bg-amber-500" : "bg-amber-950/60"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      form.active ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-amber-300/70 text-sm font-medium">
                  {form.active ? "Active — visible on careers page" : "Inactive — hidden from public"}
                </span>
              </div>
            </div>

            {/* Modal footer */}
            <div
              className="flex items-center justify-end gap-3 px-6 py-4"
              style={{ borderTop: "1px solid rgba(245,158,11,0.15)" }}
            >
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-xl text-amber-300/70 text-sm font-medium hover:bg-amber-500/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 rounded-xl text-white text-sm font-semibold shadow-md transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
              >
                {saving ? "Saving..." : editingJob ? "Save Changes" : "Create Job Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
