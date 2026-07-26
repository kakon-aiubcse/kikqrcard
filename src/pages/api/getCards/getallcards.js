import clientPromise from "../../../../lib/mongodb/config";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.setHeader("Allow", ["GET"]).status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("kikqrcard");
    const cardsCollection = db.collection("allCards");

    const allcards = await cardsCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return res.status(200).json({ allcards });
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch cards" });
  }
}
