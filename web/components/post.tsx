import { PostItemProps } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function PostItem({ post, isOriginal, isLocked }: PostItemProps) {
  return (
    <div className="border bg-sidebar p-3 rounded-xs" id={post.id.toString()}>
      <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-primary font-semibold">
        <div>By &rarr;</div>
        <span className="bg-gray-700 text-red-600 px-1.25 break-all rounded-sm">
          {post.author}
        </span>
        <span className="text-blue-700 bg-white px-1.25 break-all rounded-sm">
          No.{post.id.toString()}
        </span>
        <span
          className={cn(
            "text-primary bg-red-500 px-1.25 rounded-sm",
            !isLocked ? "hidden" : "",
          )}
        >
          Locked
        </span>
        <span
          className={cn(
            "text-primary bg-green-600 px-1.25 rounded-sm",
            !isOriginal ? "hidden" : "",
          )}
        >
          OP
        </span>
      </div>

      <div className="flex overflow-hidden">
        {post.media && (
          <div className="relative overflow-hidden m-2 sm:m-4">
            <Image
              src={post.media}
              alt="image_here"
              width={400}
              height={300}
              className="h-auto max-h-64 object-contain"
              loading="eager"
            />
          </div>
        )}
        <p className="mt-2 w-full text-primary whitespace-pre-wrap border p-4px bg-gray-700 text-justify text-sm wrap-break-word rounded-xs overflow-hidden">
          {post.content}
        </p>
      </div>

      <div className="text-xs mt-2 text-muted-foreground">
        Created at{" "}
        <time dateTime={new Date(post.createdAt as Date).toISOString()}>
          {new Date(post.createdAt as Date).toLocaleString()}
        </time>
      </div>
    </div>
  );
}
