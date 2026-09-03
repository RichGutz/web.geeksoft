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
    copy: "¿Sigues usando Excel para gestionar tu empresa? No eres empresario, eres un domador de celdas. Deja que nosotros lo automaticemos.",
    color: "#00d2ff",
  },
  {
    id: "ghost",
    nombre: 'El "Data-Entry Ghost"',
    lottie: "/data-entry-ghost.json",
    copy: "¿Tus empleados pasan horas copiando PDFs? Eso no es trabajo, es tortura de datos. Deja que nuestras APIs lo hagan en milisegundos.",
    color: "#3388ff",
  },
  {
    id: "email",
    nombre: 'The "EMAIL BLACK HOLE"',
    lottie: "/email-black-hole.json",
    copy: "Si la mitad de tu día es responder lo mismo, no necesitas más tiempo, necesitas un bot.",
    color: "#00a2ff",
  },
  {
    id: "whatsapp",
    nombre: 'El "WhatsApp Slave"',
    lottie: "/whatsapp-slave.json",
    copy: "¿Tus clientes te hacen sentir un HELL DESK pidiéndote cosas por WhatsApp? ¡Deja que un BOT se haga cargo de ellos!",
    color: "#25d366",
  },
];

export default function InframundoPage() {
  return (
    <main style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#000814",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* ─── CAPA 0: Canvas 3D Simulación Azul ───────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Canvas
          style={{ width: "100%", height: "100%" }}
          camera={{ position: [0, 0, 50], fov: 75 }}
          gl={{ powerPreference: "high-performance", antialias: false, alpha: false }}
        >
          <ambientLight intensity={0.25} color="#0055ff" />
          <pointLight position={[0, 10, 10]} intensity={3.0} color="#0088ff" />
          <pointLight position={[-20, -5, 5]} intensity={1.5} color="#0044ff" />

          <InfernoFogCamera />
          {/* Estrellas azules en vez de rojas */}
          <StarField count={2000} color="#00aaff" />
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
        padding: "1.5rem",
      }}>

        {/* Botón volver */}
        <Link
          href="/"
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            color: "#00c8ff",
            textDecoration: "none",
            fontFamily: "var(--font-display)",
            fontSize: "0.7rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            border: "1px solid rgba(0, 200, 255, 0.3)",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            background: "rgba(0, 15, 35, 0.6)",
            backdropFilter: "blur(10px)",
            transition: "border-color 0.2s ease",
          }}
        >
          ← VOLVER AL RADAR
        </Link>

        {/* Título */}
        <div style={{ textAlign: "center", marginBottom: "2.2rem" }}>
          <p style={{
            color: "#00c8ff",
            fontFamily: "var(--font-display)",
            fontSize: "0.65rem",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "0.6rem",
          }}>
            ● LA SIMULACIÓN PRE-IA // BLUE PILL
          </p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 3.8vw, 2.8rem)",
            color: "#fff",
            textShadow: "0 0 40px #0066ff, 0 0 80px rgba(0, 102, 255, 0.4)",
            margin: 0,
            lineHeight: 1.1,
          }}>
            Sigue durmiendo en el caos
          </h1>
          <p style={{
            color: "rgba(150, 200, 255, 0.75)",
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            marginTop: "0.6rem",
            whiteSpace: "nowrap",
          }}>
            Donde el tiempo muere, los datos se pierden y crees que tus procesos manuales están bajo control.
          </p>
        </div>

        {/* Grid de Villanos (4 columnas) */}
        <div style={{
          display: "flex",
          gap: "1.2rem",
          flexWrap: "nowrap",
          justifyContent: "center",
          maxWidth: "1280px",
          width: "100%",
        }}>
          {VILLANOS.map((v) => (
            <div
              key={v.id}
              style={{
                background: "rgba(0, 12, 30, 0.85)",
                border: `1px solid ${v.color}44`,
                borderRadius: "12px",
                padding: "1.25rem 1.1rem",
                width: "260px",
                flex: "0 1 260px",
                backdropFilter: "blur(20px)",
                boxShadow: `0 0 30px ${v.color}22, inset 0 0 20px rgba(0,0,0,0.6)`,
                transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = v.color;
                el.style.boxShadow = `0 0 50px ${v.color}55, inset 0 0 20px rgba(0,0,0,0.6)`;
                el.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = `${v.color}44`;
                el.style.boxShadow = `0 0 30px ${v.color}22, inset 0 0 20px rgba(0,0,0,0.6)`;
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
                color: "rgba(200, 225, 255, 0.7)",
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
            href="/"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #0055ff, #00c8ff)",
              color: "#000",
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              fontSize: "0.75rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 700,
              padding: "0.85rem 2rem",
              borderRadius: "4px",
              boxShadow: "0 0 30px rgba(0, 136, 255, 0.4)",
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
          >
            Salir de la Simulación →
          </Link>
        </div>

      </div>
    </main>
  );
}
