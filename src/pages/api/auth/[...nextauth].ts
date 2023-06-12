import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/connectDB";
import User from "@/models/user";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

const options: NextAuthOptions = {
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token?.id as string;
      return Promise.resolve(session);
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();
          const user = await User.findOne({
            username: credentials.username,
          }).select("+password");

          if (!user) {
            (await connectDB()).closeConnection();
            throw new Error("No user found");
          }

          const correctPassword = await user.correctPassword(
            credentials.password,
            user.password
          );
          if (!correctPassword) {
            (await connectDB()).closeConnection();
            throw new Error("Invalid password");
          }

          (await connectDB()).closeConnection();

          return { name: user.username, id: user.id };
        } catch (error) {
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
};

export default NextAuth(options);
