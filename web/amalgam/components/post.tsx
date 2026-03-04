import { PostItemProps } from "@/types/interfaces";

export function PostItem({ post, isOriginal }: PostItemProps) {
  return (
    <div
      className={`rounded-xs border p-4 ${
        isOriginal ? "bg-background" : "bg-muted/20"
      }`}
    >
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
        <span>Anonymous #{post.author}</span>
        <span>{post.createdAt}</span>
      </div>

      <p className="whitespace-pre-wrap text-sm leading-relaxed">
        {post.content}
      </p>
    </div>
  );
}
