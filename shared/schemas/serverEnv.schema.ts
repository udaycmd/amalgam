import { z } from "zod";

export const serverEnv = z.object({
  PORT: z.coerce.number().positive(),
  NODE_ENV: z.string().min(1).default("development"),
  DATABASE_URL: z.string().min(1),
  POST_PER_CALL_LIMIT: z.coerce.number().positive(),
  THREAD_PER_PAGE_LIMIT: z.coerce.number().positive(),
  SECRET_SALT: z.string().length(32),
});
