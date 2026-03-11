import { Channel, ChannelPageProps } from "@/types/interfaces";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { request } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function ChannelPage({ params }: ChannelPageProps) {
  const { channelId } = await params;
  const channel = await request<Channel>(`channels/${channelId}`);
  if (!channel) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-7 p-6 md:p-12 max-w-8xl mx-auto w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">
            /{channel.slug}/ - {channel.name}
          </h1>
          <p className="text-muted-foreground">{channel.desc}</p>
        </div>
        <Button className="w-full md:w-auto">
          <PenSquare className="mr-2 h-4 w-4" />
          New Thread
        </Button>
      </div>
      {/*Threads Here*/}
    </div>
  );
}
