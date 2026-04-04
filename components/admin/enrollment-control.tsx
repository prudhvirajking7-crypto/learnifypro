"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EnrollmentControl({ enrollmentId, currentStatus }: { enrollmentId: string; currentStatus: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const update = async (status: string) => {
    setLoading(true);
    try {
      await fetch(`/api/admin/enrollments/${enrollmentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      toast.success(`Enrollment ${status.toLowerCase()}`);
      router.refresh();
    } catch {
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-1">
      {currentStatus !== "ACTIVE" && (
        <button onClick={() => update("ACTIVE")} disabled={loading}
          className="text-[10px] px-2 py-1 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors disabled:opacity-50">
          Allow
        </button>
      )}
      {currentStatus !== "BLOCKED" && (
        <button onClick={() => update("BLOCKED")} disabled={loading}
          className="text-[10px] px-2 py-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50">
          Block
        </button>
      )}
    </div>
  );
}
