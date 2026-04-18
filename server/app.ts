import { errorHandler } from "@/middleware/errorHandler.js";
import express from "express";
import config from "@/lib/config.js";
import apiRouter from "@/routes/index.routes.js";
import bigIntJson from "@/lib/bigint.js";
import helmet from "helmet";

bigIntJson();

const app = express();

app.use(express.json({ limit: 1024 * 8 }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use("/api/v1", apiRouter);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`server started at port: ${config.port}`);
});
