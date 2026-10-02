"use client";

import React, { useState, useEffect } from "react";

const VISIONS = [
  {
    id: "utopia",
    badge: "02 // EL DESTINO EXPONENCIAL",
    tagColor: "#00ff80",
    title: "La Organización Agéntica 2026",
    subtitle: "El salto de asistencia pasiva a ejecución de flujos",
    image: "/images/modelo_madurez_organizacion_agentica.jpg",
    speechBubble: "El salto a la Organización Agéntica 2026 requiere cruzar el Umbral Crítico: pasar de la asistencia pasiva a cuadrillas autónomas gobernadas que multiplican el impacto y el ROI operativo del negocio de 10x a 50x.",
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
    speechBubble: "Comprar licencias de modelos sin construir datos limpios, procesos digitalizados y arquitectura SaaS a medida parte el puente en el aire y quiebra la operación.",
    keyPoints: [
      "85% de proyectos de IA fracasan por falta de infraestructura de datos.",
      "Desarrolladores sobrecargados intentando sostener flujos sin arquitectura.",
      "Cero gobernanza ni integración con los sistemas reales del negocio.",
    ],
  },
];

export default function OracleQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentVision = VISIONS[currentIdx];

  // Reel de 5 segundos que se pausa si el usuario hace clic
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
    <div className="mirror-quiz-container" style={{ width: "100%" }}>
      <div
        className="quiz-step-card animate-fade-in"
        style={{
          borderColor: currentVision.tagColor,
          boxShadow: `0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px ${currentVision.tagColor}15`,
          padding: "1.25rem 1.4rem",
        }}
      >
        {/* Layout Responsivo: 2 Columnas en Desktop / 1 Columna Fluida en Móvil */}
        <div className="oracle-layout-grid">
          
          {/* ── COLUMNA IZQUIERDA (Desktop) / PANEL INFERIOR (Móvil): DIAGNÓSTICO + ACCIONES ── */}
          <div className="oracle-sidebar-col">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {/* Selector de Pestañas */}
              <div style={{ display: "flex", gap: "0.4rem" }}>
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
                        padding: "0.5rem 0.4rem",
                        background: isActive ? `${v.tagColor}18` : "rgba(255, 255, 255, 0.03)",
                        border: `1px solid ${isActive ? v.tagColor : "rgba(255, 255, 255, 0.1)"}`,
                        borderRadius: "6px",
                        color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                        fontSize: "0.7rem",
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

              {/* Título de la Visión Activa */}
              <div>
                <div
                  style={{
                    color: currentVision.tagColor,
                    fontFamily: "var(--font-display)",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "2px",
                  }}
                >
                  {currentVision.badge}
                </div>
                <h3
                  className="quiz-question-title"
                  style={{
                    fontSize: "1.12rem",
                    margin: 0,
                    letterSpacing: "-0.2px",
                    color: "#ffffff",
                    textAlign: "left",
                    lineHeight: 1.3,
                  }}
                >
                  {currentVision.subtitle}
                </h3>
              </div>

              {/* GRAN BURBUJA DE DIAGNÓSTICO ESTRATÉGICO */}
              <div
                className="mirror-speech-bubble oracle-speech-bubble-mobile"
                style={{
                  background: "rgba(0, 25, 12, 0.85)",
                  border: `1px solid ${currentVision.tagColor}70`,
                  borderRadius: "12px",
                  padding: "0.95rem 1.15rem",
                  boxShadow: `0 0 25px ${currentVision.tagColor}15`,
                }}
              >
                <div
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 900,
                    color: currentVision.tagColor,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "0.4rem",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  DIAGNÓSTICO ESTRATÉGICO
                </div>
                <p
                  style={{
                    fontSize: "0.86rem",
                    lineHeight: "1.5",
                    color: "#ffffff",
                    margin: 0,
                    fontWeight: 600,
                    textAlign: "left",
                  }}
                >
                  {currentVision.speechBubble}
                </p>
              </div>

              {/* Pilares de Madurez Operativa */}
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.45)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "0.8rem 0.95rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.68rem",
                    color: currentVision.tagColor,
                    fontWeight: 800,
                    letterSpacing: "1.5px",
                    marginBottom: "0.35rem",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Pilares de Madurez:
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "1.1rem",
                    fontSize: "0.75rem",
                    color: "rgba(255, 255, 255, 0.85)",
                    lineHeight: "1.4",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    textAlign: "left",
                  }}
                >
                  {currentVision.keyPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── BLOQUE DE ACCIONES: CONTROLES DEL REEL + TEXTO PAUSA + BOTÓN WHATSAPP ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginTop: "0.2rem" }}>
              {/* Controles de Navegación y Pausa */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(0, 0, 0, 0.5)",
                  padding: "0.4rem 0.6rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <button
                  onClick={togglePause}
                  title={isPaused ? "Clic para reanudar reel automático" : "Clic para pausar reel"}
                  style={{
                    background: isPaused ? "rgba(255, 0, 85, 0.15)" : "rgba(0, 255, 128, 0.12)",
                    border: `1px solid ${isPaused ? "rgba(255, 0, 85, 0.5)" : "rgba(0, 255, 128, 0.5)"}`,
                    color: isPaused ? "#ff6699" : "#00ff80",
                    padding: "0.35rem 0.7rem",
                    borderRadius: "20px",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    letterSpacing: "1px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>{isPaused ? "⏸ PAUSADO" : "▶ REEL 5s"}</span>
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <button
                    onClick={() => setCurrentIdx((prev) => (prev - 1 + VISIONS.length) % VISIONS.length)}
                    style={{
                      background: "rgba(0, 255, 128, 0.06)",
                      border: "1px solid rgba(0, 255, 128, 0.3)",
                      color: "#00ff80",
                      padding: "0.35rem 0.65rem",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.76rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    ◀ Ant
                  </button>

                  <span
                    style={{
                      fontSize: "0.76rem",
                      color: "rgba(255, 255, 255, 0.85)",
                      minWidth: "35px",
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
                      padding: "0.35rem 0.65rem",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.76rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Sig ▶
                  </button>
                </div>
              </div>

              {/* TEXTO DE PAUSA */}
              <div
                style={{
                  fontSize: "0.68rem",
                  color: isPaused ? "#ff6699" : "rgba(0, 255, 128, 0.9)",
                  textAlign: "center",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  fontFamily: "var(--font-display)",
                  padding: "2px 0",
                }}
              >
                {isPaused ? "⏸ Reel pausado (clic en imagen para reanudar)" : "💡 Clic en la imagen para pausar"}
              </div>

              {/* Botón CTA a WhatsApp */}
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
                  padding: "0.85rem 0.9rem",
                  textAlign: "center",
                  textDecoration: "none",
                  boxSizing: "border-box",
                  fontSize: "0.78rem",
                  borderRadius: "8px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
              >
                Coordinar Sesión en WhatsApp ➔
              </a>
            </div>
          </div>

          {/* ── COLUMNA DERECHA (Desktop) / PANEL SUPERIOR (Móvil): INFOGRAFÍA RESPONSIVA ── */}
          <div
            onClick={togglePause}
            className="oracle-infographic-col"
            title={isPaused ? "Pausado. Clic para reanudar reel automático" : "Clic en la infografía para pausar"}
          >
            <img
              key={currentVision.image}
              src={currentVision.image}
              alt={currentVision.title}
              className="oracle-infographic-img"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
