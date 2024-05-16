"use server";

import prisma from "@/helpers/db";
import { CreateCommentSchema, createCommentSchema } from "../_schemas";
import { validateRequest } from "@/lucia";

export async function getPostById(postId: string) {
  try {
    if (!postId) {
      return null;
    }
    const post = await prisma.post.findUnique({
      where: { id: Number(postId) },
      include: { community: true },
    });
    return post;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getCommentsByPostId(
  postId: number,
  page: number,
  limit: number
) {
  try {
    if (!postId) {
      return [];
    }
    const skip = page === 1 ? 0 : limit * page;
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      where: { postId },
      include: { author: { select: { username: true } } },
      skip,
      take: limit,
    });
    return comments;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function createComment(form: CreateCommentSchema, postId: number) {
  try {
    const validationResult = await createCommentSchema.safeParse(form);
    if (!validationResult.success) {
      return { success: false, statusCode: 400, error: "Validation error" };
    }
    const { user } = await validateRequest();
    if (!user) {
      return {
        success: false,
        statusCode: 401,
        error: "Please login to continue",
      };
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return { success: false, statusCode: 404, error: "Invalid postId" };
    }

    const { body } = validationResult.data;
    const comment = await prisma.comment.create({
      data: { body, authorId: user.id, postId: post.id },
      include: { author: { select: { username: true } } },
    });

    return {
      success: true,
      data: comment,
      statusCode: 201,
      message: "Comment created",
    };
  } catch (error) {
    console.log(error);
    return { success: false, statusCode: 500, error: "Internal Server Error" };
  }
}
