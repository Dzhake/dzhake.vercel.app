import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
  },
  eslint: {
    dirs: ["app", "components", "lib"],
  },

  rewrites: async () => [],
};

export default nextConfig;
