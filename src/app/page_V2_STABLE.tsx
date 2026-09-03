// ============================================================================
// BACKUP HITOS CANÓNICO: page_V2_STABLE.tsx
// Versión Web 100% Blindada e Intocable + Responsividad Móvil Aislada
// Fecha: 2026-09-03
// ============================================================================

"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import StarField from "@/components/webgl/StarField";
import StaticFogCamera from "@/components/webgl/StaticFogCamera";
import ContourTerrain from "@/components/webgl/ContourTerrain";
import GreenGems from "@/components/webgl/GreenGems";
import GreenFogVolume from "@/components/webgl/GreenFogVolume";
import Radar from "@/components/Radar";

// ─── Contenido de los paneles por categoría ───────────────────────────────────
const PANEL_CONTENT: Record<string, {
  title: string;
  color: string;
  tagline: string;
  items: { icon: string; title: string; desc: string }[];
}> = {
  saas: {
    title: "SaaS Especializado",
    color: "var(--color-saas)",
    tagline: "Software a medida que escala contigo",
    items: [
      { icon: "⚡", title: "ERPs Inteligentes", desc: "Sistemas de gestión empresarial diseñados para tu industria, no para todas." },
      { icon: "📊", title: "Plataformas de Datos", desc: "Centraliza, procesa y visualiza tu información en tiempo real." },
      { icon: "🔗", title: "Integraciones API", desc: "Conectamos tus herramientas existentes con cero fricciones." },
    ]
  },
  dashboards: {
    title: "Dashboards",
    color: "var(--color-dashboards)",
    tagline: "Tus datos, convertidos en decisiones",
    items: [
      { icon: "📈", title: "Business Intelligence", desc: "Paneles ejecutivos con KPIs en tiempo real para decisiones estratégicas." },
      { icon: "🎯", title: "Dashboards Tácticos", desc: "Visualizaciones operativas para equipos de campo y ventas." },
      { icon: "🔮", title: "Forecasting Visual", desc: "Predicciones con IA presentadas de forma clara e intuitiva." },
    ]
  },
  ai: {
    title: "Agentes de IA",
    color: "var(--color-ai)",
    tagline: "Automatiza lo repetitivo, libera lo humano",
    items: [
      { icon: "🤖", title: "Agentes de Ventas", desc: "Bots que califican leads, responden consultas y agendan citas 24/7." },
      { icon: "📋", title: "Procesamiento de Docs", desc: "Extracción automática de datos de PDFs, facturas y contratos." },
      { icon: "💬", title: "Asistentes Internos", desc: "IA entrenada con el conocimiento de tu empresa para tu equipo." },
    ]
  },
  scrappers: {
    title: "Web Scrappers",
    color: "var(--color-scrappers)",
    tagline: "Inteligencia de mercado en tiempo real",
    items: [
      { icon: "🕵️", title: "Monitoreo de Precios", desc: "Rastrea a tu competencia automáticamente y ajusta tu estrategia." },
      { icon: "🗞️", title: "Scraping de Noticias", desc: "Agrega información relevante de tu industria sin esfuerzo manual." },
      { icon: "🛒", title: "Datos de E-commerce", desc: "Extrae catálogos, reviews y tendencias de cualquier marketplace." },
    ]
  }
};

const AWAKENED_HEROES = [
  {
    name: "MORPHEUS",
    role: "LOGÍSTICA NAVIERA",
    avatar: "/images/morpheus_head.jpg",
    desc: "Empresa naviera que construyó DELFOS, un CRM inteligente para multicotizaciones, gestión de rutas navieras y analítica profunda de sus márgenes y operaciones."
  },
  {
    name: "NEO",
    role: "FINTECH // FACTORING",
    avatar: "/images/neo_head.jpg",
    desc: "Empresa financiera de factoring que construyó DEFACTO, un ERP a la medida de sus necesidades operativas, de cobranza y relaciones con sus inversionistas."
  },
  {
    name: "TRINITY",
    role: "ACTIVOS & PATRIMONIO",
    avatar: "/images/trinity_head.jpg",
    desc: "Asociación Religiosa que tomó el control integral de sus activos reales creándoles PROPTWIN, un gemelo digital de sus propiedades."
  }
];

export default function SandboxRadarPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentColor, setCurrentColor] = useState("var(--color-default)");
  const [showAwakenedModal, setShowAwakenedModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const panel = selectedCategory ? PANEL_CONTENT[selectedCategory] : null;

  // Temporizador de 5 segundos para redirigir a WhatsApp en móvil
  useEffect(() => {
    if (!showAwakenedModal) {
      setCountdown(5);
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.open("https://wa.me/51991010016", "_blank");
          setShowAwakenedModal(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showAwakenedModal]);

  const handleRedPillClick = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      setShowAwakenedModal(true);
    } else {
      window.open("https://wa.me/51991010016", "_blank");
    }
  };

  return (
    <main style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#001408",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Título GEEKSOFT absoluto arriba a la izquierda del viewport */}
      <div className="header-brand-box">
        <h1
          className="header-brand-title"
          style={{
            color: currentColor,
            textShadow: `0 0 20px ${currentColor}`,
          }}
        >
          GEEKSOFT
        </h1>
      </div>

      {/* ─── CAPA 0: Canvas 3D full-screen ─────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Canvas
          style={{ width: "100%", height: "100%" }}
          camera={{ position: [0, 0, 50], fov: 75 }}
          gl={{ powerPreference: "high-performance", antialias: false, alpha: false }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ff80" />
          <directionalLight position={[-10, 20, -10]} intensity={1.0} color="#ffffff" />
          <StaticFogCamera />
          <StarField count={3000} color="#00ff80" />
          <GreenFogVolume count={80} />
          <GreenGems count={20} />
          <ContourTerrain />
        </Canvas>
      </div>

      {/* ─── CAPA 1: UI flotante ────────────────────────────────────────────── */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>

        {/* BLOQUE CENTRAL: Radar con Viewport Box Adaptativo */}
        <div
          style={{
            pointerEvents: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.65s cubic-bezier(0.77, 0, 0.175, 1)",
            transform: selectedCategory ? "translateX(-28vw)" : "translateX(0)",
          }}
        >
          <div className="radar-viewport-box">
            <Radar 
              onCategorySelect={(id) => setSelectedCategory(prev => prev === id ? null : id)} 
              onColorChange={(color) => setCurrentColor(color)}
            />
          </div>
        </div>

        {/* PANEL LATERAL — aparece desde la derecha al seleccionar un nodo */}
        <div
          className="category-panel-mobile"
          style={{
            pointerEvents: selectedCategory ? "auto" : "none",
            position: "absolute",
            right: 0,
            top: 0,
            width: "42vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "3rem",
            background: "linear-gradient(135deg, rgba(0,10,5,0.92) 0%, rgba(0,20,10,0.85) 100%)",
            backdropFilter: "blur(20px)",
            borderLeft: `1px solid ${panel?.color ?? "transparent"}`,
            boxShadow: panel ? `-20px 0 60px rgba(0,0,0,0.6)` : "none",
            transition: "transform 0.65s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.4s ease",
            transform: selectedCategory ? "translateX(0)" : "translateX(100%)",
            opacity: selectedCategory ? 1 : 0,
          }}
        >
          {/* Botón cerrar */}
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
          >
            ✕
          </button>

          {panel && (
            <>
              {/* Indicador de categoría */}
              <div style={{
                fontSize: "0.7rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: panel.color,
                marginBottom: "0.75rem",
                fontFamily: "var(--font-display)",
              }}>
                ● GEEKSOFT SOLUTIONS
              </div>

              {/* Título */}
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "0.5rem",
                textShadow: `0 0 30px ${panel.color}`,
                lineHeight: 1.2,
              }}>
                {panel.title}
              </h2>

              {/* Tagline */}
              <p style={{
                color: panel.color,
                fontSize: "0.95rem",
                marginBottom: "2.5rem",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.5px",
              }}>
                {panel.tagline}
              </p>

              {/* Cards de servicios */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {panel.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: `1px solid rgba(255,255,255,0.08)`,
                      borderRadius: "8px",
                      padding: "1rem 1.25rem",
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start",
                      transition: "border-color 0.2s ease, background 0.2s ease",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = panel.color;
                      (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.06)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                    }}
                  >
                    <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{item.icon}</span>
                    <div>
                      <div style={{
                        color: "#fff",
                        fontFamily: "var(--font-display)",
                        fontSize: "0.8rem",
                        letterSpacing: "1px",
                        marginBottom: "0.3rem",
                      }}>
                        {item.title}
                      </div>
                      <div style={{
                        color: "rgba(255,255,255,0.55)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.82rem",
                        lineHeight: 1.5,
                      }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                style={{
                  marginTop: "2rem",
                  padding: "0.85rem 2rem",
                  background: panel.color,
                  border: "none",
                  borderRadius: "4px",
                  color: "#000",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.75rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontWeight: 700,
                  alignSelf: "flex-start",
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                Solicitar Demo →
              </button>
            </>
          )}
        </div>

        {/* ─── BLUE PILL: esquina inferior izquierda ─── */}
        <Link
          href="/inframundo"
          className="matrix-pill blue-pill blue-pill-anchor"
        >
          <span className="pill-text">
            <span>BLUE</span><span className="pill-divider"></span><span>PILL</span>
          </span>
          <div className="pill-glow"></div>
          <div className="pill-tooltip">Seguir dormido en el inframundo PRE-IA</div>
        </Link>

        {/* ─── RED PILL: esquina inferior derecha (Hover Popover Desktop + Modal Takeover Mobile) ─── */}
        <div className="red-pill-wrapper">
          {/* Popover holográfico de clientes (Solo Desktop) */}
          <div className="awakened-popover">
            <div className="awakened-header">
              <div className="awakened-tag">● THE AWAKENED</div>
              <div className="awakened-title">Empresas que ya despertaron</div>
            </div>

            <div className="awakened-list">
              {AWAKENED_HEROES.map((hero, idx) => (
                <div key={idx} className="awakened-item">
                  <div className="awakened-avatar-wrapper">
                    <img
                      src={hero.avatar}
                      alt={hero.name}
                      className="awakened-avatar-img"
                    />
                  </div>
                  <div className="awakened-content">
                    <div className="awakened-item-name">
                      <span>{hero.name}</span>
                      <span className="awakened-item-role">{hero.role}</span>
                    </div>
                    <div className="awakened-item-desc">
                      {hero.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="awakened-footer">
              Haz click en la píldora para iniciar tu despertar →
            </div>
          </div>

          <button
            className="matrix-pill red-pill"
            onClick={handleRedPillClick}
          >
            <span className="pill-text">
              <span>RED</span><span className="pill-divider"></span><span>PILL</span>
            </span>
            <div className="pill-glow"></div>
            <div className="pill-tooltip">Despertar a la realidad (Habla con Geeksoft)</div>
          </button>
        </div>

      </div>

      {/* ─── MODAL TAKEOVER MÓVIL: THE AWAKENED (5 segundos + CTA WhatsApp) ─── */}
      {showAwakenedModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "rgba(0, 5, 2, 0.95)",
          backdropFilter: "blur(25px)",
          WebkitBackdropFilter: "blur(25px)",
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem 1.2rem",
          overflowY: "auto",
        }}>
          {/* Header del Modal */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.2rem",
            borderBottom: "1px solid rgba(255, 0, 60, 0.3)",
            paddingBottom: "0.8rem",
          }}>
            <div>
              <div style={{
                color: "#ff003c",
                fontFamily: "var(--font-display)",
                fontSize: "0.65rem",
                letterSpacing: "3px",
                fontWeight: 700,
              }}>
                ● THE AWAKENED
              </div>
              <div style={{
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontSize: "0.95rem",
                fontWeight: 700,
                letterSpacing: "1px",
                marginTop: "0.2rem",
              }}>
                Empresas que ya despertaron
              </div>
            </div>
            <button
              onClick={() => setShowAwakenedModal(false)}
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#fff",
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
              }}
            >
              ✕
            </button>
          </div>

          {/* Lista de Héroes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", flex: 1 }}>
            {AWAKENED_HEROES.map((hero, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 0, 60, 0.25)",
                  borderLeft: "3px solid #ff003c",
                  borderRadius: "10px",
                  padding: "0.85rem 0.95rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                }}
              >
                <div style={{
                  width: "56px",
                  height: "56px",
                  minWidth: "56px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "1.5px solid rgba(255, 0, 60, 0.6)",
                  boxShadow: "0 0 15px rgba(255, 0, 60, 0.3)",
                  background: "#000",
                }}>
                  <img
                    src={hero.avatar}
                    alt={hero.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.2rem",
                  }}>
                    <span style={{
                      color: "#fff",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                    }}>
                      {hero.name}
                    </span>
                    <span style={{
                      color: "#ff003c",
                      fontSize: "0.58rem",
                      fontWeight: 600,
                      letterSpacing: "1px",
                    }}>
                      {hero.role}
                    </span>
                  </div>
                  <div style={{
                    color: "rgba(255, 255, 255, 0.72)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    lineHeight: 1.4,
                  }}>
                    {hero.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Barra de progreso y temporizador */}
          <div style={{ marginTop: "1.2rem", textAlign: "center" }}>
            <div style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontFamily: "var(--font-display)",
              fontSize: "0.68rem",
              letterSpacing: "1.5px",
              marginBottom: "0.5rem",
            }}>
              Conectando con Geeksoft en <span style={{ color: "#ff003c", fontWeight: 700 }}>{countdown}s</span>...
            </div>
            <div style={{
              width: "100%",
              height: "4px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "2px",
              overflow: "hidden",
              marginBottom: "1rem",
            }}>
              <div style={{
                width: `${((5 - countdown) / 5) * 100}%`,
                height: "100%",
                background: "linear-gradient(90deg, #ff003c, #ff3366)",
                transition: "width 1s linear",
              }} />
            </div>

            {/* Botón WhatsApp directo */}
            <button
              onClick={() => {
                window.open("https://wa.me/51991010016", "_blank");
                setShowAwakenedModal(false);
              }}
              style={{
                width: "100%",
                padding: "0.85rem",
                background: "linear-gradient(135deg, #ff003c, #ff2a5f)",
                border: "none",
                borderRadius: "6px",
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "0 0 25px rgba(255, 0, 60, 0.4)",
              }}
            >
              Hablar con Geeksoft por WhatsApp ⚡
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
