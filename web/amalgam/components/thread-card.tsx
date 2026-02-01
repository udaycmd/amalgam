import Link from "next/link";
import { Thread } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreadCardProps {
    thread: Thread;
    compact?: boolean;
}

export function ThreadCard({ thread, compact = false }: ThreadCardProps) {
    const opPost = thread.posts.find((p) => p.isOp);

    return (
        <Link href={`/${thread.boardId}/thread/${thread.id}`} className="block group">
            <Card
                className={cn(
                    "h-full overflow-hidden transition-all hover:border-primary/50 hover:shadow-md bg-card/50",
                    compact ? "flex flex-row" : "flex flex-col"
                )}
            >
                <div
                    className={cn(
                        "relative overflow-hidden bg-muted",
                        compact ? "w-32 shrink-0" : "aspect-video w-full"
                    )}
                >
                    {thread.imageUrl ? (
                        <img // eslint-disable-next-line @next/next/no-img-element
                            src={thread.imageUrl}
                            alt={thread.subject}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <span className="text-3xl font-bold opacity-20">/</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-1 flex-col">
                    <CardHeader className="p-4 pb-2">
                        <h3 className="line-clamp-1 text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
                            {thread.subject}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-mono text-primary">/{thread.boardId}/</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {thread.lastSimplifiedTime}
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-1">
                        <p className="line-clamp-3 text-sm text-muted-foreground">
                            {opPost?.content}
                        </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 text-xs text-muted-foreground border-t bg-muted/20 mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1 mt-2">
                            <MessageSquare className="h-3 w-3" />
                            {thread.replyCount} replies
                        </div>
                    </CardFooter>
                </div>
            </Card>
        </Link>
    );
}
