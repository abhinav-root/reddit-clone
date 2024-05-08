import Image from "next/image";
import Link from "next/link";
import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { validateRequest } from "@/lucia";

export default async function Navbar() {
  const { user } = await validateRequest();
  return (
    <div className="border-b sticky top-0 z-10 bg-white">
      <nav className="py-4 flex justify-between items-center container max-w-[1500px] mx-auto">
        <span className="flex items-center space-x-4">
          <HamburgerMenuIcon
            className={cn(
              "size-10 hover:bg-gray-300 rounded-full p-2 hover:cursor-pointer sm:hidden"
            )}
          />
          <Logo />
        </span>
        <Searchbar />
        <span className="space-x-6 flex items-center">
          <MagnifyingGlassIcon className="size-6 hover:cursor-pointer md:hidden" />
          {!user && (
            <>
              <Button
                variant={"outline"}
                className={cn("tracking-wide hidden sm:inline-flex")}
                asChild
              >
                <Link href={"/login"} scroll={false}>
                  Login
                </Link>
              </Button>
              <Button className={cn("tracking-wide sm:hidden")} asChild>
                <Link href={"/login"} scroll={false}>
                  Login
                </Link>
              </Button>
              <Button className={cn("hidden sm:inline-flex")} asChild>
                <Link href={"/signup"} scroll={false}>
                  Sign up
                </Link>
              </Button>
            </>
          )}
        </span>
      </nav>
    </div>
  );
}

function Logo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link href="/">
            <LogoIcon />
            <LogoFull />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Go to Reddit Home</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function LogoFull() {
  return (
    <Image
      src="logo-full.svg"
      alt="App logo"
      width={110}
      height={110}
      className="hidden sm:inline-block w-28 h-auto"
      priority
    />
  );
}

function LogoIcon() {
  return (
    <Image
      src="logo-icon.svg"
      alt="App logo"
      width={36}
      height={36}
      className="sm:hidden"
      priority
    />
  );
}

function Searchbar() {
  return (
    <div className="grow hidden md:inline-flex md:max-w-xs lg:max-w-xl items-center space-x-1 bg-gray-100 hover:bg-gray-200 rounded-2xl px-4 py-0.5 focus-within:shadow-md">
      <MagnifyingGlassIcon className="size-6 text-slate-600" />
      <Input
        type="search"
        placeholder="Search Reddit"
        className={cn("w-full  focus-visible:ring-0 border-none outline-none")}
      />
    </div>
  );
}
