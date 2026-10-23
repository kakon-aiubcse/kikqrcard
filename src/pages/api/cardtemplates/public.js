import clientPromise from "/lib/mongodb/config";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const client = await clientPromise;
  const db = client.db("kikqrcard");

  const templates = await db
    .collection("cardTemplates")
    .find({ active: true })
    .sort({ price: -1 })
    .toArray();

  return res.status(200).json({ templates });
}
