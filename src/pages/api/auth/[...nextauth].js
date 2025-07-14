import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const uri = process.env.MONGODB_URI;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db("kikqrcard");
        const user = await db.collection("users").findOne({ email: credentials.email });
        await client.close();

        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(), // convert MongoDB ObjectId to string
          name: user.name,
          email: user.email,
          image: user.profileImage,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  // ✅ THIS FIXES YOUR ERROR:
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
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
