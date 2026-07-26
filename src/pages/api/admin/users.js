import { ObjectId } from "mongodb";
import clientPromise from "/lib/mongodb/config";
import { requireAdmin } from "/lib/adminAuth";

export default async function handler(req, res) {
  const session = await requireAdmin(req, res);
  if (!session) return;

  const client = await clientPromise;
  const db = client.db("kikqrcard");
  const users = db.collection("users");

  if (req.method === "GET") {
    const { q = "" } = req.query;
    const filter = q
      ? {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { email: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const list = await users
      .find(filter, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json({ users: list });
  }

  if (req.method === "PATCH") {
    const { id, isAdmin } = req.body;
    if (!id || typeof isAdmin !== "boolean") {
      return res.status(400).json({ error: "id and isAdmin (boolean) are required" });
    }

    if (id === session.user.id && isAdmin === false) {
      return res.status(400).json({ error: "You cannot remove your own admin access" });
    }

    await users.updateOne({ _id: new ObjectId(id) }, { $set: { isAdmin } });
    return res.status(200).json({ message: "User updated" });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }
    if (id === session.user.id) {
      return res.status(400).json({ error: "You cannot delete your own account" });
    }

    await users.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ message: "User deleted" });
  }

  res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
  return res.status(405).json({ error: "Method not allowed" });
}
