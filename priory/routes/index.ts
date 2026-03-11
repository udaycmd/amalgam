import { Router } from "express";
import channelRouter from "@/routes/channel.js";
import db from "@/prisma/db.js";

const router = Router();

const TOP_THREAD_COUNT = 20;

router.use("/channels", channelRouter);

router.use("/top", async (_, res) => {
  const topthreads = await db.thread.findMany({
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

  res.json({ threads: [...topthreads] });
});

export default router;
