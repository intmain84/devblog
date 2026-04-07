import { z } from "zod";

export const PasswordSchema = z.object({
  email: z.string().email(),
});

export type PasswordSchemaType = z.infer<typeof PasswordSchema>;
