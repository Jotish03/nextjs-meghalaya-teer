import NextAuth, { getSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { compare } from "bcrypt";

export default NextAuth({
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET, // Add the NEXTAUTH_SECRET from environment variables
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const client = await MongoClient.connect(process.env.MONGODB_URI); // Use MONGODB_URI from environment variables

          const db = client.db("nextjsteer");
          const collection = db.collection("users");

          const user = await collection.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found");
          }

          const isValidPassword = await compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          await client.close();

          // Include the role property in the session object
          return {
            ...user,
            role: user.role, // Default role if not present
          };
        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error(error.message); // Throw the specific error message
        }
      },
    }),
  ],
});
