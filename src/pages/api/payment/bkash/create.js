import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import clientPromise from "/lib/mongodb/config";
import { bkashHeaders, bkashUrl } from "@/../lib/bkash/client";
import { getPlan } from "@/../lib/bkash/plans";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { planId } = req.body;
  const plan = getPlan(planId);
  if (!plan) {
    return res.status(400).json({ error: "Invalid plan" });
  }

  try {
    const headers = await bkashHeaders();
    const invoiceNumber = `KIK-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const { data } = await axios.post(
      bkashUrl("/tokenized/checkout/create"),
      {
        mode: "0011",
        payerReference: session.user.email,
        callbackURL: process.env.BKASH_CALLBACK_URL,
        amount: plan.amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: invoiceNumber,
      },
      { headers },
    );

    if (!data?.paymentID) {
      return res.status(502).json({ error: data?.statusMessage || "Failed to create payment" });
    }

    const client = await clientPromise;
    const db = client.db("kikqrcard");
    await db.collection("payments").insertOne({
      paymentID: data.paymentID,
      invoiceNumber,
      email: session.user.email,
      planId,
      planName: plan.name,
      amount: plan.amount,
      currency: "BDT",
      status: "initiated",
      createdAt: new Date(),
    });

    return res.status(200).json({ bkashURL: data.bkashURL, paymentID: data.paymentID });
  } catch (error) {
    console.error("bKash create error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to initiate bKash payment" });
  }
};

export default handler;
