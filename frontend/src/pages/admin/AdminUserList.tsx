import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const API_BASE = (import.meta.env.VITE_API_URL as string) || "";

type AdminUser = {
  id: string;
  email: string;
  role: "admin" | "editor";
  createdAt?: string;
};

const AdminUserList = () => {
  const { token } = useAdmin();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "editor">("editor");

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`${API_BASE}/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data: any[]) => {
        const mapped: AdminUser[] = (Array.isArray(data) ? data : []).map((a) => ({
          id: a.id || a._id,
          email: a.email,
          role: (a.role as "admin" | "editor") || "editor",
          createdAt: a.createdAt,
        }));
        setUsers(mapped);
      })
      .catch(() => {
        toast.error("Failed to load users.");
      })
      .finally(() => setLoading(false));
  }, [token]);

  const refresh = () => {
    if (!token) return;
    setLoading(true);
    fetch(`${API_BASE}/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data: any[]) => {
        const mapped: AdminUser[] = (Array.isArray(data) ? data : []).map((a) => ({
          id: a.id || a._id,
          email: a.email,
          role: (a.role as "admin" | "editor") || "editor",
          createdAt: a.createdAt,
        }));
        setUsers(mapped);
      })
      .finally(() => setLoading(false));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!email.trim() || !password.trim()) {
      toast.error("Enter email and password.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: email.trim(), password: password.trim(), role }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to create user.");
      } else {
        toast.success("User created.");
        setEmail("");
        setPassword("");
        setRole("editor");
        refresh();
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: "admin" | "editor") => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to update role.");
      } else {
        toast.success("Role updated.");
        refresh();
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const handleDelete = async (userId: string) => {
    if (!token) return;
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to delete user.");
      } else {
        toast.success("User deleted.");
        setUsers((prev) => prev.filter((u) => u.id !== userId));
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="font-serif text-2xl text-foreground mb-2">Users</h1>
        <p className="text-sm text-muted-foreground">
          Manage admin and editor accounts for the Brainfeed admin panel.
        </p>
      </div>

      <form onSubmit={handleCreate} className="rounded-xl border border-border/60 bg-card/60 p-4 md:p-5 grid gap-4 md:grid-cols-[2fr,2fr,1fr,auto] items-end">
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground" htmlFor="new-email">
            Email
          </label>
          <Input
            id="new-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="editor@example.com"
            className="h-9"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground" htmlFor="new-password">
            Password
          </label>
          <Input
            id="new-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-9"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Role</label>
          <Select value={role} onValueChange={(v) => setRole(v as "admin" | "editor")}>
            <SelectTrigger className="h-9 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" disabled={saving} className="h-9 text-xs font-semibold uppercase tracking-[0.18em]">
          {saving ? "Saving…" : "Add user"}
        </Button>
      </form>

      <div className="rounded-xl border border-border/60 bg-card/60">
        <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Existing users</p>
          {loading && <p className="text-xs text-muted-foreground">Loading…</p>}
        </div>
        <div className="divide-y divide-border/60">
          {users.length === 0 && !loading ? (
            <p className="px-4 py-4 text-sm text-muted-foreground">No users found.</p>
          ) : (
            users.map((user) => (
              <div key={user.id} className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user.role} {user.createdAt && `· ${new Date(user.createdAt).toLocaleDateString("en-IN")}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={user.role}
                    onValueChange={(v) => handleRoleChange(user.id, v as "admin" | "editor")}
                  >
                    <SelectTrigger className="h-8 text-xs w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserList;

