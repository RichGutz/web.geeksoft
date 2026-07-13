"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingHalo() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      // Movimiento ondulante y flotante
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 2;
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.4) * 1;
      
      // Rotación suave del anillo en perspectiva 3D
      meshRef.current.rotation.x = (Math.PI / 2) - 0.2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.rotation.z += 0.002;
    }
    
    if (materialRef.current) {
      // Pulso de intensidad de brillo del halo
      const pulse = 2 + Math.sin(state.clock.elapsedTime * 1.5) * 1;
      materialRef.current.emissiveIntensity = pulse;
    }
  });

  return (
    <group position={[0, 0, -30]}>
      {/* Halo Exterior Principal */}
      <mesh ref={meshRef}>
        <torusGeometry args={[12, 0.2, 16, 100]} />
        <meshStandardMaterial 
          ref={materialRef}
          color="#000000" 
          emissive="#00ff80" 
          emissiveIntensity={2} 
          toneMapped={false} // Evita que react-three-fiber opaque el color neón
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Halo Interior de "Estructura Mesh" */}
      <mesh position={[0, 0, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[10, 1, 8, 50]} />
        <meshBasicMaterial 
          color="#00994d"
          wireframe={true}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}
