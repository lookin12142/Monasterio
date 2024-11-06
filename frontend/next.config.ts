import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_PORT: process.env.API_PORT,
  },
};

export default nextConfig;
