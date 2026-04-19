import type { NextConfig } from "next";
import { env } from "./env";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${env.BACKEND_API_BASE}/:path*`,
      },
    ];
  },
};

export default nextConfig;
