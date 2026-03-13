import express from "express";
import config from "@/config.js";
import apiRouter from "@/routes/index.js";
import bigIntJson from "@/utils/bigint.js";
import helmet from "helmet";

bigIntJson();

const app = express();

app.use(express.json({ limit: 2048 }));
app.use(helmet());
app.use("/api/v1", apiRouter);

app.listen(config.port, () => {
  console.log(`server started at port: ${config.port}`);
});
