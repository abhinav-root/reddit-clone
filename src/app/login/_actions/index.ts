"use server";

import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { loginSchema, LoginSchema } from "../_schemas";
import prisma from "@/helpers/db";
import { lucia, validateRequest } from "@/lucia";

export async function login(form: LoginSchema) {
  const validationResult = loginSchema.safeParse(form);
  if (!validationResult.success) {
    return { success: false, error: "Validation error" };
  }
  const { email, password } = validationResult.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { success: false, error: "Invalid email or password" };
  }

  const pepper = process.env.PASSWORD_PEPPER;
  if (!pepper) {
    throw new Error("PEPPER is not defined");
  }
  const isCorrectPassword = await verify(
    user.password ?? "",
    password + user.salt + pepper
  );
  if (!isCorrectPassword) {
    return { success: false, error: "Invalid email or password" };
  }
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}

export async function logout() {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/login");
}
