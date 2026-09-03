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
  // Fila 1 - Izquierda
  {
    id: "smith",
    side: "left", // Lottie afuera (izq) -> Texto -> Avatar adentro (der)
    villano: "AGENT SMITH",
    alias: 'EL "EXCEL ZOMBIE"',
    avatar: "/images/smith_head.jpg",
    lottie: "/excel-zombie.json",
    copy: "¿Sigues gestionando tu empresa en hojas de cálculo infinitas? No eres un líder, eres un domador de celdas atrapado en un bucle que se multiplica como clones de Smith.",
    color: "#00d2ff",
  },
  // Fila 1 - Derecha
  {
    id: "merovingio",
    side: "right", // Avatar adentro (izq) -> Texto -> Lottie afuera (der)
    villano: "EL MEROVINGIO",
    alias: 'EL "WHATSAPP SLAVE"',
    avatar: "/images/merovingian_head.jpg",
    lottie: "/whatsapp-slave.json",
    copy: "¿Tus clientes te exigen atención 24/7 convirtiendo tu chat en un infierno de intermediación? En la simulación tú sirves al sistema. Deja que agentes inteligentes tomen el mando.",
    color: "#ff3366",
  },
  // Fila 2 - Izquierda
  {
    id: "twin1",
    side: "left", // Lottie afuera (izq) -> Texto -> Avatar adentro (der, mirando al centro)
    villano: "TWIN #1",
    alias: 'EL "DATA-ENTRY GHOST"',
    avatar: "/images/twin1_head.jpg",
    lottie: "/data-entry-ghost.json",
    copy: "¿Tus empleados pasan horas copiando PDFs y datos a mano? Eso no es trabajo, es tortura de datos. Deja que nuestras APIs procesen todo en milisegundos.",
    color: "#00f0ff",
  },
  // Fila 2 - Derecha
  {
    id: "twin2",
    side: "right", // Avatar adentro (izq, mirando al centro) -> Texto -> Lottie afuera (der)
    villano: "TWIN #2",
    alias: 'THE "EMAIL BLACK HOLE"',
    avatar: "/images/twin2_head.jpg",
    lottie: "/email-black-hole.json",
    copy: "Si la mitad de tu día es responder lo mismo y tus correos críticos mueren sin trazabilidad, no necesitas más tiempo: necesitas un flujo automatizado.",
    color: "#3388ff",
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
        padding: "1.2rem 2rem",
      }}>

        {/* Botón volver */}
        <Link
          href="/"
          style={{
            position: "absolute",
            top: "1.5rem",
            left: "2rem",
            color: "#00c8ff",
            textDecoration: "none",
            fontFamily: "var(--font-display)",
            fontSize: "0.7rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            border: "1px solid rgba(0, 200, 255, 0.3)",
            padding: "0.45rem 0.9rem",
            borderRadius: "4px",
            background: "rgba(0, 15, 35, 0.6)",
            backdropFilter: "blur(10px)",
            transition: "border-color 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "#00c8ff";
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0, 200, 255, 0.15)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0, 200, 255, 0.3)";
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0, 15, 35, 0.6)";
          }}
        >
          ← VOLVER AL RADAR
        </Link>

        {/* Título y subtítulo */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <p style={{
            color: "#00c8ff",
            fontFamily: "var(--font-display)",
            fontSize: "0.65rem",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "0.4rem",
          }}>
            ● LA SIMULACIÓN PRE-IA // BLUE PILL
          </p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)",
            color: "#fff",
            textShadow: "0 0 35px #0066ff, 0 0 70px rgba(0, 102, 255, 0.4)",
            margin: 0,
            lineHeight: 1.1,
          }}>
            Sigue durmiendo en el caos
          </h1>
          <p style={{
            color: "rgba(150, 200, 255, 0.75)",
            fontFamily: "var(--font-body)",
            fontSize: "0.88rem",
            marginTop: "0.4rem",
            whiteSpace: "nowrap",
          }}>
            Donde el tiempo muere, los datos se pierden y crees que tus procesos manuales están bajo control.
          </p>
        </div>

        {/* Grid 2x2 de Villanos */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "1.2rem",
          maxWidth: "1280px",
          width: "100%",
        }}>
          {VILLANOS.map((v) => {
            const isLeft = v.side === "left";

            // Componente Lottie
            const lottieNode = (
              <div
                key="lottie"
                style={{
                  width: "105px",
                  height: "105px",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0, 20, 50, 0.4)",
                  borderRadius: "10px",
                  padding: "6px",
                  border: `1px solid ${v.color}22`,
                }}
              >
                <div style={{ width: "100%", height: "100%" }}>
                  <VibeLottie url={v.lottie} />
                </div>
              </div>
            );

            // Componente Avatar del Villano
            const avatarNode = (
              <div
                key="avatar"
                style={{
                  width: "105px",
                  height: "105px",
                  flexShrink: 0,
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: `2px solid ${v.color}88`,
                  boxShadow: `0 0 25px ${v.color}44, inset 0 0 15px rgba(0,0,0,0.8)`,
                  position: "relative",
                  background: "#000",
                }}
              >
                <img
                  src={v.avatar}
                  alt={v.villano}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "contrast(1.05)",
                  }}
                />
              </div>
            );

            // Componente Texto
            const textNode = (
              <div
                key="text"
                style={{
                  flex: 1,
                  minWidth: 0,
                  textAlign: isLeft ? "left" : "right",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {/* Nombre y alias */}
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.62rem",
                  letterSpacing: "2px",
                  color: v.color,
                  textTransform: "uppercase",
                  marginBottom: "0.2rem",
                  textShadow: `0 0 8px ${v.color}aa`,
                }}>
                  {v.villano}
                </div>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.85rem",
                  letterSpacing: "1px",
                  color: "#fff",
                  margin: "0 0 0.4rem 0",
                  lineHeight: 1.2,
                }}>
                  {v.alias}
                </h3>
                {/* Copy */}
                <p style={{
                  color: "rgba(200, 225, 255, 0.72)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  lineHeight: 1.45,
                  margin: 0,
                }}>
                  {v.copy}
                </p>
              </div>
            );

            return (
              <div
                key={v.id}
                style={{
                  background: "rgba(0, 12, 30, 0.85)",
                  border: `1px solid ${v.color}33`,
                  borderRadius: "14px",
                  padding: "1rem 1.25rem",
                  backdropFilter: "blur(20px)",
                  boxShadow: `0 0 25px ${v.color}15, inset 0 0 20px rgba(0,0,0,0.7)`,
                  display: "flex",
                  alignItems: "center",
                  gap: "1.2rem",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = v.color;
                  el.style.boxShadow = `0 0 40px ${v.color}44, inset 0 0 20px rgba(0,0,0,0.6)`;
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = `${v.color}33`;
                  el.style.boxShadow = `0 0 25px ${v.color}15, inset 0 0 20px rgba(0,0,0,0.7)`;
                  el.style.transform = "translateY(0)";
                }}
              >
                {isLeft ? (
                  <>
                    {lottieNode}
                    {textNode}
                    {avatarNode}
                  </>
                ) : (
                  <>
                    {avatarNode}
                    {textNode}
                    {lottieNode}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA inferior */}
        <div style={{ marginTop: "1.8rem", textAlign: "center" }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #0055ff, #00c8ff)",
              color: "#000",
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              fontSize: "0.72rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 700,
              padding: "0.75rem 1.8rem",
              borderRadius: "4px",
              boxShadow: "0 0 25px rgba(0, 136, 255, 0.4)",
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
