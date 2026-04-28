import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Search } from "lucide-react";
import UserActions from "@/components/admin/user-actions";

export default async function AdminUsersPage({ searchParams }: { searchParams: { search?: string; role?: string; page?: string } }) {
  const search = searchParams.search || "";
  const role = searchParams.role || "";
  const page = parseInt(searchParams.page || "1");
  const limit = 20;

  const where: any = {};
  if (search) where.OR = [{ name: { contains: search, mode: "insensitive" } }, { email: { contains: search, mode: "insensitive" } }];
  if (role) where.role = role;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: "desc" },
      select: {
        id: true, name: true, email: true, image: true, role: true, createdAt: true, emailVerified: true,
        _count: { select: { enrollments: true, coursesCreated: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  const pages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-amber-100">Users</h1>
          <p className="text-amber-200/50 text-sm mt-0.5">{total} total users</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <form className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            name="search" defaultValue={search} placeholder="Search users..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-amber-500/50"
          />
        </form>
        <form className="flex gap-2">
          {["", "STUDENT", "INSTRUCTOR", "ADMIN"].map((r) => (
            <button key={r} name="role" value={r} type="submit"
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                role === r ? "bg-amber-500 text-black" : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
              }`}
            >{r || "All"}</button>
          ))}
        </form>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8">
                {["User", "Email", "Role", "Courses", "Enrolled", "Joined", "Actions"].map((h) => (
                  <th key={h} className="text-left text-xs text-gray-500 font-semibold px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/3 transition-colors group">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {u.image ? <img src={u.image} className="w-8 h-8 rounded-xl object-cover" alt="" /> : (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold">{u.name?.[0] || "?"}</div>
                      )}
                      <div>
                        <p className="text-white text-xs font-medium">{u.name || "—"}</p>
                        <p className={`text-[10px] ${u.emailVerified ? "text-green-500" : "text-red-400"}`}>{u.emailVerified ? "Verified" : "Unverified"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      u.role === "ADMIN" ? "bg-amber-500/20 text-amber-300" :
                      u.role === "INSTRUCTOR" ? "bg-orange-500/15 text-orange-400" :
                      "bg-stone-500/15 text-stone-400"
                    }`}>{u.role}</span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{u._count.coursesCreated}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{u._count.enrollments}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/users/${u.id}`} className="text-[10px] px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors">View</Link>
                      <UserActions userId={u.id} currentRole={u.role} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pages > 1 && (
          <div className="flex items-center justify-center gap-2 px-5 py-4 border-t border-white/8">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <Link key={p} href={`?page=${p}&search=${search}&role=${role}`}
                className={`w-8 h-8 rounded-lg text-xs font-medium flex items-center justify-center transition-all ${
                  p === page ? "bg-amber-500 text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >{p}</Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
