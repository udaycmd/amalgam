import { MOCK_THREADS } from "@/lib/data";
import { ThreadCard } from "@/components/thread-card";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 p-10 max-w-6xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Popular Threads 📢
        </h1>
        <p className="text-gray-400">
          See what&apos;s happening across channels.
        </p>
      </div>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {MOCK_THREADS.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
}
