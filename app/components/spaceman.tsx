import Link from "next/link";
import spaceData from "@/public/data/spaces.json";

type Space = {
    title: string;
    subspaces: string[];
};

export default function Spaceman() {
    const spaces = spaceData as Space[];

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-6 gap-2 border border-emerald-700 p-7 rounded-sm mx-auto w-[90%] sm:container mb-15 text-gray-900 bg-purple-100">
            <div className="col-span-1 md:col-span-3 row-span-6 p-1">
                <div className="text-sm italic rounded-xs p-1 md:text-xl">
                    Spaces
                </div>
                {spaces.map((s) => (
                    <ul key={s.title} className="p-1">
                        <li className="pb-2 text-purple-700 font-bold text-sm underline">
                            {s.title}
                        </li>
                        {s.subspaces.map((sub) => (
                            <Link
                                key={sub}
                                href="/not_found"
                                className="text-xs hover:bg-blue-400 hover:font-bold rounded-xs block w-fit"
                            >
                                {sub}
                            </Link>
                        ))}
                    </ul>
                ))}
            </div>
            <div className="col-span-1 md:col-span-2 row-span-6 md:col-start-4 p-1">
                <div className="text-sm italic rounded-xs p-1 md:text-xl">
                    Trending discussions
                </div>
            </div>
        </div>
    );
}
