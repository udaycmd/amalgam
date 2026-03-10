import { Router } from "express";
import db from "@/prisma/db.js";

const threadRouter = Router({ mergeParams: true });

const POST_LIMIT = 50;
const PAGE_LIMIT = 10;

threadRouter.get("/", async (req, res) => {
  const { channel } = req.params as { channel: string };
  const page = req.query.page ? parseInt(req.query.page as string) : 1;

  const threads = await db.thread.findMany({
    where: {
      channel: { slug: channel },
      isArchived: false,
    },
    orderBy: {
      bumpedAt: "desc",
    },
    take: PAGE_LIMIT,
    skip: (page - 1) * PAGE_LIMIT,
    include: {
      posts: {
        where: { op: true },
        take: 1,
      },
    },
  });

  res.json({ threads: [...threads] });
});

threadRouter.get("/:threadId", async (req, res) => {
  const { threadId, channel } = req.params as {
    threadId: string;
    channel: string;
  };
  const curr: bigint | undefined = req.query.cursor
    ? BigInt(req.query.cursor as string)
    : undefined;
  const limit: number = req.query.limit
    ? parseInt(req.query.limit as string)
    : POST_LIMIT;
  const skipMeta: boolean = req.headers["Skip-Meta"] === "true";

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
