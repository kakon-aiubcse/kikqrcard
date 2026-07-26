import axios from "axios";
import clientPromise from "/lib/mongodb/config";
import { bkashHeaders, bkashUrl } from "@/../lib/bkash/client";

const handler = async (req, res) => {
  const { paymentID, status } = req.query;

  if (!paymentID) {
    return res.redirect("/payment/orders?status=error");
  }

  const client = await clientPromise;
  const db = client.db("kikqrcard");
  const orders = db.collection("orders");

  if (status !== "success") {
    await orders.updateOne(
      { paymentID },
      { $set: { status: status === "cancel" ? "cancelled" : "failed", updatedAt: new Date() } },
    );
    return res.redirect(`/payment/orders?status=${status === "cancel" ? "cancelled" : "failed"}`);
  }

  try {
    const headers = await bkashHeaders();
    const { data } = await axios.post(
      bkashUrl("/tokenized/checkout/execute"),
      { paymentID },
      { headers },
    );

    if (data?.statusCode !== "0000" || data?.transactionStatus !== "Completed") {
      await orders.updateOne(
        { paymentID },
        { $set: { status: "failed", executeResponse: data, updatedAt: new Date() } },
      );
      return res.redirect("/payment/orders?status=failed");
    }

    await orders.updateOne(
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
    );

    return res.redirect(`/payment/orders?status=success&trxID=${data.trxID}`);
  } catch (error) {
    console.error("Order execute error:", error.response?.data || error.message);
    await orders.updateOne(
      { paymentID },
      { $set: { status: "failed", updatedAt: new Date() } },
    );
    return res.redirect("/payment/orders?status=failed");
  }
};

export default handler;
