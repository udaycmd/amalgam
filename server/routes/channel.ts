import type { ChannelInfo } from "@amalgam/shared";
import { Router } from "express";
import { channels } from "@/data/channels.js";
import threadRouter from "@/routes/thread.js";

const channelRouter = Router();

channelRouter.get("/", (_, res) => {
  res.json(channels satisfies ChannelInfo[]);
});

channelRouter.use("/:channel/threads", threadRouter);

export default channelRouter;
