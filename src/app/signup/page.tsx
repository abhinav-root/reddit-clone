import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { SignupForm } from "./_components/signup-form";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <main>
      <section className="pt-10">
        <Button variant={"ghost"} asChild>
          <Link href={"/"} className="space-x-2">
            <ArrowLeftIcon /> <span>Home</span>
          </Link>
        </Button>
        <div className="mx-auto max-w-sm">
          <SignupForm />
        </div>
      </section>
    </main>
  );
}

function GoToHome() {}
