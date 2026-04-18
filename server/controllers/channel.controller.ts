import type { ApiResponse, ChannelInfo } from "@amalgam/shared";
import type { Request, Response } from "express";
import db from "@/lib/db.js";

export async function getAllChannels(_req: Request, res: Response) {
  const channels = await db.channel.findMany({
    select: {
      slug: true,
      name: true,
      desc: true,
      nsfw: true,
    },
  });

  res.status(200).json({ data: channels } satisfies ApiResponse<ChannelInfo[]>);
}
