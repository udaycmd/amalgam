"use client";

export default function Spaceman() {
    return (
        <div className="grid grid-cols-5 grid-rows-6 gap-2 border border-emerald-700 p-7 rounded-xs mx-auto w-[90%] sm:container mb-15 text-gray-900 bg-purple-100">
            <div className="col-span-3 row-span-6 p-1">
                <span className="bg-purple-500 text-xs rounded-xs p-1 sm:text-sm">
                    Spaces
                </span>
            </div>
            <div className="col-span-2 row-span-6 col-start-4 p-1">
                <span className="bg-purple-500 text-xs rounded-xs p-1 sm:text-sm">
                    Trending discussions
                </span>
            </div>
        </div>
    );
}
