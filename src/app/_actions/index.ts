"use server";

import prisma from "@/helpers/db";

// 0 10
// 1 10
export async function getHomeFeed(page: number, limit: number) {
  const skip = page === 1 ? 0 : page * limit;
  const posts = await prisma.post.findMany({
    orderBy: { id: "asc" },
    skip,
    take: limit,
    include: { community: true },
  });
  return posts;
}

export async function getTotalComments(postId: number) {
  const totalComments = await prisma.comment.count({ where: { postId } });
  return totalComments;
}

export async function getPostVotes(postId: number) {
  const votes = await prisma.postVote.findMany({ where: { postId } });
  return votes;
}
