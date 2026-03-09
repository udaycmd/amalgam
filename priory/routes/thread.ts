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

  const thread = await db.thread.findFirst({
    where: {
      id: BigInt(threadId),
      channel: {
        slug: channel,
      },
    },
    include: {
      posts: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!thread) {
    return res.status(404).json({ error: "Thread not found" });
  }
});

export default threadRouter;
