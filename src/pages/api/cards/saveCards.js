import clientPromise from "../../../../lib/mongodb/config";
import { getPlan, FREE_TIER } from "../../../../lib/bkash/plans";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
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
    savedCard,
  } = req.body;

  if (
    !email ||
    !cardName ||
    !name ||
    !profession ||
    !phone ||
    !quote ||
    !bgGrad ||
    !bgStyle ||
    savedCard === undefined
  ) {
    return res.status(400).json({ error: "Missing required card fields" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("kikqrcard");
    const cards = db.collection("myCard");
    const users = db.collection("users");

    // Normalize cardName for consistent storage and lookup
    const normalizedCardName = cardName.toLowerCase();

    const existingCard = await cards.findOne({
      email,
      cardName: normalizedCardName,
      bgGrad,
      bgStyle,
    });

    if (existingCard) {
      return res.status(409).json({ error: "Card already exists" });
    }

    const user = await users.findOne({ email });
    const plan = getPlan(user?.plan);
    const virtualCardLimit = plan ? plan.virtualCardLimit : FREE_TIER.virtualCardLimit;

    const currentCardCount = await cards.countDocuments({ email });
    if (currentCardCount >= virtualCardLimit) {
      return res.status(403).json({
        error: `You have reached your virtual card limit of ${virtualCardLimit}. Upgrade your plan to create more cards.`,
      });
    }

    const newCard = {
      email,
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
      savedCard,
      createdAt: new Date(),
    };

    const result = await cards.insertOne(newCard);

    if (result.insertedId) {
      return res.status(201).json({ message: "Card saved successfully" });
    } else {
      throw new Error("Insert failed");
    }
  } catch (err) {
    console.error("Card save error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
