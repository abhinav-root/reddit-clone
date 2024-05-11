"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";
import { IoChevronDownSharp } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function JoinedCommunities() {
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
  ];
  const [viewCommunities, setViewCommunities] = useState(true);
  
  return (
    <div className="my-4">
      <Collapsible open={viewCommunities} onOpenChange={setViewCommunities}>
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
  );
}
