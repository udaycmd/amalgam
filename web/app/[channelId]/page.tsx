import type {
  PaginatedChannel,
  ChannelInfo,
  ApiResponse,
} from "@amalgam/shared";
import type { ChannelPageProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Main } from "@/components/main";
import { cn } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";
import { ThreadCard } from "@/components/thread-card";
import { PostForm } from "@/components/post-form";
import { env } from "@/env";
import Link from "next/link";

async function getChannelInfo(channelId: string) {
  const meta = (await (
    await fetch(`${env.BACKEND_API_BASE}/channels/${channelId}`, {
      next: { revalidate: 900 },
    })
  ).json()) as ApiResponse<ChannelInfo>;

  if (!meta.data) notFound();
  return meta.data;
}

function ChannelHeader({ chinfo }: { chinfo: ChannelInfo }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          /{chinfo.slug}/ - {chinfo.name}
        </h1>
        <p className="text-muted-foreground">{chinfo.desc}</p>
      </div>
      <PostForm channelId={chinfo.slug} />
    </div>
  );
}

function ThreadList({
  channelId,
  threads,
  hasMore,
  currentPage,
}: {
  channelId: string;
  threads: PaginatedChannel["threads"];
  hasMore: boolean;
  currentPage: number;
}) {
  return (
    <>
      {threads.length === 0 ? (
        <span className="text-center text-primary py-12 border-dotted border-2 border-primary rounded-xl">
          No threads survived. Be the first to start one!
        </span>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {threads.map((thread) => (
            <ThreadCard key={String(thread.id)} tinfo={thread} />
          ))}
        </div>
      )}

      {(hasMore || currentPage > 1) && (
        <div className="flex justify-center items-center gap-4 pt-4 pb-8">
          <Button
            asChild
            variant="outline"
            className={cn(
              "rounded-full text-primary text-sm",
              currentPage <= 1 ? "hidden" : "",
            )}
          >
            <Link href={`/${channelId}?page=${currentPage - 1}`}>&larr;</Link>
          </Button>

          <span className="text-sm text-primary font-medium">
            Page {currentPage}
          </span>

          <Button
            asChild
            variant="outline"
            className={cn(
              "rounded-full text-primary text-sm",
              !hasMore ? "hidden" : "",
            )}
          >
            <Link href={`/${channelId}?page=${currentPage + 1}`}>&rarr;</Link>
          </Button>
        </div>
      )}
    </>
  );
}

export default async function ChannelPage({
  params,
  searchParams,
}: ChannelPageProps) {
  const { channelId } = await params;
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1", 10) || 1);

  const chinfo = await getChannelInfo(channelId);

  const threads = (await (
    await fetch(
      `${env.BACKEND_API_BASE}/channels/${channelId}/threads?page=${currentPage}`,
      {
        next: { revalidate: 120 },
      },
    )
  ).json()) as ApiResponse<PaginatedChannel>;

  if (!threads.data) {
    notFound();
  }

  if (threads.data.threads.length === 0 && currentPage > 1) {
    redirect(`/${channelId}`);
  }

  return (
    <Main>
      <ChannelHeader chinfo={chinfo} />
      <ThreadList
        channelId={channelId}
        threads={threads.data.threads}
        hasMore={threads.data.hasMore}
        currentPage={currentPage}
      />
    </Main>
  );
}
