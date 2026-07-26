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
    isloved,
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
    isloved === undefined
  ) {
    return res.status(400).json({ error: "Missing required card fields" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("kikqrcard");
    const cards = db.collection("mylovedCards");

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
      isloved,
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
