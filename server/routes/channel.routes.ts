import { Router } from "express";
import { getChannel, getChannels } from "@/controllers/channel.controller.js";
import threadRouter from "@/routes/thread.routes.js";

const channelRouter: Router = Router();

channelRouter.get("/", getChannels);
channelRouter.get("/:channel", getChannel);
channelRouter.use("/:channel/threads", threadRouter);

export default channelRouter;
