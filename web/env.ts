import { createEnv } from "@t3-oss/env-nextjs";
import { publicClientEnv, privateClientEnv } from "@amalgam/shared";

export const env = createEnv({
  server: privateClientEnv,
  client: publicClientEnv,

  experimental__runtimeEnv: {
    NEXT_PUBLIC_ORG_NAME: process.env.NEXT_PUBLIC_ORG_NAME,
  },
});
