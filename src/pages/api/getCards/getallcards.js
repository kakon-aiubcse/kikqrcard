import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    tlsAllowInvalidCertificates: true,
  });

  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.setHeader("Allow", ["GET"]).status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("kikqrcard");
    const cardsCollection = db.collection("allCards");

    const allcards = await cardsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json({ allcards });
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch cards" });
  }
}
