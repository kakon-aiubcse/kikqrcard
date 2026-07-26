import axios from "axios";
import clientPromise from "/lib/mongodb/config";
import { bkashHeaders, bkashUrl } from "@/../lib/bkash/client";

const handler = async (req, res) => {
  const { paymentID, status } = req.query;

  if (!paymentID) {
    return res.redirect("/payment/billings?status=error");
  }

  const client = await clientPromise;
  const db = client.db("kikqrcard");
  const payments = db.collection("payments");

  if (status !== "success") {
    await payments.updateOne(
      { paymentID },
      { $set: { status: status === "cancel" ? "cancelled" : "failed", updatedAt: new Date() } },
    );
    return res.redirect(`/payment/billings?status=${status === "cancel" ? "cancelled" : "failed"}`);
  }

  try {
    const headers = await bkashHeaders();
    const { data } = await axios.post(
      bkashUrl("/tokenized/checkout/execute"),
      { paymentID },
      { headers },
    );

    if (data?.statusCode !== "0000" || data?.transactionStatus !== "Completed") {
      await payments.updateOne(
        { paymentID },
        { $set: { status: "failed", executeResponse: data, updatedAt: new Date() } },
      );
      return res.redirect("/payment/billings?status=failed");
    }

    const paymentDoc = await payments.findOneAndUpdate(
      { paymentID },
      {
        $set: {
          status: "completed",
          trxID: data.trxID,
          paymentExecuteTime: data.paymentExecuteTime,
          executeResponse: data,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    );

    const email = paymentDoc.value?.email;
    const planId = paymentDoc.value?.planId;

    if (email) {
      await db.collection("users").updateOne(
        { email },
        {
          $set: {
            plan: planId,
            planActivatedAt: new Date(),
          },
        },
      );
    }

    return res.redirect(`/payment/billings?status=success&trxID=${data.trxID}`);
  } catch (error) {
    console.error("bKash execute error:", error.response?.data || error.message);
    await payments.updateOne(
      { paymentID },
      { $set: { status: "failed", updatedAt: new Date() } },
    );
    return res.redirect("/payment/billings?status=failed");
  }
};

export default handler;
