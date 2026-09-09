import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Índice de Temas y Presentaciones | GeekSoft Innovation Labs",
  description: "Árbol ordenado de temas y presentaciones interactivas de IA y Sistemas Agénticos de GeekSoft.",
};

const tree = [
  {
    number: "01",
    title: "Sistemas Agénticos & Orquestación",
    tag: "Orquestación & SDLC",
    color: "sky",
    ppts: [
      {
        title: "🚀 Multi-Agent SDLC & Visual Canvas (10 Slides)",
        url: "/sdlc-agentico",
        desc: "Fábrica de software autónoma: Roles PM/Architect/Dev/QA/DevOps, diagramas Mermaid obligatorios y Quality Gates.",
        isHot: true,
      },
    ],
    notes: [
      "MetaGPT (geekan/MetaGPT)",
      "ChatDev 2.0 (OpenBMB/ChatDev)",
      "AutoGen Studio (microsoft/autogen)",
      "Langflow (langflow-ai/langflow)",
      "OpenHands (All-Hands-AI/OpenHands)",
      "Pydantic AI & Model Context Protocol (MCP)",
    ],
  },
  {
    number: "02",
    title: "Sistemas RAG, Embeddings & Vector DBs",
    tag: "Retrieval & Knowledge",
    color: "emerald",
    ppts: [],
    notes: [
      "GraphRAG vs Vector RAG vs Hybrid RAG (#59)",
      "Arquitectura RAG Empresarial en AWS (#52)",
      "Graphify - Codebase Knowledge Graph (#39)",
      "Utopia - World Model Empresarial (#13)",
    ],
  },
  {
    number: "03",
    title: "Vibe Coding & Asistentes de Desarrollo",
    tag: "Developer Tools",
    color: "purple",
    ppts: [],
    notes: [
      "Anatomía del Directorio .claude en Claude Code (#49)",
      "Spec Kit - Spec-Driven Development (#01)",
      "RTK - Terminal Command Compressor (#05)",
      "Graft - Repo Map Generator (#10)",
    ],
  },
  {
    number: "04",
    title: "Modelos de Razonamiento, Visión & Arquitectura LLM",
    tag: "LLM Foundations",
    color: "amber",
    ppts: [],
    notes: [
      "World Models, JEPA y la Visión de Yann LeCun (#34)",
      "Inteligencia Espacial & World Labs de Fei-Fei Li (#35)",
      "Transformer Explainer interactivo (#45)",
      "DeepSeek Agent Harness & CoT Aislado (#43)",
    ],
  },
  {
    number: "05",
    title: "Curriculums, Fundamentos & Guías de Ingeniería",
    tag: "Ingeniería & Playbooks",
    color: "sky",
    ppts: [
      {
        title: "📖 Instructivo y Playbook de Trabajo con Agentes (#61)",
        url: "/sdlc-agentico",
        desc: "De Programador a Director de Orquesta: Contratos, entregables por rol y reglas de gobernanza sin alucinaciones.",
        isHot: false,
      },
    ],
    notes: [
      "Playbook de Developer a AI Champion - LIDR.co (#54)",
      "AI Engineering From Scratch - 523 Lecciones (#03)",
      "Roadmap AI Agentic Engineer (Sprint 7 Días) (#25)",
      "Los 4 Patrones de Diseño Agéntico de Andrew Ng (#33)",
    ],
  },
  {
    number: "06",
    title: "Diseño de Producto, UX & Interfaces Visuales",
    tag: "UX & Interfaces",
    color: "purple",
    ppts: [],
    notes: [
      "Leyes de UX (Laws of UX) (#06)",
      "dsh-visualizer - Renderizado en vivo (#11)",
      "AG-UI - Streaming JSON Protocol (#17)",
      "nodeterm - Canvas infinito agéntico (#19)",
    ],
  },
  {
    number: "07",
    title: "Infraestructura, VPS & Seguridad en Producción",
    tag: "DevOps & Cloud",
    color: "emerald",
    ppts: [],
    notes: [
      "How To Secure A Linux Server (#21)",
      "Cron Job Diario y Scraping Headless VPS Contabo (#41)",
      "Cloud in a Bottle - Private Cloud Sandbox (#44)",
    ],
  },
  {
    number: "08",
    title: "Radar Tecnológico & Vigilancia Continua",
    tag: "Radar & OSINT",
    color: "amber",
    ppts: [],
    notes: [
      "Radar Automatizado GitHub & Hugging Face (#36)",
      "Watchlist de 11 Perfiles Top Voices en LinkedIn (#000)",
    ],
  },
  {
    number: "09",
    title: "Masterclass & Pipeline de Aprendizaje Continuo",
    tag: "Masterclass",
    color: "sky",
    ppts: [
      {
        title: "🎓 Super Curso Master en Ingeniería de Agentes 2026 (21 Slides)",
        url: "/curso.AI",
        desc: "Masterclass ejecutiva: Harness Engineering, 5 Patrones de Diseño, Claude Code Runtime y Caso Real MIFUNE.",
        isHot: true,
      },
    ],
    notes: [
      "Pipeline Continuo de Retroalimentación (#31)",
      "Currículum Completo 21 Módulos SoTA 2026 (#30)",
    ],
  },
  {
    number: "10",
    title: "Arquitectura MIFUNE (Caso Real en Producción)",
    tag: "Producción",
    color: "emerald",
    ppts: [
      {
        title: "🛡️ MIFUNE Live Web Dashboard (https://mifune.geeksoft.tech)",
        url: "https://mifune.geeksoft.tech",
        desc: "Arnés Financiero 3-Statements: LibreOffice Headless Sandbox, MinIO Skills Registry y Quality Gates en vivo.",
        isHot: true,
      },
    ],
    notes: [
      "MIFUNE Blueprint VPS & Dual-Agent Harness (#48)",
      "Prototipo 3-Statement Engine & Sandbox (#56)",
      "Plan de Ejecución Sprints 1 al 4 (#57)",
      "Bitácora de Despliegue en Vivo Pasos A al I (#58, #58A-#58I)",
    ],
  },
];

export default function IndexPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#090d16", color: "#f8fafc", fontFamily: "'Inter', sans-serif", padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* HEADER */}
        <header style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "24px", marginBottom: "36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <span style={{ background: "rgba(2,132,199,0.2)", color: "#38bdf8", border: "1px solid rgba(2,132,199,0.4)", borderRadius: "100px", padding: "4px 14px", fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>
              GEEKSOFT INNOVATION LABS
            </span>
            <span style={{ background: "rgba(5,150,105,0.2)", color: "#34d399", border: "1px solid rgba(5,150,105,0.4)", borderRadius: "100px", padding: "4px 14px", fontSize: "12px", fontWeight: 800 }}>
              ÁRBOL DE TEMAS &amp; PRESENTACIONES
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, letterSpacing: "-0.5px", margin: 0, color: "#ffffff" }}>
            Índice Central de Conocimiento
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "15px", marginTop: "8px", maxWidth: "780px", lineHeight: "1.5" }}>
            Lista ordenada simplísima de los 10 ejes temáticos del ecosistema. Haz clic en las tarjetas destacadas para abrir las presentaciones interactivas en vivo.
          </p>
        </header>

        {/* LISTA ORDENADA - ÁRBOL DE TEMAS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {tree.map((item) => (
            <div
              key={item.number}
              style={{
                background: "rgba(15, 23, 42, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "24px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              {/* CABECERA DEL TEMA */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "18px", fontWeight: 900, color: "#38bdf8", background: "rgba(56,189,248,0.12)", padding: "4px 10px", borderRadius: "8px" }}>
                    #{item.number}
                  </span>
                  <h2 style={{ fontSize: "20px", fontWeight: 800, margin: 0, color: "#ffffff" }}>
                    {item.title}
                  </h2>
                </div>
                <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, color: "#94a3b8", background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: "6px" }}>
                  {item.tag}
                </span>
              </div>

              {/* PRESENTACIONES (PPTS) DISPONIBLES */}
              {item.ppts.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#38bdf8" }}>
                    🚀 Presentaciones Interactivas (PPTs en Vivo):
                  </div>
                  {item.ppts.map((ppt, pIdx) => (
                    <a
                      key={pIdx}
                      href={ppt.url}
                      style={{
                        display: "block",
                        background: "linear-gradient(135deg, rgba(2,132,199,0.18) 0%, rgba(15,23,42,0.9) 100%)",
                        border: "1px solid rgba(56,189,248,0.4)",
                        borderRadius: "12px",
                        padding: "14px 18px",
                        textDecoration: "none",
                        color: "#ffffff",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                        <span style={{ fontSize: "15px", fontWeight: 800, color: "#ffffff" }}>
                          {ppt.title}
                        </span>
                        {ppt.isHot && (
                          <span style={{ background: "#059669", color: "#ffffff", fontSize: "10px", fontWeight: 900, padding: "2px 8px", borderRadius: "100px", letterSpacing: "0.5px" }}>
                            ONLINE
                          </span>
                        )}
                      </div>
                      <p style={{ margin: "6px 0 0", fontSize: "12.5px", color: "#cbd5e1", lineHeight: "1.4" }}>
                        {ppt.desc}
                      </p>
                      <div style={{ marginTop: "8px", fontSize: "11.5px", color: "#38bdf8", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                        Abrir presentación &rarr; {ppt.url}
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* NOTAS Y HERRAMIENTAS VINCULADAS */}
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#64748b", marginBottom: "8px" }}>
                  📄 Notas Técnicas &amp; Repositorios Asociados:
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {item.notes.map((note, nIdx) => (
                    <span
                      key={nIdx}
                      style={{
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "6px",
                        padding: "4px 10px",
                        fontSize: "12px",
                        color: "#94a3b8",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      &bull; {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <footer style={{ marginTop: "48px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", fontSize: "12px", color: "#64748b" }}>
          <span>GeekSoft Innovation Labs &bull; 2026</span>
          <span>Bóveda Obsidian: <code>AI.TOOLS.FOR.GEEKSOFT</code></span>
        </footer>

      </div>
    </div>
  );
}
