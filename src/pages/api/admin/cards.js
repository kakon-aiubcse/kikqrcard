import { ObjectId } from "mongodb";
import clientPromise from "/lib/mongodb/config";
import { requireAdmin } from "/lib/adminAuth";

const COLLECTIONS = ["myCard", "allCards"];

export default async function handler(req, res) {
  const session = await requireAdmin(req, res);
  if (!session) return;

  const client = await clientPromise;
  const db = client.db("kikqrcard");

  if (req.method === "GET") {
    const { q = "" } = req.query;
    const filter = q
      ? {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { email: { $regex: q, $options: "i" } },
            { cardName: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const results = await Promise.all(
      COLLECTIONS.map((name) =>
        db
          .collection(name)
          .find(filter)
          .sort({ createdAt: -1 })
          .toArray()
          .then((docs) => docs.map((d) => ({ ...d, source: name }))),
      ),
    );

    return res.status(200).json({ cards: results.flat() });
  }

  if (req.method === "DELETE") {
    const { id, source } = req.body;
    if (!id || !COLLECTIONS.includes(source)) {
      return res.status(400).json({ error: "Valid id and source are required" });
    }

    await db.collection(source).deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ message: "Card deleted" });
  }

  res.setHeader("Allow", ["GET", "DELETE"]);
  return res.status(405).json({ error: "Method not allowed" });
}
