"use server";

import prisma from "@/helpers/db";
import { CreateCommunitySchema, createCommunitySchema } from "../_schemas";
import { validateRequest } from "@/lucia";

export async function CreateCommunity(form: CreateCommunitySchema) {
  const { user } = await validateRequest();
  if (!user) {
    return {
      success: false,
      statusCode: 401,
      error: "Please login to continue",
    };
  }
  const validationResult = createCommunitySchema.safeParse(form);
  if (!validationResult.success) {
    return { success: false, statusCode: 200, error: "Validation Error" };
  }

  const { name, title, description } = validationResult.data;
  const communityExists = await prisma.community.findUnique({
    where: { name },
  });

  if (communityExists) {
    return {
      success: false,
      statusCode: 409,
      error: "A community already exists with this name",
    };
  }

  await prisma.community.create({
    data: { name, title, description, createdById: user.id },
  });

  return { success: true, statusCode: 200, message: "Community Created" };
}

export async function findCommunityByName(name: string) {
  try {
    const community = await prisma.community.findUnique({ where: { name } });
    return community;
  } catch (error) {
    console.log(error);
    return null;
  }
}
