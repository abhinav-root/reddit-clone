import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters long.")
    .max(20, "Username cannot exceed 20 characters."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(50, "Password cannot exceed 50 characters."),
});

export type SignupSchema = z.infer<typeof signupSchema>;
