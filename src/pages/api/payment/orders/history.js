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

    const orders = await db
      .collection("orders")
      .find({ email })
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json({ orders });
  } catch (err) {
    console.error("Fetch order history error:", err);
    return res.status(500).json({ error: "Failed to fetch order history" });
  }
}
