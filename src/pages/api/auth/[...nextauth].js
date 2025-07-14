import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const uri = process.env.MONGODB_URI;
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri, { tlsAllowInvalidCertificates: true });
  await client.connect();
  cachedClient = client;
  return client;
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
          const client = await connectToDatabase();
          const db = client.db("kikqrcard");
          const user = await db.collection("users").findOne({ email: credentials.email });
          if (!user) throw new Error("User not found");

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) throw new Error("Invalid password");

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            // exclude phone and image here to keep token small
          };
        } catch (err) {
          console.error("Authorize error:", err);
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
        // no phone or image here
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      // If you need phone/image on frontend, fetch from DB via API separately
      return session;
    },
  },
};
export default NextAuth(authOptions);
