import type { ApiResponse, ChannelInfo } from "@amalgam/shared";
import type { Request, Response } from "express";
import db from "@/lib/db.js";

export async function getChannels(_req: Request, res: Response) {
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

export async function getChannel(req: Request, res: Response) {
  const { channel } = req.params as { channel: string };

  const meta = await db.channel.findUnique({
    where: {
      slug: channel,
    },
    omit: {
      bumpLimit: true,
      threadLimit: true,
    },
  });

  if (!meta) {
    res.status(404).json({
      error: { code: 404, details: `'${channel}' not found` },
    } satisfies ApiResponse<undefined>);
  } else {
    res.status(200).json({ data: meta } satisfies ApiResponse<ChannelInfo>);
  }
}
