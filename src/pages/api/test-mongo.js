import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    // Just ping the database to confirm connection
    await client.db().command({ ping: 1 });
    res.status(200).json({ message: "MongoDB connected successfully" });
  } catch (error) {
    res.status(500).json({ error: "MongoDB connection failed", details: error.message });
  } finally {
    await client.close();
  }
}
