import Сredentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./lib/user";
import { LoginSchema } from "./schemas/LoginSchema";
import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    GitHub({
      allowDangerousEmailAccountLinking: true, // позволяет связывать аккаунты с одинаковыми email
    }),
    Google({
      allowDangerousEmailAccountLinking: true, // позволяет связывать аккаунты с одинаковыми email
    }),
    Сredentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const isCorrectPassword = await bcrypt.compare(
            password,
            user.password,
          );

          if (isCorrectPassword) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
