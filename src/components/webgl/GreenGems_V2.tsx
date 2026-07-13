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
      const angle = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 25; 
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle) - 5; 
      const z = (Math.random() - 0.5) * 400 - 50; 

      list.push({
        position: [x, y, z],
        scale: 0.8 + Math.random() * 1.5, 
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
      gemsRef.current.children.forEach((child, index) => {
        const gem = gems[index];
        if (gem) {
          child.rotation.x += gem.speedRot[0] * 0.02;
          child.rotation.y += gem.speedRot[1] * 0.02;
          child.rotation.z += gem.speedRot[2] * 0.02;
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
          <icosahedronGeometry args={[1.2, 0]} />
          <meshPhysicalMaterial 
            color="#00ff80" 
            emissive="#003311"
            emissiveIntensity={1.5}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.85}
            transmission={0.4} 
            thickness={1.5}    
            flatShading={true} 
            fog={true}         
          />
        </mesh>
      ))}
    </group>
  );
}
