"use client";

import { SidebarProps } from "@/types/interfaces";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { env } from "@/env.mjs";
import Link from "next/link";

export function Sidebar({ channels }: SidebarProps) {
  const pathname = usePathname();
  const Org = env.NEXT_PUBLIC_ORG_NAME;

  return (
    <div className="hidden bg-sidebar overflow-hidden lg:block w-70 shrink-0 min-h-screen sticky">
      <div className="flex flex-col h-full">
        <div className="flex h-17 p-5 border-b border-primary">
          <Link className="text-xl font-semibold text-primary" href="/">
            {Org}
          </Link>
        </div>
        <ScrollArea>
          <div className="p-5 text-md">
            <h4 className="mb-5 font-semibold tracking-tight text-muted-foreground">
              All Channels
            </h4>
            <div className="grid gap-1">
              {channels.map((c) => (
                <Link key={c.slug} href={`/${c.slug}`}>
                  <Button
                    variant={pathname === `/${c.slug}` ? "secondary" : "ghost"}
                    className={cn(
                      "justify-start w-full cursor-pointer",
                      pathname === `/${c.slug}` && "font-semibold",
                    )}
                  >
                    <span className="mr-1 text-muted-foreground">
                      /{c.slug}
                    </span>
                    {c.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export function MobileSideBar({ channels }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-1">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-70 bg-sidebar">
        <SheetTitle className="sr-only"></SheetTitle>
        <ScrollArea className="h-full">
          <div className="p-5 text-sm">
            <h4 className="mb-5 font-semibold tracking-tight text-muted-foreground">
              All Channels
            </h4>
            <div className="grid gap-1">
              {channels.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  onClick={() => setOpen(false)}
                >
                  <Button
                    variant={pathname === `/${c.slug}` ? "secondary" : "ghost"}
                    className={cn(
                      "justify-start w-full cursor-pointer",
                      pathname === `/${c.slug}` && "font-medium",
                    )}
                  >
                    <span className="mr-1 text-muted-foreground">
                      /{c.slug}
                    </span>
                    {c.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
