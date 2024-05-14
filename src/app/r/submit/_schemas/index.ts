import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, "Must be minimum 10 characters")
    .max(50, "Cannot be more than 50 characters"),
  body: z
    .string()
    .trim()
    .min(10, "Must be minimum 10 characters")
    .max(1000, "Cannot be more than 1000 characters")
    .optional()
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
