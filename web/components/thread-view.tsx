"use client";

import { PaginatedThread, Post } from "@/lib/types";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostItem } from "@/components/post";
import { getThread } from "@/actions/thread";

export function ThreadView({
  init,
  channelId,
  threadId,
}: {
  init: PaginatedThread;
  channelId: string;
  threadId: string;
}) {
  const tinfo = init.tinfo;
  const [replies, setReplies] = useState<Post[]>(init.replies);
  const [nxtCurr, setNextCursor] = useState(init.nxtCurr);
  const [isPending, startTransition] = useTransition();

  const loadMore = async () => {
    if (!nxtCurr || isPending) {
      return;
    }

    startTransition(async () => {
      const nxt = await getThread(threadId, channelId, nxtCurr);

      if (nxt) {
        setReplies((prev) => [...prev, ...nxt.replies]);
        setNextCursor(nxt.nxtCurr);
      }
    });
  };

  return (
    <div className="space-y-4">
      <PostItem
        post={tinfo?.op as Post}
        isOriginal
        isLocked={tinfo?.isLocked}
      />

      {replies.map((r) => (
        <PostItem key={r.id} post={r} />
      ))}

      {nxtCurr && (
        <div className="flex justify-center">
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Button
              onClick={loadMore}
              variant="outline"
              className="rounded-xs text-primary cursor-pointer"
            >
              Load More Replies
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
