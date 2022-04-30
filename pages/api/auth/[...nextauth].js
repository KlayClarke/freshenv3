import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  // configure google authentication provider
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_SECRET,
    }),
  ],
});
