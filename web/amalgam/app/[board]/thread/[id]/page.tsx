import { notFound } from "next/navigation";
import Link from "next/link";
import { BOARDS, MOCK_THREADS } from "@/lib/data";
import { PostItem } from "@/components/post";
import { ReplyForm } from "@/components/reply-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface ThreadPageProps {
    params: Promise<{
        board: string;
        id: string;
    }>;
}

export async function generateStaticParams() {
    const params = [];
    for (const thread of MOCK_THREADS) {
        params.push({
            board: thread.boardId,
            id: thread.id,
        });
    }
    return params;
}

export default async function ThreadPage({ params }: ThreadPageProps) {
    const { board: boardId, id: threadId } = await params;
    const board = BOARDS.find((b) => b.id === boardId);
    const thread = MOCK_THREADS.find((t) => t.id === threadId);

    if (!board || !thread) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-6 p-6 md:p-10 max-w-4xl mx-auto w-full">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                    <Button variant="ghost" size="sm" asChild className="pl-0 text-muted-foreground hover:text-foreground">
                        <Link href={`/${boardId}`}>
                            <ChevronLeft className="mr-1 h-4 w-4" />
                            Back to /{boardId}/
                        </Link>
                    </Button>
                </div>
                <h1 className="text-2xl font-bold tracking-tight break-words">
                    <span className="text-muted-foreground mr-2">/{boardId}/</span>
                    {thread.subject}
                </h1>
            </div>

            <Separator />

            <div className="flex flex-col gap-8">
                <div className="space-y-4">
                    {thread.posts.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))}
                </div>

                <Separator />

                <div className="max-w-xl">
                    <ReplyForm />
                </div>
            </div>
        </div>
    );
}
