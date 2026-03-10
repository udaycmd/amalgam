import express from "express";
import config from "@/config.js";
import apiRouter from "@/routes/index.js";
import bigIntJson from "@/utils/bigint.js";

bigIntJson();

const app = express();

app.use(express.json());

app.use("/api/v1", apiRouter);

app.listen(config.port, () => {
  console.log(`server started at port: ${config.port}`);
});
