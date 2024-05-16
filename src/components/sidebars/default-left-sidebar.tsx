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
import JoinedCommunities from "./_components/joined-communities";

export default function DefaultLeftSidebar() {
  return (
    <aside className="w-full px-4">
      <ScrollArea className="min-h-full h-80 pb-20">
        <div className="flex flex-col w-full space-y-2 my-4">
          <Link
            href={"/"}
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
        <JoinedCommunities />
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
            <LuScrollText className="mr-2 size-5" /> <span>Content Policy</span>
          </Link>
          <Link
            href={"#"}
            className="flex items-center hover:bg-gray-100 py-2 px-4 rounded-md"
          >
            <MdOutlineEventNote className="mr-2 size-5" />{" "}
            <span>User Agreement</span>
          </Link>
        </div>
      </ScrollArea>
    </aside>
  );
}

