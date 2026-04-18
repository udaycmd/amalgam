import "dotenv/config";
import { serverEnv } from "@amalgam/shared";
export default serverEnv.parse(process.env);
