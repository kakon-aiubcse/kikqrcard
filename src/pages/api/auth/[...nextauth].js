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
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.profileImage, // base64 string
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/authentication/login",
  },
};

export default NextAuth(authOptions);
