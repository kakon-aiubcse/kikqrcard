import clientPromise from "../../../../lib/mongodb/config";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("kikqrcard");
    const cards = db.collection("myhighlightedCards");

    const highlightedCards = await cards
      .find({ email, ishighlighted: true })
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json({ highlightedCards });
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch  cards" });
  }
}
