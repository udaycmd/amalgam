import { request } from "@/lib/utils";
import { ThreadInfo } from "@/types/interfaces";
import { ThreadCard } from "@/components/thread-card";

export default async function Home() {
  const topThreads =
    (await request<ThreadInfo[]>("top", {
      // next: { revalidate: 900 },
    })) ?? [];

  return (
    <div className="flex flex-col gap-7 p-6 md:p-12 max-w-8xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-primary">
          Popular Threads 📢
        </h1>
        <p className="text-muted-foreground">
          See what&apos;s happening across channels.
        </p>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {topThreads.map((t) => (
          <ThreadCard key={t.id} tinfo={t} />
        ))}
      </div>
    </div>
  );
}
