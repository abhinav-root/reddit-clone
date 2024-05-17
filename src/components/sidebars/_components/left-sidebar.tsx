"use client";

import DefaultLeftSidebar from "../default-left-sidebar";

export default function LeftSidebar() {
  return (
    <div className="border-r grow max-w-80 hidden lg:flex">
      <DefaultLeftSidebar />
    </div>
  );
}
