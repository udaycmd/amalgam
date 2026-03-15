import { ThreadCardProps } from "@/types/interfaces";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Clock, MessageSquare } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import Image from "next/image";

export function ThreadCard({ tinfo }: ThreadCardProps) {
  dayjs.extend(relativeTime);

  return (
    <Link
      href={`/${tinfo.channelId}/thread/${tinfo.id}`}
      className="block group"
    >
      <Card className="h-full overflow-hidden border-primary/20 hover:border-primary transition-colors pt-0 rounded-xs">
        <div className="relative overflow-hidden m-2 sm:m-4">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"
            alt="image_here"
            width={400}
            height={300}
            className="w-full h-auto max-h-64 object-contain"
          />
        </div>

        <CardHeader className="pt-1 px-2 sm:px-4 pb-1">
          <div className="line-clamp-2 font-medium text-sm sm:text-md tracking-tight">
            {tinfo.op.header}
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground">
            <span className="font-normal text-[11px] sm:text-[13px] text-primary px-2 py-px bg-gray-700 rounded-sm">
              /{tinfo.channelId}
            </span>

            <span className="flex items-center gap-1 text-primary">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              {dayjs(tinfo.bumpedAt).fromNow()}
            </span>
          </div>
        </CardHeader>

        <CardContent className="px-2 sm:px-4 py-1">
          <p className="line-clamp-3 text-xs sm:text-sm text-muted-foreground">
            {tinfo.op.content}
          </p>
        </CardContent>

        <CardFooter className="px-2 sm:px-4 pt-1 pb-2 text-xs sm:text-sm text-muted-foreground mt-auto flex justify-between">
          <div className="flex items-center gap-1 text-primary">
            <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
            {tinfo.replyCount} replies
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
