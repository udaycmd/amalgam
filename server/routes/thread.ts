import type {
  ChannelInfo,
  PaginatedChannel,
  PaginatedThread,
  ThreadInfo,
  Post,
  Status,
  CreatePost,
} from "@amalgam/shared";
import { Router } from "express";
import config from "@/lib/config.js";
import db from "@/lib/db.js";

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
    res.status(404);
    return;
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

threadRouter.post("/", async (req, res) => {
  const { channel } = req.params as { channel: string };
  const { name, header, comment, mediaURL, mediaType } = req.body as CreatePost;

  try {
    await db.$transaction(async (tx) => {
      const op = await tx.post.create({
        data: {
          header: header,
          author: name,
          media: mediaURL,
          content: comment,
          op: true,
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
    });

    res.json({ error: false, message: "post created" } satisfies Status);
  } catch (e) {
    res.json({
      error: true,
      message: "failed to insert post",
    } satisfies Status);
  }
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
    take: limit + 1,
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

  const hasMore = replies.length > limit;
  const page = hasMore ? replies.slice(0, limit) : replies;
  const nxtCurr: string | undefined = hasMore
    ? page[page.length - 1]?.id.toString()
    : undefined;

  let tinfo: ThreadInfo | undefined = undefined;

  if (thread) {
    const { posts, ...rest } = thread;
    tinfo = { ...rest, op: posts[0] as Post } satisfies ThreadInfo;
  }

  res.json({
    ...(tinfo && { tinfo }),
    replies: page,
    ...(nxtCurr && { nxtCurr }),
  } satisfies PaginatedThread);
});

export default threadRouter;
