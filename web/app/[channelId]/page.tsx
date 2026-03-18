import {
  PaginatedChannel,
  ChannelPageProps,
  ChannelInfo,
} from "@/types/interfaces";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { request, cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { ThreadCard } from "@/components/thread-card";
import Link from "next/link";

export default async function ChannelPage({
  params,
  searchParams,
}: ChannelPageProps) {
  const { channelId } = await params;
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1", 10) || 1);

  const data = await request<PaginatedChannel>(
    `channels/${channelId}/threads?page=${currentPage}`,
    {
      next: { revalidate: 1800 },
    },
  );

  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-7 p-6 md:p-12 max-w-8xl mx-auto w-full">
      <ChannelHeader chinfo={data.chinfo} />
      <ThreadList
        channelId={channelId}
        threads={data.threads}
        hasMore={data.hasMore}
        currentPage={currentPage}
      />
    </div>
  );
}

function NewThreadButton({ text }: { text?: string }) {
  return (
    <Button className="w-full md:w-auto cursor-pointer rounded-xs">
      <PenSquare className="mr-2 h-4 w-4" />
      {text || "Start new thread"}
    </Button>
  );
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
      <NewThreadButton />
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
        <span className="text-center text-primary py-12 border-dotted border-2 border-primary rounded-xs">
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
              "w-full md:w-auto rounded-xs text-primary",
              currentPage <= 1 ? "hidden" : "",
            )}
          >
            <Link href={`/${channelId}?page=${currentPage - 1}`}>
              &larr; Previous
            </Link>
          </Button>

          <span className="text-sm text-primary font-medium">
            [ {currentPage} ]
          </span>

          <Button
            asChild
            variant="outline"
            className={cn(
              "w-full md:w-auto rounded-xs text-primary",
              !hasMore ? "hidden" : "",
            )}
          >
            <Link href={`/${channelId}?page=${currentPage + 1}`}>
              Next &rarr;
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
