import dotenv from "dotenv";

dotenv.config({ debug: true });

type Config = {
  port: number;
  nodeEnv: string;
  database_url: string;
  POST_PER_CALL_LIMIT: number;
  THREAD_PER_PAGE_LIMIT: number;
};

export default {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV || "development",
  database_url: process.env.DATABASE_URL,
  POST_PER_CALL_LIMIT: Number(process.env.POST_PER_CALL_LIMIT),
  THREAD_PER_PAGE_LIMIT: Number(process.env.THREAD_PER_PAGE_LIMIT),
} as Config;
