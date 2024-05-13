"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CommunityLogoPicker from "./_components/community-logo-picker";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CreateCommunitySchema, createCommunitySchema } from "./_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormMessage } from "@/components/ui/form";
import { CreateCommunity } from "./_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateCommunityPage() {
  const [file, setFile] = useState<File | null>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<CreateCommunitySchema>({
    defaultValues: { name: "", title: "", description: "" },
    resolver: zodResolver(createCommunitySchema),
  });

  const communityName = watch("name");

  const onSubmitHandler = async (values: CreateCommunitySchema) => {
    const response = await CreateCommunity(values);
    if (!response.success) {
      if (response.statusCode === 401) {
        router.push("/login", {scroll: false});
      }
      toast.error(response.error, { position: "bottom-center" });
      return;
    }
    toast.success(response.message, { position: "bottom-center" });
    router.push(`/r/${communityName}`,);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Card className="max-w-[500px] mx-auto my-4">
        <CardHeader>
          <CardTitle className={cn("text-2xl")}>
            Create a new community
          </CardTitle>
          <CardDescription>Name and style your community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col space-y-2 items-start">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-2 items-start">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-2 items-start">
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder=""
                id="description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description?.message}
                </p>
              )}
            </div>
            <CommunityLogoPicker file={file} setFile={setFile} />
            <div className="text-left space-y-2">
              <Label htmlFor="related-communities">Related Communities</Label>
              <Input
                id="related-communities"
                placeholder="Search Communities"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex space-x-20 justify-between">
          <Button variant="outline" className="w-full" asChild>
            <Link href={"/"}>Cancel</Link>
          </Button>
          <Button className="w-full" type="submit">
            Create
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
