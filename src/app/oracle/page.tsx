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
        display: "flex",
        flexDirection: "column",
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

      {/* ── BOTÓN FLOTANTE SUPERIOR IZQUIERDA: Volver a Geeksoft ── */}
      <Link
        href="/"
        className="mirror-back-link"
        style={{
          position: "absolute",
          top: "1.2rem",
          left: "1.5rem",
          zIndex: 100,
          background: "rgba(0, 0, 0, 0.65)",
          border: "1px solid rgba(0, 255, 128, 0.4)",
          color: "#00ff80",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "0.82rem",
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 15px rgba(0, 255, 128, 0.15)",
          transition: "all 0.2s ease",
        }}
      >
        ← Volver a Geeksoft
      </Link>

      {/* ── CONTENEDOR PRINCIPAL MAXIMIZADO ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "3.6rem 1.5rem 1.2rem 1.5rem",
          height: "100vh",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "rgba(2, 10, 5, 0.88)",
            border: `1px solid ${currentVision.tagColor}40`,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: `0 0 50px rgba(0, 0, 0, 0.9), 0 0 30px ${currentVision.tagColor}15`,
            backdropFilter: "blur(12px)",
          }}
        >
          {/* ── BARRA SUPERIOR INTEGRADA (Sin encabezado alto) ── */}
          <div
            style={{
              padding: "0.85rem 1.5rem",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Título y Subtítulo a la izquierda */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span
                style={{
                  fontSize: "0.78rem",
                  color: currentVision.tagColor,
                  fontWeight: 900,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                }}
              >
                {currentVision.badge}
              </span>
              <h1
                style={{
                  fontSize: "1.15rem",
                  color: "#ffffff",
                  fontWeight: 800,
                  margin: 0,
                  letterSpacing: "-0.2px",
                }}
              >
                {currentVision.subtitle}
              </h1>
            </div>

            {/* Controles de Navegación + Estado de Reel */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              {/* Indicador de Pausa / Reproducción */}
              <button
                onClick={togglePause}
                title={isPaused ? "Clic para reanudar reel automático" : "Clic para pausar reel"}
                style={{
                  background: isPaused ? "rgba(255, 0, 85, 0.15)" : "rgba(0, 255, 128, 0.12)",
                  border: `1px solid ${isPaused ? "rgba(255, 0, 85, 0.5)" : "rgba(0, 255, 128, 0.5)"}`,
                  color: isPaused ? "#ff6699" : "#00ff80",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "20px",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  transition: "all 0.2s ease",
                }}
              >
                <span>{isPaused ? "⏸ PAUSADO" : "▶ REEL 5s"}</span>
              </button>

              {/* Botón Anterior */}
              <button
                onClick={() => setCurrentIdx((prev) => (prev - 1 + VISIONS.length) % VISIONS.length)}
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                }}
              >
                ◀ Ant
              </button>

              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", minWidth: "42px", textAlign: "center", fontWeight: 700 }}>
                {currentIdx + 1} / {VISIONS.length}
              </span>

              {/* Botón Siguiente */}
              <button
                onClick={() => setCurrentIdx((prev) => (prev + 1) % VISIONS.length)}
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                }}
              >
                Sig ▶
              </button>
            </div>
          </div>

          {/* ── CUERPO PRINCIPAL: INFOGRAFÍA MAXIMIZADA + DESCRIPCIÓN A LA DERECHA ── */}
          <div
            style={{
              flex: 1,
              display: "flex",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* COLUMNA IZQUIERDA: INFOGRAFÍA MAXIMIZADA CON CLICK PARA PAUSAR */}
            <div
              onClick={togglePause}
              style={{
                flex: "1 1 72%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                position: "relative",
                cursor: "pointer",
                background: "rgba(0, 0, 0, 0.3)",
                overflow: "hidden",
              }}
              title={isPaused ? "Infografía pausada. Clic para reanudar reel automático (5s)" : "Clic para pausar y examinar la infografía"}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: `0 0 35px rgba(0, 0, 0, 0.8), 0 0 20px ${currentVision.tagColor}20`,
                  border: `1px solid rgba(255, 255, 255, 0.08)`,
                }}
              >
                <img
                  key={currentVision.image}
                  src={currentVision.image}
                  alt={currentVision.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                    borderRadius: "8px",
                  }}
                />
              </div>

              {/* Badge Flotante de Ayuda de Clic */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.2rem",
                  left: "1.5rem",
                  background: "rgba(0, 0, 0, 0.75)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  fontSize: "0.68rem",
                  color: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(6px)",
                  pointerEvents: "none",
                }}
              >
                {isPaused ? "⏸ Pausado para lectura • Clic para reanudar" : "💡 Clic en la imagen para pausar"}
              </div>
            </div>

            {/* COLUMNA DERECHA: DESCRIPCIÓN LATERAL DENTRO DEL CONTENEDOR */}
            <div
              style={{
                flex: "0 0 28%",
                maxWidth: "380px",
                minWidth: "280px",
                borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(0, 5, 2, 0.65)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1.5rem",
                overflowY: "auto",
                boxSizing: "border-box",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {/* Selector de visión / Tabs */}
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
                          padding: "0.55rem 0.6rem",
                          background: isActive ? `${v.tagColor}18` : "rgba(255, 255, 255, 0.03)",
                          border: `1px solid ${isActive ? v.tagColor : "rgba(255, 255, 255, 0.1)"}`,
                          borderRadius: "8px",
                          color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {v.id === "utopia" ? "02 // EXPONENCIAL" : "01 // FALLIDO"}
                      </button>
                    );
                  })}
                </div>

                {/* BLOQUE DESCRIPTIVO PRINCIPAL SOLICITADO */}
                <div
                  style={{
                    background: "rgba(0, 255, 128, 0.05)",
                    border: `1px solid ${currentVision.tagColor}50`,
                    borderRadius: "12px",
                    padding: "1.1rem",
                    boxShadow: `0 0 20px ${currentVision.tagColor}10`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      color: currentVision.tagColor,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                    }}
                  >
                    TESIS DE IMPACTO
                  </div>
                  <p
                    style={{
                      fontSize: "0.86rem",
                      lineHeight: "1.55",
                      color: "#ffffff",
                      margin: 0,
                      fontWeight: 600,
                    }}
                  >
                    {currentVision.description}
                  </p>
                </div>

                {/* DIAGNÓSTICO DE IMPACTO / PUNTOS CLAVE */}
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    padding: "1rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: currentVision.tagColor,
                      fontWeight: 800,
                      letterSpacing: "1.5px",
                      marginBottom: "0.6rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Pilares de Madurez:
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "1.2rem",
                      fontSize: "0.76rem",
                      color: "rgba(255, 255, 255, 0.8)",
                      lineHeight: "1.5",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4rem",
                    }}
                  >
                    {currentVision.keyPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Botón WhatsApp de contacto directo */}
              <div style={{ marginTop: "1.2rem" }}>
                <a
                  href={`https://wa.me/51991090016?text=${encodeURIComponent(
                    `Hola Geeksoft, estuve revisando The Oracle sobre ${currentVision.title}. Quiero coordinar una sesión estratégica.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "0.85rem",
                    background: "linear-gradient(90deg, #00ff80 0%, #00cc66 100%)",
                    color: "#001a08",
                    textAlign: "center",
                    textDecoration: "none",
                    fontWeight: 800,
                    fontSize: "0.78rem",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    borderRadius: "8px",
                    boxShadow: "0 0 20px rgba(0, 255, 128, 0.3)",
                    boxSizing: "border-box",
                  }}
                >
                  Coordinar Sesión en WhatsApp ➔
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
