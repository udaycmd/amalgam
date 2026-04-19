import type { ApiResponse, PaginatedThread } from "@amalgam/shared";
import type { ThreadPageProps } from "@/lib/types";
import { Suspense } from "react";
import { Main } from "@/components/main";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { ThreadView } from "@/components/thread-view";
import { env } from "@/env";

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
  const response = (await (
    await fetch(
      `${env.BACKEND_API_BASE}/channels/${channelId}/threads/${threadId}`,
      {
        cache: "no-cache",
      },
    )
  ).json()) as ApiResponse<PaginatedThread>;

  if (!response.data) {
    notFound();
  }

  return (
    <ThreadView
      init={response.data}
      channelId={channelId}
      threadId={threadId}
    />
  );
}
