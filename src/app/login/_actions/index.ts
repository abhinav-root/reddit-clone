"use server";

import { isRedirectError } from "next/dist/client/components/redirect";

import { signIn } from "@/auth";
import { loginSchema, LoginSchema } from "../_schemas";
import { AuthError } from "next-auth";

export async function login(form: LoginSchema) {
  const validationResult = loginSchema.safeParse(form);
  if (!validationResult.success) {
    return { success: false, error: "Validation error" };
  }
  const formData = new FormData();
  formData.append("email", form.email);
  formData.append("password", form.password);
  try {
    await signIn("credentials", formData);
  } catch (error) {
    console.log(error);
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { success: false, error: "Invalid email or password" };
      }
    }
    return { success: false, error: "Internal Server error" };
  }
}
