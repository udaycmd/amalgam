import { Router } from "express";
import { getAllChannels } from "@/controllers/channel.controller.js";
import threadRouter from "@/routes/thread.routes.js";

const channelRouter: Router = Router();

channelRouter.get("/", getAllChannels);
channelRouter.use("/:channel/threads", threadRouter);

export default channelRouter;
