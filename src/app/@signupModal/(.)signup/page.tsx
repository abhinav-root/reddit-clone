"use client";

import { SignupForm } from "@/app/signup/_components/signup-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupModal() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const onOpenChangeHandler = () => {
    if (open === true) {
      router.back();
    }
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className={cn("max-w-sm")}>
        <SignupForm />
      </DialogContent>
    </Dialog>
  );
}
