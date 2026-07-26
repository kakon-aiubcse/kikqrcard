import clientPromise from "../../../lib/mongodb/config";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Valid email is required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("kikqrcard");
    const users = db.collection("users");

    // Lowercase email to ensure consistent querying
    const user = await users.findOne(
      { email: email.toLowerCase() },
      { projection: { password: 0 } } // Exclude password
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ error: "Failed to fetch user", details: error.message });
  }
};

export default handler;
