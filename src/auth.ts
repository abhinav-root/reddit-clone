import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "./helpers/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async ({ email, password }) => {
        let user = null;

        if (!email || !password) {
          throw new Error("Missing email or password");
        }

        user = await prisma.user.findUnique({
          where: { email: email as string },
        });
        console.log({user})
        if (!user) {
          throw new Error("Invalid email or password");
        }

        const pepper = process.env.PASSWORD_PEPPER as string;
        const bcrypt = require("bcrypt");
        const isCorrectPassword: boolean = await bcrypt.compare(
          password + user.salt! + pepper,
          user.password
        );
        console.log({isCorrectPassword})
        if (!isCorrectPassword) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],
});
