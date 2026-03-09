import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client.js";
import config from "@/config.js";

const pg = new PrismaPg({ connectionString: config.database_url });
const db = new PrismaClient({ adapter: pg });

export default db;
