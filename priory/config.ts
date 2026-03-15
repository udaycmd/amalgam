import dotenv from "dotenv";

dotenv.config();

type Config = {
  port: number;
  nodeEnv: string;
  database_url: string;
  TOP_THREAD_COUNT: number;
  POST_PER_CALL_LIMIT: number;
  THREAD_PER_PAGE_LIMIT: number;
};

export default {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV || "development",
  database_url: process.env.DATABASE_URL,
  TOP_THREAD_COUNT: Number(process.env.TOP_THREAD_COUNT),
  POST_PER_CALL_LIMIT: Number(process.env.POST_PER_CALL_LIMIT),
  THREAD_PER_PAGE_LIMIT: Number(process.env.THREAD_PER_PAGE_LIMIT),
} as Config;
