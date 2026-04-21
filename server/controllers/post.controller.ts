import type { ApiResponse } from "@amalgam/shared";
import type { Request, Response } from "express";
import db from "@/lib/db.js";
import processTripcode from "@/lib/tripcode.js";
import wc from "@/lib/wc.js";

export async function postThread(req: Request, res: Response) {
  const { channel } = req.params as { channel: string };
  const { name, header, comment, mediaURL } = req.body;
  const { name: author, tc } = processTripcode(name as string);

  try {
    if (wc(comment as string) > 2000) {
      throw new Error("word limit breached (>2000)");
    }

    const id = await db.$transaction(async (tx) => {
      const op = await tx.post.create({
        data: {
          header: header,
          author,
          media: mediaURL,
          content: comment,
          op: true,
          ucode: tc ?? null,
        },
      });

      await tx.thread.create({
        data: {
          id: op.id,
          channelId: channel,
        },
      });

      await tx.post.update({
        where: { id: op.id },
        data: {
          threadId: op.id,
        },
      });

      return op.id;
    });

    res.status(200).json({ data: id } satisfies ApiResponse<bigint>);
  } catch (err) {
    res.status(500).json({
      error: {
        error: err as Error,
        code: 500,
        details: "cannot insert post now",
      },
    } satisfies ApiResponse<undefined>);
  }
}
