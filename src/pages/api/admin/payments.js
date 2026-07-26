import clientPromise from "/lib/mongodb/config";
import { requireAdmin } from "/lib/adminAuth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await requireAdmin(req, res);
  if (!session) return;

  const { status = "" } = req.query;
  const filter = status ? { status } : {};

  try {
    const client = await clientPromise;
    const db = client.db("kikqrcard");

    const payments = await db
      .collection("payments")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json({ payments });
  } catch (err) {
    console.error("Admin payments error:", err);
    return res.status(500).json({ error: "Failed to fetch payments" });
  }
}
