import { Thread } from "@/types/interfaces";

export default function ThreadView({ thread }: { thread: Thread }) {
  <div className="space-y-10">
    <div className="border-b pb-4">
      <h1 className="text-2xl font-bold tracking-tight">
        /{thread.channelId}/ — {thread.subject}
      </h1>
      <p className="text-sm text-muted-foreground">Thread #{thread.id}</p>
    </div>

    <div className="rounded-lg border p-5 bg-muted/30">
      <PostItem post={thread.origin} isOP />
    </div>

    <div className="space-y-4">
      {replies.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>

    {!thread.locked && (
      <ReplyForm board={thread.channelId} threadId={thread.id} />
    )}
  </div>;
}
