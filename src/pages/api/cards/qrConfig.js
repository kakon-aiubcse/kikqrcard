import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb/config";
import { QR_CONFIG_TYPES, validateQrConfigValue } from "@/lib/qrConfigTypes";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, email, qrType, qrValue } = req.body;

  if (!id || !email || !qrType) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid card id" });
  }

  if (!QR_CONFIG_TYPES[qrType]) {
    return res.status(400).json({ error: "Invalid QR config type" });
  }

  const valueError = validateQrConfigValue(qrType, qrValue);
  if (valueError) {
    return res.status(400).json({ error: valueError });
  }

  try {
    const client = await clientPromise;
    const db = client.db("kikqrcard");
    const cards = db.collection("myCard");

    const result = await cards.updateOne(
      { _id: new ObjectId(id), email },
      {
        $set: {
          qrConfig: {
            type: qrType,
            value: (qrValue || "").trim(),
          },
        },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Card not found" });
    }

    return res.status(200).json({ message: "QR config updated successfully" });
  } catch (err) {
    console.error("QR config update error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
