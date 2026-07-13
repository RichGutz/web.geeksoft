"use client";

import { Canvas } from "@react-three/fiber";
import StarField from "@/components/webgl/StarField";
import StaticFogCamera from "@/components/webgl/StaticFogCamera";
import ContourTerrain from "@/components/webgl/ContourTerrain";
import GreenGems from "@/components/webgl/GreenGems";
import GreenFogVolume from "@/components/webgl/GreenFogVolume";
import Radar from "@/components/Radar";

export default function SandboxRadarPage() {
  return (
    <main style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#001408",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* ─── CAPA 0: Canvas 3D full-screen como tapiz de fondo ─── */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        // pointerEvents none para que el Radar encima capture el mouse sin problemas
        // Lo quitamos — el ContourTerrain necesita detectar el pointer para el ripple
      }}>
        <Canvas
          style={{ width: "100%", height: "100%" }}
          camera={{ position: [0, 0, 50], fov: 75 }}
          gl={{ powerPreference: "high-performance", antialias: false, alpha: false }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ff80" />
          <directionalLight position={[-10, 20, -10]} intensity={1.0} color="#ffffff" />

          {/* Cámara estática con niebla verde — sin ScrollControls */}
          <StaticFogCamera />

          {/* Estrellas verdes neón de fondo */}
          <StarField count={3000} color="#00ff80" />

          {/* Niebla volumétrica */}
          <GreenFogVolume count={80} />

          {/* Gemas verdes */}
          <GreenGems count={20} />

          {/* Terreno de curvas de nivel */}
          <ContourTerrain />
        </Canvas>
      </div>

      {/* ─── CAPA 1: Radar UI flotante encima del canvas — centrada en pantalla ─── */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        // Flexbox para centrar el bloque del radar en la pantalla
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>

        {/* Radar centrado — reactiva pointer events para interactividad */}
        <div style={{ pointerEvents: "auto" }}>
          <Radar />
        </div>

        {/* ─── Matrix Pills: centradas horizontalmente en la parte inferior ─── */}
        <div
          className="matrix-pills-container"
          style={{
            pointerEvents: "auto",
            position: "absolute",
            bottom: "4rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "2rem",
          }}
        >
          <button className="matrix-pill red-pill" onClick={() => alert("Red Pill: próximamente revelará el inframundo PRE-IA")}>
            <span className="pill-text">
              <span>RED</span>
              <span className="pill-divider"></span>
              <span>PILL</span>
            </span>
            <div className="pill-glow"></div>
            <div className="pill-tooltip">Despertar a la realidad PRE-IA</div>
          </button>

          <button className="matrix-pill blue-pill" onClick={() => alert("Ignorance is bliss... (Acción pendiente)")}>
            <span className="pill-text">
              <span>BLUE</span>
              <span className="pill-divider"></span>
              <span>PILL</span>
            </span>
            <div className="pill-glow"></div>
            <div className="pill-tooltip">Seguir en la ilusión</div>
          </button>
        </div>

      </div>

    </main>
  );
}
