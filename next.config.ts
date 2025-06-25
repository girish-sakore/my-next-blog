import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'standalone',
  basePath: '/concepts/my-next-blog',
  assetPrefix: '/concepts/my-next-blog',
  trailingSlash: true,
};

export default nextConfig;
