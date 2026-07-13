"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import StarField from "@/components/webgl/StarField";
import FloatingHalo from "@/components/webgl/FloatingHalo";
import WormHoleCamera from "@/components/webgl/WormHoleCamera";
import ContourTerrain from "@/components/webgl/ContourTerrain";
import Link from "next/link";

export default function SandboxPage() {
  return (
    <main style={{ width: "100vw", height: "100vh", backgroundColor: "#020704", position: "relative" }}>
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

      {/* Canvas 3D que ocupa toda la pantalla */}
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }} // fov alto para sensación de velocidad espacial
        gl={{ antialias: true, alpha: false }} // Alpha false optimiza rendimiento si el fondo es fijo
      >
        {/* Iluminación básica */}
        <ambientLight intensity={0.5} />
        
        {/* 
          ScrollControls de Drei nos crea un "scroll virtual" sin necesidad de HTML real.
          pages={5} significa que el contenedor invisible mide 5 pantallas (500vh).
          damping={0.15} hace que el scroll tenga inercia y se sienta súper suave y fluido.
        */}
        <ScrollControls pages={5} damping={0.15}>
          
          {/* Controlador de Cámara interactivo al scroll */}
          <WormHoleCamera />
          
          {/* Efectos Visuales Modulares */}
          <StarField count={4000} />
          {/* <FloatingHalo /> */}
          
          {/* El nuevo terreno de curvas de nivel (Topográfico) */}
          <ContourTerrain />
          
        </ScrollControls>
      </Canvas>
    </main>
  );
}
