"use server";

import prisma from "@/helpers/db";
import { faker } from "@faker-js/faker";

export async function createUsers() {
  console.log("Creating users");
  const data = [];
  for (let i = 0; i < 1000; i++) {
    const user = {
      username: faker.person.fullName(),
      email: faker.internet.email(),
    };
    data.push(user);
  }
  await prisma.user.createMany({ skipDuplicates: true, data });
}

export async function createCommunities() {
  console.log("Creating Communities");
  const str = "abcdefghijklmnopqrs";
  const data = [];

  for (const c of str) {
    const randomUsers = await prisma.user.findMany({
      where: { username: { contains: c } },
      take: 50,
    });
    for (const user of randomUsers) {
      const entry = {
        name: faker.lorem.word({ length: { min: 3, max: 21 } }),
        title: faker.lorem.words({ min: 3, max: 5 }),
        description: faker.lorem.words({ min: 5, max: 20 }),
        createdById: user.id,
      };
      data.push(entry);
    }
  }

  await prisma.community.createMany({ data, skipDuplicates: true });
}

export async function createPosts() {
  console.log("Creating Posts");
  const str = "abcdefghijklmnopqrs";
  const data = [];

  for (const ch of str) {
    const randomUsers = await prisma.user.findMany({
      take: 50,
      where: { username: { contains: ch } },
    });
    for (const user of randomUsers) {
      const randomCommunities = await prisma.community.findMany({
        take: 50,
        where: { name: { contains: ch } },
      });
      for (const community of randomCommunities) {
        const entry = {
          title: faker.lorem.words({ min: 3, max: 5 }),
          body: faker.lorem.text(),
          authorId: user.id,
          communityId: community.id,
        };
        data.push(entry);
      }
    }
  }

  await prisma.post.createMany({ skipDuplicates: true, data });
}

export async function createComments() {
  console.log("Creating Comments");
  const str = "abcdefghijklmnopqrs";

  const data = [];

  for (const ch of str) {
    const randomUsers = await prisma.user.findMany({
      where: { username: { contains: ch } },
      take: 50
    });
    for (const user of randomUsers) {
      const posts = await prisma.post.findMany({
        where: { title: { contains: ch } },
        take: 50
      });
      for (const post of posts) {
        const entry = {
          postId: post.id,
          upvotes: getRandomNumber(),
          downvotes: getRandomNumber(),
          body: faker.lorem.sentence(),
          authorId: user.id
        }
        data.push(entry)
      }
    }
  }

  console.log({len: data.length})
  await prisma.comment.createMany({skipDuplicates: true, data})
}

function getRandomNumber() {
  // Generate a random number between 0 (inclusive) and 1 (exclusive)
  const random = Math.random();

  // Scale the random number to be between 1 and 100
  const randomNumber = Math.floor(random * 100) + 1;

  return randomNumber;
}
