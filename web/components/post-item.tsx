import { PostItemProps } from "@/lib/types";
import Image from "next/image";

export function PostItem({ post, isOriginal, isLocked }: PostItemProps) {
  return (
    <div
      className="w-fit max-w-full border bg-sidebar p-2 rounded-xl"
      id={post.id.toString()}
    >
      <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-primary font-semibold mb-2">
        <span className="bg-gray-700 px-1.5 rounded whitespace-nowrap">
          <span className="text-red-500">{post.author}</span>
          {post.ucode && (
            <span className="text-violet-500 font-mono text-sm">
              !!{post.ucode.slice(0, 14)}
            </span>
          )}
        </span>
        <span className="text-blue-700 bg-white px-1.5 rounded whitespace-nowrap">
          #{post.id.toString()}
        </span>
        {isLocked && (
          <span className="text-primary bg-red-500 px-1.5 rounded whitespace-nowrap">
            Locked
          </span>
        )}
        {isOriginal && (
          <span className="text-primary bg-green-600 px-1.5 rounded whitespace-nowrap">
            OP
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start">
        {post.media && (
          <div className="relative shrink-0">
            {post.mediaType === "image" ? (
              <Image
                src={post.media}
                alt="Post media"
                width={400}
                height={300}
                className="h-auto max-h-64 w-auto object-contain rounded"
                loading="eager"
              />
            ) : (
              <video
                src={post.media}
                controls
                className="h-auto max-h-64 w-auto object-contain rounded"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
        <p className="min-w-0 text-primary rounded-xl whitespace-pre-wrap p-2 bg-gray-700 text-sm wrap-break-word">
          {post.content}
        </p>
      </div>

      <div className="text-xs mt-2 text-muted-foreground">
        <time dateTime={new Date(post.createdAt as Date).toISOString()}>
          {new Date(post.createdAt as Date).toLocaleString("en-IN")}
        </time>
      </div>
    </div>
  );
}
