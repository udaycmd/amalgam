import dotenv from "dotenv";

dotenv.config();

type Config = {
  port: number;
  nodeEnv: string;
};

export default {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV || "development",
} as Config;
