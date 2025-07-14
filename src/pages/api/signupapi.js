import clientPromise from "../../../lib/mongodb/config";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (req.headers["content-type"] !== "application/json") {
    return res.status(400).json({ error: "Invalid content-type. Expected JSON." });
  }

  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Valid email is required" });
  }

  const sanitizedEmail = email.trim().toLowerCase(); // ✅ now safe to use

  try {
    const client = await clientPromise;
    const db = client.db("kikqrcard");
    const users = db.collection("users");

    const user = await users.findOne(
      { email: sanitizedEmail },
      { projection: { password: 0 } } // exclude password
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({
      error: "Failed to fetch user",
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
