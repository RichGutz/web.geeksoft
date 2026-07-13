"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Función helper para crear una textura circular ultra difusa para la niebla volumétrica
const createFogTexture = () => {
  if (typeof window === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 64; 
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.6)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

export default function GreenFogVolume({ count = 80 }) {
  const fogRef = useRef<THREE.Points>(null!);

  const fogTexture = useMemo(() => createFogTexture(), []);

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 250;
      const y = (Math.random() - 0.5) * 120 - 10;
      const z = (Math.random() - 0.5) * 600 - 100; 

      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
    }
    return p;
  }, [count]);

  useFrame((state, delta) => {
    if (fogRef.current) {
      fogRef.current.rotation.z += delta * 0.005;
      
      const time = state.clock.getElapsedTime();
      fogRef.current.position.x = Math.sin(time * 0.08) * 3.0;
      fogRef.current.position.y = Math.cos(time * 0.05) * 2.0;
    }
  });

  return (
    <points ref={fogRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        transparent 
        color="#00ff66" 
        size={45.0} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.07} 
        map={fogTexture || undefined}
        alphaTest={0.001}
        blending={THREE.AdditiveBlending} 
        fog={false} 
      />
    </points>
  );
}
