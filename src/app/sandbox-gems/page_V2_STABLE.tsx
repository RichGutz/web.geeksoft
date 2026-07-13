"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import StarField from "@/components/webgl/StarField";
import GreenFogCamera from "@/components/webgl/GreenFogCamera";
import ContourTerrain from "@/components/webgl/ContourTerrain";
import GreenGems from "@/components/webgl/GreenGems";
import GreenFogVolume from "@/components/webgl/GreenFogVolume";
import Link from "next/link";

export default function SandboxGemsPage() {
  return (
    <main style={{ width: "100vw", height: "100vh", backgroundColor: "#001408", position: "relative" }}>
      {/* Botón flotante para regresar al Home */}
      <div style={{ position: "absolute", top: "2rem", left: "2rem", zIndex: 100 }}>
        <Link href="/" style={{
          color: "#fff", 
          textDecoration: "none", 
          fontFamily: "var(--font-display)", 
          border: "1px solid rgba(255,255,255,0.2)", 
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)",
          fontSize: "0.8rem",
          letterSpacing: "1px"
        }}>
          &larr; BACK TO RADAR
        </Link>
      </div>

      {/* Título flotante indicativo */}
      <div style={{
        position: "absolute",
        top: "2.5rem",
        right: "2rem",
        zIndex: 100,
        color: "#00ff80",
        fontFamily: "var(--font-display)",
        fontSize: "0.75rem",
        letterSpacing: "2px",
        textTransform: "uppercase"
      }}>
        Experiment: Green Gems & Fog
      </div>

      {/* Overlay de texto para indicar que se debe hacer scroll */}
      <div style={{
        position: "absolute",
        bottom: "5%",
        width: "100%",
        textAlign: "center",
        zIndex: 50,
        color: "rgba(255,255,255,0.4)",
        fontFamily: "var(--font-body)",
        letterSpacing: "4px",
        pointerEvents: "none",
        textTransform: "uppercase",
        animation: "pulse-glow 2s infinite alternate"
      }}>
        Scroll to travel
      </div>

      {/* Canvas 3D optimizado directo (sin detectores auxiliares que saturen los contextos de WebGL) */}
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        gl={{ powerPreference: "high-performance", antialias: false, alpha: false }}
      >
        {/* Iluminación básica e indirecta */}
        <ambientLight intensity={0.3} />
        
        {/* Luz puntual adicional para que las gemas 3D reflejen luz */}
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ff80" />
        <directionalLight position={[-10, 20, -10]} intensity={1.0} color="#ffffff" />
        
        <ScrollControls pages={5} damping={0.15}>
          
          {/* Controlador de Cámara interactivo al scroll con Niebla Verde Densa */}
          <GreenFogCamera />
          
          {/* Estrellas de fondo verdes neón */}
          <StarField count={3000} color="#00ff80" />
          
          {/* Lego: Niebla Volumétrica de gas verde neón brillante */}
          <GreenFogVolume count={120} />
          
          {/* Lego: Las Gemas Verdes (facetadas e interactivas) */}
          <GreenGems count={30} />
          
          {/* Lego: Terreno con rejilla y curvas de nivel estables */}
          <ContourTerrain />
          
        </ScrollControls>
      </Canvas>
    </main>
  );
}
