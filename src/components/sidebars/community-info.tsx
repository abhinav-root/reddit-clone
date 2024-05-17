"use client";

import { getCommunityInfo } from "@/app/_actions";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type Community = {
  name: string;
  title: string;
  description: string | null;
} | null;

export default function CommunityInfo({ name }: { name: string }) {
  const [community, setCommunity] = useState<Community | undefined>(null);

  useEffect(() => {
    getCommunityInfo(name).then((result) => setCommunity(result));
  }, []);

  return (
    <div className="w-full">
      <div className="mx-4 bg-gray-100 px-2">
        <Button>Join</Button>
        <div className="space-y-6 mt-4">
          <div className="font-medium">{community?.name}</div>
          <div className="text-gray-600 tracking-wider">{community?.description}</div>
        </div>
      </div>
    </div>
  );
}
