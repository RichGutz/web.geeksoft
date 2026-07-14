"use client";

import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import dynamic from "next/dynamic";
import InfernoTerrain from "@/components/webgl/InfernoTerrain";
import InfernoFogCamera from "@/components/webgl/InfernoFogCamera";
import StarField from "@/components/webgl/StarField";

// VibeLottie se carga dinámicamente para evitar SSR issues
const VibeLottie = dynamic(() => import("@/components/VibeLottie"), { ssr: false });

const VILLANOS = [
  {
    id: "excel",
    nombre: 'El "Excel Zombie"',
    lottie: "/excel-zombie.json",
    copy: "¿Sigues usando Excel para gestionar tu empresa? No eres contador, eres un domador de celdas. Deja que nosotros lo automaticemos.",
    color: "#ff4400",
  },
  {
    id: "ghost",
    nombre: 'El "Data-Entry Ghost"',
    lottie: "/lottie-surprise.json",
    copy: "¿Tus empleados pasan horas copiando PDFs? Eso no es trabajo, es tortura de datos. Deja que nuestras APIs lo hagan en milisegundos.",
    color: "#ff6600",
  },
  {
    id: "email",
    nombre: 'El "Email Hole"',
    lottie: "/lottie-surprise.json",
    copy: "Si la mitad de tu día es responder lo mismo, no necesitas más tiempo, necesitas un bot.",
    color: "#ff8800",
  },
];

export default function InframundoPage() {
  return (
    <main style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#0d0200",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* ─── CAPA 0: Canvas 3D Infierno ─────────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Canvas
          style={{ width: "100%", height: "100%" }}
          camera={{ position: [0, 0, 50], fov: 75 }}
          gl={{ powerPreference: "high-performance", antialias: false, alpha: false }}
        >
          <ambientLight intensity={0.2} color="#ff4400" />
          <pointLight position={[0, 10, 10]} intensity={3.0} color="#ff6600" />
          <pointLight position={[-20, -5, 5]} intensity={1.5} color="#ff2200" />

          <InfernoFogCamera />
          {/* Estrellas rojas en vez de verdes */}
          <StarField count={2000} color="#ff4400" />
          <InfernoTerrain />
        </Canvas>
      </div>

      {/* ─── CAPA 1: UI flotante ────────────────────────────────────────────── */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}>

        {/* Botón volver */}
        <Link
          href="/sandbox-radar"
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            color: "#ff8800",
            textDecoration: "none",
            fontFamily: "var(--font-display)",
            fontSize: "0.7rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            border: "1px solid rgba(255,136,0,0.3)",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            transition: "border-color 0.2s ease",
          }}
        >
          ← VOLVER AL RADAR
        </Link>

        {/* Título */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{
            color: "#ff4400",
            fontFamily: "var(--font-display)",
            fontSize: "0.65rem",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}>
            ● EL INFRAMUNDO PRE-IA
          </p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            color: "#fff",
            textShadow: "0 0 40px #ff4400, 0 0 80px #ff220066",
            margin: 0,
            lineHeight: 1.1,
          }}>
            El Costo del Caos
          </h1>
          <p style={{
            color: "rgba(255,120,0,0.7)",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            marginTop: "0.75rem",
            maxWidth: "500px",
          }}>
            Donde el tiempo muere, los datos se pierden y tus empleados sufren en silencio.
          </p>
        </div>

        {/* Grid de Villanos */}
        <div style={{
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "1000px",
        }}>
          {VILLANOS.map((v) => (
            <div
              key={v.id}
              style={{
                background: "rgba(13,2,0,0.8)",
                border: `1px solid ${v.color}44`,
                borderRadius: "12px",
                padding: "1.5rem",
                width: "280px",
                backdropFilter: "blur(20px)",
                boxShadow: `0 0 30px ${v.color}22, inset 0 0 20px rgba(0,0,0,0.5)`,
                transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = v.color;
                el.style.boxShadow = `0 0 50px ${v.color}44, inset 0 0 20px rgba(0,0,0,0.5)`;
                el.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = `${v.color}44`;
                el.style.boxShadow = `0 0 30px ${v.color}22, inset 0 0 20px rgba(0,0,0,0.5)`;
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Animación Lottie */}
              <div style={{ height: "140px", marginBottom: "1rem" }}>
                <VibeLottie url={v.lottie} />
              </div>

              {/* Nombre del villano */}
              <h3 style={{
                color: v.color,
                fontFamily: "var(--font-display)",
                fontSize: "0.85rem",
                letterSpacing: "1px",
                marginBottom: "0.75rem",
                textShadow: `0 0 10px ${v.color}`,
              }}>
                {v.nombre}
              </h3>

              {/* Descripción */}
              <p style={{
                color: "rgba(255,200,150,0.65)",
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                lineHeight: 1.6,
              }}>
                {v.copy}
              </p>
            </div>
          ))}
        </div>

        {/* CTA inferior */}
        <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <Link
            href="/sandbox-radar"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #ff4400, #ff8800)",
              color: "#000",
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              fontSize: "0.75rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 700,
              padding: "0.85rem 2rem",
              borderRadius: "4px",
              boxShadow: "0 0 30px rgba(255,68,0,0.4)",
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
          >
            Salir del Infierno →
          </Link>
        </div>

      </div>
    </main>
  );
}
