import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import clientPromise from "/lib/mongodb/config";
import { getPlan, calculateOrderPrice } from "@/../lib/bkash/plans";
import { sendOrderEmail } from "@/../lib/mailer";

// "initiated" / "completed" are legacy statuses from the old bKash order flow.
const COUNTED_STATUSES = ["placed", "initiated", "completed"];

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const email = session.user.email;

  const { name, phone, address, city, insideDhaka } = req.body;
  if (!name || !phone || !address || !city) {
    return res.status(400).json({ error: "Missing delivery details" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("kikqrcard");
    const orders = db.collection("orders");
    const users = db.collection("users");

    const priorOrderCount = await orders.countDocuments({
      email,
      status: { $in: COUNTED_STATUSES },
    });
    const isFirstOrder = priorOrderCount === 0;

    if (!isFirstOrder) {
      const user = await users.findOne({ email });
      const plan = getPlan(user?.plan);
      if (!plan) {
        return res.status(403).json({
          error: "You must purchase a plan before ordering additional cards.",
        });
      }

      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const ordersThisMonth = await orders.countDocuments({
        email,
        status: { $in: COUNTED_STATUSES },
        createdAt: { $gte: startOfMonth },
      });

      if (ordersThisMonth >= plan.cardOrderQuota) {
        return res.status(403).json({
          error: `You have reached your monthly order limit of ${plan.cardOrderQuota} cards for the ${plan.name} plan.`,
        });
      }
    }

    const pricing = calculateOrderPrice({ insideDhaka: !!insideDhaka, isFirstOrder });
    const invoiceNumber = `KIK-ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const orderDoc = {
      invoiceNumber,
      email,
      name: String(name).trim(),
      phone: String(phone).trim(),
      address: String(address).trim(),
      city: String(city).trim(),
      insideDhaka: !!insideDhaka,
      isFirstOrder,
      cardPrice: pricing.cardPrice,
      deliveryCharge: pricing.deliveryCharge,
      vat: pricing.vat,
      total: pricing.total,
      currency: "BDT",
      status: "placed",
      createdAt: new Date(),
    };

    const result = await orders.insertOne(orderDoc);

    try {
      await sendOrderEmail(orderDoc);
    } catch (mailError) {
      // Owner is notified by email only, so an unsent email means a lost order. Roll back.
      console.error("Order email error:", mailError.message);
      await orders.deleteOne({ _id: result.insertedId });
      return res.status(502).json({ error: "Could not send your order. Please try again." });
    }

    await orders.updateOne({ _id: result.insertedId }, { $set: { emailSent: true } });

    return res.status(200).json({
      orderId: result.insertedId,
      invoiceNumber,
      pricing,
    });
  } catch (error) {
    console.error("Order create error:", error.message);
    return res.status(500).json({ error: "Failed to create order" });
  }
};

export default handler;
