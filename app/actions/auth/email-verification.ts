"use server";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";

const verifyEmailAction = async (token: string) => {
  const emailVerificationToken = await db.emailVerificationToken.findUnique({
    where: { token },
  });
  if (!emailVerificationToken)
    return { error: "Verification token doesn't exist" };

  const isExpired = new Date(emailVerificationToken.expires) < new Date();
  if (isExpired) return { error: "Verification token is expired" };

  const existingUser = await getUserByEmail(emailVerificationToken.email);
  if (!existingUser) return { error: "User doesn't exist" };

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: emailVerificationToken.email,
    },
  });

  return { success: "Email verified!" };
};

export default verifyEmailAction;
