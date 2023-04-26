import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/connectDB";
import User from "@/models/user";
import bcrypt from "bcrypt";

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
    CredentialsProvider({
      async authorize(credentials, req) {
        const { oldPassword, newPassword } = credentials;
        try {
          // Authenticate the user and get their record
          const user = await User.findOne({ _id: req.user._id });
          if (!user) {
            throw new Error("User not found");
          }

          // Check if the old password matches
          const isMatch = await bcrypt.compare(oldPassword, user.password);
          if (!isMatch) {
            throw new Error("Old password is incorrect");
          }

          // Hash the new password and update the user record
          user.password = await bcrypt.hash(newPassword, 12);
          await user.save();

          return { success: true };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
});
