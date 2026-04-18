import { z } from "zod";

export const privateClientEnv = {
  BACKEND_API_BASE: z.url().min(1),
  BLOB_READ_WRITE_TOKEN: z.string().min(1),
};

export const publicClientEnv = {
  NEXT_PUBLIC_ORG_NAME: z.string().min(1),
};
