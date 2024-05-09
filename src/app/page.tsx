import { BsArrowUpRightCircle } from "react-icons/bs";
import { LiaHomeSolid } from "react-icons/lia";
import { IoBarChartOutline } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { IoChevronDownSharp } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { GoLaw } from "react-icons/go";
import { LuScrollText } from "react-icons/lu";
import { CgNotes } from "react-icons/cg";
import { MdOutlineEventNote } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Home() {
  const communties = [
    "196",
    "1Password",
    "52Book",
    "AajMaineJana",
    "AbruptChaos",
    "accidents",
    "Accounting",
    "airpods",
    "AdviceAnimals",
    "algorithms",
    "AmazonPrime",
    "AMD",
    "AmericaBad",
    "amiugly",
    "AirTravelIndia",
    "Androind",
    "Analytics",
    "androidthemes",
    "AndroidTV",
    "apple",
    "AppleMusic",
    "appletv",
    "AppleWatch", 
  ];
  const top = ["one", "two", "three", "four", "five", "six"];
  const posts = ["post 1", "post 2", "post 3", "post 4", "post 5"];

  return (
    <div className="min-h-screen bg-red-100 flex">
      <aside className="hidden lg:inline-flex ring bg-white w-72 shrink-[4] p-4 pb-14 flex-col min-h-screen h-80 pt-20">
      <ScrollArea className="">
       
        <div className="flex flex-col w-full space-y-2 my-4">
          <Link
            href={"#"}
            className="flex items-center hover:bg-gray-100 py-2 px-4 rounded-md"
          >
            <LiaHomeSolid className="mr-2 size-5" /> <span>Home</span>
          </Link>
          <Link
            href={"#"}
            className="flex items-center hover:bg-gray-100 py-2 px-4 rounded-md"
          >
            <BsArrowUpRightCircle className="mr-2 size-5" />{" "}
            <span>Popular</span>
          </Link>
          <Link
            href={"#"}
            className="flex items-center hover:bg-gray-100 py-2 px-4 rounded-md"
          >
            <IoBarChartOutline className="mr-2 size-5" /> <span>All</span>
          </Link>
        </div>
        <Separator />
        <div className="my-4">
          <Collapsible>
            <CollapsibleTrigger className="hover:bg-gray-100 flex items-center justify-between w-full py-3 px-4 rounded-md font-light uppercase tracking-widest text-sm">
              <span>Communities</span> <IoChevronDownSharp />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-2 pb-4">
              <div className="flex flex-col">
                <Link
                  href={"/community"}
                  className="flex items-center space-x-2 hover:bg-gray-100 py-2 px-4 rounded-md"
                >
                  <IoAddOutline className="size-6" />{" "}
                  <span className="text-sm">Create a community</span>
                </Link>
                {communties.map((c) => (
                  <Link
                    key={c}
                    href={"/community"}
                    className="flex items-center justify-between hover:bg-gray-100 py-2 px-4 rounded-md"
                  >
                    <span className="flex items-center space-x-2">
                      <Image
                        src={"default-community-icon.svg"}
                        alt="Default Community Icon"
                        height={24}
                        width={24}
                      />{" "}
                      <span className="text-sm">{c}</span>
                    </span>
                    <GoStar className="size-8 rounded-full p-2 hover:bg-gray-300" />
                  </Link>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <Separator />
        <div className="flex flex-col w-full space-y-2 my-4">
          <Link
            href={"#"}
            className="flex items-center hover:bg-gray-100 py-2 px-4 rounded-md"
          >
            <GoLaw className="mr-2 size-5" /> <span>Privacy Policy</span>
          </Link>
          <Link
            href={"#"}
            className="flex items-center hover:bg-gray-100 py-2 px-4 rounded-md"
          >
            <LuScrollText className="mr-2 size-5" />{" "}
            <span>Content Policy</span>
          </Link>
          <Link
            href={"#"}
            className="flex items-center hover:bg-gray-100 py-2 px-4 rounded-md"
          >
            <MdOutlineEventNote className="mr-2 size-5" /> <span>User Agreement</span>
          </Link>
        </div>
        </ScrollArea>
      </aside>
      <main className="lg:basis-[500px] shrink-0 grow">Posts</main>
      <aside className="hidden lg:inline-flex ring bg-white w-72 shrink-[4]">
        Right Sidebar
      </aside>
    </div>
  );
}
