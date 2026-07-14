"use client";

import { useState, useEffect, useRef } from "react";
import { IconSaaS, IconDashboards, IconAI, IconScrappers } from "./icons";

// Radios aumentados proporcionalmente al nuevo tamaño de 750px (mitad = 375px)
const CATEGORIES = [
  { id: "saas", label: "SaaS Especializado", color: "var(--color-saas)", icon: IconSaaS, angle: 45, radius: 260 },
  { id: "dashboards", label: "Dashboards", color: "var(--color-dashboards)", icon: IconDashboards, angle: 135, radius: 190 },
  { id: "ai", label: "Agentes de IA", color: "var(--color-ai)", icon: IconAI, angle: 225, radius: 300 },
  { id: "scrappers", label: "Web Scrappers", color: "var(--color-scrappers)", icon: IconScrappers, angle: 315, radius: 230 },
];

interface RadarProps {
  onCategorySelect?: (categoryId: string | null) => void;
  onColorChange?: (color: string) => void;
}

export default function Radar({ onCategorySelect, onColorChange }: RadarProps) {
  const [currentColor, setCurrentColor] = useState("var(--color-default)");
  const sweepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    
    const checkIntersection = () => {
      if (!sweepRef.current) return;
      
      const st = window.getComputedStyle(sweepRef.current);
      const tr = st.getPropertyValue("transform");
      
      let currentAngle = 0;
      if (tr !== "none") {
        const values = tr.split("(")[1].split(")")[0].split(",");
        const a = parseFloat(values[0]);
        const b = parseFloat(values[1]);
        currentAngle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
      }
      
      if (currentAngle < 0) currentAngle += 360;

      let nextColor = null;
      for (const cat of CATEGORIES) {
        let diff = Math.abs(currentAngle - cat.angle);
        if (diff > 180) diff = 360 - diff;
        if (diff <= 3) {
          nextColor = cat.color;
          break;
        }
      }
      
      if (nextColor) {
        setCurrentColor(prev => prev !== nextColor ? nextColor : prev);
      }
      
      // Matrix Pills Illumination
      const pills = document.querySelectorAll('.matrix-pill');
      if (currentAngle >= 0 && currentAngle <= 180) {
        pills.forEach(p => p.classList.add('illuminated'));
      } else {
        pills.forEach(p => p.classList.remove('illuminated'));
      }
      
      animationFrameId = requestAnimationFrame(checkIntersection);
    };

    animationFrameId = requestAnimationFrame(checkIntersection);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Notificar al padre cuando cambie el color para el título superior
  useEffect(() => {
    onColorChange?.(currentColor);
  }, [currentColor, onColorChange]);

  const getPosition = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    // Centro del radar ahora es 375x375 (mitad de 750px)
    const x = 375 + radius * Math.cos(rad);
    const y = 375 + radius * Math.sin(rad);
    return { left: `${x}px`, top: `${y}px` };
  };

  return (
    <div 
      className="radar-container"
      style={{ "--current-color": currentColor } as React.CSSProperties}
    >
      {/* Manecilla giratoria */}
      <div className="radar-sweep-container" ref={sweepRef}>
        <div className="radar-sweep"></div>
      </div>

      {/* Centro del Radar */}
      <div 
        className="radar-center"
        style={{ 
          borderColor: currentColor,
          boxShadow: `inset 0 0 20px ${currentColor}, 0 0 40px ${currentColor}`
        }}
      >
        <div className="logo-mask-head" />
      </div>

      {/* Categorías (Nodos) — con onClick para disparar el panel lateral */}
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
              "--node-color": cat.color,
              cursor: onCategorySelect ? "pointer" : "default",
            } as React.CSSProperties}
            onClick={() => onCategorySelect?.(cat.id)}
          >
            <div className="radar-node-icon">
              <IconComponent size={24} />
            </div>
            
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
  );
}
