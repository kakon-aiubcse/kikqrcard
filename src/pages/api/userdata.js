import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const uri = process.env.MONGODB_URI;
  if (!uri) return res.status(500).json({ error: "Missing MongoDB URI" });

  const client = new MongoClient(uri);
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    await client.connect();
    const db = client.db("kikqrcard");
    const users = db.collection("users");

    const user = await users.findOne(
      { email },
      { projection: { password: 0 } } // Exclude password
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  } finally {
    await client.close();
  }
};

export default handler;
