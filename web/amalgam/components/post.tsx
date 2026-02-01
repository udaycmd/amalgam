import { Post } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface PostItemProps {
    post: Post;
}

export function PostItem({ post }: PostItemProps) {
    return (
        <Card id={post.id} className={cn(
            "bg-card/50 border-border/50 transition-colors hover:bg-card/80",
            post.isOp && "border-primary/20 bg-primary/5"
        )}>
            <CardHeader className="p-4 pb-2 flex flex-row items-center gap-3 space-y-0">
                <Avatar className="h-8 w-8 rounded-md">
                    <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${post.author}`} />
                    <AvatarFallback>AN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm">
                    <span className="font-semibold text-foreground/90 flex items-center gap-2">
                        {post.author}
                        {post.isOp && <span className="text-[10px] bg-primary/20 text-primary px-1 rounded uppercase font-bold tracking-wide">OP</span>}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{post.time}</span>
                        <span>No. {post.id}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-1 grid gap-4">
                {post.imageUrl && (
                    <div className="relative overflow-hidden rounded-md border bg-muted/20 max-w-sm mt-2">
                        <img
                            src={post.imageUrl}
                            alt="Post attachment"
                            className="object-contain w-full h-auto max-h-[400px]"
                        />
                    </div>
                )}
                <div className="text-sm whitespace-pre-wrap leading-relaxed break-words">
                    {post.content.split('\n').map((line, i) => (
                        <div key={i} className={line.startsWith('>') ? "text-[#789922] dark:text-[#a6e22e]" : ""}>
                            {line}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
