"use client";

import { useEffect, useState } from "react";
import { getHomeFeed } from "./_actions";
import {
  createComments,
  createCommunities,
  createPosts,
  createUsers,
} from "@/seed";
import { useInView } from "react-intersection-observer";

import { Separator } from "@/components/ui/separator";

import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Post from "@/components/post";
import { useRouter } from "next/navigation";

export type IPost = {
  id: number;
  title: string;
  body: string | null;
  image: string | null;
  communityId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  community: {
    id: string;
    name: string;
    title: string;
    description: string | null;
    logo: string | null;
    relatedToId: string | null;
    createdById: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export default function Home() {
  const router = useRouter();
  const { ref, inView } = useInView();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);

  async function loadInitialPosts() {
    const data = await getHomeFeed(page, 10);
    setPosts(data);
    setPage(page + 1);
  }

  async function loadMorePosts() {
    setLoading(true);
    const data = await getHomeFeed(page, 10);
    setPosts((prev) => [...prev, ...data]);
    setPage((page) => page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadInitialPosts();
  }, []); 

  useEffect(() => {
    if (inView && page > 1) {
      loadMorePosts();
    }
  }, [inView]);

  return (
    <div className="overflow-y-scroll max-h-[90vh]">
      <main>
        <div className="mx-6 my-4">
          {posts.map((post, index) => {
            return (
              <div
                onClick={() => router.push(`/r/${post.community.name}/posts/${post.id}`, {scroll: false})}
                key={post.id}
              >
                <div className="my-6 hover:bg-gray-200 rounded-md">
                  <Post {...post} />
                  {index === posts.length - 1 && <div ref={ref}></div>}
                  <Separator />
                </div>
              </div>
            );
          })}
          {loading && <LoadingIcon />}
        </div>
      </main>
    </div>
  );
}

function LoadingIcon() {
  return (
    <div className="text-center flex justify-center my-4">
      <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
    </div>
  );
}
