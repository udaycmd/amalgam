import type {
  ApiResponse,
  ThreadInfo,
  Post,
  ChannelInfo,
  PaginatedChannel,
  PaginatedThread,
} from "@amalgam/shared";
import type { Request, Response } from "express";
import config from "@/lib/config.js";
import db from "@/lib/db.js";

export async function getTrendingThreads(_req: Request, res: Response) {
  const threads = await db.thread.findMany({
    where: {
      isArchived: false,
    },
    orderBy: {
      bumpedAt: "desc",
    },
    take: config.THREAD_PER_PAGE_LIMIT,
    include: {
      posts: {
        where: { op: true },
        take: 1,
      },
    },
  });

  let trendingThreads = [] as ThreadInfo[];

  threads.map((t) => {
    const { posts, ...tinfo } = t;
    trendingThreads.push({
      ...tinfo,
      op: posts[0] as Post,
    });
  });

  res
    .status(200)
    .json({ data: trendingThreads } satisfies ApiResponse<ThreadInfo[]>);
}

export async function getThreads(req: Request, res: Response) {
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
    res.status(404).json({
      error: {
        code: 404,
        details: `'${channel}' not found`,
      },
    } satisfies ApiResponse<undefined>);
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

  res.status(200).json({
    data: { chinfo, threads: topThreads, hasMore },
  } satisfies ApiResponse<PaginatedChannel>);
}

export async function getThread(req: Request, res: Response) {
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
      return res.status(404).json({
        error: {
          code: 404,
          details: `thread:${threadId} not found`,
        },
      } satisfies ApiResponse<undefined>);
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

  res.status(200).json({
    data: {
      ...(tinfo && { tinfo }),
      replies: page,
      ...(nxtCurr && { nxtCurr }),
    },
  } satisfies ApiResponse<PaginatedThread>);
}
