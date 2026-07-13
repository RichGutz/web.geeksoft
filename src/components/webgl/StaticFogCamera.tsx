"use client";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect } from "react";

// Versión sin ScrollControls para usar el fondo 3D con cámara fija
// Compatible con el Radar HTML que se monta encima
export default function StaticFogCamera() {
  const { camera, scene } = useThree();

  useEffect(() => {
    // Niebla verde oscura profunda de densidad 0.007
    scene.fog = new THREE.FogExp2("#001408", 0.007);

    // Cámara fija mirando el terreno desde arriba con perspectiva cenital dramática
    camera.position.set(0, 0, 50);
    camera.rotation.set(0, 0, 0);
  }, [camera, scene]);

  return null;
}
