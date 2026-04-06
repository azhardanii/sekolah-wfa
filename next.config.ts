import type { NextConfig } from "next";

const nextConfig: any = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {},
  } as any,
  devIndicators: {
    autoPrerender: false,
  } as any,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/dibales.ai',
        destination: 'https://cs.pake.ai/a/FEBYA25IWVF7122I/instagram-comment-to-dm/sales/1',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
