import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "Name must have 4 or more charachters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must have 6 or more charachters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
