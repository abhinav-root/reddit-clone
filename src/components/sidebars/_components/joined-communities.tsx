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
import { useEffect, useState } from "react";
import Link from "next/link";
import { getJoinedCommunities } from "@/app/r/submit/_actions";

type Community = {
  id: string;
  name: string;
  logo: string | null;
};

export default function JoinedCommunities() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [viewCommunities, setViewCommunities] = useState(true);

  useEffect(() => {
    async function loadCommunities() {
      const data = await getJoinedCommunities();
      setCommunities(data);
    }
    loadCommunities();
  }, []);

  return (
    <div className="my-4">
      <Collapsible open={viewCommunities} onOpenChange={setViewCommunities}>
        <CollapsibleTrigger className="hover:bg-gray-100 flex items-center justify-between w-full py-3 px-4 rounded-md font-light uppercase tracking-widest text-sm">
          <span>Communities</span> <IoChevronDownSharp />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-2 pb-4">
          <div className="flex flex-col">
            <Link
              href={"/r"}
              className="flex items-center space-x-2 hover:bg-gray-100 py-2 px-4 rounded-md"
            >
              <IoAddOutline className="size-6" />{" "}
              <span className="text-sm">Create a community</span>
            </Link>
            {communities.map((community) => (
              <Link
                key={community.id}
                href={`/r/${community.name}`}
                className="flex items-center justify-between hover:bg-gray-100 py-2 px-4 rounded-md"
              >
                <span className="flex items-center space-x-2">
                  <Image
                    src={community.logo ?? "default-community-icon.svg"}
                    alt="Default Community Icon"
                    height={24}
                    width={24}
                    priority
                  />{" "}
                  <span className="text-sm">{community.name}</span>
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
