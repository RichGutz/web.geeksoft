"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PointMaterial, Points } from "@react-three/drei";

export default function StarField({ count = 3000, color = "#ffffff" }) {
  const pointsRef = useRef<THREE.Points>(null!);

  // Generar posiciones aleatorias para las estrellas conformando un túnel (Wormhole)
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribución cilíndrica alrededor del eje Z
      const radius = 5 + Math.random() * 50; // Ancho del túnel
      const theta = Math.random() * 2 * Math.PI; // Ángulo
      
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);
      const z = (Math.random() - 0.5) * 600; // Profundidad extendida para viaje largo
      
      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
    }
    return p;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z -= delta * 0.02; // Rotación galáctica lenta
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      {/* 
        Usamos el PointMaterial original de Drei que pinta círculos suaves difuminados de forma nativa.
        Simplemente parametrizamos el color para permitir estrellas verde neón.
      */}
      <PointMaterial 
        transparent 
        color={color} 
        size={0.2} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.8}
      />
    </Points>
  );
}
