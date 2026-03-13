import { PaginatedThread } from "@/types/interfaces";
import { PostItem } from "@/components/post";
import { ReplyForm } from "@/components/reply-form";

export function ThreadView({ thread }: { thread: PaginatedThread }) {
  return (
    <div className="space-y-10">
      <div className="border-b pb-4">
        {/*<h1 className="text-2xl font-bold tracking-tight">
          Thread No.{thread.id}
        </h1>*/}
        <p className="text-sm text-muted-foreground">Thread #{thread.id}</p>
      </div>

      <div className="rounded-lg border p-5 bg-muted/30">
        <PostItem post={thread.op} isOriginal />
      </div>

      <div className="space-y-3">
        {thread.replies.map((r) => (
          <PostItem key={r.id} post={r} />
        ))}
      </div>

      {!thread.isLocked && (
        <ReplyForm channel={thread.channelId} threadId={thread.id} />
      )}
    </div>
  );
}
