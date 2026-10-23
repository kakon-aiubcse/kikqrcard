import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Returns the session if caller is signed in, otherwise writes 401 and returns null.
// Use session.user.email as the owner key — never trust an email sent by the client.
export async function requireUser(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    res.status(401).json({ error: "Not authenticated" });
    return null;
  }

  return session;
}
