import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" })
    .max(64, { message: "Password cannot exceed 64 characters" })
    .refine((password) => !/(password|qwerty)/i.test(password), {
      message: "Password contains a common pattern",
    }),
});
