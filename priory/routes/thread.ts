import { Router } from "express";
import db from "@/prisma/db.js";

const threadRouter = Router({ mergeParams: true });

const POST_LIMIT = 50;
const PAGE_LIMIT = 10;

threadRouter.get("/", async (req, res) => {
  const { channel } = req.params as { channel: string };
  const page = req.query.page ? parseInt(req.query.page as string) || 1 : 1;

  const chinfo = await db.channel.findUnique({
    where: { slug: channel },
    omit: {
      id: true,
      threadLimit: true,
      bumpLimit: true,
    },
  });

  if (!chinfo) {
    return res.status(404).json({ error: "channel not found" });
  }

  const threads = await db.thread.findMany({
    where: {
      channel: { slug: channel },
      isArchived: false,
    },
    orderBy: {
      bumpedAt: "desc",
    },
    omit: {
      channelId: true,
    },
    take: PAGE_LIMIT + 1,
    skip: (page - 1) * PAGE_LIMIT,
  });

  const hasMore = threads.length > PAGE_LIMIT && threads.pop();
  res.json({ chinfo, threads, hasMore });
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

  let thread = null;

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
      omit: {
        channelId: true,
      },
    });

    if (!thread) {
      return res.status(404).json({ error: "thread not found" });
    }
  }

  const replies = await db.post.findMany({
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
    omit: {
      op: true,
      threadId: true,
    },
  });

  const nxtCurr: string | undefined =
    replies.length === limit
      ? replies[replies.length - 1]?.id.toString()
      : undefined;
  const op = thread?.posts?.[0] ?? null;
  const { posts, ...tinfo } = thread ?? {};

  res.json({
    ...tinfo,
    op,
    replies,
    nxtCurr,
  });
});

export default threadRouter;
