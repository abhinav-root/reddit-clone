import Image from "next/image";
import Link from "next/link";
import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { IoAddOutline } from "react-icons/io5";
import { HiOutlineBell } from "react-icons/hi2";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/app/login/_actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarText } from "@/helpers/utils";

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
          {!user && (
            <>
              <MagnifyingGlassIcon className="size-7 hover:cursor-pointer md:hidden" />
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
          {user && (
            <div className="flex items-center space-x-5 md:space-x-10">
              <MagnifyingGlassIcon className="size-7 hover:cursor-pointer md:hidden text-gray-600" />
              <Link href={"/r/submit"}>
                <IoAddOutline
                  size={30}
                  className={cn("text-gray-600 lg:hidden")}
                />
              </Link>
              <Button
                className={cn("hidden lg:inline-flex")}
                variant={"outline"}
                asChild
              >
                <Link href={"/r/submit"}>
                  <IoAddOutline size={26} className="mr-1" />
                  Create
                </Link>
              </Button>
              <HiOutlineBell size={26} className={cn("text-gray-600")} />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback>
                      {getAvatarText(user.username)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                  <DropdownMenuItem>
                    <form action={logout}>
                      <Button variant={"link"} type="submit">
                        Logout
                      </Button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
