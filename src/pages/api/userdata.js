import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return res.status(500).json({ error: "Missing MongoDB URI" });
  }

  const { email } = req.body;
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Valid email is required" });
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("kikqrcard");
    const users = db.collection("users");

    const user = await users.findOne(
      { email },
      { projection: { password: 0 } } // Exclude password
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ error: "Failed to fetch user", details: error.message });
  } finally {
    await client.close();
  }
};

export default handler;
