"use client";

import { useState, useEffect } from "react";

interface OracleReelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWhatsAppClick: () => void;
}

const VISIONS = [
  {
    id: "distopia",
    badge: "01 // EL DESTINO FALLIDO",
    tagColor: "#ff0055",
    title: "El Colapso por Falta de Cimientos",
    subtitle: "Tener el modelo no es tener la solución",
    image: "/images/transformacion_ia_colapso_matrix.jpg",
    quote: "Comprar licencias de modelos sin construir datos limpios, procesos digitalizados y arquitectura SaaS a medida parte el puente en el aire y quiebra la operación.",
    keyPoints: [
      "85% de proyectos de IA fracasan por falta de infraestructura de datos.",
      "Desarrolladores sobrecargados intentando sostener flujos sin arquitectura.",
      "Cero gobernanza ni integración con los sistemas reales del negocio.",
    ],
  },
  {
    id: "utopia",
    badge: "02 // EL DESTINO EXPONENCIAL",
    tagColor: "#00ff66",
    title: "La Organización Agéntica 2026",
    subtitle: "El salto de asistencia pasiva a ejecución de flujos",
    image: "/images/modelo_madurez_organizacion_agentica.jpg",
    quote: "Cruzar el Umbral Crítico y desplegar cuadrillas agénticas autónomas y gobernadas multiplica el impacto y el ROI del negocio de 10x a 50x.",
    keyPoints: [
      "Evolución de L0 (Manual) a L5 (Empresa Agéntica Multi-Agente).",
      "Humanos en supervisión estratégica (HITL) mientras los agentes entregan valor.",
      "Arquitectura modular, seguridad por kernel y monitoreo continuo.",
    ],
  },
];

export default function OracleReelModal({ isOpen, onClose, onWhatsAppClick }: OracleReelModalProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrentIdx(prev => (prev + 1) % VISIONS.length);
      if (e.key === "ArrowLeft") setCurrentIdx(prev => (prev - 1 + VISIONS.length) % VISIONS.length);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentVision = VISIONS[currentIdx];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(1, 10, 5, 0.94)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        overflowY: "auto",
        animation: "fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onClick={onClose}
    >
      {/* Contenedor Principal Cyberpunk (Grid Split 2 Columnas) */}
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          height: "90vh",
          maxHeight: "920px",
          background: "linear-gradient(145deg, rgba(5, 20, 10, 0.96) 0%, rgba(1, 8, 4, 0.98) 100%)",
          border: `1px solid ${currentVision.tagColor}55`,
          boxShadow: `0 0 50px rgba(0, 0, 0, 0.9), 0 0 30px ${currentVision.tagColor}22`,
          borderRadius: "16px",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
        className="oracle-modal-container"
      >
        {/* Botón Cerrar [X] */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.2rem",
            right: "1.2rem",
            zIndex: 50,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "#fff",
            fontSize: "1.2rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 0, 85, 0.3)";
            e.currentTarget.style.borderColor = "#ff0055";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
          }}
        >
          ✕
        </button>

        {/* ============================================================ */}
        {/* COLUMNA IZQUIERDA: THE ORACLE PROFILE & VISION CONTROLS */}
        {/* ============================================================ */}
        <div
          style={{
            width: "420px",
            minWidth: "380px",
            background: "rgba(0, 0, 0, 0.5)",
            borderRight: "1px solid rgba(0, 255, 102, 0.15)",
            padding: "2.2rem 2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowY: "auto",
          }}
          className="oracle-left-panel"
        >
          <div>
            {/* Header con Avatar de The Oracle */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "1.8rem" }}>
              <div
                style={{
                  width: "88px",
                  height: "88px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "2px solid #00ff66",
                  boxShadow: "0 0 20px rgba(0, 255, 102, 0.4)",
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                <img
                  src="/images/oracle_head.jpg"
                  alt="The Oracle"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "3px",
                    color: "#00ff66",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontFamily: "var(--font-display, monospace)",
                  }}
                >
                  ⚡ THE ORACLE
                </div>
                <h3
                  style={{
                    fontSize: "1.4rem",
                    color: "#fff",
                    fontWeight: 800,
                    letterSpacing: "1px",
                    margin: "0.2rem 0",
                    fontFamily: "var(--font-display, sans-serif)",
                  }}
                >
                  TEMET NOSCE
                </h3>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "rgba(255, 255, 255, 0.55)",
                    fontStyle: "italic",
                  }}
                >
                  "Conócete a ti mismo"
                </div>
              </div>
            </div>

            {/* Cita Profética */}
            <div
              style={{
                background: "rgba(0, 255, 102, 0.04)",
                borderLeft: "3px solid #00ff66",
                padding: "1rem",
                borderRadius: "0 8px 8px 0",
                fontSize: "0.84rem",
                color: "rgba(255, 255, 255, 0.85)",
                lineHeight: 1.5,
                marginBottom: "2rem",
              }}
            >
              "No estoy aquí para decirte qué elegir. Estoy aquí para mostrarte el futuro que ya estás construyendo. ¿Hacia cuál de los dos camina tu empresa?"
            </div>

            {/* Switch de Visiones (Tabs de Control) */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "2px",
                  color: "rgba(255, 255, 255, 0.5)",
                  textTransform: "uppercase",
                  marginBottom: "0.8rem",
                  fontWeight: 600,
                }}
              >
                🔮 SELECCIONA UNA VISIÓN
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {VISIONS.map((v, idx) => {
                  const isActive = idx === currentIdx;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setCurrentIdx(idx)}
                      style={{
                        background: isActive
                          ? `linear-gradient(90deg, ${v.tagColor}22 0%, rgba(0,0,0,0.4) 100%)`
                          : "rgba(255, 255, 255, 0.02)",
                        border: `1px solid ${isActive ? v.tagColor : "rgba(255, 255, 255, 0.08)"}`,
                        borderRadius: "8px",
                        padding: "0.9rem 1.1rem",
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "0.68rem",
                            color: v.tagColor,
                            fontWeight: 700,
                            letterSpacing: "1.5px",
                            marginBottom: "0.2rem",
                          }}
                        >
                          {v.badge}
                        </div>
                        <div
                          style={{
                            fontSize: "0.88rem",
                            color: isActive ? "#fff" : "rgba(255, 255, 255, 0.7)",
                            fontWeight: 600,
                          }}
                        >
                          {v.title}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "1.1rem",
                          color: v.tagColor,
                          transform: isActive ? "translateX(4px)" : "translateX(0)",
                          transition: "transform 0.2s ease",
                        }}
                      >
                        ➔
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Puntos Clave de la Visión Activa */}
            <div
              style={{
                background: "rgba(0, 0, 0, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "8px",
                padding: "1rem",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.72rem",
                  color: currentVision.tagColor,
                  fontWeight: 700,
                  letterSpacing: "1px",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                Diagnóstico de Impacto:
              </div>
              <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.5 }}>
                {currentVision.keyPoints.map((pt, i) => (
                  <li key={i} style={{ marginBottom: "0.35rem" }}>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA al pie del panel */}
          <div style={{ marginTop: "1.5rem" }}>
            <button
              onClick={() => {
                onWhatsAppClick();
                onClose();
              }}
              style={{
                width: "100%",
                padding: "0.95rem",
                background: "linear-gradient(90deg, #00ff66 0%, #00cc52 100%)",
                border: "none",
                borderRadius: "8px",
                color: "#000",
                fontWeight: 800,
                fontSize: "0.82rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "0 0 25px rgba(0, 255, 102, 0.35)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 0 35px rgba(0, 255, 102, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 0 25px rgba(0, 255, 102, 0.35)";
              }}
            >
              Evitar el Colapso // Despertar
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* COLUMNA DERECHA: REEL DE INFOGRAFÍAS EN ALTA DEFINICIÓN */}
        {/* ============================================================ */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "rgba(0, 5, 2, 0.8)",
            position: "relative",
            overflow: "hidden",
          }}
          className="oracle-right-panel"
        >
          {/* Header del Reel con navegación */}
          <div
            style={{
              padding: "1rem 2rem",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(0, 0, 0, 0.4)",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "0.72rem",
                  color: currentVision.tagColor,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                {currentVision.badge}
              </span>
              <h4
                style={{
                  fontSize: "1.1rem",
                  color: "#fff",
                  fontWeight: 700,
                  margin: "0.1rem 0 0 0",
                }}
              >
                {currentVision.subtitle}
              </h4>
            </div>

            {/* Controles de Slide Prev / Next */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <button
                onClick={() => setCurrentIdx(prev => (prev - 1 + VISIONS.length) % VISIONS.length)}
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                ◀ Ant
              </button>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", minWidth: "40px", textAlign: "center" }}>
                {currentIdx + 1} / {VISIONS.length}
              </span>
              <button
                onClick={() => setCurrentIdx(prev => (prev + 1) % VISIONS.length)}
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                Sig ▶
              </button>
            </div>
          </div>

          {/* Área de Visualización de la Infografía con Scroll / Zoom natural */}
          <div
            style={{
              flex: 1,
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflowY: "auto",
              position: "relative",
            }}
          >
            <div
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 40px rgba(0,0,0,0.8), 0 0 20px ${currentVision.tagColor}15`,
                borderRadius: "12px",
                overflow: "hidden",
                border: `1px solid rgba(255, 255, 255, 0.1)`,
              }}
            >
              <img
                key={currentVision.image}
                src={currentVision.image}
                alt={currentVision.title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "70vh",
                  objectFit: "contain",
                  display: "block",
                  animation: "zoomIn 0.3s ease",
                }}
              />
            </div>
          </div>

          {/* Footer del Reel */}
          <div
            style={{
              padding: "0.8rem 2rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(0, 0, 0, 0.6)",
              fontSize: "0.78rem",
              color: "rgba(255, 255, 255, 0.65)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              💡 Usa las flechas <kbd style={{ background: "#222", padding: "2px 6px", borderRadius: "3px" }}>◀</kbd> <kbd style={{ background: "#222", padding: "2px 6px", borderRadius: "3px" }}>▶</kbd> o los botones laterales para deslizar la profecía.
            </div>
            <div style={{ color: currentVision.tagColor, fontWeight: 600 }}>
              {currentVision.quote}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
