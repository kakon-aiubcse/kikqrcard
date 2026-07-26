import clientPromise from "/lib/mongodb/config";
import { requireAdmin } from "/lib/adminAuth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await requireAdmin(req, res);
  if (!session) return;

  try {
    const client = await clientPromise;
    const db = client.db("kikqrcard");

    const [userCount, myCardCount, allCardCount, payments] = await Promise.all([
      db.collection("users").countDocuments(),
      db.collection("myCard").countDocuments(),
      db.collection("allCards").countDocuments(),
      db.collection("payments").find({}).toArray(),
    ]);

    const completedPayments = payments.filter((p) => p.status === "completed");
    const revenue = completedPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    return res.status(200).json({
      userCount,
      cardCount: myCardCount + allCardCount,
      paymentCount: payments.length,
      completedPaymentCount: completedPayments.length,
      revenue,
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    return res.status(500).json({ error: "Failed to fetch stats" });
  }
}
