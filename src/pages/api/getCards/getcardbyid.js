import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb/config";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid card id" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("kikqrcard");
    const cards = db.collection("myCard");

    const card = await cards.findOne(
      { _id: new ObjectId(id) },
      {
        projection: {
          name: 1,
          profession: 1,
          phone: 1,
          contactEmail: 1,
          website: 1,
          address: 1,
          quote: 1,
          bgGrad: 1,
          bgStyle: 1,
          pattern: 1,
          qrConfig: 1,
        },
      },
    );

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    return res.status(200).json({ card });
  } catch (err) {
    console.error("Fetch card by id error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
