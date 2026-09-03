"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function VibeLottie({ url }: { url: string }) {
  const [animationData, setAnimationData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (url.includes("whatsapp") || url.includes("toll") || url.includes("trainman")) return; // Usamos las animaciones vectoriales optimizadas
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch((err) => {
        console.error("Failed to load Lottie:", err);
        setError(true);
      });
  }, [url]);

  if (url.includes("whatsapp")) {
    return (
      <div className="interactive-vibe-mobile" style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "0",
      }}>
        {/* Animated WhatsApp Phone & Hell Desk UI (Alineado y Despejado) */}
        <div style={{
          position: "relative",
          width: "135px",
          height: "76px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Pulsing Aura */}
          <div style={{
            position: "absolute",
            width: "58px",
            height: "58px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37, 211, 102, 0.4) 0%, transparent 70%)",
            animation: "pulse-aura 2s infinite ease-in-out",
          }} />

          {/* WhatsApp Main Icon */}
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 0 16px rgba(37,211,102,0.7))", zIndex: 1 }}>
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2Z" fill="#25D366" />
            <path d="M17.5 14.33C17.2 14.18 15.73 13.46 15.45 13.36C15.18 13.26 14.98 13.21 14.78 13.51C14.58 13.81 14.01 14.48 13.83 14.68C13.66 14.88 13.48 14.91 13.18 14.76C12.88 14.61 11.92 14.3 10.78 13.28C9.9 12.49 9.3 11.52 9.13 11.22C8.95 10.92 9.11 10.76 9.26 10.61C9.4 10.48 9.56 10.26 9.71 10.09C9.86 9.91 9.91 9.79 10.01 9.59C10.11 9.39 10.06 9.21 9.98 9.06C9.91 8.91 9.31 7.43 9.06 6.83C8.81 6.26 8.57 6.33 8.38 6.33C8.21 6.33 8.01 6.31 7.81 6.31C7.61 6.31 7.28 6.38 7.01 6.68C6.73 6.98 5.96 7.71 5.96 9.18C5.96 10.66 7.03 12.08 7.18 12.28C7.33 12.48 9.29 15.51 12.3 16.81C13.01 17.12 13.58 17.31 14.01 17.44C14.73 17.67 15.38 17.64 15.9 17.56C16.48 17.47 17.69 16.83 17.94 16.13C18.19 15.43 18.19 14.83 18.11 14.71C18.04 14.58 17.81 14.48 17.5 14.33Z" fill="white" />
          </svg>

          {/* Floating Urgent Message Bubble 1 (Movido a la izquierda) */}
          <div style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            background: "rgba(255, 20, 60, 0.95)",
            color: "#fff",
            fontFamily: "var(--font-display)",
            fontSize: "0.55rem",
            fontWeight: 800,
            padding: "2px 7px",
            borderRadius: "8px",
            border: "1px solid #ff4466",
            boxShadow: "0 0 12px rgba(255,20,60,0.7)",
            animation: "bubble-float 2.5s infinite ease-in-out",
            whiteSpace: "nowrap",
            zIndex: 2,
          }}>
            URGENTE!! 🚨
          </div>

          {/* Floating Message Bubble 2 (Movido hacia la derecha para no tocar el texto) */}
          <div style={{
            position: "absolute",
            bottom: "-6px",
            left: "-8px",
            background: "rgba(0, 15, 30, 0.92)",
            color: "#25D366",
            fontFamily: "var(--font-display)",
            fontSize: "0.52rem",
            fontWeight: 700,
            padding: "2px 7px",
            borderRadius: "8px",
            border: "1px solid rgba(37, 211, 102, 0.6)",
            boxShadow: "0 0 10px rgba(37,211,102,0.4)",
            animation: "bubble-float-rev 3s infinite ease-in-out",
            whiteSpace: "nowrap",
            zIndex: 2,
          }}>
            ¿Dónde está mi pedido?
          </div>

          {/* Pulsing Hell Desk Badge 99+ */}
          <div style={{
            position: "absolute",
            top: "-8px",
            left: "24px",
            background: "#ff003c",
            color: "#fff",
            fontFamily: "var(--font-display)",
            fontSize: "0.48rem",
            fontWeight: 900,
            width: "19px",
            height: "19px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 12px #ff003c",
            animation: "badge-pulse 1.2s infinite ease-in-out",
            zIndex: 3,
          }}>
            99+
          </div>
        </div>

        {/* Typing / Bot Active Bar (Bajado para evitar sobreponerse con el mensaje) */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          marginTop: "14px",
          background: "rgba(37, 211, 102, 0.12)",
          border: "1px solid rgba(37, 211, 102, 0.35)",
          borderRadius: "10px",
          padding: "2px 8px",
        }}>
          <span style={{ fontSize: "0.52rem", color: "#25D366", fontFamily: "var(--font-display)", letterSpacing: "1px", fontWeight: 700 }}>
            BOT ATENDIENDO ⚡
          </span>
        </div>
      </div>
    );
  }

  if (url.includes("toll") || url.includes("trainman")) {
    return (
      <div className="interactive-vibe-mobile" style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "0",
      }}>
        {/* Animated Toll Barrier (Tranquera de Peaje Matrix) */}
        <div style={{
          position: "relative",
          width: "135px",
          height: "76px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Pulsing Strobe Aura */}
          <div style={{
            position: "absolute",
            width: "58px",
            height: "58px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)",
            animation: "pulse-aura 2s infinite ease-in-out",
          }} />

          {/* SVG Toll Barrier & Control Post */}
          <svg width="110" height="60" viewBox="0 0 110 60" fill="none" style={{ filter: "drop-shadow(0 0 12px rgba(168,85,247,0.6))", zIndex: 1, overflow: "visible" }}>
            {/* Toll Booth / Base Post */}
            <rect x="12" y="18" width="16" height="38" rx="3" fill="#120524" stroke="#a855f7" strokeWidth="2" />
            <circle cx="20" cy="28" r="4" fill="#ff003c" style={{ animation: "toll-strobe 1s infinite alternate" }} />
            <circle cx="20" cy="42" r="3" fill="#331045" stroke="#a855f7" strokeWidth="1" />

            {/* Red Strobe Siren on top */}
            <path d="M16 18 L24 18 L22 10 L18 10 Z" fill="#ff003c" style={{ animation: "toll-strobe 0.8s infinite alternate" }} />
            <circle cx="20" cy="8" r="4" fill="#ff003c" style={{ filter: "drop-shadow(0 0 10px #ff003c)", animation: "toll-strobe 0.8s infinite alternate" }} />

            {/* Animated Barrier Arm (Tranquera con rayas diagonales) */}
            <g style={{ transformOrigin: "20px 30px", animation: "barrier-swing 4s infinite cubic-bezier(0.77, 0, 0.175, 1)" }}>
              {/* Barrier Bar with Diagonal Hazard Stripes */}
              <defs>
                <pattern id="tollStripes" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="12" stroke="#ff003c" strokeWidth="6" />
                  <line x1="6" y1="0" x2="6" y2="12" stroke="#ffffff" strokeWidth="6" />
                </pattern>
              </defs>
              <rect x="20" y="27" width="84" height="7" rx="2" fill="url(#tollStripes)" stroke="#a855f7" strokeWidth="1" style={{ filter: "drop-shadow(0 0 8px rgba(255,0,60,0.5))" }} />
              <circle cx="20" cy="30.5" r="5" fill="#3b0764" stroke="#a855f7" strokeWidth="2" />

              {/* Stop Octagon hanging from the middle of the barrier */}
              <polygon points="62,20 70,20 75,25 75,33 70,38 62,38 57,33 57,25" fill="#ff003c" stroke="#ffffff" strokeWidth="1" />
              <text x="66" y="31" fill="#ffffff" fontSize="6.5" fontWeight="900" fontFamily="var(--font-display)" textAnchor="middle">STOP</text>
            </g>
          </svg>

          {/* Floating Urgent Badge 1 */}
          <div style={{
            position: "absolute",
            top: "-10px",
            right: "-12px",
            background: "rgba(168, 85, 247, 0.95)",
            color: "#fff",
            fontFamily: "var(--font-display)",
            fontSize: "0.52rem",
            fontWeight: 800,
            padding: "2px 7px",
            borderRadius: "8px",
            border: "1px solid #c084fc",
            boxShadow: "0 0 14px rgba(168,85,247,0.7)",
            animation: "bubble-float 2.8s infinite ease-in-out",
            whiteSpace: "nowrap",
            zIndex: 2,
          }}>
            SOLO SI ÉL QUIERE ⛔
          </div>

          {/* Floating Message Bubble 2 */}
          <div style={{
            position: "absolute",
            bottom: "-6px",
            left: "-12px",
            background: "rgba(20, 5, 35, 0.92)",
            color: "#e879f9",
            fontFamily: "var(--font-display)",
            fontSize: "0.50rem",
            fontWeight: 700,
            padding: "2px 7px",
            borderRadius: "8px",
            border: "1px solid rgba(168, 85, 247, 0.6)",
            boxShadow: "0 0 10px rgba(168,85,247,0.4)",
            animation: "bubble-float-rev 3.2s infinite ease-in-out",
            whiteSpace: "nowrap",
            zIndex: 2,
          }}>
            ¿Mis PDFs escaneados?
          </div>
        </div>

        {/* Status Bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          marginTop: "14px",
          background: "rgba(168, 85, 247, 0.14)",
          border: "1px solid rgba(168, 85, 247, 0.4)",
          borderRadius: "10px",
          padding: "2px 8px",
        }}>
          <span style={{ fontSize: "0.52rem", color: "#d8b4fe", fontFamily: "var(--font-display)", letterSpacing: "1px", fontWeight: 700 }}>
            DATA EN SU PC 🔒
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div style={{ color: "#00c8ff", fontSize: "0.8rem", textAlign: "center" }}>⚡ Mapeando Datos...</div>;
  }

  if (!animationData) {
    return (
      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", animation: "pulse 1.5s infinite" }}>
        Descifrando datos...
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Lottie animationData={animationData} loop={true} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
