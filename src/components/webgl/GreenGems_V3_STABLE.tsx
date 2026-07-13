"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GemData {
  position: [number, number, number];
  scale: number;
  speedRot: [number, number, number];
  phase: number;
}

export default function GreenGems({ count = 25 }) {
  const gemsRef = useRef<THREE.Group>(null!);

  // Generar datos aleatorios para cada gema (posición, tamaño, rotación)
  const gems = useMemo(() => {
    const list: GemData[] = [];
    for (let i = 0; i < count; i++) {
      // Dispersas en un volumen que rodea el camino del túnel
      const angle = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 25; // Fuera del centro para no chocar con la cámara
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle) - 5; // Ajuste de altura
      const z = (Math.random() - 0.5) * 400 - 50; // A lo largo de la profundidad

      list.push({
        position: [x, y, z],
        scale: 0.5 + Math.random() * 0.8, // Tamaño reducido y más discreto de las gemas
        speedRot: [
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.2
        ],
        phase: Math.random() * Math.PI * 2
      });
    }
    return list;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (gemsRef.current) {
      // Animar cada gema por separado dentro del grupo
      gemsRef.current.children.forEach((child, index) => {
        const gem = gems[index];
        if (gem) {
          // Rotación continua
          child.rotation.x += gem.speedRot[0] * 0.02;
          child.rotation.y += gem.speedRot[1] * 0.02;
          child.rotation.z += gem.speedRot[2] * 0.02;

          // Oscilación vertical suave (flotado)
          child.position.y = gem.position[1] + Math.sin(time * 0.8 + gem.phase) * 1.5;
        }
      });
    }
  });

  return (
    <group ref={gemsRef}>
      {gems.map((gem, i) => (
        <mesh 
          key={i} 
          position={gem.position} 
          scale={gem.scale}
        >
          {/* Icosaedro facetado más pequeño (0.5 de radio) */}
          <icosahedronGeometry args={[0.5, 0]} />
          
          {/* 
            Material estándar brillante y translúcido.
            Optimizado para renderizarse en un solo pase directo sin sobrecargar la GPU.
          */}
          <meshStandardMaterial 
            color="#00ff66" 
            emissive="#004d1a"
            emissiveIntensity={2.5} // Brillo fluorescente interno
            roughness={0.05} // Superficie pulida
            metalness={0.1} 
            transparent
            opacity={0.85} // Translúcido
            flatShading={true} // Facetado marcado para aspecto de cristal
            fog={true}         
          />
        </mesh>
      ))}
    </group>
  );
}
