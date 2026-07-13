"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";

export default function GreenFogCamera() {
  const scroll = useScroll(); // Nos da el progreso del scroll
  const { camera, scene } = useThree();

  useEffect(() => {
    // Niebla verde oscura profunda de densidad 0.007 para permitir el contraste de las curvas vectoriales
    scene.fog = new THREE.FogExp2("#001408", 0.007);



    
    // Posición inicial de la cámara
    camera.position.set(0, 0, 50);
  }, [camera, scene]);

  useFrame(() => {
    const offset = scroll.offset;
    const targetZ = 50 - (offset * 500); 

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, offset * Math.PI * 0.5, 0.05);
    
    if (offset > 0.1 && offset < 0.9) {
       camera.position.x = Math.sin(Date.now() * 0.01) * 0.5 * offset;
       camera.position.y = Math.cos(Date.now() * 0.01) * 0.5 * offset;
    } else {
       camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.1);
       camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.1);
    }
  });

  return null;
}
