import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must have 6 or more charachters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
