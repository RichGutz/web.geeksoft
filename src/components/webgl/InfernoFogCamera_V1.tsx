"use client";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect } from "react";

// Cámara fija con niebla naranja oscura volcánica para el Inframundo
export default function InfernoFogCamera() {
  const { camera, scene } = useThree();

  useEffect(() => {
    // Niebla naranja oscura — más densa que la verde para efecto sofocante
    scene.fog = new THREE.FogExp2("#1a0500", 0.009);
    camera.position.set(0, 0, 50);
    camera.rotation.set(0, 0, 0);
  }, [camera, scene]);

  return null;
}
