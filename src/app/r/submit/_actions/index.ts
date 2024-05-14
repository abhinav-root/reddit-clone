"use server";

import { validateRequest } from "@/lucia";
import { createPostSchema, CreatePostSchema } from "../_schemas";
import prisma from "@/helpers/db";

export async function createPost(
  form: CreatePostSchema,
  communityName: string
) {
  try {
    const { user } = await validateRequest();
    console.log({user})
    if (!user) {
      return {
        success: false,
        statusCode: 401,
        error: "Please login to continue",
      };
    }

    const validationResult = createPostSchema.safeParse(form);
    if (!validationResult.success) {
      return { success: false, statusCode: 400, error: "Validation error" };
    }

    const community = await prisma.community.findUnique({
      where: { name: communityName },
    });
    console.log({community})
    if (!community) {
      return { success: false, statusCode: 400, error: "Invalid community" };
    }

    const { title, body } = validationResult.data;
    const newPost = await prisma.post.create({
      data: { title, body, communityId: community.id, authorId: user.id },
    });
    return { success: true, statusCode: 201, data: newPost };
  } catch (err) {
    console.log(err);
    return { success: false, statusCode: 500, error: "Internal Server Error" };
  }
}

export async function getJoinedCommunities() {
  const data = await prisma.community.findMany({
    select: { id: true, logo: true, name: true },
  });
  return data;
}
