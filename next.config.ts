import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
  } as any,
  devIndicators: {
    autoPrerender: false,
  } as any,
};

export default nextConfig;
