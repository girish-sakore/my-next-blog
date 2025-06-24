import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  basePath: '/concepts/my-next-blog',
  assetPrefix: '/concepts/my-next-blog',
};

export default nextConfig;
