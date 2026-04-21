import type { ThreadPageProps } from "@/lib/types";
import { Suspense } from "react";
import { Main } from "@/components/main";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { ThreadView } from "@/components/thread-view";
import { getThread } from "@/actions/thread";

export default async function ThreadPage({ params }: ThreadPageProps) {
  const { channelId, threadId } = await params;

  return (
    <Main>
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        }
      >
        <ThreadLoader channelId={channelId} threadId={threadId} />
      </Suspense>
    </Main>
  );
}

async function ThreadLoader({
  channelId,
  threadId,
}: {
  channelId: string;
  threadId: string;
}) {
  const thread = await getThread(threadId, channelId);

  if (!thread) {
    notFound();
  }

  return <ThreadView init={thread} channelId={channelId} threadId={threadId} />;
}
