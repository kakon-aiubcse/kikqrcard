import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const uri = process.env.MONGODB_URI;

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    tlsAllowInvalidCertificates: true,
    serverSelectionTimeoutMS: 5000, // Prevent long timeouts on Netlify
  });

  await client.connect();
  const db = client.db("kikqrcard");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { db } = await connectToDatabase();
          const user = await db.collection("users").findOne({ email: credentials.email });

          if (!user) throw new Error("User not found");
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) throw new Error("Invalid password");

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (err) {
          console.error(" Authorization Error:", err.message);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/authentication/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },

  debug: true, // ✅ Turn off in production if not needed
};

export default NextAuth(authOptions);
