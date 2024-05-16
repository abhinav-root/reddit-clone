"use client";

import { Input } from "@/components/ui/input";
import SelectCommunity from "./_components/select-community";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPost } from "./_actions";
import { CreatePostSchema, createPostSchema } from "./_schemas";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Community({ params }: { params: { name: string } }) {
  const router = useRouter();
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { body: undefined, title: "" },
  });

  const onSubmitHandler = async (values: CreatePostSchema) => {
    const response = await createPost(values, selectedCommunity);
    if (!response.success) {
      if (response.statusCode === 401) {
        router.push("/login");
      }
      toast.error(response.error, { position: "bottom-center" });
      return;
    }
    toast.success("Post created", { position: "bottom-center" });
    reset()
  };

  return (
    <div className="py-10 px-10 text-left">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Create Post</h1>
          <SelectCommunity
            selectedCommunity={selectedCommunity}
            setSelectedCommunity={setSelectedCommunity}
          />
        </div>
        <div className="space-y-6 mt-10">
          <div className="space-y-2">
            <Input placeholder="Title*" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Body"
              rows={6}
              {...register("body", {
                setValueAs: (v) => (v === "" ? undefined : v),
              })}
            />
            {errors.body && (
              <p className="text-sm text-destructive">{errors.body.message}</p>
            )}
          </div>
        </div>
        <div className="my-4 text-right space-x-4">
          <Button variant={"secondary"}>Save draft</Button>
          <Button type="submit">Post</Button>
        </div>
      </form>
    </div>
  );
}
