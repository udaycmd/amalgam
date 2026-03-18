import { PaginatedThread, ThreadPageProps } from "@/types/interfaces";
import { Suspense } from "react";
import { request } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { ThreadView } from "@/components/thread-view";

export default async function ThreadPage({ params }: ThreadPageProps) {
  const { channelId, threadId } = await params;

  return (
    <div className="flex flex-col gap-7 p-6 md:p-12 max-w-8xl mx-auto w-full">
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        }
      >
        <ThreadLoader channelId={channelId} threadId={threadId} />
      </Suspense>
    </div>
  );
}

async function ThreadLoader({
  channelId,
  threadId,
}: {
  channelId: string;
  threadId: string;
}) {
  const init = await request<PaginatedThread>(
    `channels/${channelId}/threads/${threadId}`,
    { cache: "no-cache" },
  );

  if (!init) {
    notFound();
  }

  return <ThreadView init={init} channelId={channelId} threadId={threadId} />;
}
