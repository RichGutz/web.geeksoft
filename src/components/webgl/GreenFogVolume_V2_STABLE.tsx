"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Función helper para crear una textura circular ultra difusa para la niebla volumétrica
const createFogTexture = () => {
  if (typeof window === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 64; // Mayor resolución para un desvanecimiento más suave
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    // Gradiente muy suave para simular gas/niebla
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

  // Posicionar grandes volúmenes de bruma a lo largo del recorrido Z de la cámara
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Dispersión mucho más amplia (spread out) para evitar acumulación local
      const x = (Math.random() - 0.5) * 450;
      const y = (Math.random() - 0.5) * 200 - 10;
      const z = (Math.random() - 0.5) * 600 - 100; 

      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
    }
    return p;
  }, [count]);

  useFrame((state, delta) => {
    if (fogRef.current) {
      // Rotación y flotado lentísimo del gas de la niebla
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
      {/* 
        pointsMaterial con tamaño masivo (size={150.0}) y opacidad (opacity={0.10}).
        Esto permite que las nubes se solapen homogéneamente y se esparzan ("spread out").
      */}
      <pointsMaterial 
        transparent 
        color="#00ff80" // Verde neón más brillante e intenso
        size={150.0} // Tamaño masivo para que se difumine uniformemente por todo el campo visual
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.10} // Opacidad suave y homogénea
        map={fogTexture || undefined}
        alphaTest={0.001}
        blending={THREE.AdditiveBlending} // Blending aditivo para que el gas brille al superponerse
        fog={false} // La propia niebla no debe verse afectada por la niebla de la escena
      />
    </points>
  );
}
