"use client";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function GoBack() {
  const router = useRouter();

  return (
    <Button variant={"secondary"} onClick={() => router.back()}>
      <IoIosArrowRoundBack className="mr-1 size-6"/>
      <span>Back</span>
    </Button>
  );
}
