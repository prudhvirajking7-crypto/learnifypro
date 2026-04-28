"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UserActions({ userId, currentRole }: { userId: string; currentRole: string }) {
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const router = useRouter();

  const changeRole = async (role: string) => {
    setLoading(true);
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      toast.success(`Role changed to ${role}`);
      router.refresh();
    } catch {
      toast.error("Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed");
      }
      toast.success("User deleted");
      router.refresh();
    } catch (e: any) {
      toast.error(e.message || "Failed to delete user");
      setConfirmDelete(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentRole}
        onChange={(e) => changeRole(e.target.value)}
        disabled={loading}
        className="text-[10px] px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-amber-400/70 focus:outline-none focus:border-amber-500/50 disabled:opacity-50 cursor-pointer"
      >
        <option value="STUDENT">STUDENT</option>
        <option value="INSTRUCTOR">INSTRUCTOR</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      <button
        onClick={deleteUser}
        disabled={loading}
        onBlur={() => setTimeout(() => setConfirmDelete(false), 200)}
        className={`p-1.5 rounded-lg text-xs transition-all disabled:opacity-50 ${
          confirmDelete
            ? "bg-red-500/20 text-red-400 border border-red-500/40 px-2"
            : "bg-white/5 text-amber-700/60 hover:bg-red-500/10 hover:text-red-400"
        }`}
        title={confirmDelete ? "Click again to confirm" : "Delete user"}
      >
        {confirmDelete ? "Confirm?" : <Trash2 className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
