import { useCallback, useEffect, useState } from "react";
import { Loader2, Search, ShieldCheck, ShieldOff, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import AdminShell from "@/components/admin-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRequireAdmin } from "@/lib/useRequireAdmin";

function AdminUsers() {
  const { ready, session } = useRequireAdmin();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const fetchUsers = useCallback(async (q = "") => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/admin/users", { params: { q } });
      setUsers(data.users || []);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (ready) fetchUsers();
  }, [ready, fetchUsers]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(query);
  };

  const toggleAdmin = async (user) => {
    try {
      await axios.patch("/api/admin/users", { id: user._id, isAdmin: !user.isAdmin });
      toast.success(user.isAdmin ? "Admin access removed" : "Admin access granted");
      fetchUsers(query);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update user");
    }
  };

  const deleteUser = async (user) => {
    try {
      await axios.delete("/api/admin/users", { data: { id: user._id } });
      toast.success("User deleted");
      fetchUsers(query);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete user");
    }
  };

  if (!ready) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3">
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="md:pl-64">
      <AdminShell />
      <main className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-foreground">Users</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {users.length} user{users.length === 1 ? "" : "s"}
        </p>

        <form onSubmit={handleSearch} className="mt-6 flex max-w-sm gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or email..."
          />
          <Button type="submit" variant="outline" size="icon" aria-label="Search">
            <Search className="size-4" />
          </Button>
        </form>

        <div className="mt-4 rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    <Loader2 className="mx-auto size-5 animate-spin" />
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || "—"}</TableCell>
                    <TableCell>{user.plan || "—"}</TableCell>
                    <TableCell>
                      {user.isAdmin ? (
                        <Badge>Admin</Badge>
                      ) : (
                        <Badge variant="outline">User</Badge>
                      )}
                    </TableCell>
                    <TableCell className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={user.isAdmin ? "Revoke admin" : "Make admin"}
                        disabled={user._id === session?.user?.id && user.isAdmin}
                        onClick={() => toggleAdmin(user)}
                      >
                        {user.isAdmin ? (
                          <ShieldOff className="size-4" />
                        ) : (
                          <ShieldCheck className="size-4" />
                        )}
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label="Delete user"
                              disabled={user._id === session?.user?.id}
                            />
                          }
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this user?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This permanently deletes {user.email}. This cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteUser(user)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}

export default AdminUsers;
