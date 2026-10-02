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

      {/* ─── CAPA 1: Botón Volver a Geeksoft en esquina superior izquierda ─────── */}
      <Link
        href="/"
        className="mirror-back-link"
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "2rem",
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
          padding: "3.5rem 1.5rem 2.5rem 1.5rem",
          overflowY: "auto",
        }}
      >

        {/* ─── Header Compacto de The Oracle (Avatar + Cita) ─────────────────── */}
        <div className="mirror-hero-section" style={{ marginBottom: "1rem" }}>
          <div className="mirror-hero-header-row" style={{ gap: "1.2rem", marginBottom: "0" }}>
            <div className="mirror-v-avatar-wrapper" style={{ width: "85px", height: "85px", minWidth: "85px" }}>
              <img
                src="/images/oracle_head.jpg"
                alt="The Oracle"
                className="mirror-v-avatar-img"
              />
              <div className="mirror-avatar-glow" />
            </div>
            <div className="mirror-hero-titles">
              <div className="mirror-tagline" style={{ fontSize: "0.72rem" }}>● THE ORACLE // PROPHETIC INTELLIGENCE</div>
              <blockquote className="mirror-quote" style={{ fontSize: "1.2rem" }}>
                "Temet Nosce — Conócete a ti mismo."
                <span className="mirror-quote-author" style={{ fontSize: "0.85rem" }}> — The Oracle</span>
              </blockquote>
            </div>
          </div>
        </div>

        {/* ─── Contenedor del Reel de Visión (Tarjeta Angosta y Centrada) ─────── */}
        <div className="mirror-quiz-wrapper" style={{ maxWidth: "1080px", width: "100%" }}>
          <OracleQuiz />
        </div>

      </div>
    </main>
  );
}
