import { z } from "zod";

export const createCommentSchema = z.object({
  body: z
    .string()
    .min(1, "Cannot be empty")
    .max(100, "Cannot be more than 100 characters"),
});

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
