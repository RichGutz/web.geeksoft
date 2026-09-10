import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/curso.AI", destination: "/curso.AI/index.html" },
      { source: "/curso.ai", destination: "/curso.AI/index.html" },
      { source: "/curso-ai", destination: "/curso.AI/index.html" },
      { source: "/sdlc-agentico", destination: "/sdlc-agentico/index.html" },
      { source: "/sdlc-agentico.html", destination: "/sdlc-agentico/index.html" },
      { source: "/cap-01-sistemas-agenticos", destination: "/cap-01-sistemas-agenticos/index.html" },
      { source: "/cap-02-rag-sistemas", destination: "/cap-02-rag-sistemas/index.html" },
      { source: "/cap-03-vibe-coding", destination: "/cap-03-vibe-coding/index.html" },
      { source: "/cap-04-modelos-llm", destination: "/cap-04-modelos-llm/index.html" },
      { source: "/cap-05-fundamentos-ingenieria", destination: "/cap-05-fundamentos-ingenieria/index.html" },
      { source: "/cap-06-diseno-ux-interfaces", destination: "/cap-06-diseno-ux-interfaces/index.html" },
      { source: "/cap-07-infraestructura-vps", destination: "/cap-07-infraestructura-vps/index.html" },
      { source: "/cap-08-radar-tecnologico", destination: "/cap-08-radar-tecnologico/index.html" },
      { source: "/cap-10-mifune-architecture", destination: "/cap-10-mifune-architecture/index.html" },
    ];
  },
};

export default nextConfig;
