"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
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
import { SignupSchema, signupSchema } from "../_schemas";
import { cn } from "@/lib/utils";
import { loginWithGoogle, signup } from "../_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const router = useRouter();
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: SignupSchema) {
    const response = await signup(values);
    if (!response.success) {
      toast.error(response.error, { position: "bottom-center" });
      return;
    }
    toast.success(response.message, { position: "bottom-center" });
    router.replace("/");
  }
  return (
    <div className="border p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-6">
        Create your account here
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            Create Account
          </Button>
        </form>
      </Form>
      <div className="space-y-4 mt-4">
        <p className="text-gray-500 text-center text-sm">Or continue with</p>
        <ContinueWithGoogle />
        <div className="text-sm text-center">
          Already a user?{" "}
          <Link href={"/login"} className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

function ContinueWithGoogle() {
  return (
    <form action={loginWithGoogle}>
      <Button variant={"outline"} className={cn("w-full")}>
        <Image
          src={"google.svg"}
          alt="Google"
          height={20}
          width={20}
          priority
          className="mr-2"
        />
        Continue with Google
      </Button>
    </form>
  );
}
