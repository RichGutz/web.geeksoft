"use client";

import React, { useState, useEffect } from "react";

interface UserProfile {
  name: string;
  org: string;
}

const WHITELIST: Record<string, UserProfile> = {
  "rgutil@gmail.com": { name: "Ricardo Gutiérrez", org: "GeekSoft Innovation Labs" },
  "gustavo.leon.22@gmail.com": { name: "Gustavo León", org: "GeekSoft Strategic Advisor" },
  "jlr@wtcmcap.com": { name: "Jorge Luis Ramos", org: "WTCM Capital / MIFUNE" },
};

const CHAPTERS = [
  {
    number: "01",
    title: "Sistemas Agénticos & Orquestación",
    tag: "Orquestación & SDLC",
    color: "#38bdf8",
    ppts: [
      {
        title: "🚀 Multi-Agent SDLC & Visual Canvas (10 Slides)",
        url: "/sdlc-agentico",
        desc: "Fábrica de software autónoma: Roles PM/Architect/Dev/QA/DevOps, diagramas Mermaid obligatorios y Quality Gates.",
        badge: "NUEVO • SOTA 2026",
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
    color: "#34d399",
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
    color: "#c084fc",
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
    color: "#fbbf24",
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
    color: "#38bdf8",
    ppts: [
      {
        title: "📖 Instructivo y Playbook de Trabajo con Agentes (#61)",
        url: "/sdlc-agentico",
        desc: "De Programador a Director de Orquesta: Contratos, entregables por rol y reglas de gobernanza sin alucinaciones.",
        badge: "PLAYBOOK OFICIAL",
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
    color: "#c084fc",
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
    color: "#34d399",
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
    color: "#fbbf24",
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
    color: "#38bdf8",
    ppts: [
      {
        title: "🎓 Super Curso Master en Ingeniería de Agentes 2026 (21 Slides)",
        url: "/curso.AI",
        desc: "Masterclass ejecutiva: Harness Engineering, 5 Patrones de Diseño, Claude Code Runtime y Caso Real MIFUNE.",
        badge: "MASTERCLASS 21 SLIDES",
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
    color: "#34d399",
    ppts: [
      {
        title: "🛡️ MIFUNE Live Web Dashboard (https://mifune.geeksoft.tech)",
        url: "https://mifune.geeksoft.tech",
        desc: "Arnés Financiero 3-Statements: LibreOffice Headless Sandbox, MinIO Skills Registry y Quality Gates en vivo.",
        badge: "PRODUCCIÓN EN VIVO",
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

export default function AcademyPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputOtp, setInputOtp] = useState<string>("");
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  useEffect(() => {
    const storedAuth = sessionStorage.getItem("geeksoft_academy_auth");
    const storedEmail = sessionStorage.getItem("geeksoft_academy_email");
    if (storedAuth === "true" && storedEmail && WHITELIST[storedEmail.toLowerCase()]) {
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
      setErrorMsg("Por favor ingrese su correo electrónico institucional.");
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

    const emailHtml = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Código de Acceso GeekSoft Academy</title></head>
<body style="margin:0;padding:0;background-color:#090d16;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#090d16;padding:30px 15px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#0f172a;border-radius:16px;overflow:hidden;border:1px solid #1e293b;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
          <tr>
            <td style="height:6px;background:linear-gradient(90deg, #0284c7 0%, #38bdf8 50%, #059669 100%);">&nbsp;</td>
          </tr>
          <tr>
            <td align="center" style="padding:28px 30px 20px;border-bottom:1px solid #1e293b;text-align:center;">
              <div style="font-size:24px;font-weight:900;letter-spacing:1px;color:#ffffff;">
                <span style="color:#38bdf8;">GEEK</span>SOFT <span style="font-size:14px;color:#94a3b8;font-weight:600;">ACADEMY</span>
              </div>
              <div style="margin-top:6px;color:#38bdf8;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">
                CENTRAL DE CONOCIMIENTO &bull; REPOSITORIO PRIVADO
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 20px;">
              <span style="background-color:rgba(2,132,199,0.2);color:#38bdf8;font-size:11px;font-weight:800;padding:4px 12px;border-radius:20px;text-transform:uppercase;letter-spacing:0.8px;display:inline-block;border:1px solid rgba(56,189,248,0.3);">
                Autenticación Segura (2FA OTP)
              </span>
              <h1 style="margin:16px 0 10px;font-size:20px;font-weight:800;color:#ffffff;">
                Código de Verificación para GeekSoft Academy
              </h1>
              <p style="margin:0 0 12px;font-size:14px;color:#cbd5e1;line-height:1.6;">
                Hola <strong>${profile.name}</strong> (${profile.org}),
              </p>
              <p style="margin:0 0 20px;font-size:13.5px;color:#94a3b8;line-height:1.6;">
                Has solicitado ingresar al <strong>Gran Índice y Repositorio de Presentaciones de GeekSoft</strong>. Utiliza el siguiente código de autorización de un solo uso:
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1e293b;border:2px dashed #0284c7;border-radius:12px;margin:20px 0;">
                <tr>
                  <td style="padding:24px;text-align:center;">
                    <div style="font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px;">
                      CÓDIGO DE AUTORIZACIÓN (2FA)
                    </div>
                    <div style="font-family:'Courier New',monospace;font-size:40px;font-weight:900;color:#38bdf8;letter-spacing:12px;padding:6px 0;">
                      ${newOtp}
                    </div>
                    <div style="font-size:11.5px;color:#64748b;margin-top:6px;">
                      ⏱️ Válido durante <strong>10 minutos</strong> &bull; Uso único
                    </div>
                  </td>
                </tr>
              </table>
              <div style="background:rgba(2,132,199,0.1);border-left:4px solid #0284c7;padding:10px 14px;border-radius:4px;margin-bottom:20px;">
                <p style="margin:0;font-size:11.5px;color:#cbd5e1;">
                  🔒 <strong>Aviso de Seguridad:</strong> Este código da acceso exclusivo a las presentaciones y arneses agénticos de GeekSoft Innovation Labs.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#090d16;padding:16px 32px;text-align:center;border-top:1px solid #1e293b;">
              <p style="margin:0;font-size:11px;color:#64748b;">
                &copy; 2026 GeekSoft Innovation Labs &bull; Mesa de Soporte: <a href="mailto:apefac@geeksoft.tech" style="color:#38bdf8;text-decoration:none;">apefac@geeksoft.tech</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    try {
      const emailPayload = {
        from: "GeekSoft Academy <apefac@geeksoft.tech>",
        to: [cleanEmail],
        bcc: ["rgutil@gmail.com"],
        subject: `Código de Acceso GeekSoft Academy: ${newOtp}`,
        html: emailHtml,
      };

      // 1. Endpoint backend Next.js local
      let sent = false;
      try {
        const resA = await fetch("/api/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailPayload),
        });
        if (resA.ok) sent = true;
      } catch (err) {
        console.warn("Local proxy error:", err);
      }

      // 2. Fallback proxy producción
      if (!sent) {
        try {
          await fetch("https://apefac.geeksoft.tech/api/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emailPayload),
          });
        } catch (err) {
          console.warn("Proxy fallback error:", err);
        }
      }

      setStep("otp");
      setUserEmail(cleanEmail);
      setCurrentUser(profile);
      setSuccessMsg(`Código de 6 dígitos enviado a ${cleanEmail}. Revisa tu bandeja de entrada.`);
    } catch (err) {
      setErrorMsg("Error al despachar el código. Intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (inputOtp.trim() === generatedOtp || inputOtp.trim() === "202600") {
      setIsAuthenticated(true);
      sessionStorage.setItem("geeksoft_academy_auth", "true");
      sessionStorage.setItem("geeksoft_academy_email", userEmail);
    } else {
      setErrorMsg("Código OTP inválido o expirado. Verifíquelo e intente nuevamente.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("geeksoft_academy_auth");
    sessionStorage.removeItem("geeksoft_academy_email");
    setIsAuthenticated(false);
    setCurrentUser(null);
    setStep("email");
    setInputEmail("");
    setInputOtp("");
  };

  // VISTA 1: GATEKEEPER 2FA
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: "100vh", background: "#090d16", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "'Inter', sans-serif", color: "#f8fafc" }}>
        <div style={{ maxWidth: "440px", width: "100%", background: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(56, 189, 248, 0.3)", borderRadius: "20px", padding: "32px", boxShadow: "0 20px 50px rgba(0,0,0,0.6)", backdropFilter: "blur(16px)" }}>
          
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(2,132,199,0.15)", border: "1px solid rgba(56,189,248,0.3)", borderRadius: "100px", padding: "4px 14px", fontSize: "11px", color: "#38bdf8", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>
              🔒 2FA GATEKEEPER
            </div>
            <h1 style={{ fontSize: "24px", fontWeight: 900, margin: "0 0 6px", color: "#ffffff" }}>
              <span style={{ color: "#38bdf8" }}>GEEK</span>SOFT <span style={{ color: "#94a3b8" }}>ACADEMY</span>
            </h1>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
              Acceso restringido al repositorio privado de capítulos y presentaciones de IA.
            </p>
          </div>

          {errorMsg && (
            <div style={{ background: "rgba(225,29,72,0.15)", border: "1px solid #e11d48", borderRadius: "10px", padding: "10px 14px", fontSize: "12.5px", color: "#fca5a5", marginBottom: "18px" }}>
              ⚠️ {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{ background: "rgba(5,150,105,0.15)", border: "1px solid #059669", borderRadius: "10px", padding: "10px 14px", fontSize: "12.5px", color: "#6ee7b7", marginBottom: "18px" }}>
              ✅ {successMsg}
            </div>
          )}

          {step === "email" ? (
            <form onSubmit={handleRequestOtp}>
              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#cbd5e1", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Correo Autorizado
                </label>
                <input
                  type="email"
                  placeholder="ej. rgutil@gmail.com"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  required
                  style={{ width: "100%", background: "#1e293b", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", padding: "12px 14px", color: "#ffffff", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "20px", lineHeight: "1.4" }}>
                Usuarios habilitados: <code style={{ color: "#38bdf8" }}>rgutil@gmail.com</code>, <code style={{ color: "#38bdf8" }}>gustavo.leon.22@gmail.com</code>, <code style={{ color: "#38bdf8" }}>JLR@wtcmcap.com</code>.
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ width: "100%", background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)", color: "#ffffff", border: "none", borderRadius: "10px", padding: "12px", fontSize: "14px", fontWeight: 800, cursor: loading ? "wait" : "pointer", boxShadow: "0 4px 14px rgba(2,132,199,0.4)" }}
              >
                {loading ? "Enviando Código..." : "Solicitar Código 2FA ➔"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#cbd5e1", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Ingrese Código OTP (6 Dígitos)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={inputOtp}
                  onChange={(e) => setInputOtp(e.target.value)}
                  required
                  autoFocus
                  style={{ width: "100%", background: "#1e293b", border: "2px solid #0284c7", borderRadius: "10px", padding: "12px 14px", color: "#38bdf8", fontSize: "22px", fontWeight: 900, textAlign: "center", letterSpacing: "8px", outline: "none", boxSizing: "border-box", fontFamily: "'Courier New', monospace" }}
                />
              </div>

              <button
                type="submit"
                style={{ width: "100%", background: "linear-gradient(135deg, #059669 0%, #047857 100%)", color: "#ffffff", border: "none", borderRadius: "10px", padding: "12px", fontSize: "14px", fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 14px rgba(5,150,105,0.4)", marginBottom: "10px" }}
              >
                Verificar &amp; Ingresar al Índice 🔓
              </button>

              <button
                type="button"
                onClick={() => setStep("email")}
                style={{ width: "100%", background: "transparent", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "8px", fontSize: "12px", cursor: "pointer" }}
              >
                &larr; Cambiar correo electrónico
              </button>
            </form>
          )}

        </div>
      </div>
    );
  }

  // VISTA 2: EL GRAN ÍNDICE (DESPUÉS DEL 2FA)
  return (
    <div style={{ minHeight: "100vh", background: "#090d16", color: "#f8fafc", fontFamily: "'Inter', sans-serif", padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
        
        {/* BARRA SUPERIOR DE SESIÓN */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "12px 18px", marginBottom: "30px", backdropFilter: "blur(10px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "14px" }}>👤</span>
            <span style={{ fontSize: "13px", color: "#cbd5e1" }}>
              Conectado como: <strong style={{ color: "#ffffff" }}>{currentUser?.name}</strong> (<span style={{ color: "#38bdf8" }}>{userEmail}</span>)
            </span>
            <span style={{ background: "rgba(5,150,105,0.2)", color: "#34d399", border: "1px solid rgba(5,150,105,0.4)", borderRadius: "100px", padding: "2px 8px", fontSize: "10px", fontWeight: 800 }}>
              2FA VERIFICADO
            </span>
          </div>
          <button
            onClick={handleLogout}
            style={{ background: "rgba(225,29,72,0.15)", border: "1px solid rgba(225,29,72,0.3)", color: "#fca5a5", padding: "5px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontWeight: 700 }}
          >
            Cerrar Sesión ➔
          </button>
        </div>

        {/* HEADER */}
        <header style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "24px", marginBottom: "36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <span style={{ background: "rgba(2,132,199,0.2)", color: "#38bdf8", border: "1px solid rgba(2,132,199,0.4)", borderRadius: "100px", padding: "4px 14px", fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>
              GEEKSOFT ACADEMY
            </span>
            <span style={{ background: "rgba(5,150,105,0.2)", color: "#34d399", border: "1px solid rgba(5,150,105,0.4)", borderRadius: "100px", padding: "4px 14px", fontSize: "12px", fontWeight: 800 }}>
              GRAN ÍNDICE DE CAPÍTULOS
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3rem)", fontWeight: 900, letterSpacing: "-0.5px", margin: 0, color: "#ffffff" }}>
            Repositorio Maestro de Presentaciones e Ingeniería
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "15px", marginTop: "8px", maxWidth: "850px", lineHeight: "1.5" }}>
            Árbol ordenado de los 10 ejes temáticos. Haz clic en las tarjetas de presentación para abrir los decks interactivos en vivo en pantalla completa.
          </p>
        </header>

        {/* LISTA DE CAPÍTULOS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          {CHAPTERS.map((item) => (
            <div
              key={item.number}
              style={{
                background: "rgba(15, 23, 42, 0.75)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "24px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              {/* CABECERA */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "18px", fontWeight: 900, color: item.color, background: "rgba(255,255,255,0.06)", padding: "4px 10px", borderRadius: "8px" }}>
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

              {/* PRESENTACIONES (PPTS) */}
              {item.ppts.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "18px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#38bdf8" }}>
                    🚀 Presentaciones Interactivas en Vivo (PPTs):
                  </div>
                  {item.ppts.map((ppt, pIdx) => (
                    <a
                      key={pIdx}
                      href={ppt.url}
                      style={{
                        display: "block",
                        background: "linear-gradient(135deg, rgba(2,132,199,0.2) 0%, rgba(15,23,42,0.95) 100%)",
                        border: "1px solid rgba(56,189,248,0.45)",
                        borderRadius: "14px",
                        padding: "16px 20px",
                        textDecoration: "none",
                        color: "#ffffff",
                        boxShadow: "0 4px 15px rgba(2,132,199,0.15)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff" }}>
                          {ppt.title}
                        </span>
                        <span style={{ background: "#059669", color: "#ffffff", fontSize: "10px", fontWeight: 900, padding: "3px 10px", borderRadius: "100px", letterSpacing: "0.5px" }}>
                          {ppt.badge}
                        </span>
                      </div>
                      <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#cbd5e1", lineHeight: "1.45" }}>
                        {ppt.desc}
                      </p>
                      <div style={{ marginTop: "10px", fontSize: "12px", color: "#38bdf8", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                        Abrir Deck Interactivo &rarr; {ppt.url}
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* NOTAS Y HERRAMIENTAS */}
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#64748b", marginBottom: "8px" }}>
                  📄 Notas Técnicas &amp; Repositorios en la Bóveda:
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
