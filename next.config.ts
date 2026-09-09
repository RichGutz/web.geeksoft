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
      {
        source: "/sdlc-agentico",
        destination: "/sdlc-agentico/index.html",
      },
      {
        source: "/sdlc-agentico.html",
        destination: "/sdlc-agentico/index.html",
      },
      {
        source: "/SDLC-AGENTICO",
        destination: "/sdlc-agentico/index.html",
      },
    ];
  },
};

export default nextConfig;
