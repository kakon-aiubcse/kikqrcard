import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb && cachedClient) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000, // avoid hanging in cold start
    tlsAllowInvalidCertificates: true, // only use if necessary
  });

  await client.connect();
  const db = client.db("kikqrcard");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return res.status(500).json({ error: "Missing MongoDB URI" });
  }

  const { name, email, phone, password, profileImageBase64 } = req.body;

  if (![name, email, phone, password].every(Boolean)) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  try {
    const { db } = await connectToDatabase(uri);
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      name,
      email,
      phone,
      password: hashedPassword,
      profileImage: profileImageBase64 || null,
      createdAt: new Date(),
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: result.insertedId,
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({
      error: "Signup failed",
      details: err.message,
    });
  }
}
