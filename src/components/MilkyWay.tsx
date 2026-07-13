"use client";
import { useEffect, useRef } from "react";

export default function MilkyWay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Crear 400 estrellas
    const stars: { x: number; y: number; r: number; opacity: number; speed: number; pulse: number }[] = [];
    for (let i = 0; i < 400; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2,
        opacity: Math.random(),
        speed: 0.02 + Math.random() * 0.1,
        pulse: Math.random() * 0.02
      });
    }

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.005;
      
      // Fondo negro espacial
      ctx.fillStyle = "#020704"; // Negro con levísimo tinte verde oscuro
      ctx.fillRect(0, 0, width, height);

      // Dibujar Nebulosas (Vía Láctea Verde/Mesh3D)
      const cx1 = width * 0.5 + Math.sin(time) * 200;
      const cy1 = height * 0.5 + Math.cos(time * 0.8) * 100;
      const gradient1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, width * 0.6);
      gradient1.addColorStop(0, "rgba(0, 255, 128, 0.05)");
      gradient1.addColorStop(1, "transparent");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);

      const cx2 = width * 0.2 + Math.cos(time * 1.2) * 150;
      const cy2 = height * 0.8 + Math.sin(time * 0.5) * 150;
      const gradient2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, width * 0.5);
      gradient2.addColorStop(0, "rgba(0, 153, 77, 0.04)");
      gradient2.addColorStop(1, "transparent");
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      // Dibujar Estrellas
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        
        // Pulso de brillo
        star.opacity += star.pulse;
        if (star.opacity > 1 || star.opacity < 0.1) star.pulse *= -1;

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Movimiento de paralaje suave hacia arriba (como volando)
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      }

      // Capa de ruido / film grain estático encima
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none"
      }}
    />
  );
}
