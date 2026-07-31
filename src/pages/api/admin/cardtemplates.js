import { ObjectId } from "mongodb";
import clientPromise from "/lib/mongodb/config";
import { requireAdmin } from "/lib/adminAuth";

export default async function handler(req, res) {
  const session = await requireAdmin(req, res);
  if (!session) return;

  const client = await clientPromise;
  const db = client.db("kikqrcard");
  const collection = db.collection("cardTemplates");

  if (req.method === "GET") {
    const templates = await collection.find({}).sort({ price: -1 }).toArray();
    return res.status(200).json({ templates });
  }

  if (req.method === "POST") {
    const {
      name,
      profession,
      phone,
      quote,
      bgGrad,
      bgStyle,
      pattern,
      price,
      active = true,
    } = req.body;

    if (!name || price === undefined || price === null) {
      return res.status(400).json({ error: "name and price are required" });
    }

    const doc = {
      name,
      profession: profession || "",
      phone: phone || "",
      quote: quote || "",
      bgGrad: bgGrad || "",
      bgStyle: bgStyle || "",
      pattern: pattern || "none",
      price: Number(price),
      active: Boolean(active),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(doc);
    return res.status(201).json({ template: { ...doc, _id: result.insertedId } });
  }

  if (req.method === "PUT") {
    const { id, ...updates } = req.body;
    if (!id) return res.status(400).json({ error: "id is required" });

    delete updates._id;
    if (updates.price !== undefined) updates.price = Number(updates.price);
    updates.updatedAt = new Date();

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    return res.status(200).json({ message: "Template updated" });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "id is required" });

    await collection.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ message: "Template deleted" });
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  return res.status(405).json({ error: "Method not allowed" });
}
