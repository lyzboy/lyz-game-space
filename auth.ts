import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/prisma";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

import { Role } from "./app/generated/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google, GitHub],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
});
