import { Router } from "express";
import { getTrendingThreads } from "@/controllers/thread.controller.js";
import { healthCheck } from "@/controllers/health.controller.js";
import channelRouter from "@/routes/channel.routes.js";

const router: Router = Router();

router.use("/channels", channelRouter);
router.get("/trending", getTrendingThreads);
router.get("/health", healthCheck);

export default router;
