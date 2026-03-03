import { get } from "@/lib/utils";
import { Thread, ThreadPageProps } from "@/types/interfaces";
import { ThreadView } from "@/components/thread-view";
import { notFound } from "next/navigation";

export default async function ThreadPage({ params }: ThreadPageProps) {
  const { channel, threadId } = await params;
  const thread = await get<Thread>(`channels/${channel}/threads/${threadId}`);
  if (!thread) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-7 p-6 md:p-12 max-w-8xl mx-auto w-full">
      <ThreadView thread={thread} />
    </div>
  );
}
