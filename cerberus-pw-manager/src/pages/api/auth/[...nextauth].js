import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/connectDB";
import User from "@/models/user";

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
    cookie: {
      name: "cerberus_token",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    },
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, user, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          await connectDB();
          const user = await User.findOne({
            username: credentials.username,
          }).select("+password");
          let correctPassword;

          if (!user) {
            (await connectDB()).closeConnection();
            throw new Error("No user found");
          }

          correctPassword = await user.correctPassword(
            credentials.password,
            user.password
          );
          console.log("credentials.password", credentials.password);
          console.log("correctPassword", correctPassword);
          if (!correctPassword) {
            (await connectDB()).closeConnection();
            throw new Error("Invalid password");
          }

          (await connectDB()).closeConnection();
          console.log({ name: user.username, id: user.id });

          return { name: user.username, id: user.id };
        } catch (error) {
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
});
