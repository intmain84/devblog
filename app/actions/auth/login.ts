"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/user";
import { LOGIN_REDIRECT_URL } from "@/routes";
import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { AuthError } from "next-auth";

export const logIn = async (values: LoginSchemaType) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user || !user.password) {
    return {
      error: "Invalid credentials!",
    };
  }

  // if (!user.emailVerified) {
  //   return {
  //     error: "Email not verified!",
  //   };
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: LOGIN_REDIRECT_URL,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials!",
          };
        default:
          return {
            error: "Something went wrong!",
          };
      }
    }
    throw error;
  }
};
