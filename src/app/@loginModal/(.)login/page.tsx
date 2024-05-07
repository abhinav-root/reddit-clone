"use client";

import LoginForm from "@/app/login/_components/login-form";
import {
  Dialog,
  DialogContent,
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
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
