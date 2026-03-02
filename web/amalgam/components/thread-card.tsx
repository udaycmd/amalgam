import { ThreadCardProps } from "@/types/interfaces";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Clock, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ThreadCard({ thread }: ThreadCardProps) {
  return (
    <Link href="#" className="block group min-w-52px">
      <Card className="h-full overflow-hidden border-primary/20 hover:border-primary transition-colors pt-0 rounded-xs">
        <div className="relative overflow-hidden aspect-square mt-1 m-4">
          <Image
            src={thread.imageUrl}
            alt="image_here"
            fill
            className="object-cover"
          />
        </div>
        <CardHeader className="pt-1">
          <h4 className="line-clamp-2 font-medium text-md tracking-tight">
            {thread.subject}
          </h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-normal text-primary p-1 bg-teal-800 rounded-xs">
              /{thread.channelId}
              hola
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {thread.lastInteracted}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {thread.origin.content}
          </p>
        </CardContent>
        <CardFooter className="pt-1 text-sm text-muted-foreground mt-auto items-center justify-between">
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            {thread.replyCount} replies
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
