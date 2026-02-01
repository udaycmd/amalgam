"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {BOARDS} from "@/lib/data";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import {useState} from "react";

export function AppSidebar() {
	const pathname = usePathname();

	return (
		<div className="hidden border-r bg-sidebar md:block w-64 shrink-0 h-screen sticky top-0 overflow-hidden">
			<div className="flex h-full flex-col">
				<div className="flex h-14 items-center border-b px-4">
					<Link className="flex items-center gap-2 font-semibold" href="/">
						<span className="text-xl font-bold tracking-tight">Hello</span>
					</Link>
				</div>
				<ScrollArea className="flex-1">
					<div className="p-4 py-2">
						<h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
							Boards
						</h4>
						<div className="grid gap-1">
							{BOARDS.map((board) => (
								<Link
									key={board.id}
									href={`/${board.id}`}
								>
									<Button
										variant={pathname === `/${board.id}` ? "secondary" : "ghost"}
										className={cn(
											"w-full justify-start font-normal",
											pathname === `/${board.id}` && "font-medium"
										)}
									>
										<span className="mr-2 text-muted-foreground">/{board.id}/</span>
										{board.name}
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

export function MobileNav() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden mr-2">
					<Menu className="h-5 w-5"/>
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="pr-0 w-72">
				<ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
					<div className="pr-6">
						<h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
							Boards
						</h4>
						<div className="grid gap-1">
							{BOARDS.map((board) => (
								<Link
									key={board.id}
									href={`/${board.id}`}
									onClick={() => setOpen(false)}
								>
									<Button
										variant={pathname === `/${board.id}` ? "secondary" : "ghost"}
										className={cn(
											"w-full justify-start font-normal",
											pathname === `/${board.id}` && "font-medium"
										)}
									>
										<span className="mr-2 text-muted-foreground">/{board.id}/</span>
										{board.name}
									</Button>
								</Link>
							))}
						</div>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	)
}
