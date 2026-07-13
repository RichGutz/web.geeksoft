"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";

export default function WormHoleCamera() {
  const scroll = useScroll(); // Nos da el progreso del scroll del contenedor
  const { camera, scene } = useThree();

  useEffect(() => {
    // Añadimos niebla profunda verde para simular la atmósfera de radar militar
    scene.fog = new THREE.FogExp2("#001a09", 0.005);
    
    // Posición inicial de la cámara
    camera.position.set(0, 0, 50);
  }, [camera, scene]);

  useFrame(() => {
    // scroll.offset va de 0 (arriba) a 1 (abajo)
    const offset = scroll.offset;
    
    // Queremos viajar profundamente en el eje Z negativo
    const targetZ = 50 - (offset * 500); 

    // Movimiento hiperespacial (lerp suaviza la transición de la cámara)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);

    // Efecto de tonel: la cámara rota ligeramente sobre sí misma al viajar
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, offset * Math.PI * 0.5, 0.05);
    
    // Temblor espacial sutil basado en la velocidad del viaje (offset)
    if (offset > 0.1 && offset < 0.9) {
       camera.position.x = Math.sin(Date.now() * 0.01) * 0.5 * offset;
       camera.position.y = Math.cos(Date.now() * 0.01) * 0.5 * offset;
    } else {
       camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.1);
       camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.1);
    }
  });

  return null; // Invisible, solo controla la cámara
}
