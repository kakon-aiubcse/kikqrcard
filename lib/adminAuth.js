import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Returns the session if caller is an admin, otherwise writes 401/403 and returns null.
export async function requireAdmin(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    res.status(401).json({ error: "Not authenticated" });
    return null;
  }

  if (!session.user.isAdmin) {
    res.status(403).json({ error: "Admin access required" });
    return null;
  }

  return session;
}
