"use server";

import * as crypto from "crypto";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";

import { SignupSchema, signupSchema } from "../_schemas";
import prisma from "@/helpers/db";
import { lucia } from "@/lucia";

export async function loginWithGoogle() {
  // await signIn("google");
}

export async function signup(form: SignupSchema) {
  try {
    const validationResult = signupSchema.safeParse(form);
    if (!validationResult.success) {
      return { success: false, error: "Invalid form values." };
    }

    const pepper = process.env.PASSWORD_PEPPER;
    if (!pepper) {
      throw new Error("PEPPER is not defined");
    }

    const { email, password, username } = validationResult.data;
    const emailExists = await prisma.user.findUnique({ where: { email } });
    if (emailExists) {
      return {
        success: false,
        error: "Email address is already in use. Please use a different email.",
      };
    }
    const salt = generateSalt(100);
    const hashedPassword = await hash(password + salt + pepper);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword, salt },
    });
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true, message: "Account created successfully." };
  } catch (err) {
    console.log(err);
    return { success: false, error: "Internal Server Error"};
  }
}

function generateSalt(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}
