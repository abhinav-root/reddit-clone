import { Input } from "@/components/ui/input";
import SelectCommunity from "./_components/select-community";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Community({ params }: { params: { name: string } }) {
  return (
    <div className="py-10 px-10 text-left">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Create Post</h1>
        <SelectCommunity />
      </div>
      <div className="space-y-6 mt-10">
        <Input placeholder="Title*" />
        <Textarea placeholder="Body" rows={6}/>
      </div>
      <div className="my-4 text-right space-x-4">
        <Button variant={"secondary"}>Save draft</Button>
        <Button>Post</Button>
      </div>
    </div>
  );
}
