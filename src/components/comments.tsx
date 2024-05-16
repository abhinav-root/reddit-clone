"use client";

import {
  CreateCommentSchema,
  createCommentSchema,
} from "@/app/r/[name]/posts/[postId]/_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { createComment, getCommentsByPostId } from "@/app/r/[name]/posts/[postId]/_actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsDot } from "react-icons/bs";
import { intlFormatDistance } from "date-fns";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";

type IComment = {
  author: {
    username: string;
  };
} & {
  id: string;
  body: string;
  postId: number;
  upvotes: number;
  downvotes: number;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function Comments({ postId }: { postId: number }) {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState<IComment[]>([]);
  const { register, handleSubmit, formState: {isSubmitting}, reset } = useForm<CreateCommentSchema>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: { body: "" },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function fetchInitialComments() {
    setLoading(true)
    const comments = await getCommentsByPostId(postId, page, 10);
    setPage(page + 1);
    setComments(comments);
    setLoading(false)
  }

  async function loadMoreComments() {
    const comments = await getCommentsByPostId(postId, page + 1, 10);
    setPage(page + 1);
    setComments((prev) => [...prev, ...comments]);
  }

  useEffect(() => {
    fetchInitialComments();
  }, []);

  useEffect(() => {
    if (page > 1 && inView) {
      loadMoreComments();
    }
  }, [inView]);

  async function onSubmitHandler(values: CreateCommentSchema) {
    if (!values.body) {
      return;
    }
    const response = await createComment(values, postId)
    if (!response.success) {
      if (response.statusCode === 401) {
        router.push("/login")
      }
      toast.error(response.error, {position: "bottom-center"})
      return;
    }
    if (response.data) {
      setComments(prev => [response.data, ...prev])
    }
    reset();
  }

  if (loading) {
   return (
    <div className="my-8">
      <ReloadIcon className="h-6 w-6 animate-spin mx-auto" />
    </div>
   )
  }

  return (
    <div className="px-4 my-2">
      <div className="my-4">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Input placeholder="Enter a comment" {...register("body")} />
          <div className="text-right my-2">
            <Button disabled={isSubmitting}>{isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}Comment</Button>
          </div>
        </form>
      </div>
      <div className="my-10">
        <div>
          {comments.map((comment, index) => {
            return (
              <div key={comment.id} className="text-left my-6">
                <div className="flex space-x-2 items-center">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User Avatar"
                    />
                    <AvatarFallback>
                      {comment.author.username.split(" ")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">
                    {comment.author.username}
                  </span>
                  <BsDot />
                  <span className="text-sm text-gray-700">
                    {intlFormatDistance(comment.createdAt, new Date())}
                  </span>
                </div>
                <div className="px-12">{comment.body}</div>
                {index === comments.length - 1 && <div ref={ref}></div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
