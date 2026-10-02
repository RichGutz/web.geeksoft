"use client";

import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import StarField from "@/components/webgl/StarField";
import StaticFogCamera from "@/components/webgl/StaticFogCamera";
import GreenFogVolume from "@/components/webgl/GreenFogVolume";
import OracleQuiz from "@/components/OracleQuiz";

export default function OraclePage() {
  return (
    <main style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#020704",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* ─── CAPA 0: Canvas 3D de Fondo Esmeralda & Plata ──────────────────────── */}
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

      {/* ─── CAPA 1: UI Flotante con Scroll Limpio ─────────────────────────────── */}
      {/* Botón Volver a Geeksoft en esquina superior izquierda */}
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

        {/* Header Principal de The Oracle (Idéntico a The Mirror con la cara de THE ORACLE) */}
        <div className="mirror-hero-section">
          <div className="mirror-hero-header-row">
            <div className="mirror-v-avatar-wrapper">
              <img
                src="/images/oracle_head.jpg"
                alt="The Oracle"
                className="mirror-v-avatar-img"
              />
              <div className="mirror-avatar-glow" />
            </div>
            <div className="mirror-hero-titles">
              <div className="mirror-tagline">● THE ORACLE // PROPHETIC INTELLIGENCE</div>
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

        {/* Contenedor del Reel de Visión */}
        <div className="mirror-quiz-wrapper">
          <OracleQuiz />
        </div>

      </div>
    </main>
  );
}
