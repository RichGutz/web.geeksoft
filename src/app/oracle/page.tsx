"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import StarField from "@/components/webgl/StarField";
import StaticFogCamera from "@/components/webgl/StaticFogCamera";
import GreenFogVolume from "@/components/webgl/GreenFogVolume";

const VISIONS = [
  {
    id: "utopia",
    badge: "02 // EL DESTINO EXPONENCIAL",
    tagColor: "#00ff80",
    title: "La Organización Agéntica 2026",
    subtitle: "El salto de asistencia pasiva a ejecución de flujos",
    image: "/images/modelo_madurez_organizacion_agentica.jpg",
    description: "Cruzar el Umbral Crítico y desplegar cuadrillas agénticas autónomas y gobernadas multiplica el impacto y el ROI del negocio de 10x a 50x.",
    keyPoints: [
      "Evolución de L0 (Manual) a L5 (Empresa Agéntica Multi-Agente).",
      "Humanos en supervisión estratégica (HITL) mientras los agentes entregan valor.",
      "Arquitectura modular, seguridad por kernel y monitoreo continuo.",
    ],
  },
  {
    id: "distopia",
    badge: "01 // EL DESTINO FALLIDO",
    tagColor: "#ff0055",
    title: "El Colapso por Falta de Cimientos",
    subtitle: "Tener el modelo no es tener la solución",
    image: "/images/transformacion_ia_colapso_matrix.jpg",
    description: "Comprar licencias de modelos sin construir datos limpios, procesos digitalizados y arquitectura SaaS a medida parte el puente en el aire y quiebra la operación.",
    keyPoints: [
      "85% de proyectos de IA fracasan por falta de infraestructura de datos.",
      "Desarrolladores sobrecargados intentando sostener flujos sin arquitectura.",
      "Cero gobernanza ni integración con los sistemas reales del negocio.",
    ],
  },
];

export default function OraclePage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentVision = VISIONS[currentIdx];

  // Reel automático de 5 segundos que se detiene si isPaused es true
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % VISIONS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#020704",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── CAPA 0: Canvas 3D de Fondo Esmeralda & Plata ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Canvas
          style={{ width: "100%", height: "100%" }}
          camera={{ position: [0, 0, 50], fov: 75 }}
          gl={{ powerPreference: "high-performance", antialias: false, alpha: false }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 15, 15]} intensity={2.0} color="#00ff80" />
          <pointLight position={[-15, -10, 10]} intensity={1.2} color="#ffffff" />
          <StaticFogCamera />
          <StarField count={2500} color="#00ff80" />
          <GreenFogVolume count={60} />
        </Canvas>
      </div>

      {/* ── CAPA 1: Botón Volver a Geeksoft (Esquina Superior Izquierda) ── */}
      <Link
        href="/"
        className="mirror-back-link"
        style={{
          position: "absolute",
          top: "2rem",
          left: "2.5rem",
          zIndex: 100,
        }}
      >
        ← Volver a Geeksoft
      </Link>

      {/* ── CAPA 2: UI Flotante con Scroll Limpio (Estructura THE MIRROR) ── */}
      <div
        className="mirror-ui-container"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "5rem 2rem 4rem 2rem",
          overflowY: "auto",
        }}
      >
        {/* ── Header Principal de The Oracle (Idéntico a The Mirror) ── */}
        <div className="mirror-hero-section">
          <div className="mirror-hero-header-row">
            <div className="mirror-v-avatar-wrapper" style={{ borderColor: currentVision.tagColor, boxShadow: `0 0 35px ${currentVision.tagColor}80` }}>
              <img
                src="/images/oracle_head.jpg"
                alt="The Oracle"
                className="mirror-v-avatar-img"
              />
              <div className="mirror-avatar-glow" style={{ borderColor: currentVision.tagColor }} />
            </div>
            <div className="mirror-hero-titles">
              <div className="mirror-tagline">• THE ORACLE // PROPHETIC INTELLIGENCE</div>
              <blockquote className="mirror-quote">
                "Temet Nosce — Conócete a ti mismo."
                <span className="mirror-quote-author"> — The Oracle</span>
              </blockquote>
            </div>
          </div>

          <div className="mirror-speech-bubble">
            <p>
              El salto a la <strong>Organización Agéntica 2026</strong> requiere cruzar el Umbral Crítico: pasar de la asistencia pasiva a 
              cuadrillas autónomas gobernadas que multiplican el impacto y el ROI operativo del negocio de <strong>10x a 50x</strong>.
            </p>
          </div>
        </div>

        {/* ── Tarjeta Maestra de Contenido (Formato THE MIRROR) ── */}
        <div className="mirror-quiz-wrapper" style={{ maxWidth: "1200px", width: "100%" }}>
          <div
            className="quiz-step-card animate-fade-in"
            style={{
              background: "rgba(0, 18, 9, 0.82)",
              border: `1px solid ${currentVision.tagColor}50`,
              borderRadius: "16px",
              padding: "1.75rem",
              boxShadow: `0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px ${currentVision.tagColor}15`,
              backdropFilter: "blur(20px)",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* Cabecera interna de la tarjeta */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "1.2rem",
                marginBottom: "1.2rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <div
                  style={{
                    color: currentVision.tagColor,
                    fontFamily: "var(--font-display)",
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  {currentVision.badge}
                </div>
                <h2
                  className="quiz-question-title"
                  style={{
                    fontSize: "1.35rem",
                    margin: 0,
                    letterSpacing: "-0.3px",
                  }}
                >
                  {currentVision.subtitle}
                </h2>
              </div>

              {/* Controles de Navegación y Pausa */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button
                  onClick={togglePause}
                  title={isPaused ? "Clic para reanudar reel automático" : "Clic para pausar reel"}
                  style={{
                    background: isPaused ? "rgba(255, 0, 85, 0.15)" : "rgba(0, 255, 128, 0.12)",
                    border: `1px solid ${isPaused ? "rgba(255, 0, 85, 0.6)" : "rgba(0, 255, 128, 0.6)"}`,
                    color: isPaused ? "#ff6699" : "#00ff80",
                    padding: "0.45rem 0.9rem",
                    borderRadius: "20px",
                    fontSize: "0.74rem",
                    fontWeight: 800,
                    letterSpacing: "1px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>{isPaused ? "⏸ PAUSADO" : "▶ REEL 5s"}</span>
                </button>

                <button
                  onClick={() => setCurrentIdx((prev) => (prev - 1 + VISIONS.length) % VISIONS.length)}
                  style={{
                    background: "rgba(0, 255, 128, 0.06)",
                    border: "1px solid rgba(0, 255, 128, 0.3)",
                    color: "#00ff80",
                    padding: "0.45rem 0.9rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  ◀ Ant
                </button>

                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "rgba(255, 255, 255, 0.8)",
                    minWidth: "45px",
                    textAlign: "center",
                    fontWeight: 800,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {currentIdx + 1} / {VISIONS.length}
                </span>

                <button
                  onClick={() => setCurrentIdx((prev) => (prev + 1) % VISIONS.length)}
                  style={{
                    background: "rgba(0, 255, 128, 0.06)",
                    border: "1px solid rgba(0, 255, 128, 0.3)",
                    color: "#00ff80",
                    padding: "0.45rem 0.9rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Sig ▶
                </button>
              </div>
            </div>

            {/* Layout en 2 Columnas: Infografía Maximual a la Izquierda + Panel Lateral Derecho */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 340px",
                gap: "1.75rem",
                alignItems: "stretch",
              }}
            >
              {/* Columna Izquierda: Infografía con Click para Pausar */}
              <div
                onClick={togglePause}
                style={{
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: `1px solid rgba(255, 255, 255, 0.1)`,
                  boxShadow: `0 0 35px rgba(0, 0, 0, 0.85), 0 0 25px ${currentVision.tagColor}15`,
                  background: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.75rem",
                  cursor: "pointer",
                  minHeight: "520px",
                }}
                title={isPaused ? "Pausado. Clic para reanudar reel automático" : "Clic en la infografía para pausar"}
              >
                <img
                  key={currentVision.image}
                  src={currentVision.image}
                  alt={currentVision.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "680px",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                    borderRadius: "8px",
                    transition: "transform 0.2s ease",
                  }}
                />

                {/* Badge Flotante en la esquina inferior */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "1rem",
                    background: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid rgba(0, 255, 128, 0.35)",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    fontSize: "0.7rem",
                    color: "#00ff80",
                    backdropFilter: "blur(6px)",
                    pointerEvents: "none",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.5px",
                  }}
                >
                  {isPaused ? "⏸ Pausado • Clic para reanudar" : "💡 Clic en la imagen para pausar"}
                </div>
              </div>

              {/* Columna Derecha: Panel Descriptivo y Acciones */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1.2rem",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  {/* Selector de Pestañas */}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {VISIONS.map((v, idx) => {
                      const isActive = idx === currentIdx;
                      return (
                        <button
                          key={v.id}
                          onClick={() => {
                            setCurrentIdx(idx);
                            setIsPaused(true);
                          }}
                          style={{
                            flex: 1,
                            padding: "0.6rem 0.5rem",
                            background: isActive ? `${v.tagColor}18` : "rgba(255, 255, 255, 0.03)",
                            border: `1px solid ${isActive ? v.tagColor : "rgba(255, 255, 255, 0.1)"}`,
                            borderRadius: "8px",
                            color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                            fontSize: "0.72rem",
                            fontWeight: 800,
                            cursor: "pointer",
                            fontFamily: "var(--font-display)",
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {v.id === "utopia" ? "02 // EXPONENCIAL" : "01 // FALLIDO"}
                        </button>
                      );
                    })}
                  </div>

                  {/* Tesis de Impacto Solicitada */}
                  <div
                    style={{
                      background: "rgba(0, 255, 128, 0.05)",
                      border: `1px solid ${currentVision.tagColor}60`,
                      borderRadius: "12px",
                      padding: "1.2rem",
                      boxShadow: `0 0 25px ${currentVision.tagColor}12`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 900,
                        color: currentVision.tagColor,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        marginBottom: "0.6rem",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      TESIS DE IMPACTO
                    </div>
                    <p
                      style={{
                        fontSize: "0.92rem",
                        lineHeight: "1.55",
                        color: "#ffffff",
                        margin: 0,
                        fontWeight: 600,
                      }}
                    >
                      {currentVision.description}
                    </p>
                  </div>

                  {/* Pilares de Madurez Operativa */}
                  <div
                    style={{
                      background: "rgba(0, 0, 0, 0.45)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "12px",
                      padding: "1.1rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: currentVision.tagColor,
                        fontWeight: 800,
                        letterSpacing: "1.5px",
                        marginBottom: "0.6rem",
                        textTransform: "uppercase",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      Pilares de Madurez:
                    </div>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "1.2rem",
                        fontSize: "0.8rem",
                        color: "rgba(255, 255, 255, 0.85)",
                        lineHeight: "1.5",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.45rem",
                      }}
                    >
                      {currentVision.keyPoints.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Botón CTA a WhatsApp */}
                <div style={{ marginTop: "0.5rem" }}>
                  <a
                    href={`https://wa.me/51991090016?text=${encodeURIComponent(
                      `Hola Geeksoft, estuve analizando The Oracle sobre ${currentVision.title}. Quiero coordinar una sesión estratégica.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quiz-whatsapp-cta"
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "0.95rem 1rem",
                      textAlign: "center",
                      textDecoration: "none",
                      boxSizing: "border-box",
                      fontSize: "0.82rem",
                    }}
                  >
                    Coordinar Sesión en WhatsApp ➔
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
