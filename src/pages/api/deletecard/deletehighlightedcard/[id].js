import { MongoClient, ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongodb/config";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const id = req.query.id || req.body.id;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Card ID must be a string" });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid card ID format" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("kikqrcard");
    const cards = db.collection("myhighlightedCards");

    const result = await cards.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Card not found" });
    }

    return res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
