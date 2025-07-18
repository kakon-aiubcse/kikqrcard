import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name, phone, password, profileImageBase64 } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required for update" });
  }

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("kikqrcard");
    const users = db.collection("users");

    // Build the updateFields object with only provided values
    const updateFields = {};
    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;
    if (profileImageBase64) updateFields.profileImageBase64 = profileImageBase64;

    if (password && password.trim()) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const result = await users.updateOne(
      { email: email.toLowerCase() },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes applied" });
    }

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update failed:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
