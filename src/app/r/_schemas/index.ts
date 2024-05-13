import { z } from "zod";

export const createCommunitySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(21, "Name cannnot be more than 21 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers and underscore are allowed"
    ),
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(50, "Title cannnot be more than 50 characters"),
  description: z
    .string()
    .trim()
    .min(3, "Description must be at least 3 characters")
    .max(100, "Description cannnot be more than 100 characters"),
});

export type CreateCommunitySchema = z.infer<typeof createCommunitySchema>;
