"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Points } from "@react-three/drei";

export default function DustParticles({ count = 150 }) {
  const pointsRef = useRef<THREE.Points>(null!);

  // Generar posiciones aleatorias para las partículas flotantes gruesas (Dust)
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Esparcidos en un volumen amplio alrededor de la cámara y del terreno
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 120 - 15; // Centradas en y=-15
      const z = (Math.random() - 0.5) * 500 - 100; // Distribuidas en profundidad

      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
    }
    return p;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Rotación tridimensional lenta
      pointsRef.current.rotation.z += delta * 0.012;
      pointsRef.current.rotation.y += delta * 0.004;
      
      // Bamboleo oscilatorio lento en suspensión
      const time = state.clock.getElapsedTime();
      pointsRef.current.position.x = Math.sin(time * 0.12) * 2.0;
      pointsRef.current.position.y = Math.cos(time * 0.08) * 1.5;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      {/* 
        Usamos pointsMaterial nativo de Three.js para garantizar el color y comportamiento de la niebla.
        size={3.0} nos da puntos dust notablemente gruesos y claramente verdes.
      */}
      <pointsMaterial 
        transparent 
        color="#00ff80" // Verde neón idéntico al terreno y radar
        size={3.0} // Puntos muy gruesos
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.65} // Mayor visibilidad
        fog={true} // Se desvanecen en la bruma lejana
      />
    </Points>
  );
}
