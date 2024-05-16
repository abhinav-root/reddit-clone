"use client";

import { useEffect, useState } from "react";
import { getPostsByCommunityId } from "../_actions";
import { useInView } from "react-intersection-observer";
import Post from "@/components/post";
import { IPost } from "@/app/page";
import { useRouter } from "next/navigation";

export default function CommunityPosts({
  communityId,
}: {
  communityId: string;
}) {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const router = useRouter();

  async function loadInitialPosts() {
    const data = await getPostsByCommunityId(communityId, page, 10);
    setPage(page + 1);
    setPosts(data);
  }

  async function loadMorePosts() {
    const data = await getPostsByCommunityId(communityId, page, 10);
    setPage(page + 1);
    setPosts((prev) => [...prev, ...data]);
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
    <div className="min-h-[90vh] max-h-[90vh] overflow-y-scroll">
      {posts.map((post, index) => {
        return (
          <div key={post.id} className="mx-4 rounded hover:cursor-pointer hover:bg-gray-100" onClick={() => router.push(`/r/${post.community.name}/posts/${post.id}`)}>
            <Post {...post} />
            {index === posts.length-1 && <div ref={ref}></div>}
          </div>
        );
      })}
    </div>
  );
}
