import { MdOutlineSecurity } from "react-icons/md";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DefaultRightSidebar() {
  return (
    <aside className="w-full my-4 px-4">
      <ScrollArea className="min-h-full h-80">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center space-x-2">
                  <span>
                    <MdOutlineSecurity className="size-6 text-primary" />
                  </span>
                  <span>Reddit Premium</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="px-4 text-sm tracking-wide space-y-2">
                <li>Ad-free Browsing</li>
                <li>Avatar Gear</li>
                <li>Members Lounge</li>
                <li>Custom App Icons</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Premium</Button>
            </CardFooter>
          </Card>
        </div>
      </ScrollArea>
    </aside>
  );
}
