import type {Metadata} from "next";

import {Outfit} from "next/font/google";
import {Sidebar} from "@/components/sidebar";
import {Header} from "@/components/header";
import React from "react";
import "./globals.css";

const baseFont = Outfit({subsets: ["latin"]});
const alwaysDark = "dark";

export const metadata: Metadata = {
	title: process.env.NEXT_PUBLIC_ORG_NAME,
	description: "Anonymous discussion platform",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={alwaysDark}>
		<body className={`${baseFont.className} antialiased min-h-screen bg-background`}>
		<div className="relative flex min-h-screen flex-col md:flex-row">
			<Sidebar/>
			<div className="flex-1 flex flex-col min-w-0 z-0">
				<Header/>
				<main className="flex-1 w-full bg-background">
					{children}
				</main>
			</div>
		</div>
		</body>
		</html>
	);
}
