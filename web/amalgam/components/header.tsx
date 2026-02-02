import {MobileSideBar} from "@/components/sidebar";
import Link from "next/link";

export function Header() {
	const Org = process.env.NEXT_PUBLIC_ORG_NAME;

	return (
		<header
			className="sticky top-0 z-9 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 md:hidden">
			<div className="container flex h-15 items-center">
				<MobileSideBar/>
				<div className="flex font-medium">
					<Link href="/">{Org}</Link>
				</div>
			</div>
		</header>
	);
}
