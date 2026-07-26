import clientPromise from "../../../../lib/mongodb/config";

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
    isfavourite,
  } = req.body;

  // Basic validation + type checks
  if (
    !email ||
    typeof email !== "string" ||
    !cardName ||
    typeof cardName !== "string" ||
    !name ||
    typeof name !== "string" ||
    !profession ||
    typeof profession !== "string" ||
    !phone ||
    typeof phone !== "string" ||
    !quote ||
    typeof quote !== "string" ||
    !bgGrad ||
    typeof bgGrad !== "string" ||
    !bgStyle ||
    typeof bgStyle !== "string" ||
    typeof isfavourite !== "boolean"
  ) {
    return res.status(400).json({ error: "Missing or invalid required card fields" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("kikqrcard");
    const cards = db.collection("myfavouritedCards");

    const normalizedCardName = cardName.toLowerCase().trim();

    // Check for duplicate card (same email + normalized cardName + bgGrad + bgStyle)
    const existingCard = await cards.findOne({
      email,
      cardName: normalizedCardName,
      bgGrad,
      bgStyle,
    });

    if (existingCard) {
      return res.status(409).json({ error: "Card already exists" });
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
      isfavourite,
      createdAt: new Date(),
    };

    const result = await cards.insertOne(newCard);

    if (result.insertedId) {
      return res.status(201).json({
        message: "Card saved successfully",
        id: result.insertedId,
      });
    } else {
      throw new Error("Insert failed");
    }
  } catch (err) {
    console.error("Card save error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
