import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/curso.AI",
        destination: "/curso.AI/index.html",
      },
      {
        source: "/curso.ai",
        destination: "/curso.AI/index.html",
      },
      {
        source: "/curso-ai",
        destination: "/curso.AI/index.html",
      },
    ];
  },
};

export default nextConfig;
