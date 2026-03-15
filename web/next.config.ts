import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
      ),
    ],
  },
};

export default nextConfig;
