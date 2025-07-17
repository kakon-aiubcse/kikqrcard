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
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    email,
    cardName,
    name,
    profession,
    phone,
    quote,
    bgGrad,
    bgStyle,
    ishighlighted,
  } = req.body;

  if (
    !email ||
    !cardName ||
    !name ||
    !profession ||
    !phone ||
    !quote ||
    !bgGrad ||
    !bgStyle ||
    ishighlighted ===undefined
  ) {
    return res.status(400).json({ error: "Missing required card fields" });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("kikqrcard");
    const cards = db.collection("myhighlightedCards");
    const existingCard = await cards.findOne({ cardName: cardName.toLowerCase() });
    if (existingCard) {
      return res.status(409).json({ error: "Card already exists" });
    }

    const newCard = {
      email,
      cardName,
      name,
      profession,
      phone,
      quote,
      bgGrad,
      bgStyle,
      ishighlighted,
      createdAt: new Date(),
    };

    const result = await cards.insertOne(newCard);

    if (result.insertedId) {
      return res.status(201).json({ message: "Card saved successfully" });
    } else {
      throw new Error("Insert failed");
    }
  } catch (err) {
    console.error("Card save error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
