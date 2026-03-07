import express from "express";
import config from "@/config.js";
import apiRouter from "@/routes/index.js";

const app = express();

app.use(express.json());

app.use("/api/v1", apiRouter);

app.listen(config.port);
