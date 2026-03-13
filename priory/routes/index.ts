import type { Post, ThreadInfo } from "@/types/thread.js";
import { Router } from "express";
import channelRouter from "@/routes/channel.js";
import db from "@/prisma/db.js";

const router = Router();

const TOP_THREAD_COUNT = 20;

router.use("/channels", channelRouter);

router.use("/top", async (_, res) => {
  const threads = await db.thread.findMany({
    where: {
      isArchived: false,
    },
    orderBy: {
      bumpedAt: "desc",
    },
    take: TOP_THREAD_COUNT,
    include: {
      posts: {
        where: { op: true },
        take: 1,
      },
    },
  });

  let topThreads = [] as ThreadInfo[];

  threads.map((t) => {
    const { posts, ...tinfo } = t;
    topThreads.push({
      ...tinfo,
      op: posts[0] as Post,
    });
  });

  res.json(topThreads);
});

export default router;
