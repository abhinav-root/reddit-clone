"use server";

import * as crypto from "crypto";

import { signIn } from "@/auth";
import { SignupSchema, signupSchema } from "../_schemas";
import prisma from "@/helpers/db";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export async function loginWithGoogle() {
  await signIn("google");
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
    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(password + salt + pepper, 12);
    await prisma.user.create({
      data: { username, email, password: hashedPassword, salt },
    });
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    await signIn("credentials", {email, password, redirect: false});
    return { success: true, message: "Account created successfully." };
  } catch (err) {
    // TODO: AuthError handling
    console.log(err);
    if (err instanceof AuthError) {
      if (err.type === "CallbackRouteError") {
        return { success: false, error: "Invalid email or password" };
      }
    }
    return { success: false, error: "Internal Server Error." };
  }
}

function generateSalt(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}
