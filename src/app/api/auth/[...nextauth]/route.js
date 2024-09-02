import UserModal from "DBconfig/models/UserModal";
import { connectMongoDB } from "DBconfig/mongo";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {},

      async authorize(credentials, req, res) {
        await connectMongoDB();
        const user = await UserModal.findOne({
          email: credentials.email,
        });

        if (user) {
          const match = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (match) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],

  secret: `${process.env.NEXTAUTH_SECRET}`,

  pages: {
    signIn: "/signin",
  },
  
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
