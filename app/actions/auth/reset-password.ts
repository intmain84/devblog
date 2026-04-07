"use server";

import { db } from "@/lib/db";
import { getPasswordResetTokenByToken } from "@/lib/passwordResetToken";
import { getUserByEmail } from "@/lib/user";
import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/schemas/ResetPasswordSchema";
import bcrypt from "bcryptjs";
import { success } from "zod";

export const resetPassword = async (
  values: ResetPasswordSchemaType,
  token?: string | null,
) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid password" };

  if (!token) return { error: "Error. Try to send your email again" };

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) return { error: "Error. Try to send your email again" };

  const isExpired = new Date(existingToken.expires) < new Date();
  if (isExpired)
    return {
      error: "Your link from email is outdateed. Send your email again",
    };

  const user = await getUserByEmail(existingToken.email);
  if (!user) return { error: "User doesn't exist!" };

  const { password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await db.passwordResetToken.delete({ where: { id: existingToken.id } });

    return { success: "Your password is updated" };
  } catch (error) {
    return { error: "Something went wrong. Try again" };
  }
};
