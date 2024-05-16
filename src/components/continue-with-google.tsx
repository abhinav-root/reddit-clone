import Image from "next/image";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { loginWithGoogle } from "@/app/signup/_actions";

export default function ContinueWithGoogle() {
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
