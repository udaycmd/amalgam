import { Router } from "express";

const threadRouter = Router({ mergeParams: true });

// TODO: Add a POST route for this
threadRouter.get("/", (req, res) => {
  const { channel } = req.params as { channel: string };

  // TODO: change this
  res.status(200).send(`routed to ${channel}`);
});

threadRouter.get("/:threadId", (req, res) => {
  const { threadId, channel } = req.params as {
    threadId: string;
    channel: string;
  };

  // TODO: change this
  res.status(200).send(`routed to thread ${channel}/${threadId}`);
});

export default threadRouter;
