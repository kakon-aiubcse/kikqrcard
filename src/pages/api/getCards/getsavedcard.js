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
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("kikqrcard");
    const cards = db.collection("myCard");

    const savedCards = await cards
      .find({ email })
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json({ savedCards });
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch favourite cards" });
  }
}
