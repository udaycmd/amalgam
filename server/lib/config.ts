import "dotenv/config";
import { serverEnv } from "@amalgam/shared/schemas/serverEnv.schema.js";
export default serverEnv.parse(process.env);
