import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

export default function GoToHome() {
  return (
    <Button variant={"ghost"} asChild>
      <Link href={"/"} className="space-x-2">
        <ArrowLeftIcon /> <span>Home</span>
      </Link>
    </Button>
  );
}
