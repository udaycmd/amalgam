"use client";

import {type Channel} from "@/lib/data";

import {cn} from "@/lib/utils";
import {useState} from "react";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import {env} from "@/env.mjs";
import {useChannels} from "@/hooks";
import Link from "next/link";

export function Sidebar() {
	const pathname = usePathname();
	const Org = env.NEXT_PUBLIC_ORG_NAME;
	const {data, error, isLoading} = useChannels();

	if (error) return <h1>Error</h1>;
	if (isLoading) return <h1>Loading</h1>;

	const Channels = data as Channel[];

	return (
		<div className="hidden bg-[#0E1113] overflow-hidden md:block w-70 shrink-0 min-h-screen sticky">
			<div className="flex flex-col h-full">
				<div className="flex h-17 p-5 border-b border-white">
					<Link className="text-xl font-semibold" href="/">{Org}</Link>
				</div>
				<ScrollArea>
					<div className="p-5 text-md">
						<h4 className="mb-5 font-semibold tracking-tight text-gray-400">
							All Channels
						</h4>
						<div className="grid gap-1">
							{Channels.map((channel) => (
								<Link
									key={channel.id}
									href={`/${channel.id}`}
								>
									<Button
										variant={pathname === `/${channel.id}` ? "secondary" : "ghost"}
										className={cn(
											"justify-start w-full cursor-pointer",
											pathname === `/${channel.id}` && "font-semibold"
										)}
									>
										<span className="mr-1 text-gray-400">/{channel.id}</span>{channel.name}
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

export function MobileSideBar() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const {data, error, isLoading} = useChannels();

	if (error) return <h1>Error</h1>;
	if (isLoading) return <h1>Loading</h1>;

	const Channels = data as Channel[];

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden mr-1">
					<Menu className="h-5 w-5"/>
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-70 bg-[#0E1113]">
				<SheetTitle className="sr-only"></SheetTitle>
				<ScrollArea className="h-full">
					<div className="p-5 text-sm">
						<h4 className="mb-5 font-semibold tracking-tight text-gray-400">
							All Channels
						</h4>
						<div className="grid gap-1">
							{Channels.map((channel) => (
								<Link
									key={channel.id}
									href={`/${channel.id}`}
									onClick={() => setOpen(false)}
								>
									<Button
										variant={pathname === `/${channel.id}` ? "secondary" : "ghost"}
										className={cn(
											"justify-start w-full cursor-pointer",
											pathname === `/${channel.id}` && "font-medium"
										)}
									>
										<span className="mr-1 text-gray-400">/{channel.id}</span>{channel.name}
									</Button>
								</Link>
							))}
						</div>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	)
		;
}
