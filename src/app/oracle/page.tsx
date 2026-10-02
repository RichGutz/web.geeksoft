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

      {/* ─── CAPA 1: Botón Volver a Geeksoft Responsivo ────────────────────────── */}
      <Link
        href="/"
        className="oracle-back-link"
      >
        ← Volver a Geeksoft
      </Link>

      <div className="oracle-ui-container">

        {/* ─── Header Compacto de The Oracle Responsivo ───────────────────────── */}
        <div className="oracle-hero-section">
          <div className="oracle-hero-header-row">
            <div className="oracle-avatar-wrapper">
              <img
                src="/images/oracle_head.jpg"
                alt="The Oracle"
                className="oracle-avatar-img"
              />
              <div className="mirror-avatar-glow" />
            </div>
            <div>
              <div className="oracle-tagline">● THE ORACLE // PROPHETIC INTELLIGENCE</div>
              <blockquote className="oracle-quote">
                "Temet Nosce — Conócete a ti mismo."
                <span className="oracle-quote-author"> — The Oracle</span>
              </blockquote>
            </div>
          </div>
        </div>

        {/* ─── Contenedor del Reel de Visión (Tarjeta Angosta y Centrada) ─────── */}
        <div className="mirror-quiz-wrapper" style={{ maxWidth: "1040px", width: "100%" }}>
          <OracleQuiz />
        </div>

      </div>
    </main>
  );
}
