import { Router } from "express";
import { channels } from "@/data/channels.js";
import threadRouter from "@/routes/thread.js";
import db from "@/prisma/db.js";

const channelRouter = Router();

channelRouter.get("/", (_, res) => {
  res.json(channels);
});

channelRouter.get("/:channel", async (req, res) => {
  const { channel } = req.params as { channel: string };

  const ch = await db.channel.findFirst({
    where: {
      slug: channel,
    },
    omit: {
      id: true,
      threadLimit: true,
      bumpLimit: true,
    },
  });

  res.json(ch);
});

channelRouter.use("/:channel/threads", threadRouter);

export default channelRouter;
