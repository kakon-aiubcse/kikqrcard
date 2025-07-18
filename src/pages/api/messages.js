import { MongoClient, ObjectId } from "mongodb";

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
  const client = await connectToDatabase();
  const db = client.db("kikqrcard");
  const messages = db.collection("messages");

  if (req.method === "POST") {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newMessage = {
      _id: new ObjectId(),
      name,
      email,
      phone,
      message,
      createdAt: new Date(),
    };

    try {
      const result = await messages.insertOne(newMessage);
      if (result.insertedId) {
        return res.status(201).json({ message: "Message saved successfully", id: result.insertedId });
      } else {
        return res.status(500).json({ error: "Insert failed" });
      }
    } catch (error) {
      console.error("Insert message error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      const allMessages = await messages.find().sort({ createdAt: -1 }).toArray();
      return res.status(200).json(allMessages);
    } catch (err) {
      console.error("Fetch messages error:", err);
      return res.status(500).json({ error: "Failed to fetch messages" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
