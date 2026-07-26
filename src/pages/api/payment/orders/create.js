import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import clientPromise from "/lib/mongodb/config";
import { bkashHeaders, bkashUrl } from "@/../lib/bkash/client";
import { getPlan, calculateOrderPrice } from "@/../lib/bkash/plans";

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
      status: { $in: ["initiated", "completed"] },
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
        status: { $in: ["initiated", "completed"] },
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
      name,
      phone,
      address,
      city,
      insideDhaka: !!insideDhaka,
      isFirstOrder,
      cardPrice: pricing.cardPrice,
      deliveryCharge: pricing.deliveryCharge,
      vat: pricing.vat,
      total: pricing.total,
      currency: "BDT",
      status: pricing.total === 0 ? "completed" : "initiated",
      createdAt: new Date(),
    };

    if (pricing.total === 0) {
      const result = await orders.insertOne(orderDoc);
      return res.status(200).json({
        free: true,
        orderId: result.insertedId,
        invoiceNumber,
        pricing,
      });
    }

    const headers = await bkashHeaders();
    const { data } = await axios.post(
      bkashUrl("/tokenized/checkout/create"),
      {
        mode: "0011",
        payerReference: email,
        callbackURL: process.env.BKASH_ORDER_CALLBACK_URL,
        amount: String(pricing.total),
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: invoiceNumber,
      },
      { headers },
    );

    if (!data?.paymentID) {
      return res.status(502).json({ error: data?.statusMessage || "Failed to create payment" });
    }

    orderDoc.paymentID = data.paymentID;
    await orders.insertOne(orderDoc);

    return res.status(200).json({ free: false, bkashURL: data.bkashURL, paymentID: data.paymentID });
  } catch (error) {
    console.error("Order create error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to create order" });
  }
};

export default handler;
