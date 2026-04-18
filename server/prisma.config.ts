import { defineConfig } from "prisma/config";
import config from "./lib/config.js";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seeds/seed.ts",
  },
  datasource: {
    url: config.database_url,
  },
});
