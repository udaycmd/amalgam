import {createEnv} from "@t3-oss/env-nextjs"
import {z} from "zod";

export const env = createEnv({
    server: {
        BACKEND_API_ROOT: z.url(),
    },
    client: {
        NEXT_PUBLIC_ORG_NAME: z.string(),
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_ORG_NAME: process.env.NEXT_PUBLIC_ORG_NAME,
    }
});
