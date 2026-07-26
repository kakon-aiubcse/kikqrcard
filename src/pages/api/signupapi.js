import bcrypt from "bcrypt";
import clientPromise from "../../../lib/mongodb/config";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, password, profileImageBase64 } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("kikqrcard");
    const users = db.collection("users");

    // Normalize email for consistent checking
    const normalizedEmail = email.toLowerCase();

    // Check if user already exists
    const existingUser = await users.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare new user document
    const newUser = {
      name,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      profileImageBase64: profileImageBase64 || null,
      createdAt: new Date(),
    };

    // Insert new user
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
