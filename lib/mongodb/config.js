import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const options = {
  // only use this in development with self-signed certs
  tlsAllowInvalidCertificates: process.env.NODE_ENV !== "production",
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In dev, use global to prevent re-creating the client
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production (e.g., Netlify), don't use global
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
