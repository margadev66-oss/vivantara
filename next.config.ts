import type { NextConfig } from "next";

const isMilesWebBuild = process.env.MILESWEB_BUILD === "1";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: isMilesWebBuild
    ? {
        cpus: 1
      }
    : undefined
};

export default nextConfig;
