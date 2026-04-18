import { url, string } from "zod";

export const privateClientEnv = {
  BACKEND_API_BASE: url().min(1),
  BLOB_READ_WRITE_TOKEN: string().min(1),
};

export const publicClientEnv = {
  NEXT_PUBLIC_ORG_NAME: string().min(1),
};
