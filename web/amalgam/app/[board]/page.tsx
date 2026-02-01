import { notFound } from "next/navigation";
import { BOARDS, MOCK_THREADS } from "@/lib/data";
import { ThreadCard } from "@/components/thread-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";

interface BoardPageProps {
    params: Promise<{
        board: string;
    }>;
}

export async function generateStaticParams() {
    return BOARDS.map((board) => ({
        board: board.id,
    }));
}

export default async function BoardPage({ params }: BoardPageProps) {
    const { board: boardId } = await params;
    const board = BOARDS.find((b) => b.id === boardId);

    if (!board) {
        notFound();
    }

    const threads = MOCK_THREADS.filter((t) => t.boardId === boardId);

    return (
        <div className="flex flex-col gap-6 p-6 md:p-10 max-w-7xl mx-auto w-full">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">/{board.id}/ - {board.name}</h1>
                    <p className="text-muted-foreground">
                        {board.description}
                    </p>
                </div>
                <Button className="w-full md:w-auto">
                    <PenSquare className="mr-2 h-4 w-4" />
                    New Thread
                </Button>
            </div>
            <Separator />
            {threads.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {threads.map((thread) => (
                        <ThreadCard key={thread.id} thread={thread} />
                    ))}
                </div>
            ) : (
                <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-muted-foreground p-8 text-center">
                    <p className="text-lg font-semibold">No threads found</p>
                    <p className="text-sm">Be the first to start a conversation in /{boardId}/</p>
                </div>
            )}
        </div>
    );
}
