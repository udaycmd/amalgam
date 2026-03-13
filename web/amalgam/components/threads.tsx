"use client";

import { PaginatedThread, Post } from "@/types/interfaces";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { request } from "@/lib/utils";

export function Threads({
  init,
  channelId,
  threadId,
}: {
  init: PaginatedThread;
  channelId: string;
  threadId: string;
}) {
  const [replies, setReplies] = useState<Post[]>(init.replies);
  const [nxtCurr, setNextCursor] = useState(init.nxtCurr);
  const [isPending, startTransition] = useTransition();

  const loadMore = async () => {
    if (!nxtCurr || isPending) {
      return;
    }

    startTransition(async () => {
      const nxt = await request<PaginatedThread>(
        `channels/${channelId}/threads/${threadId}?cursor=${nxtCurr}`,
      );

      if (nxt) {
        setReplies((prev) => [...prev, ...nxt.replies]);
        setNextCursor(nxt.nxtCurr);
      }
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="border-b pb-8">
        <h1 className="text-2xl font-bold">{init.tinfo?.op.header}</h1>
        <p className="mt-4 text-lg">{init.tinfo?.op.content}</p>
      </section>

      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Replies ({replies.length})
        </h2>
        {replies.map((reply) => (
          <div key={reply.id} className="p-4 rounded-lg border bg-card">
            {reply.content}
          </div>
        ))}
      </div>

      {nxtCurr && (
        <div className="flex justify-center py-6">
          <Button
            onClick={loadMore}
            disabled={isPending}
            variant="outline"
            className="min-w-140px"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {isPending ? "Loading..." : "Show more replies"}
          </Button>
        </div>
      )}
    </div>
  );
}
