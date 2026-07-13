"use client";
import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";

// Shader Functions (Simplex Noise 3D)
const noiseShader = `
// GLSL textureless classic 3D noise "cnoise",
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
float cnoise(vec3 P) {
  vec3 Pi0 = floor(P); vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod289(Pi0); Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz; vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0); vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0); vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0); vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0); vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1); vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x); vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z); vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x); vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z); vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;

  float n000 = dot(g000, Pf0); float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z)); float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z)); float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz)); float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}
`;

const vertexShader = `
  ${noiseShader}
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uMousePos;
  uniform float uRippleIntensity;
  
  void main() {
    vPosition = position;
    vec3 pos = position;
    
    // 1. Elevación montañosa animada usando ruido perlin
    float noise = cnoise(vec3(pos.x * 0.05, pos.y * 0.05, uTime * 0.2));
    pos.z += noise * 12.0; 
    
    // 2. EFECTO "ONDA DE AGUA" (RIPPLE) INTERACTIVO
    // Calculamos la distancia desde este vértice al mouse en el plano XY
    float dist = distance(pos.xy, uMousePos.xy);
    
    // Creamos una onda senoidal expansiva basada en la distancia y el tiempo
    float ripple = sin(-dist * 0.5 + uTime * 5.0) * cos(dist * 0.2);
    
    // Atenuamos la onda para que solo afecte el área cerca del ratón (radio de 40 unidades)
    float rippleDecay = smoothstep(40.0, 0.0, dist);
    
    // Sumamos la onda a la altura del terreno
    pos.z += ripple * rippleDecay * 15.0 * uRippleIntensity;

    // Pasamos la posición Z real al fragment shader para pintar las curvas de nivel
    vPosition.z = pos.z;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vPosition;
  uniform vec3 uColor;

  void main() {
    float elevation = vPosition.z;
    
    // Curvas principales (más espaciadas)
    float contour = fract(elevation * 0.5); 
    float lineThickness = 0.08;
    float line = smoothstep(0.0, lineThickness, contour) - smoothstep(lineThickness, lineThickness * 2.0, contour);
    
    // Curvas secundarias (más tenues y juntas)
    float subContour = fract(elevation * 2.0);
    float subLine = smoothstep(0.0, 0.04, subContour) - smoothstep(0.04, 0.08, subContour);
    
    float totalLines = line + (subLine * 0.3);

    // Desvanecimiento profundo
    float fade = smoothstep(-15.0, 15.0, elevation + 8.0);

    vec3 finalColor = uColor * totalLines;
    gl_FragColor = vec4(finalColor, totalLines * 0.8 * fade); 
  }
`;

export default function ContourTerrain() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  
  // Rastrear la posición del mouse en el mundo 3D
  const targetMousePos = useRef(new THREE.Vector3(0, 0, 0));
  const currentMousePos = useRef(new THREE.Vector3(0, 0, 0));
  const rippleIntensity = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#00ff80") }, 
      uMousePos: { value: new THREE.Vector3(0, 0, 0) },
      uRippleIntensity: { value: 0 }
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Interpolar (Lerp) la posición del mouse para que la onda te siga suavemente como agua
      currentMousePos.current.lerp(targetMousePos.current, 0.1);
      materialRef.current.uniforms.uMousePos.value.copy(currentMousePos.current);
      
      // Decaer la intensidad si el mouse deja de moverse (o vuelve a subir)
      rippleIntensity.current = THREE.MathUtils.lerp(rippleIntensity.current, 0, 0.02);
      materialRef.current.uniforms.uRippleIntensity.value = rippleIntensity.current;
    }
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    // Al mover el ratón sobre el plano, guardamos la intersección 3D exacta
    targetMousePos.current.copy(e.point);
    // Disparamos la intensidad de la onda al 100%
    rippleIntensity.current = 1.0;
  };

  return (
    <mesh 
      position={[0, -15, -150]} 
      rotation={[-Math.PI / 2 + 0.2, 0, 0]}
      onPointerMove={handlePointerMove}
    >
      {/* 256x256 segmentos nos dan una malla súper densa para que el agua fluya perfecta */}
      <planeGeometry args={[300, 500, 256, 256]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
