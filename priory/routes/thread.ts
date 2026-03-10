import { Router } from "express";
import db from "@/prisma/db.js";

const threadRouter = Router({ mergeParams: true });

threadRouter.get("/", async (req, res) => {
  const { channel } = req.params as { channel: string };
});

threadRouter.get("/:threadId", async (req, res) => {
  const { threadId, channel } = req.params as {
    threadId: string;
    channel: string;
  };
  const curr: bigint | undefined = req.query.cursor
    ? BigInt(req.query.cursor as string)
    : undefined;
  const limit: number = req.query.limit ? Number(req.query.limit) : 50;
  const skipMeta: boolean = req.headers["x-skip-meta"] === "true";

  let thread = undefined;

  if (!skipMeta) {
    thread = await db.thread.findFirst({
      where: {
        id: BigInt(threadId),
        channel: { slug: channel },
      },
      include: {
        posts: {
          where: {
            op: true,
          },
          take: 1,
        },
      },
    });

    if (!thread) {
      return res.status(404).json({ error: "thread not found" });
    }
  }

  let replies = await db.post.findMany({
    where: {
      threadId: BigInt(threadId),
      op: false,
    },
    take: limit,
    orderBy: {
      id: "asc",
    },
    ...(curr && {
      cursor: {
        id: curr,
      },
      skip: 1,
    }),
  });

  const nxtCurr: string | undefined =
    replies.length === limit
      ? replies[replies.length - 1]?.id.toString()
      : undefined;

  return res.json({
    ...(thread && {
      thread: { ...thread, posts: [...thread.posts, ...replies] },
    }),
    ...(skipMeta && { replies }),
    nxtCurr,
  });
});

export default threadRouter;
