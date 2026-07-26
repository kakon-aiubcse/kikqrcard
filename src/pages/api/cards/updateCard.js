import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb/config";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    id,
    email,
    cardName,
    name,
    profession,
    phone,
    quote,
    contactEmail,
    website,
    address,
    bgGrad,
    bgStyle,
    pattern,
  } = req.body;

  if (
    !id ||
    !email ||
    !cardName ||
    !name ||
    !profession ||
    !phone ||
    !quote ||
    !bgGrad ||
    !bgStyle
  ) {
    return res.status(400).json({ error: "Missing required card fields" });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid card id" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("kikqrcard");
    const cards = db.collection("myCard");

    const normalizedCardName = cardName.toLowerCase();

    const result = await cards.updateOne(
      { _id: new ObjectId(id), email },
      {
        $set: {
          cardName: normalizedCardName,
          name,
          profession,
          phone,
          quote,
          contactEmail: contactEmail || "",
          website: website || "",
          address: address || "",
          bgGrad,
          bgStyle,
          pattern: pattern || "none",
        },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Card not found" });
    }

    return res.status(200).json({ message: "Card updated successfully" });
  } catch (err) {
    console.error("Card update error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
