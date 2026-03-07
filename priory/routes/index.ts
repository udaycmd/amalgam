import { Router } from "express";
import channelRouter from "@/routes/channel.js";

const router = Router();

router.use("/channels", channelRouter);

export default router;
