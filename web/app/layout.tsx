import type { Metadata } from "next";
import type { ApiResponse, ChannelInfo } from "@amalgam/shared";
import { Outfit } from "next/font/google";
import { Sidebar, MobileSideBar } from "@/components/sidebar";
import { env } from "@/env";
import React from "react";
import Link from "next/link";
import "./globals.css";

const baseFont = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const org = env.NEXT_PUBLIC_ORG_NAME;

export const metadata: Metadata = {
  title: org,
  description: "Anonymous discussion platform",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const channels = (await (
    await fetch(`${env.BACKEND_API_BASE}/channels`, {
      next: { revalidate: 3600 },
    })
  ).json()) as ApiResponse<ChannelInfo[]>;

  channels.error && console.error(channels.error);
  return (
    <html
      lang="en"
      data-scroll-behaviour="smooth"
      className={`antialiased ${baseFont.variable}`}
    >
      <body className="min-h-screen bg-background">
        <div className="relative flex min-h-screen flex-col md:flex-row">
          <Sidebar channels={channels.data} />
          <div className="flex-1 flex flex-col min-w-0 z-0">
            <header className="sticky top-0 z-9 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 lg:hidden">
              <div className="flex h-14 items-center gap-3">
                <MobileSideBar channels={channels.data} />
                <Link href="/" className="text-lg font-medium">
                  {org}
                </Link>
              </div>
            </header>
            <main className="flex-1 w-full">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
