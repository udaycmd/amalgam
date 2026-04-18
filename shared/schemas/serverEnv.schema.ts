import { object, string, coerce } from "zod";

export const serverEnv = object({
  PORT: coerce.number().positive(),
  NODE_ENV: string().min(1).default("development"),
  DATABASE_URL: string().min(1),
  POST_PER_CALL_LIMIT: coerce.number().positive(),
  THREAD_PER_PAGE_LIMIT: coerce.number().positive(),
});
