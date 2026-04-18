import "dotenv/config";
import { serverEnv } from "@amalgam/shared";
const config = serverEnv.parse(process.env);
export default config
