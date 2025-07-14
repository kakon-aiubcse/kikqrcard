// /src/pages/api/login.js

import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

// Avoid reconnecting every time in serverless
let cachedClient = null;
const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
  if (cachedClient && cachedClient.topology?.isConnected()) {
    return cachedClient;
  }
  const client = new MongoClient(uri, {
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

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("kikqrcard");
    const users = db.collection("users");

    const user = await users.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
