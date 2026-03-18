import type { PaginatedThread, ThreadInfo, Post } from "@/types/thread.js";
import type { ChannelInfo, PaginatedChannel } from "@/types/channel.js";
import { Router } from "express";
import config from "@/config.js";
import db from "@/prisma/db.js";

const threadRouter = Router({ mergeParams: true });

threadRouter.get("/", async (req, res) => {
  const { channel } = req.params as { channel: string };
  const page = req.query.page ? parseInt(req.query.page as string) || 1 : 1;

  const chinfo = (await db.channel.findUnique({
    where: { slug: channel },
    omit: {
      threadLimit: true,
      bumpLimit: true,
    },
  })) satisfies ChannelInfo | null;

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
    include: {
      posts: {
        where: {
          op: true,
        },
        take: 1,
      },
    },
    take: config.THREAD_PER_PAGE_LIMIT + 1,
    skip: (page - 1) * config.THREAD_PER_PAGE_LIMIT,
  });

  let topThreads: ThreadInfo[] = [];

  threads.map((t) => {
    const { posts, ...tinfo } = t;
    topThreads.push({
      ...tinfo,
      op: posts[0] as Post,
    });
  });

  const hasMore =
    topThreads.length > config.THREAD_PER_PAGE_LIMIT && !!topThreads.pop();

  res.json({ chinfo, threads: topThreads, hasMore } satisfies PaginatedChannel);
});

threadRouter.get("/:threadId", async (req, res) => {
  const { threadId, channel } = req.params as {
    threadId: string;
    channel: string;
  };
  const curr: bigint | undefined = req.query.cursor
    ? BigInt(req.query.cursor as string) || undefined
    : undefined;
  const limit: number = req.query.limit
    ? parseInt(req.query.limit as string)
    : config.POST_PER_CALL_LIMIT;
  const skipMeta = req.get("Skip-Meta");

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
    });

    if (!thread) {
      return res.status(404).json({ error: "thread not found" });
    }
  }

  const replies = (await db.post.findMany({
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
  })) satisfies Post[];

  const nxtCurr: string | undefined =
    replies.length === limit
      ? replies[replies.length - 1]?.id.toString()
      : undefined;

  let tinfo: ThreadInfo | undefined = undefined;

  if (thread) {
    const { posts, ...rest } = thread;
    tinfo = { ...rest, op: posts[0] as Post } satisfies ThreadInfo;
  }

  res.json({
    ...(tinfo && { tinfo }),
    replies,
    ...(nxtCurr && { nxtCurr }),
  } satisfies PaginatedThread);
});

export default threadRouter;
