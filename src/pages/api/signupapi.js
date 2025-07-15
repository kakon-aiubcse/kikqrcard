import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

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

  const { name, email, phone, password, profileImageBase64 } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("kikqrcard");
    const users = db.collection("users");

    // Check for existing user
    const existingUser = await users.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      profileImageBase64: profileImageBase64 || null,
      createdAt: new Date(),
    };

    const result = await users.insertOne(newUser);

    if (result.insertedId) {
      return res.status(201).json({ message: "User created" });
    } else {
      throw new Error("Insert failed");
    }
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
