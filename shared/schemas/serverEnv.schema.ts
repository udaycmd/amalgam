import { object, number, string } from "zod";

export const serverEnv = object({
  port: number(),
  nodeEnv: string().min(1),
  database_url: string().min(1),
  POST_PER_CALL_LIMIT: number(),
  THREAD_PER_PAGE_LIMIT: number(),
});
