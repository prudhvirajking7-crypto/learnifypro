"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { User, Mail, Shield, BookOpen, ShoppingBag, Camera, Eye, EyeOff, Save, Lock } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((d) => {
        setProfile(d);
        setName(d.name || "");
        setBio(d.bio || "");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSaveProfile = async () => {
    if (!name.trim()) { toast.error("Name cannot be empty"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated!");
        await update({ name });
        setProfile((p: any) => ({ ...p, name, bio }));
      } else {
        toast.error(data.error || "Failed to update");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields"); return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match"); return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters"); return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Password changed successfully!");
        setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      } else {
        toast.error(data.error || "Failed to change password");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const joinedDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
    : "—";

  const initials = (name || profile?.email || "U")
    .split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left — Avatar + stats */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
              <div className="relative inline-block mb-4">
                {profile?.image ? (
                  <img src={profile.image} alt={name} className="w-24 h-24 rounded-full object-cover border-4 border-purple-100" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold mx-auto">
                    {initials}
                  </div>
                )}
                {profile?.image && (
                  <div className="absolute bottom-0 right-0 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-700">
                    <Camera className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
              <h2 className="font-bold text-gray-900 text-lg">{profile?.name}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{profile?.email}</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                profile?.role === "ADMIN" ? "bg-red-100 text-red-700" :
                profile?.role === "INSTRUCTOR" ? "bg-blue-100 text-blue-700" :
                "bg-purple-100 text-purple-700"
              }`}>
                {profile?.role}
              </span>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 text-sm">Account Stats</h3>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{profile?._count?.enrollments ?? 0}</p>
                  <p className="text-gray-500 text-xs">Enrolled Courses</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{profile?._count?.orders ?? 0}</p>
                  <p className="text-gray-500 text-xs">Orders Placed</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {profile?.emailVerified ? "Verified" : "Not Verified"}
                  </p>
                  <p className="text-gray-500 text-xs">Email Status</p>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100 text-xs text-gray-500">
                Member since {joinedDate}
              </div>
            </div>
          </div>

          {/* Right — Edit forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                <User className="w-4 h-4 text-purple-600" /> Personal Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={profile?.email || ""}
                      disabled
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    maxLength={300}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm resize-none"
                    placeholder="Tell us a little about yourself..."
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">{bio.length}/300</p>
                </div>
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 text-sm"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            {/* Change Password */}
            {profile?.hasPassword && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-600" /> Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrent ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        placeholder="Enter current password"
                      />
                      <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        placeholder="Min 8 characters"
                      />
                      <button type="button" onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm ${
                        confirmPassword && confirmPassword !== newPassword
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200"
                      }`}
                      placeholder="Re-enter new password"
                    />
                    {confirmPassword && confirmPassword !== newPassword && (
                      <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                    )}
                  </div>
                  <button
                    onClick={handleChangePassword}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 text-sm"
                  >
                    <Lock className="w-4 h-4" />
                    {saving ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>
            )}

            {/* Google OAuth notice */}
            {!profile?.hasPassword && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-800">Signed in with Google</p>
                  <p className="text-xs text-blue-600 mt-0.5">Your account is secured through Google OAuth. Password management is handled by Google.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
