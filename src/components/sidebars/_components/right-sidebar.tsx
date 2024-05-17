"use client"

import { usePathname } from "next/navigation";
import DefaultRightSidebar from "../default-right-sidebar";
import CommunityInfo from "../community-info";

export default function RightSidebar() {
    const pathname = usePathname()
    const split = pathname.split("/r/")
    if (split.length === 2 && !split[1].includes("/") ) {
        return (
            <div className="border-l grow max-w-80 hidden lg:flex py-4">
                <CommunityInfo name={split[1].trim()} />
      </div>
        )
    }
    return (
      <div className="border-l grow max-w-80 hidden lg:flex py-4">
        <DefaultRightSidebar />
      </div>
    );
  }