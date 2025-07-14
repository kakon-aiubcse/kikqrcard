// /src/pages/api/signup.js
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const uri = process.env.MONGODB_URI; // from .env file
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, password } = req.body;

  try {
    await client.connect();
    const db = client.db("kikqrcard"); // or your DB name
    const users = db.collection("users");

    // Check if user exists
    const existing = await users.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already in use" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    return res.status(201).json({ message: "User created", userId: result.insertedId });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Signup failed", details: error.message });
  } finally {
    await client.close();
  }
}
