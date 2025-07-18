import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    // Only use this if needed, otherwise remove:
    // tlsAllowInvalidCertificates: true,
    ...options,
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
    isfavourite,
  } = req.body;

  // Basic validation + type checks
  if (
    !email ||
    typeof email !== "string" ||
    !cardName ||
    typeof cardName !== "string" ||
    !name ||
    typeof name !== "string" ||
    !profession ||
    typeof profession !== "string" ||
    !phone ||
    typeof phone !== "string" ||
    !quote ||
    typeof quote !== "string" ||
    !bgGrad ||
    typeof bgGrad !== "string" ||
    !bgStyle ||
    typeof bgStyle !== "string" ||
    typeof isfavourite !== "boolean"
  ) {
    return res.status(400).json({ error: "Missing or invalid required card fields" });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("kikqrcard");
    const cards = db.collection("myfavouritedCards");

    const normalizedCardName = cardName.toLowerCase().trim();

    // Check for duplicate card (same email + normalized cardName + bgGrad + bgStyle)
    const existingCard = await cards.findOne({
      email,
      cardName: normalizedCardName,
      bgGrad,
      bgStyle,
    });

    if (existingCard) {
      return res.status(409).json({ error: "Card already exists" });
    }

    const newCard = {
      email,
      cardName: normalizedCardName,
      name,
      profession,
      phone,
      quote,
      bgGrad,
      bgStyle,
      isfavourite,
      createdAt: new Date(),
    };

    const result = await cards.insertOne(newCard);

    if (result.insertedId) {
      return res.status(201).json({
        message: "Card saved successfully",
        id: result.insertedId,
      });
    } else {
      throw new Error("Insert failed");
    }
  } catch (err) {
    console.error("Card save error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
