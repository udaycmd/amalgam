import { Router } from "express";
import { getThread, getThreads } from "@/controllers/thread.controller.js";
import { postThread } from "@/controllers/post.controller.js";

const threadRouter: Router = Router({ mergeParams: true });

threadRouter.get("/", getThreads);
threadRouter.get("/:threadId", getThread);
threadRouter.post("/", postThread);

export default threadRouter;
