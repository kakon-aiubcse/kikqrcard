import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

let cachedClient = null;

async function connectToDatabase(uri) {
  if (cachedClient) {
    return cachedClient;
  }
  const client = new MongoClient(uri, {
    tlsAllowInvalidCertificates: true, // Optional, depending on your URI
  });
  await client.connect();
  cachedClient = client;
  return client;
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

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const client = await connectToDatabase(uri);
    const db = client.db("kikqrcard");
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already in use" });
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

    return res
      .status(201)
      .json({ message: "User created", userId: result.insertedId });
  } catch (err) {
    console.error("Signup error:", err);
    return res
      .status(500)
      .json({ error: "Signup failed", details: err.message });
  }
}
