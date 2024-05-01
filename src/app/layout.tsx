import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("bg-slate-50 text-slate-900 antialiased min-h-screen")}
      >
        <div className="container max-w-7xl mx-auto h-full">{children}</div>
      </body>
    </html>
  );
}
