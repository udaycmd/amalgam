import type { Metadata } from "next";

import { Outfit } from "next/font/google";
import { Sidebar } from "@/components/sidebar";
import { MobileSideBar } from "@/components/sidebar";
import { env } from "@/env.mjs";
import React from "react";
import Link from "next/link";
import "./globals.css";

const baseFont = Outfit({ subsets: ["latin"] });
const org = env.NEXT_PUBLIC_ORG_NAME;

export const metadata: Metadata = {
  title: org,
  description: "Anonymous discussion platform",
};

async function getChannels() {
  try {
    const res = await fetch(`${env.BACKEND_API_ROOT}/channels`);

    if (!res.ok) {
      console.error(`unable to fetch channels, server status: ${res.status}`);
      return [];
    }

    return res.json();
  } catch (e) {
    if (e instanceof Error) {
      console.error(`unable to fetch channels: ${e.message}`);
    }

    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const channels = await getChannels();

  return (
    <html lang="en">
      <body
        className={`${baseFont.className} antialiased min-h-screen bg-background`}
      >
        <div className="relative flex min-h-screen flex-col md:flex-row">
          <Sidebar channels={channels} />
          <div className="flex-1 flex flex-col min-w-0 z-0">
            <header className="sticky top-0 z-9 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 md:hidden">
              <div className="container flex h-15 items-center">
                <MobileSideBar channels={channels} />
                <div className="flex font-medium">
                  <Link href="/">{org}</Link>
                </div>
              </div>
            </header>
            <main className="flex-1 w-full">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
