"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Función helper para crear una textura circular difusa en memoria
const createCircleTexture = () => {
  // Evitamos problemas de ejecución del lado del servidor (SSR) en Next.js
  if (typeof window === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // Gradiente radial para que el punto sea una esfera difusa y no un cuadrado rígido
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

export default function DustParticles({ count = 150 }) {
  const pointsRef = useRef<THREE.Points>(null!);

  // Generamos la textura en memoria una sola vez
  const circleTexture = useMemo(() => createCircleTexture(), []);

  // Generar posiciones aleatorias para las partículas flotantes gruesas (Dust)
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 120 - 15;
      const z = (Math.random() - 0.5) * 500 - 100;

      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
    }
    return p;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += delta * 0.012;
      pointsRef.current.rotation.y += delta * 0.004;

      const time = state.clock.getElapsedTime();
      pointsRef.current.position.x = Math.sin(time * 0.12) * 2.0;
      pointsRef.current.position.y = Math.cos(time * 0.08) * 1.5;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color="#00ff80" // Verde neón a juego con el radar
        size={2.5} // Puntos DUST gruesos
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.65}
        fog={true}
        map={circleTexture || undefined} // Mapear el círculo difuso
        alphaTest={0.01} // Descarta píxeles casi transparentes para evitar bordes negros
      />
    </points>
  );
}
