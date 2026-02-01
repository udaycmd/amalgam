import type {Metadata} from "next";

import {Outfit} from "next/font/google"
import {AppSidebar} from "@/components/app-sidebar";
import {Header} from "@/components/header";
import React from "react";
import "./globals.css";

const baseFont = Outfit({subsets: ["latin"]});
const alwaysDark = "dark"

export const metadata: Metadata = {
	title: process.env.ORG,
	description: "Anonymous discussion platform",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={alwaysDark}>
		<body className={`${baseFont.className} antialiased min-h-screen bg-background z-0`}>
		<div className="relative flex min-h-screen flex-col md:flex-row">
			<AppSidebar/>
			<div className="flex-1 flex flex-col min-w-full">
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
