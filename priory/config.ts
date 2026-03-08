import dotenv from "dotenv";

dotenv.config();

type Config = {
  port: number;
  nodeEnv: string;
  database_url: string;
};

export default {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV || "development",
  database_url: process.env.DATABASE_URL,
} as Config;
