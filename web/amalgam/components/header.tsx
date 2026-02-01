import {MobileNav} from "@/components/app-sidebar";
import Link from "next/link";

export function Header() {
	const Org = process.env.ORG

	return (
		<header
			className="sticky top-0 z-9 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 md:hidden">
			<div className="container flex h-15 items-center">
				<MobileNav/>
				<div className="flex font-medium">
					<Link href="/">
						<span className="inline-block">{Org}</span>
					</Link>
				</div>
			</div>
		</header>
	);
}
