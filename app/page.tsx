import Image from "next/image";
import Link from "next/link";
import Spaceman from "@/app/components/spaceman";

const footerLinks: { name: string; href: string }[] = [
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
    { name: "Contact", href: "/contact" },
];

export default function Home() {
    return (
        <div className="min-h-screen overflow-hidden w-full">
            <main className="flex relative container mx-auto py-13 items-center justify-center">
                <Image
                    src="/tello.webp"
                    alt="logo"
                    width={350}
                    height={320}
                    loading="eager"
                />
            </main>

            <Spaceman />

            <footer className="font-medium border-t-2 border-dotted text-black border-t-emerald-700 text-xs">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col items-center gap-4 justify-center">
                        <div className="flex gap-2 text-sky-600">
                            {footerLinks.map((l) => (
                                <Link
                                    key={l.name}
                                    href={l.href}
                                    className="hover:underline"
                                >
                                    {l.name}
                                </Link>
                            ))}
                        </div>
                        <span>&copy; 2025 Tello discussion hub.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
