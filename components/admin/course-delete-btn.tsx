"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CourseDeleteButton({ courseId, courseTitle }: { courseId: string; courseTitle: string }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await fetch(`/api/admin/courses/${courseId}`, { method: "DELETE" });
      toast.success("Course deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete");
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <div className="flex gap-1">
        <button onClick={handleDelete} disabled={loading} className="text-[10px] px-2 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50">
          {loading ? "..." : "Confirm"}
        </button>
        <button onClick={() => setConfirming(false)} className="text-[10px] px-2 py-1 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 transition-colors">
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => setConfirming(true)} className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}
