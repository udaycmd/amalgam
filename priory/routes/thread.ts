import { Router } from "express";

const threadRouter = Router({ mergeParams: true });

threadRouter.get("/", async (req, res) => {
  const { channel } = req.params as { channel: string };
});

threadRouter.get("/:threadId", (req, res) => {
  const { threadId, channel } = req.params as {
    threadId: string;
    channel: string;
  };

  res.status(200).send(`routed to thread ${channel}/${threadId}`);
});

export default threadRouter;
