"use client";

import Image from "next/image";
import { intlFormatDistance } from "date-fns";
import { PiArrowFatUp, PiArrowFatUpFill, PiArrowFatDown } from "react-icons/pi";
import { FaRegMessage } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { BsDot } from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { IPost } from "@/app/page";
import Link from "next/link";
import { getPostVotes, getTotalComments } from "@/app/_actions";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import prisma from "@/helpers/db";

export type PostVote = {
  id: string;
  type: "UP" | "DOWN";
  postId: number;
  createdAt: Date;
  updatedAt: Date;
};

export default function Post(post: IPost) {
  const [totalComments, setTotalComments] = useState(0);
  const [votes, setVotes] = useState<PostVote[]>([]);
  const [vote, setVote] = useState<"UP" | "DOWN" | null>(null);
  const imgSrc = post.community?.logo ?? "default-community-icon.svg";

  const upvotes = votes.filter((vote) => vote.type === "UP");
  const downvotes = votes.filter((vote) => vote.type === "DOWN");
  const netvotes = upvotes.length - downvotes.length;

  useEffect(() => {
    getTotalComments(post.id).then((result) => setTotalComments(result));
  }, []);

  useEffect(() => {
    getPostVotes(post.id).then((result) => setVotes(result));
  }, []);

  useEffect(() => {

  }, [])

  return (
    <div className="text-left px-4 py-2 my-2 rounded-md space-y-4">
      <h3 className="flex items-center space-x-2">
        <Image
          alt="Community Logo"
          height={24}
          width={24}
          src={imgSrc}
          priority
        />
        <span className="text-sm font-medium hover:underline">
          <Link
            href={`/r/${post.community.name}`}
          >{`r/${post.community.name}`}</Link>
        </span>
        <span className="">
          <BsDot />
        </span>
        <span className="text-sm text-gray-700">
          {intlFormatDistance(post.createdAt, new Date())}
        </span>
      </h3>
      <h2 className="text-xl font-medium">{post.title}</h2>
      <div className="space-y-2">
        <p className="text-gray-700 tracking-wide">{post.body}</p>
        <div className="flex items-center space-x-4">
          <span className="py-0 px-2 space-x-2 rounded-full bg-gray-100 flex items-center">
            <Button
              variant={"secondary"}
              className={cn("p-0 hover:text-primary")}
            >
              <PiArrowFatUp className="size-5"/>
            </Button>
            <span>{netvotes}</span>
            <Button
              variant={"secondary"}
              className={cn("p-0 hover:text-blue-500")}
            >
              <PiArrowFatDown className="size-5" />
            </Button>
          </span>
          <Button
            variant={"secondary"}
            className={cn("space-x-2 rounded-full")}
          >
            <FaRegMessage className="size-5 text-gray-600" />
            <span>{totalComments}</span>
          </Button>
          <Button
            variant={"secondary"}
            className={cn("space-x-2 rounded-full")}
          >
            <FiShare className="size-5" />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
