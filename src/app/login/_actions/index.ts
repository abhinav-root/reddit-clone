"use server";

import { isRedirectError } from "next/dist/client/components/redirect";

import { loginSchema, LoginSchema } from "../_schemas";

export async function login(form: LoginSchema) {
  const validationResult = loginSchema.safeParse(form);
  if (!validationResult.success) {
    return { success: false, error: "Validation error" };
  }
  const { email, password } = validationResult.data;
}
