import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import React from "react";
import { Toaster } from "sonner";
import DefaultLeftSidebar from "@/components/sidebars/default-left-sidebar";
import DefaultRightSidebar from "@/components/sidebars/default-right-sidebar";
import LeftSidebar from "@/components/sidebars/_components/left-sidebar";
import RightSidebar from "@/components/sidebars/_components/right-sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Reddit",
  description: "A reddit clone creating using NextJS",
};

export default function RootLayout({
  children,
  signupModal,
  loginModal,
}: Readonly<{
  children: React.ReactNode;
  signupModal: React.ReactNode;
  loginModal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-white text-slate-900 antialiased min-h-screen overflow-hidden",
          poppins.className
        )}
      >
        <Navbar />

        <div className="container max-w-[1500px] mx-auto flex min-h-screen">
          <LeftSidebar />
          <div className="grow-[5] min-w-[500px] max-w-[850px] text-center">{children}</div>
          <RightSidebar />
          {signupModal}
          {loginModal}
        </div>
        <Toaster richColors closeButton duration={3000} />
      </body>
    </html>
  );
}




