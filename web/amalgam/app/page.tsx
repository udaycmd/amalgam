import { MOCK_THREADS } from "@/lib/data";
import { ThreadCard } from "@/components/thread-card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-10 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Popular Threads</h1>
        <p className="text-muted-foreground">
          See what&apos;s happening across all boards.
        </p>
      </div>
      {/*<Separator />*/}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {MOCK_THREADS.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
}
