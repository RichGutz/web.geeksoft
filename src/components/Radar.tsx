"use client";

import { useState, useEffect, useRef } from "react";
import { IconSaaS, IconDashboards, IconAI, IconScrappers } from "./icons";

const CATEGORIES = [
  { id: "saas", label: "SaaS Especializado", color: "var(--color-saas)", icon: IconSaaS, angle: 45, radius: 200 },
  { id: "dashboards", label: "Dashboards", color: "var(--color-dashboards)", icon: IconDashboards, angle: 135, radius: 150 },
  { id: "ai", label: "Agentes de IA", color: "var(--color-ai)", icon: IconAI, angle: 225, radius: 220 },
  { id: "scrappers", label: "Web Scrappers", color: "var(--color-scrappers)", icon: IconScrappers, angle: 315, radius: 180 },
];

export default function Radar() {
  const [currentColor, setCurrentColor] = useState("var(--color-default)");
  const sweepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    
    // Función para detectar la posición de la manecilla y cambiar colores
    const checkIntersection = () => {
      if (!sweepRef.current) return;
      
      // Obtener el ángulo actual de la manecilla (leyendo la matriz de transformación)
      const st = window.getComputedStyle(sweepRef.current);
      const tr = st.getPropertyValue("transform");
      
      let currentAngle = 0;
      if (tr !== "none") {
        const values = tr.split("(")[1].split(")")[0].split(",");
        const a = parseFloat(values[0]);
        const b = parseFloat(values[1]);
        currentAngle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
      }
      
      // Ajustar el ángulo para que sea 0-360
      if (currentAngle < 0) currentAngle += 360;

      // Mantener el color de la última categoría que tocó
      let nextColor = null;
      for (const cat of CATEGORIES) {
        // Normalizar diferencias de ángulo
        let diff = Math.abs(currentAngle - cat.angle);
        if (diff > 180) diff = 360 - diff;
        
        // Hitbox súper precisa (3 grados) para que toque justo en el centro del ícono
        if (diff <= 3) {
          nextColor = cat.color;
          break;
        }
      }
      
      if (nextColor) {
        setCurrentColor(prev => prev !== nextColor ? nextColor : prev);
      }
      
      animationFrameId = requestAnimationFrame(checkIntersection);
    };

    animationFrameId = requestAnimationFrame(checkIntersection);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Función auxiliar para posicionar nodos usando coordenadas polares
  const getPosition = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    // Centro del radar es 300x300 (mitad de 600px)
    const x = 300 + radius * Math.cos(rad);
    const y = 300 + radius * Math.sin(rad);
    return { left: `${x}px`, top: `${y}px` };
  };

  return (
    <>
      {/* Glow: Caligrafía top-left usando Texto Real Vectorial */}
      <div style={{
        position: "absolute",
        top: "2rem",
        left: "2rem",
        zIndex: 100,
      }}>
        <h1 style={{
          fontFamily: "var(--font-orbitron), sans-serif",
          fontSize: "2.5rem",
          fontWeight: 800,
          letterSpacing: "0.15em",
          color: currentColor,
          textShadow: `0 0 20px ${currentColor}`,
          transition: "color 0.3s ease, text-shadow 0.3s ease",
          margin: 0,
        }}>
          GEEKSOFT
        </h1>
      </div>

      <div 
        className="radar-container"
        style={{ "--current-color": currentColor } as React.CSSProperties}
      >
      {/* Manecilla giratoria */}
      <div className="radar-sweep-container" ref={sweepRef}>
        <div className="radar-sweep"></div>
      </div>

      {/* Centro del Radar (La cabeza con Glow) */}
      <div 
        className="radar-center"
        style={{ 
          borderColor: currentColor,
          boxShadow: `inset 0 0 20px ${currentColor}, 0 0 40px ${currentColor}`
        }}
      >
        <div 
          className="logo-mask-head"
        />
      </div>

      {/* Categorías (Nodos) */}
      {CATEGORIES.map((cat) => {
        const pos = getPosition(cat.angle, cat.radius);
        const IconComponent = cat.icon;
        return (
          <div 
            key={cat.id} 
            className="radar-node"
            style={{ 
              left: pos.left, 
              top: pos.top,
              "--node-color": cat.color 
            } as React.CSSProperties}
          >
            {/* El ícono es el centro absoluto matemático */}
            <div className="radar-node-icon">
              <IconComponent size={24} />
            </div>
            
            {/* El título está colgado debajo de forma absoluta, sin afectar el centro */}
            <div className="radar-node-label" style={{
              position: "absolute",
              top: "120%",
              width: "max-content",
              textAlign: "center"
            }}>
              {cat.label}
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
}
