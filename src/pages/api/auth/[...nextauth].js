import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "/lib/mongodb/config";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("kikqrcard");
        const email = credentials.email.toLowerCase().trim();
        const user = await db.collection("users").findOne({ email });

        // Google-only accounts have no password set
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          isAdmin: !!user.isAdmin,
        };
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: { params: { prompt: "select_account" } },
          }),
        ]
      : []),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // optional
    updateAge: 24 * 60 * 60,
  },

  pages: {
    signIn: "/authentication/login",
  },

  callbacks: {
    // Create the user on first Google sign-in (sign up), or link Google to an
    // existing account with the same email (log in).
    async signIn({ account, profile }) {
      if (account?.provider !== "google") return true;
      if (!profile?.email || !profile.email_verified) return false;

      const client = await clientPromise;
      const users = client.db("kikqrcard").collection("users");
      const email = profile.email.toLowerCase().trim();

      const existing = await users.findOne({ email });
      if (existing) {
        const $set = { googleId: profile.sub };
        if (!existing.profileImageBase64 && profile.picture) {
          $set.profileImageBase64 = profile.picture;
        }
        await users.updateOne({ _id: existing._id }, { $set });
      } else {
        await users.insertOne({
          name: profile.name || email.split("@")[0],
          email,
          phone: "",
          password: null,
          googleId: profile.sub,
          profileImageBase64: profile.picture || null,
          createdAt: new Date(),
        });
      }
      return true;
    },

    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        // Swap the Google profile id for our own DB user
        const client = await clientPromise;
        const dbUser = await client
          .db("kikqrcard")
          .collection("users")
          .findOne({ email: profile.email.toLowerCase().trim() });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.isAdmin = !!dbUser.isAdmin;
        }
        return token;
      }
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.isAdmin = !!token.isAdmin;
      return session;
    },
  },

  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
