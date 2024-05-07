"use server";

import { loginSchema, LoginSchema } from "../_schemas";

export async function login(form: LoginSchema) {
  try {
    const validationResult = loginSchema.safeParse(form);
    if (!validationResult.success) {
      return { success: false, error: "Validation error" };
    }
    const {email, password} = validationResult.data
    console.log({email, password})
    return {success: true, message: ""}
  } catch (error) {
    console.log(error);
    return { success: false, error: "Internal Server Error" };
  }
}
