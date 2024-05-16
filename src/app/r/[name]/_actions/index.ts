"use server";

import prisma from "@/helpers/db";

export async function getPostsByCommunityId(
  communityId: string,
  page: number,
  limit: number
) {
  try {
    const skip = page === 1 ? 0 : page * limit;
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      where: { communityId },
      skip,
      take: limit,
      include: {community: true}
    });
    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
}
