import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  const { name, email, phone, password, profileImageBase64 } = req.body;

  try {
    await client.connect();
    const db = client.db("kikqrcard");
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      name,
      email,
      phone,
      password: hashedPassword,
      profileImage: profileImageBase64 || null, // Store base64 image
      createdAt: new Date(),
    });

    res.status(201).json({ message: "User created", userId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Signup failed", details: err.message });
  } finally {
    await client.close();
  }
}
