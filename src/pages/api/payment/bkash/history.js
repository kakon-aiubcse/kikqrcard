import clientPromise from "/lib/mongodb/config";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("kikqrcard");

    const payments = await db
      .collection("payments")
      .find({ email })
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json({ payments });
  } catch (err) {
    console.error("Fetch payment history error:", err);
    return res.status(500).json({ error: "Failed to fetch payment history" });
  }
}
