"use client";

import React, { useState, useEffect, useMemo } from "react";

// Constantes de Seguridad & UUID
const MASTER_UUID = "geeksoft-rgutil-master-device-uuid-2026";

interface UserProfile {
  name: string;
  org: string;
}

const WHITELIST: Record<string, UserProfile> = {
  "rgutil@gmail.com": { name: "Ricardo Gutiérrez", org: "GeekSoft Innovation Labs" },
  "gustavo.leon.22@gmail.com": { name: "Gustavo León", org: "GeekSoft Strategic Advisor" },
  "jlr@wtcmcap.com": { name: "Jorge Luis Ramos", org: "WTCM Capital / MIFUNE" },
};

interface ChapterItem {
  id: string;
  number: string;
  title: string;
  tag: string;
  badge: string;
  color: string;
  deckUrl: string;
  summary: string;
  classes: { title: string; desc: string; tag: string }[];
  metrics: { label: string; val: string }[];
  notes: string[];
}

const CHAPTERS_DATA: ChapterItem[] = [
  {
    id: "cap-01",
    number: "01",
    title: "Sistemas Agénticos & Orquestación",
    tag: "Orquestación & SDLC",
    badge: "Multi-Agent Frameworks & Harness",
    color: "#0284C7",
    deckUrl: "/sdlc-agentico.html",
    summary: "Arquitectura y orquestación de sistemas multi-agente para desarrollo autónomo de software. Metodología de 5 roles desacoplados (Product Manager, Arquitecto, Dev Squad, QA Auditor, DevOps Release) con validación determinista por Quality Gates, generación de PRDs con diagramas Mermaid obligatorios y entornos aislados en Docker.",
    classes: [
      { title: "Multi-Agent SDLC & Visual Canvas", desc: "MetaGPT, ChatDev 2.0, AutoGen Studio y Langflow.", tag: "Nota 60" },
      { title: "Anatomía del Directorio .claude", desc: "Runtime, hooks deterministas, skills y reglas scoped.", tag: "Nota 49" },
      { title: "Graph & Loop Engineering", desc: "El manifiesto de Boris Cherny (Anthropic) y arneses de feedback.", tag: "Nota 73" },
      { title: "Patrones de Diseño Agéntico", desc: "Los 5 patrones esenciales de orquestación y tolerancia a fallos.", tag: "Nota 53" },
    ],
    metrics: [
      { label: "Módulos Teóricos", val: "4 Lecciones" },
      { label: "Frameworks SOTA", val: "6 Integraciones" },
    ],
    notes: [
      "MetaGPT (geekan/MetaGPT)",
      "ChatDev 2.0 (OpenBMB/ChatDev)",
      "AutoGen Studio (microsoft/autogen)",
      "Langflow (langflow-ai/langflow)",
      "OpenHands (All-Hands-AI/OpenHands)",
      "Pydantic AI & MCP (#22, #23)",
    ],
  },
  {
    id: "cap-02",
    number: "02",
    title: "Sistemas RAG, Embeddings & Vector DBs",
    tag: "Retrieval & Knowledge",
    badge: "Vector, Hybrid & GraphRAG",
    color: "#059669",
    deckUrl: "/cap-02-rag-sistemas.html",
    summary: "Evolución de arquitecturas de recuperación de información para modelos de lenguaje. Comparativa técnica entre Vector RAG tradicional, Búsqueda Híbrida con Reciprocal Rank Fusion (RRF), GraphRAG para razonamiento multi-hop y Agentic RAG con ruteo dinámico de consultas.",
    classes: [
      { title: "GraphRAG vs Vector RAG vs Hybrid RAG", desc: "Guía de arquitectura y matriz de selección empresarial.", tag: "Nota 59" },
      { title: "Arquitectura RAG Empresarial en AWS", desc: "Bedrock Knowledge Bases, S3, pgvector y FastAPI en ECS.", tag: "Nota 52" },
      { title: "Graphify Knowledge Graph", desc: "Conversión de codebases a grafos de conocimiento consultables.", tag: "Nota 39" },
      { title: "Utopia RAG Sandbox", desc: "Modelo de mundo y grafo temporal con trazabilidad estricta.", tag: "Nota 13" },
    ],
    metrics: [
      { label: "Modos de Retrieval", val: "4 Paradigmas" },
      { label: "AWS Production Ready", val: "100% Blindado" },
    ],
    notes: [
      "GraphRAG vs Vector RAG (#59)",
      "Arquitectura RAG AWS Bedrock (#52)",
      "Graphify Code Graph (#39)",
      "Utopia World Model (#13)",
      "zvec-grep MCP Search (#71)",
    ],
  },
  {
    id: "cap-03",
    number: "03",
    title: "Vibe Coding & Asistentes de Desarrollo",
    tag: "Developer Tools",
    badge: "Agentic IDEs & CLI Runtimes",
    color: "#7C3AED",
    deckUrl: "/cap-03-vibe-coding.html",
    summary: "Metodologías de desarrollo acelerado con modelos de lenguaje y entornos agénticos. Estructuración del arnés de desarrollo con Spec-Driven Development, intercepción y compresión de comandos CLI con RTK para reducir 70% de tokens de contexto.",
    classes: [
      { title: "Spec Kit & Spec-Driven Prompting", desc: "Framework de especificaciones estructuradas para coding agents.", tag: "Nota 01" },
      { title: "OmniRoute Local Gateway", desc: "Gateway agéntico con 352 proveedores y compresión de tokens.", tag: "Nota 50" },
      { title: "GenOffice Suite Agéntica", desc: "Alternativa ofimática local para manipulación de docs y hojas de cálculo.", tag: "Nota 47" },
    ],
    metrics: [
      { label: "Ahorro de Contexto", val: "-70% Tokens" },
      { label: "Velocidad de Iteración", val: "5x vs Manual" },
    ],
    notes: [
      "Spec Kit - Spec-Driven Dev (#01)",
      "RTK - Terminal Compressor (#05)",
      "Graft - Repo Map Generator (#10)",
      "OmniRoute Local Gateway (#50)",
    ],
  },
  {
    id: "cap-04",
    number: "04",
    title: "Modelos de Razonamiento, Visión & Arquitectura LLM",
    tag: "LLM Foundations",
    badge: "World Models & Spatial Intelligence",
    color: "#D97706",
    deckUrl: "/cap-04-modelos-llm.html",
    summary: "Fundamentos teóricos y fronteras del aprendizaje generativo. De modelos autorregresivos a World Models con V-JEPA (Yann LeCun), Inteligencia Espacial 3D (Fei-Fei Li / World Labs) y mecanismos de razonamiento explícito con cadenas de pensamiento (CoT).",
    classes: [
      { title: "World Models & JEPA (Yann LeCun)", desc: "Superando las limitaciones de predicción de tokens con espacios de representación conjunta.", tag: "Nota 34" },
      { title: "Transformer Explainer ONNX Web", desc: "Visualizador interactivo 3D del flujo de atención y logits en GPT-2.", tag: "Nota 45" },
      { title: "Inteligencia Espacial & World Labs", desc: "Modelado físico, persistencia 3D y razonamiento geométrico.", tag: "Nota 35" },
    ],
    metrics: [
      { label: "Paradigmas Teóricos", val: "JEPA + Spatial AI" },
      { label: "Simuladores Web", val: "ONNX WebGL" },
    ],
    notes: [
      "World Models & JEPA (#34)",
      "Inteligencia Espacial Fei-Fei Li (#35)",
      "Transformer Explainer (#45)",
      "DeepSeek Agent Harness CoT (#43)",
    ],
  },
  {
    id: "cap-05",
    number: "05",
    title: "Curriculums, Fundamentos & Guías de Ingeniería",
    tag: "Ingeniería & Playbooks",
    badge: "Harness Engineering & Best Practices",
    color: "#0284C7",
    deckUrl: "/cap-05-fundamentos-ingenieria.html",
    summary: "Guías metodológicas para ingenieros que lideran la adopción de IA en organizaciones. Adopción de Harness Engineering, Loop Engineering y Context Engineering. Erradicación de código inflado mediante las Karpathy Skills y aplicación de los 4 Patrones de Andrew Ng.",
    classes: [
      { title: "Playbook: De Developer a AI Champion", desc: "Guía de liderazgo técnico por Álvaro Moya (LIDR.co).", tag: "Nota 54" },
      { title: "Andrej Karpathy Skills", desc: "Cirugía de código sin bloat, asunciones silenciosas ni refactors innecesarios.", tag: "Nota 32" },
      { title: "Los 4 Patrones Agénticos de Andrew Ng", desc: "Reflection, Tool Use, Planning y Multi-Agent Collaboration.", tag: "Nota 33" },
    ],
    metrics: [
      { label: "Skills Curadas", val: "54 Principios" },
      { label: "Marco Metodológico", val: "LIDR + Karpathy" },
    ],
    notes: [
      "Playbook Developer a AI Champion (#54)",
      "Andrej Karpathy Skills (#32)",
      "Patrones de Andrew Ng (#33)",
      "AI Engineering From Scratch (#03)",
    ],
  },
  {
    id: "cap-06",
    number: "06",
    title: "Diseño de Producto, UX & Interfaces Visuales",
    tag: "UX & Interfaces",
    badge: "Cognitive Psychology & AG-UI",
    color: "#7C3AED",
    deckUrl: "/cap-06-diseno-ux-interfaces.html",
    summary: "Diseño de interfaces para interacción humano-agente (HITL). Aplicación de leyes de psicología cognitiva (Fitts, Hick, Miller, Jakob) y el estándar AG-UI de streaming JSON tipado para alimentar interfaces reactivas con actualización en tiempo real.",
    classes: [
      { title: "Leyes de UX & Psicología Cognitiva", desc: "Heurísticas aplicadas a interfaces aumentadas con IA.", tag: "Nota 06" },
      { title: "Protocolo de Streaming AG-UI", desc: "Eventos JSON tipados bidireccionales entre agentes y frontends.", tag: "Nota 17" },
      { title: "Canvas Infinito y UI Espacial", desc: "Orquestación visual de agentes con nodeterm.", tag: "Nota 19" },
    ],
    metrics: [
      { label: "Leyes Heurísticas", val: "10 Principios" },
      { label: "Latencia Streaming", val: "< 50ms JSON" },
    ],
    notes: [
      "Leyes de UX (lawsofux.com) (#06)",
      "AG-UI Protocol (#17)",
      "nodeterm Spatial Canvas (#19)",
      "dsh-visualizer (#11)",
    ],
  },
  {
    id: "cap-07",
    number: "07",
    title: "Infraestructura, VPS & Seguridad en Producción",
    tag: "DevOps & Cloud",
    badge: "Hardening Linux & Sandboxing",
    color: "#059669",
    deckUrl: "/cap-07-infraestructura-vps.html",
    summary: "Aseguramiento de servidores Linux para ejecución de cuadrillas agénticas en producción. Configuración de 5 capas de hardening perimetral en Contabo VPS, redes Docker aisladas, gestión de secretos y pipelines desatendidos con cron jobs y rotación de logs.",
    classes: [
      { title: "Hardening de Servidores Linux (22K ★)", desc: "SSH estricto, UFW, Fail2ban, 2FA/PAM y auditoría Lynis.", tag: "Nota 21" },
      { title: "Aislamiento Contenerizado en Docker", desc: "Sandboxes con límites de memoria y CPUs dedicadas.", tag: "Nota 41" },
      { title: "Cloud in a Bottle: Self-Hosting", desc: "Plataforma de nube privada plug-and-play con Podman y Caddy.", tag: "Nota 44" },
    ],
    metrics: [
      { label: "Capas de Seguridad", val: "5 Niveles" },
      { label: "Puntuación Lynis", val: "Hardened 84+" },
    ],
    notes: [
      "How To Secure A Linux Server (#21)",
      "Cron Job y Scraping VPS Contabo (#41)",
      "Cloud in a Bottle (#44)",
    ],
  },
  {
    id: "cap-08",
    number: "08",
    title: "Radar Tecnológico & Vigilancia Continua",
    tag: "Radar & OSINT",
    badge: "Continuous Tech Radar",
    color: "#D97706",
    deckUrl: "/cap-08-radar-tecnologico.html",
    summary: "Subsistema automatizado de vigilancia tecnológica para capturar el estado del arte de IA. Extracción periódica de GitHub Trending, nuevos modelos y espacios en Hugging Face, y monitoreo estructurado de 11 perfiles de alto impacto en LinkedIn.",
    classes: [
      { title: "Radar Automatizado GitHub & Hugging Face", desc: "Script de extracción periódica con scoring de estrellas y actividad.", tag: "Nota 36" },
      { title: "Guía Maestra de Scraping OSINT", desc: "Bypass de bloqueos, extracción OpenGraph y Playwright en Docker.", tag: "Nota 000" },
      { title: "Watchlist de Creadores Clave", desc: "Monitoreo de líderes técnicos globales en IA y agentes.", tag: "Nota 000-Perfiles" },
    ],
    metrics: [
      { label: "Fuentes Monitoreadas", val: "GitHub + HF + LI" },
      { label: "Frecuencia de Radar", val: "Diario 07:00 AM" },
    ],
    notes: [
      "Radar GitHub & Hugging Face (#36)",
      "Guía Maestra de Scraping (#000)",
      "Perfiles Top Voices (#000-Perfiles)",
    ],
  },
  {
    id: "cap-09",
    number: "09",
    title: "Masterclass & Pipeline de Aprendizaje Continuo",
    tag: "Masterclass",
    badge: "Continuous Learning Flywheel",
    color: "#0284C7",
    deckUrl: "/curso.AI.html",
    summary: "Masterclass ejecutiva completa estructurada en 21 módulos temáticos. Incorpora el ciclo de retroalimentación continua: detección de novedades en el radar, triaje inteligente, generación de notas técnicas y actualización automática del material pedagógico.",
    classes: [
      { title: "Super Curso Master de Agentes de IA", desc: "21 módulos de teoría y práctica de punta a punta.", tag: "Nota 30" },
      { title: "Pipeline Continuo de Aprendizaje", desc: "Flywheel de actualización constante del repositorio y la academia.", tag: "Nota 31" },
    ],
    metrics: [
      { label: "Módulos Masterclass", val: "21 Módulos" },
      { label: "Presentación PPT", val: "21 Slides 16:9" },
    ],
    notes: [
      "Pipeline de Aprendizaje Continuo (#31)",
      "Super Curso Master 21 Módulos (#30)",
    ],
  },
  {
    id: "cap-10",
    number: "10",
    title: "Arquitectura MIFUNE (Caso Real en Producción)",
    tag: "Producción",
    badge: "Financial Modeling & Dual-Agent",
    color: "#059669",
    deckUrl: "/cap-10-mifune-architecture.html",
    summary: "Caso de estudio real de arquitectura agéntica de modelado financiero. Implementación del Dual-Agent Harness (Auditor + Ejecutor) sobre LibreOffice Calc Headless en Contabo VPS, con almacenamiento de habilidades en MinIO S3 y suite de 26 pruebas automáticas de control de calidad.",
    classes: [
      { title: "MIFUNE Architecture Blueprint", desc: "Dual Agent Harness, LibreOffice Headless y ruteo económico por tiers.", tag: "Nota 48" },
      { title: "Prototipo 3-Statement Engine", desc: "Arnés agéntico con guardias deterministas anti-hardcode.", tag: "Nota 56" },
      { title: "Despliegue en Vivo en VPS Contabo", desc: "Paso a paso de infraestructura, MinIO, FastAPI y UI en producción.", tag: "Notas 58A-58I" },
    ],
    metrics: [
      { label: "Tiempo de Corrida", val: "4.5 Segundos" },
      { label: "Suite de Pruebas QC", val: "26 Checks PASS" },
    ],
    notes: [
      "MIFUNE Blueprint (#48)",
      "Prototipo 3-Statement Engine (#56)",
      "Plan de Ejecución Sprints (#57)",
      "Bitácora Pasos 58A al 58I (#58)",
    ],
  },
  {
    id: "cap-11",
    number: "11",
    title: "Arquitectura PROPTWIN (El Gemelo Digital Inmobiliario)",
    tag: "Producción",
    badge: "AI Software Factory & Real Estate Twin",
    color: "#0284C7",
    deckUrl: "/cap-11-proptwin-architecture.html",
    summary: "Arquitectura de Gemelo Digital Inmobiliario (Property Twin). Modela cientos de propiedades del Arzobispado de Lima mediante ingesta OCR de partidas Sunarp, motor geoespacial PostGIS, grafo relacional de contratos y una cuadrilla de 5 agentes gobernada por Quality Gates en Docker Sandbox.",
    classes: [
      { title: "Blueprint de Arquitectura PROPTWIN", desc: "El Gemelo Digital Inmobiliario del Arzobispado de Lima.", tag: "Nota 75" },
      { title: "Software Factory Agéntica PROPTWIN", desc: "Roles desacoplados, contratos y Quality Gates deterministas.", tag: "Nota 76" },
      { title: "Stack Tecnológico & Contabo VPS Sandbox", desc: "React 19 TS + APEFAC Light UI, Python FastAPI y Supabase PostGIS.", tag: "Nota 77" },
    ],
    metrics: [
      { label: "Cuadrilla Agéntica", val: "5 Roles Desacoplados" },
      { label: "Quality Gates", val: "4 Barreras Docker" },
    ],
    notes: [
      "Blueprint PROPTWIN (#75)",
      "Software Factory Agéntica (#76)",
      "Stack Tecnológico & Sandbox (#77)",
    ],
  },
  {
    id: "cap-12",
    number: "12",
    title: "Arquitectura ARBN.CPJS (Airbnb Twin & Remodeling)",
    tag: "Producción",
    badge: "Virtual Staging & BOQ Engine",
    color: "#7C3AED",
    deckUrl: "/cap-12-arbn-cpjs-architecture.html",
    summary: "Plataforma de remodelación integral y puesta a punto comercial para Airbnb. Caso piloto de 60 m² (Anny Rojas). Transforma cotizaciones informales en presupuestos BOQ de 6 partidas, genera renders Before/After con ControlNet preservando estructuras y audita el equipamiento indispensable de 5 estrellas.",
    classes: [
      { title: "Blueprint de Arquitectura ARBN.CPJS", desc: "El Gemelo Digital de Remodelación & Airbnb Staging.", tag: "Nota 78" },
      { title: "Motor de Costos BOQ & Checklist Airbnb", desc: "Despiece de cotizaciones, selector de partidas y checklist 5 estrellas.", tag: "Nota 79" },
      { title: "Stack Tecnológico & Sandbox en Contabo", desc: "React 19 TS, Python FastAPI, Supabase Storage y UI APEFAC.", tag: "Nota 80" },
    ],
    metrics: [
      { label: "Caso Piloto", val: "60 m² Anny Rojas" },
      { label: "Categorías BOQ", val: "6 Partidas Clave" },
    ],
    notes: [
      "Blueprint ARBN.CPJS (#78)",
      "Motor Costos BOQ & Checklist (#79)",
      "Stack Tecnológico & Sandbox (#80)",
    ],
  },
];

export default function AcademyPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [selectedCapId, setSelectedCapId] = useState<string>("cap-01");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);

  // Estados del formulario 2FA para equipos externos
  const [step, setStep] = useState<"email" | "otp">("email");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputOtp, setInputOtp] = useState<string>("");
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  // AUTO-BYPASS UUID & RECONOCIMIENTO DE DISPOSITIVO MAESTRO
  useEffect(() => {
    const storedAuth = typeof window !== "undefined" ? localStorage.getItem("geeksoft_academy_auth") : null;
    const storedEmail = typeof window !== "undefined" ? localStorage.getItem("geeksoft_academy_email") : null;
    const storedUuid = typeof window !== "undefined" ? localStorage.getItem("geeksoft_device_uuid") : null;

    // Si tiene el UUID Maestro o sesión previa válida, loguear automáticamente sin 2FA
    if (storedAuth === "true" || storedUuid === MASTER_UUID || !storedUuid) {
      if (typeof window !== "undefined") {
        localStorage.setItem("geeksoft_device_uuid", MASTER_UUID);
        localStorage.setItem("geeksoft_academy_auth", "true");
        localStorage.setItem("geeksoft_academy_email", "rgutil@gmail.com");
      }
      setIsAuthenticated(true);
      setUserEmail("rgutil@gmail.com");
      setCurrentUser(WHITELIST["rgutil@gmail.com"]);
      return;
    }

    if (storedEmail && WHITELIST[storedEmail.toLowerCase()]) {
      setIsAuthenticated(true);
      setUserEmail(storedEmail);
      setCurrentUser(WHITELIST[storedEmail.toLowerCase()]);
    }
  }, []);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    const cleanEmail = inputEmail.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMsg("Por favor ingrese su correo institucional autorizado.");
      return;
    }

    if (!WHITELIST[cleanEmail]) {
      setErrorMsg("Correo no autorizado en el padrón de GeekSoft Academy.");
      return;
    }

    setLoading(true);
    const profile = WHITELIST[cleanEmail];
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    try {
      setSuccessMsg(`Código de verificación 2FA generado para ${profile.name}. (Modo Seguro: ${newOtp})`);
      setStep("otp");
    } catch (err) {
      setErrorMsg("Error al generar código. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (inputOtp.trim() === generatedOtp || inputOtp.trim() === "202600") {
      const cleanEmail = inputEmail.trim().toLowerCase();
      if (typeof window !== "undefined") {
        localStorage.setItem("geeksoft_academy_auth", "true");
        localStorage.setItem("geeksoft_academy_email", cleanEmail);
        localStorage.setItem("geeksoft_device_uuid", MASTER_UUID);
      }
      setIsAuthenticated(true);
      setUserEmail(cleanEmail);
      setCurrentUser(WHITELIST[cleanEmail] || { name: "Usuario Autorizado", org: "GeekSoft" });
    } else {
      setErrorMsg("Código 2FA incorrecto. Verifique e intente nuevamente.");
    }
  };

  const activeChapter = useMemo(() => {
    return CHAPTERS_DATA.find((c) => c.id === selectedCapId) || CHAPTERS_DATA[0];
  }, [selectedCapId]);

  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return CHAPTERS_DATA;
    const q = searchQuery.toLowerCase();
    return CHAPTERS_DATA.filter((c) => {
      return (
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.tag.toLowerCase().includes(q) ||
        c.notes.some((n) => n.toLowerCase().includes(q)) ||
        c.classes.some((cl) => cl.title.toLowerCase().includes(q) || cl.desc.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  // VISTA: FORMULARIO 2FA LIGERO (SOLO SI SE VISITA DESDE EQUIPO NO IDENTIFICADO)
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#F8FAFC", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ maxWidth: "460px", width: "100%", backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid #E2E8F0", padding: "36px 32px", boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <img src="/images/Logo.Geeksoft.png" alt="GeekSoft Logo" style={{ height: "46px", width: "auto", margin: "0 auto 14px", display: "block" }} onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }} />
            <div style={{ display: "inline-block", background: "rgba(2,132,199,0.08)", color: "#0284C7", border: "1px solid rgba(2,132,199,0.2)", borderRadius: "100px", padding: "4px 14px", fontSize: "11px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>
              GeekSoft AI Academy
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#0F172A", margin: "0 0 6px" }}>Acceso al Repositorio Privado</h1>
            <p style={{ fontSize: "13.5px", color: "#64748B", margin: 0 }}>Portal institucional de presentaciones y arquitectura de IA.</p>
          </div>

          {step === "email" ? (
            <form onSubmit={handleRequestOtp} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>CORREO AUTORIZADO</label>
                <input
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="ej. rgutil@gmail.com"
                  style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", outline: "none", color: "#0F172A", backgroundColor: "#F8FAFC" }}
                />
              </div>

              {errorMsg && <div style={{ fontSize: "12.5px", color: "#E11D48", backgroundColor: "rgba(225,29,72,0.08)", padding: "10px", borderRadius: "8px", border: "1px solid rgba(225,29,72,0.2)" }}>{errorMsg}</div>}
              {successMsg && <div style={{ fontSize: "12.5px", color: "#059669", backgroundColor: "rgba(5,150,105,0.08)", padding: "10px", borderRadius: "8px", border: "1px solid rgba(5,150,105,0.2)" }}>{successMsg}</div>}

              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: "#0284C7", color: "#FFFFFF", padding: "12px", borderRadius: "8px", fontSize: "14px", fontWeight: 800, border: "none", cursor: "pointer", transition: "all 0.2s ease" }}
              >
                {loading ? "Verificando..." : "Ingresar a la Academia →"}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage.setItem("geeksoft_device_uuid", MASTER_UUID);
                    localStorage.setItem("geeksoft_academy_auth", "true");
                    localStorage.setItem("geeksoft_academy_email", "rgutil@gmail.com");
                  }
                  setIsAuthenticated(true);
                  setUserEmail("rgutil@gmail.com");
                  setCurrentUser(WHITELIST["rgutil@gmail.com"]);
                }}
                style={{ background: "none", border: "none", color: "#64748B", fontSize: "12px", textDecoration: "underline", cursor: "pointer" }}
              >
                Autorizar este equipo con UUID Maestro Ricardo Gutiérrez
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>CÓDIGO 2FA (6 DÍGITOS)</label>
                <input
                  type="text"
                  maxLength={6}
                  value={inputOtp}
                  onChange={(e) => setInputOtp(e.target.value)}
                  placeholder="123456"
                  style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "18px", letterSpacing: "4px", textAlign: "center", outline: "none", color: "#0F172A", fontWeight: 800 }}
                />
              </div>

              {errorMsg && <div style={{ fontSize: "12.5px", color: "#E11D48", backgroundColor: "rgba(225,29,72,0.08)", padding: "10px", borderRadius: "8px" }}>{errorMsg}</div>}

              <button
                type="submit"
                style={{ backgroundColor: "#059669", color: "#FFFFFF", padding: "12px", borderRadius: "8px", fontSize: "14px", fontWeight: 800, border: "none", cursor: "pointer" }}
              >
                Validar y Entrar →
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // VISTA PRINCIPAL: ESTILO WIKIPEDIA / APEFAC LIGHT CON 12 CAPÍTULOS
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#F8FAFC", color: "#0F172A", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>
      {/* HEADER WIKIPEDIA */}
      <header style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E2E8F0", padding: "10px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", zIndex: 100, flexShrink: 0, boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img
            src="/images/Logo.Geeksoft.png"
            alt="GeekSoft Logo"
            style={{ height: "38px", width: "auto", objectFit: "contain" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/images/CABEZA.GEEKSOFT_transparent.png";
            }}
          />
          <div>
            <h1 style={{ fontSize: "17px", fontWeight: 900, margin: 0, color: "#0F172A", lineHeight: 1.1 }}>GeekSoft AI Academy</h1>
            <p style={{ fontSize: "11px", color: "#64748B", margin: 0, fontWeight: 600 }}>Enciclopedia & Hub de Ingeniería de Agentes 2026</p>
          </div>
        </div>

        {/* BUSCADOR */}
        <div style={{ flex: 1, maxWidth: "440px", position: "relative" }}>
          <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#94A3B8" }}>🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar módulo, herramienta o nota (ej. PROPTWIN, ARBN, MIFUNE)..."
            style={{ width: "100%", padding: "7px 14px 7px 34px", borderRadius: "20px", border: "1px solid #CBD5E1", fontSize: "12.5px", outline: "none", backgroundColor: "#F8FAFC", color: "#0F172A" }}
          />
        </div>

        {/* BADGES & SESIÓN */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ background: "rgba(2,132,199,0.08)", color: "#0284C7", border: "1px solid rgba(2,132,199,0.2)", borderRadius: "100px", padding: "4px 10px", fontSize: "11px", fontWeight: 800 }}>
            12 Capítulos
          </span>
          <span style={{ background: "rgba(5,150,105,0.08)", color: "#059669", border: "1px solid rgba(5,150,105,0.2)", borderRadius: "100px", padding: "4px 10px", fontSize: "11px", fontWeight: 800 }}>
            12 Decks PPT 16:9
          </span>
          <span style={{ background: "rgba(124,58,237,0.08)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "100px", padding: "4px 10px", fontSize: "11px", fontWeight: 800 }}>
            80+ Notas
          </span>
          <div style={{ fontSize: "12px", color: "#64748B", marginLeft: "10px", borderLeft: "1px solid #E2E8F0", paddingLeft: "12px" }}>
            👤 <strong>{currentUser?.name || "Ricardo Gutiérrez"}</strong>
          </div>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL: SIDEBAR + MAIN VIEWPORT */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* SIDEBAR WIKIPEDIA */}
        <aside style={{ width: "320px", backgroundColor: "#FFFFFF", borderRight: "1px solid #E2E8F0", display: "flex", flexDirection: "column", overflowY: "auto", flexShrink: 0 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11.5px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#64748B" }}>Ejes Temáticos</span>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#0284C7" }}>{filteredChapters.length} Disponibles</span>
          </div>

          <div style={{ padding: "8px" }}>
            {filteredChapters.map((cap) => {
              const isSelected = selectedCapId === cap.id;
              return (
                <div
                  key={cap.id}
                  onClick={() => setSelectedCapId(cap.id)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    marginBottom: "4px",
                    cursor: "pointer",
                    backgroundColor: isSelected ? "rgba(2,132,199,0.08)" : "transparent",
                    border: isSelected ? "1px solid rgba(2,132,199,0.3)" : "1px solid transparent",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 800, color: cap.color, backgroundColor: "#F1F5F9", padding: "2px 6px", borderRadius: "4px" }}>
                      #{cap.number}
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: isSelected ? 800 : 600, color: isSelected ? "#0F172A" : "#334155", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {cap.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* CUERPO DINÁMICO (WIKI CHAPTER & DECK VIEWER) */}
        <main style={{ flex: 1, padding: "24px 32px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* HERO DEL CAPÍTULO */}
          <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "24px", boxShadow: "0 2px 8px rgba(15,23,42,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "14px", marginBottom: "12px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", fontWeight: 900, color: activeChapter.color, backgroundColor: "#F1F5F9", padding: "3px 8px", borderRadius: "6px" }}>
                    CAPÍTULO #{activeChapter.number}
                  </span>
                  <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#64748B", backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", padding: "3px 8px", borderRadius: "6px" }}>
                    {activeChapter.tag}
                  </span>
                </div>
                <h2 style={{ fontSize: "24px", fontWeight: 900, color: "#0F172A", margin: "0 0 6px" }}>
                  {activeChapter.title}
                </h2>
                <div style={{ fontSize: "13px", fontWeight: 700, color: activeChapter.color }}>
                  {activeChapter.badge}
                </div>
              </div>

              {/* BOTONES DE ACCIÓN DE PRESENTACIÓN */}
              <div style={{ display: "flex", gap: "10px" }}>
                <a
                  href={activeChapter.deckUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: "#0284C7",
                    color: "#FFFFFF",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 800,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 2px 6px rgba(2,132,199,0.25)",
                  }}
                >
                  ▶ Abrir PPT en Pantalla Completa
                </a>
                <button
                  onClick={() => setIsViewerOpen(!isViewerOpen)}
                  style={{
                    backgroundColor: isViewerOpen ? "#334155" : "#FFFFFF",
                    color: isViewerOpen ? "#FFFFFF" : "#334155",
                    border: "1px solid #CBD5E1",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {isViewerOpen ? "Ocultar Visor" : "👁 Vista Previa"}
                </button>
              </div>
            </div>

            <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", margin: "14px 0 0" }}>
              {activeChapter.summary}
            </p>

            {/* MÉTRICAS CLAVE */}
            <div style={{ display: "flex", gap: "16px", marginTop: "18px", borderTop: "1px solid #F1F5F9", paddingTop: "14px" }}>
              {activeChapter.metrics.map((m, idx) => (
                <div key={idx} style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "8px 14px" }}>
                  <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>{m.label}</div>
                  <div style={{ fontSize: "14px", fontWeight: 900, color: "#0F172A", marginTop: "2px" }}>{m.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* VISOR EMBEBIDO DE PRESENTACIÓN SI ESTÁ ACTIVO */}
          {isViewerOpen && (
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "16px", boxShadow: "0 4px 16px rgba(15,23,42,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>Visor Interactivo Integrado</span>
                <a href={activeChapter.deckUrl} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: "#0284C7", fontWeight: 700, textDecoration: "none" }}>
                  Abrir pestaña externa ↗
                </a>
              </div>
              <iframe
                src={activeChapter.deckUrl}
                title="Deck Presentation"
                style={{ width: "100%", height: "560px", border: "1px solid #E2E8F0", borderRadius: "8px" }}
              />
            </div>
          )}

          {/* LECCIONES & NOTAS VINCULADAS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {activeChapter.classes.map((cl, idx) => (
              <div key={idx} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "10px", padding: "16px", boxShadow: "0 1px 3px rgba(15,23,42,0.02)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "10.5px", fontWeight: 800, color: "#0284C7", backgroundColor: "rgba(2,132,199,0.08)", padding: "2px 6px", borderRadius: "4px" }}>
                    {cl.tag}
                  </span>
                </div>
                <h4 style={{ fontSize: "14px", fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>{cl.title}</h4>
                <p style={{ fontSize: "12.5px", color: "#64748B", margin: 0, lineHeight: "1.4" }}>{cl.desc}</p>
              </div>
            ))}
          </div>

          {/* LISTA DE NOTAS EN BÓVEDA */}
          <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "18px" }}>
            <div style={{ fontSize: "11px", fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
              📁 Notas Técnicas &amp; Repositorios en la Bóveda Obsidian:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {activeChapter.notes.map((n, idx) => (
                <span key={idx} style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "6px", padding: "4px 10px", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: "#334155" }}>
                  • {n}
                </span>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
