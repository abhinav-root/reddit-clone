"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginSchema } from "../_schemas";
import { login } from "../_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ContinueWithGoogle from "@/components/continue-with-google";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: LoginSchema) {
    const response = await login(values);
    if (response?.success === false) {
      toast.error(response?.error ?? "Some error occured", {
        position: "bottom-center",
      });
      return;
    }
    toast.success("Logged in", { position: "bottom-center" });
    router.replace("/");
  }
  return (
    <div className="border p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-6">
        Login to your account
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-sm text-right relative bottom-2 text-blue-500 hover:underline">
            <Link href={"/forgot-password"}>Forgot Password?</Link>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </form>
      </Form>
      <div className="space-y-4 mt-4">
        <p className="text-gray-500 text-center text-sm">Or continue with</p>
        <ContinueWithGoogle />
        <div className="text-sm text-center">
          Not on reddit?{" "}
          <Link href={"/signup"} className="text-blue-500 hover:underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
