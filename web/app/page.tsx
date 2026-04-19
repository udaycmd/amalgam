import { ApiResponse, ThreadInfo } from "@amalgam/shared";
import { ThreadCard } from "@/components/thread-card";
import { Main } from "@/components/main";
import { env } from "@/env";

export default async function Home() {
  const trendingThreads = (await (
    await fetch(`${env.BACKEND_API_BASE}/trending`, {
      next: { revalidate: 600 },
    })
  ).json()) as ApiResponse<ThreadInfo[]>;

  trendingThreads.error && console.error(trendingThreads.error);
  return (
    <Main>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-primary">
          Popular Threads 📢
        </h1>
        <p className="text-muted-foreground">
          See what&apos;s happening across channels.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {trendingThreads.data?.map((t) => (
          <ThreadCard key={t.id} tinfo={t} />
        ))}
      </div>
    </Main>
  );
}
